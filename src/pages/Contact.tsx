import { useState, useEffect } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import type { ContactFormData, InquiryType } from '../types';
import { submitContact } from '../hooks/useSupabase';
import Button from '../components/ui/Button';
import { FloatingInput, FloatingTextarea, FloatingSelect } from '../components/ui/FloatingInput';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent } from '../lib/analytics';

const CONTACT_EMAIL = 'chloe_yun@aol.com';

const INQUIRY_TYPES: InquiryType[] = [
  'Brand Partnership',
  'Restaurant Feature',
  'Media Inquiry',
  'General Question',
  'Other',
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  usePageMeta(
    'Contact | Chloe Eats DFW',
    'Get in touch with Chloe for partnerships, restaurant features, event coverage, or general inquiries.'
  );
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Brand Partnership',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Real-time validation
  useEffect(() => {
    const errors: FormErrors = {};
    if (touched.name && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (touched.email) {
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email';
      }
    }
    if (touched.message && !formData.message.trim()) {
      errors.message = 'Message is required';
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormErrors(errors);
  }, [formData, touched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field: keyof FormErrors): boolean => {
    return touched[field] && !formErrors[field] && !!formData[field];
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate before submit
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !validateEmail(formData.email)) {
      return;
    }

    setIsSubmitting(true);

    // Save to Supabase
    try {
      await submitContact(formData);
    } catch {
      // Supabase save failed — still send mailto as fallback
    }

    // Also open mailto for email notification
    const subject = encodeURIComponent(`[${formData.inquiryType}] Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nInquiry Type: ${formData.inquiryType}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    trackEvent('submit', 'Contact Form', formData.inquiryType);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      inquiryType: 'Brand Partnership',
      message: '',
    });
    setTouched({});
  };

  // Calculate form progress
  const filledFields = [formData.name, formData.email, formData.message].filter(Boolean).length;
  const progress = (filledFields / 3) * 100;

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] via-[#FAF6F0] to-[#FDD5DD]/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8A5B8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDD5DD]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1
            className={`font-heading text-4xl sm:text-5xl font-bold text-[#2D2424] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Let's Work Together
          </h1>
          <p
            className={`mt-6 text-lg text-[#2D2424]/80 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Interested in partnering up? Have a restaurant you want me to try?
            Or just want to say hello? I'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              ref={formRef}
              className={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-700 ${
                isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-semibold text-[#2D2424]">
                  Send Me a Message
                </h2>
                {/* Progress indicator */}
                {!isSubmitted && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-[#FFF5F7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F8A5B8] to-[#E8919F] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#2D2424]/60">{Math.round(progress)}%</span>
                  </div>
                )}
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce-in">
                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#2D2424] mt-6">
                    Message Sent!
                  </h3>
                  <p className="text-[#2D2424]/70 mt-2">
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
                    <FloatingInput
                      label="Name *"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      error={formErrors.name}
                      success={isFieldValid('name')}
                      required
                    />
                    <FloatingInput
                      label="Email *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      error={formErrors.email}
                      success={isFieldValid('email')}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput
                      label="Company / Restaurant"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <FloatingSelect
                      label="Inquiry Type *"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </FloatingSelect>
                  </div>

                  <FloatingTextarea
                    label="Message *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    error={formErrors.message}
                    success={isFieldValid('message')}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Partnership Info */}
              <div
                className={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-700 ${
                  isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <h2 className="font-heading text-2xl font-semibold text-[#2D2424] mb-6">
                  Partnership Benefits
                </h2>
                <ul className="space-y-4">
                  {[
                    'Authentic content that resonates with food lovers',
                    'Reach 30K+ followers with 1.6M+ likes & 2.8M+ views',
                    'Professional photography & video production',
                    'Honest reviews that build trust with audiences',
                    'Cross-platform promotion (TikTok, Instagram, Website)',
                    'Flexible partnership options to fit your goals',
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${200 + index * 75}ms` }}
                    >
                      <span className="text-[#F8A5B8] text-lg flex-shrink-0">✓</span>
                      <span className="text-[#2D2424]/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact */}
              <div
                className={`bg-gradient-to-br from-[#F8A5B8] to-[#E8919F] rounded-3xl shadow-lg p-8 text-white transition-all duration-700 ${
                  isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <h2 className="font-heading text-2xl font-semibold mb-4">
                  Prefer Email?
                </h2>
                <p className="text-white/90 mb-6">
                  For urgent inquiries or if you prefer to reach out directly:
                </p>
                <a
                  href="mailto:chloe_yun@aol.com"
                  className="inline-flex items-center gap-2 bg-white text-[#F8A5B8] px-6 py-3 rounded-full font-medium hover:bg-[#FFF5F7] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  chloe_yun@aol.com
                </a>
              </div>

              {/* Social Links */}
              <div
                className={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-700 ${
                  isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <h2 className="font-heading text-2xl font-semibold text-[#2D2424] mb-6">
                  Follow Along
                </h2>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/chloe_eats_dfw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl text-center font-medium hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@chloe_yun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white py-3 px-4 rounded-xl text-center font-medium hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
