// app/(public)/privacy-policy/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aviyo Plant-Based Nutrition',
  description: 'Read Aviyo Plant-Based Nutrition\'s privacy policy to understand how we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container max-w-4xl">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-lg max-w-none">
          <p className="text-gray-600">
            Last updated: May 2026
          </p>

          <h2>1. Introduction</h2>
          <p>
            Aviyo Plant-Based Nutrition Ltd ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when you contact us or register for our services.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, maintain, and improve our products and services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
            <li>Process farmer registrations and partnership inquiries</li>
            <li>Analyze website usage and improve user experience</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist us in operating our website and business</li>
            <li>Law enforcement or regulatory authorities when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            We use cookies to improve your browsing experience. You can control cookie preferences through your browser settings. However, disabling cookies may affect some website functionality.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us:
          </p>
          <ul>
            <li>Email: admin@aviyo.online</li>
            <li>Phone: +256 784 592 947</li>
            <li>Address: Kampala, Uganda</li>
          </ul>
        </div>
      </div>
    </div>
  )
}