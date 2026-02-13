import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-neutralDark mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using our services at Evolet Glam, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">2. Services</h2>
            <p>Evolet Glam provides luxury proposal planning and design services. We reserve the right to refuse service to anyone for any reason at any time. We reserve the right to modify or discontinue any service without notice at any time.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">3. Bookings and Payments</h2>
            <p>A deposit is required to secure your date and time. Remaining balances are due prior to the event date as specified in your invoice. Prices for our products and services are subject to change without notice.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">4. Cancellations and Refunds</h2>
            <p>Cancellations made 30 days or more prior to the event date may be eligible for a partial refund or credit towards a future date, subject to our discretion and any costs already incurred. Cancellations made less than 30 days prior to the event are generally non-refundable.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">5. Liability</h2>
            <p>Evolet Glam is not liable for any injury, loss, claim, damage, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any service or any products procured using the service.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-neutralDark mb-3">6. Contact Information</h2>
            <p>Questions about the Terms of Service should be sent to us at hello@evoletglam.com.</p>
          </section>
          
          <div className="pt-8 text-sm text-gray-400">
            Last Updated: October 26, 2023
          </div>
        </div>
      </div>
    </div>
  );
};