// Simple admin interface for Chloe to trigger enrichment

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllPlacesForAdmin, fetchPendingEnrichment } from './lib/notion-server';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Verify admin secret (optional security)
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = req.query.secret || req.headers['x-admin-secret'];

  if (adminSecret && providedSecret !== adminSecret) {
    res.status(401).send(getLoginPage());
    return;
  }

  if (req.method === 'GET') {
    try {
      const pendingPlaces = await fetchPendingEnrichment();
      const allPlaces = await fetchAllPlacesForAdmin();

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(getAdminPage(pendingPlaces, allPlaces, adminSecret));
    } catch (error) {
      console.error('Admin page error:', error);
      res.status(500).send('Error loading admin page');
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}

interface PlaceInfo {
  id: string;
  name: string;
  location: string;
  status: string;
  hasCoverImage: boolean;
}

function getLoginPage(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chloe Eats DFW - Admin Login</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 400px;
      width: 100%;
    }
    h1 {
      color: #333;
      margin-bottom: 8px;
      font-size: 24px;
    }
    p { color: #666; margin-bottom: 24px; }
    form { display: flex; flex-direction: column; gap: 16px; }
    input {
      padding: 14px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }
    input:focus { outline: none; border-color: #667eea; }
    button {
      padding: 14px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102,126,234,0.4); }
  </style>
</head>
<body>
  <div class="login-card">
    <h1>Admin Login</h1>
    <p>Enter your admin password to access the enrichment dashboard.</p>
    <form action="/api/admin" method="GET">
      <input type="password" name="secret" placeholder="Admin Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>
`;
}

function getAdminPage(pendingPlaces: PlaceInfo[], allPlaces: PlaceInfo[], adminSecret?: string): string {
  const secretParam = adminSecret ? `?secret=${adminSecret}` : '';
  const secretHeader = adminSecret ? `'x-admin-secret': '${adminSecret}'` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chloe Eats DFW - Content Enrichment</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f7fa;
      min-height: 100vh;
      padding: 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 24px;
    }
    header h1 { font-size: 28px; margin-bottom: 8px; }
    header p { opacity: 0.9; }
    .section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .section h2 {
      color: #333;
      font-size: 18px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge {
      background: #667eea;
      color: white;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
    }
    .badge.success { background: #10b981; }
    .badge.warning { background: #f59e0b; }
    .badge.error { background: #ef4444; }
    .place-list { display: flex; flex-direction: column; gap: 12px; }
    .place-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .place-info h3 { font-size: 16px; color: #333; margin-bottom: 4px; }
    .place-info p { font-size: 14px; color: #666; }
    .place-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #888;
      margin-top: 4px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ccc;
    }
    .status-dot.ready { background: #f59e0b; }
    .status-dot.published { background: #10b981; }
    .status-dot.draft { background: #94a3b8; }
    button {
      padding: 10px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    button.secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    .empty-state p { margin-bottom: 8px; }
    .result {
      margin-top: 12px;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
      display: none;
    }
    .result.success { background: #d1fae5; color: #065f46; display: block; }
    .result.error { background: #fee2e2; color: #991b1b; display: block; }
    .instructions {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .instructions h3 { color: #1e40af; font-size: 14px; margin-bottom: 8px; }
    .instructions ol { margin-left: 20px; color: #3b82f6; font-size: 14px; }
    .instructions li { margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Content Enrichment Dashboard</h1>
      <p>Automatically fetch restaurant images and details from Google Places & Yelp</p>
    </header>

    <div class="instructions">
      <h3>How to use:</h3>
      <ol>
        <li>Add a new place in Notion with name, location, rating, review, and TikTok URL</li>
        <li>Set the Status to "Ready to Enrich"</li>
        <li>Come back here and click "Enrich" to fetch images and details</li>
        <li>The place will be automatically published after enrichment</li>
      </ol>
    </div>

    <div class="section">
      <h2>
        Ready to Enrich
        <span class="badge">${pendingPlaces.length}</span>
      </h2>
      ${pendingPlaces.length === 0 ? `
        <div class="empty-state">
          <p>No places ready to enrich.</p>
          <p style="font-size: 14px; color: #888;">Set a place's status to "Ready to Enrich" in Notion to see it here.</p>
        </div>
      ` : `
        <div class="place-list">
          ${pendingPlaces.map(place => `
            <div class="place-item" id="place-${place.id}">
              <div class="place-info">
                <h3>${escapeHtml(place.name)}</h3>
                <p>${escapeHtml(place.location || 'No location set')}</p>
                <div class="place-meta">
                  <span class="status-dot ready"></span>
                  <span>${place.status}</span>
                  ${place.hasCoverImage ? '<span>• Has image</span>' : '<span>• No image</span>'}
                </div>
              </div>
              <div>
                <button onclick="enrichPlace('${place.id}', '${escapeHtml(place.name)}')">
                  Enrich
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>

    <div class="section">
      <h2>Recent Places</h2>
      <div class="place-list">
        ${allPlaces.slice(0, 10).map(place => `
          <div class="place-item" id="place-${place.id}">
            <div class="place-info">
              <h3>${escapeHtml(place.name)}</h3>
              <p>${escapeHtml(place.location || 'No location set')}</p>
              <div class="place-meta">
                <span class="status-dot ${place.status.toLowerCase().replace(/\s+/g, '-')}"></span>
                <span>${place.status}</span>
                ${place.hasCoverImage ? '<span>• Has image</span>' : '<span>• No image</span>'}
              </div>
            </div>
            <div>
              <button class="secondary" onclick="enrichPlace('${place.id}', '${escapeHtml(place.name)}', true)">
                Re-enrich
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <script>
    async function enrichPlace(pageId, placeName, forceRefresh = false) {
      const placeEl = document.getElementById('place-' + pageId);
      const button = placeEl.querySelector('button');
      const originalText = button.textContent;

      // Remove any existing result
      const existingResult = placeEl.querySelector('.result');
      if (existingResult) existingResult.remove();

      button.disabled = true;
      button.textContent = 'Enriching...';

      try {
        const response = await fetch('/api/enrich', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ${secretHeader}
          },
          body: JSON.stringify({ pageId, forceRefresh }),
        });

        const result = await response.json();

        const resultEl = document.createElement('div');
        resultEl.className = 'result ' + (result.success ? 'success' : 'error');

        if (result.success) {
          resultEl.innerHTML = \`
            <strong>Success!</strong> Enriched fields: \${result.enrichedFields.join(', ')}
            <br>Source: \${result.source}
          \`;
        } else {
          resultEl.innerHTML = \`
            <strong>Error:</strong> \${result.errors?.join(', ') || result.error || 'Unknown error'}
          \`;
        }

        placeEl.appendChild(resultEl);

        // Update status indicator if successful
        if (result.success) {
          const statusDot = placeEl.querySelector('.status-dot');
          if (statusDot) {
            statusDot.className = 'status-dot published';
          }
          const statusText = placeEl.querySelector('.place-meta span:nth-child(2)');
          if (statusText) {
            statusText.textContent = 'Published';
          }
        }
      } catch (error) {
        const resultEl = document.createElement('div');
        resultEl.className = 'result error';
        resultEl.innerHTML = '<strong>Error:</strong> Network error. Please try again.';
        placeEl.appendChild(resultEl);
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  </script>
</body>
</html>
`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
