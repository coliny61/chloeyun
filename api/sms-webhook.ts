import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Twilio webhook for incoming SMS
// Chloe texts this number to add content to her website

interface ParsedContent {
  type: 'food' | 'event' | 'vlog' | 'unknown';
  name: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  cuisineType?: string;
  review?: string;
  tikTokUrl?: string;
  description?: string;
}

const ALLOWED_PHONES = (process.env.ALLOWED_PHONE_NUMBERS || '').split(',').map(p => p.trim());

async function parseMessageWithAI(message: string): Promise<ParsedContent> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const systemPrompt = `You are a helpful assistant that parses text messages from a food content creator named Chloe.
She texts you info about restaurants, events, or vlogs she wants to add to her website.

Parse the message and extract structured data. Return ONLY valid JSON, no explanation.

For FOOD spots, extract:
- type: "food"
- name: restaurant name (required)
- location: city/neighborhood
- rating: number 1-5 (look for stars, numbers, or descriptive words like "amazing"=5, "good"=4, "okay"=3)
- priceRange: "$", "$$", "$$$", or "$$$$" (based on mentions of cheap, affordable, pricey, expensive)
- cuisineType: Korean, Japanese, American, Italian, Mexican, Chinese, etc.
- review: her thoughts/description
- tikTokUrl: if she includes a tiktok link

For EVENTS, extract:
- type: "event"
- name: event name (required)
- description: what the event is about
- tikTokUrl: if included

For VLOGS, extract:
- type: "vlog"
- name: vlog title (required)
- location: city (DFW, NYC, etc.)
- description: what it's about
- tikTokUrl: if included

If you can't determine the type, use "unknown".

Example input: "Just tried Neko Yubu in dallas! Korean tofu soup spot, super cheap $ and SO good 5 stars. Best hangover food ever https://tiktok.com/..."

Example output:
{"type":"food","name":"Neko Yubu","location":"Dallas","rating":5,"priceRange":"$","cuisineType":"Korean","review":"Best hangover food ever, super good Korean tofu soup spot","tikTokUrl":"https://tiktok.com/..."}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    system: systemPrompt,
    messages: [{ role: 'user', content: message }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    return { type: 'unknown', name: 'Unknown' };
  }
}

async function addToNotion(content: ParsedContent): Promise<string> {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    throw new Error('Notion not configured');
  }

  // Build properties based on content type
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: content.name } }] },
    Status: { select: { name: 'Draft' } },
  };

  if (content.type === 'food') {
    if (content.location) {
      properties['Location'] = { rich_text: [{ text: { content: content.location } }] };
    }
    if (content.rating) {
      properties['Rating'] = { number: content.rating };
    }
    if (content.priceRange) {
      properties['Price Range'] = { select: { name: content.priceRange } };
    }
    if (content.cuisineType) {
      properties['Cuisine Type'] = { select: { name: content.cuisineType } };
    }
    if (content.review) {
      properties['Review'] = { rich_text: [{ text: { content: content.review } }] };
    }
    if (content.tikTokUrl) {
      properties['TikTok URL'] = { url: content.tikTokUrl };
    }
  }

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion error: ${error}`);
  }

  return 'Added to Notion!';
}

function formatTwilioResponse(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${message}</Message>
</Response>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests from Twilio
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const { Body: messageBody, From: fromNumber } = req.body;

    // Verify sender is authorized (Chloe's phone number)
    if (ALLOWED_PHONES.length > 0 && !ALLOWED_PHONES.includes(fromNumber)) {
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(formatTwilioResponse("Sorry, you're not authorized to add content."));
    }

    if (!messageBody) {
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(formatTwilioResponse("Please send me details about a restaurant, event, or vlog!"));
    }

    // Parse the message with AI
    const parsed = await parseMessageWithAI(messageBody);

    if (parsed.type === 'unknown') {
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(formatTwilioResponse(
        "I couldn't understand that. Try: 'Just tried [Restaurant] in [City], [cuisine] food, [price $-$$$$], [rating] stars. [Your review]'"
      ));
    }

    // Add to Notion
    await addToNotion(parsed);

    // Send confirmation
    const confirmMsg = parsed.type === 'food'
      ? `Added "${parsed.name}" to your food spots! Rating: ${parsed.rating || '?'}/5, ${parsed.priceRange || '?'}. Check your admin panel to enrich & publish.`
      : `Added "${parsed.name}" as a ${parsed.type}! Check your admin panel to review.`;

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(formatTwilioResponse(confirmMsg));

  } catch (error) {
    console.error('SMS webhook error:', error);
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(formatTwilioResponse(
      "Oops! Something went wrong. Try again or check the admin panel."
    ));
  }
}
