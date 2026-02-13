import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-neutralDark mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out a form, book an appointment, or communicate with us. This may include your name, email address, phone number, and event details.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your booking. We may also use your information to send you technical notices, updates, security alerts, and support messages.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">3. SMS Communications</h2>
            <p>By consenting to SMS marketing and notifications, you agree to receive recurring automated marketing messages and appointment reminders at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Message and data rates may apply.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">4. Sharing of Information</h2>
            <p>We do not share your personal information with third parties except as described in this policy. We may share your information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">5. Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at hello@evoletglam.com.</p>
          </section>

          <div className="pt-8 text-sm text-gray-400">
            Last Updated: October 26, 2023
          </div>
        </div>
      </div>
    </div>
  );
};