import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import type { ContactFormData, InquiryType } from '../types';
import Button from '../components/ui/Button';

const INQUIRY_TYPES: InquiryType[] = [
  'Brand Partnership',
  'Restaurant Feature',
  'Media Inquiry',
  'General Question',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Brand Partnership',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Replace YOUR_FORMSPREE_ID with actual Formspree endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiryType: 'Brand Partnership',
          message: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setError('Something went wrong. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[#FFF9E6] via-[#FFFBF5] to-[#FFEAA7]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#6B5B5B]">
            Let's Work Together
          </h1>
          <p className="mt-6 text-lg text-[#6B5B5B]/80 max-w-2xl mx-auto">
            Interested in partnering up? Have a restaurant you want me to try?
            Or just want to say hello? I'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="font-heading text-2xl font-semibold text-[#6B5B5B] mb-6">
                Send Me a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="font-heading text-xl font-semibold text-[#6B5B5B] mt-4">
                    Message Sent!
                  </h3>
                  <p className="text-[#6B5B5B]/70 mt-2">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#6B5B5B] mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#FFF9E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#6B5B5B] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#FFF9E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#6B5B5B] mb-2">
                        Company / Restaurant
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#FFF9E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                        placeholder="Company name (optional)"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-[#6B5B5B] mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#FFF9E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent bg-white"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#6B5B5B] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-[#FFF9E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent resize-none"
                      placeholder="Tell me more about your inquiry..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Partnership Info */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="font-heading text-2xl font-semibold text-[#6B5B5B] mb-6">
                  Partnership Benefits
                </h2>
                <ul className="space-y-4">
                  {[
                    'Authentic content that resonates with food lovers',
                    'Reach 500K+ engaged followers across platforms',
                    'Professional photography & video production',
                    'Honest reviews that build trust with audiences',
                    'Cross-platform promotion (TikTok, Instagram, Website)',
                    'Flexible partnership options to fit your goals',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#FF6B6B] text-lg">✓</span>
                      <span className="text-[#6B5B5B]/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact */}
              <div className="bg-gradient-to-br from-[#FF6B6B] to-[#E07A5F] rounded-3xl shadow-lg p-8 text-white">
                <h2 className="font-heading text-2xl font-semibold mb-4">
                  Prefer Email?
                </h2>
                <p className="text-white/90 mb-6">
                  For urgent inquiries or if you prefer to reach out directly:
                </p>
                <a
                  href="mailto:chloe_yun@aol.com"
                  className="inline-flex items-center gap-2 bg-white text-[#FF6B6B] px-6 py-3 rounded-full font-medium hover:bg-[#FFF9E6] transition-colors"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  chloe_yun@aol.com
                </a>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="font-heading text-2xl font-semibold text-[#6B5B5B] mb-6">
                  Follow Along
                </h2>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/chloe_eats_dfw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl text-center font-medium hover:opacity-90 transition-opacity"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@chloe_yun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white py-3 px-4 rounded-xl text-center font-medium hover:opacity-90 transition-opacity"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
