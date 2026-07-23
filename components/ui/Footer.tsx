// components/ui/Footer.tsx
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Farmers', href: '/farmers' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'News', href: '/news' },
  ],
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/aviyo-plant-based-nutrition-ltd', icon: FaLinkedin },
    { name: 'TikTok', href: 'https://www.tiktok.com/@aviyo_plant_based', icon: FaTiktok },
    { name: 'Facebook', href: 'https://www.facebook.com/aviyoplantbased', icon: FaFacebook },
    { name: 'Twitter/x', href: 'https://www.x.com/@aviyonutri7wg', icon: FaTwitter },
    { name: 'YouTube', href: 'https://www.youtube.com/@aviyo-nutrition', icon: FaYoutube },
    { name: 'Instagram', href: 'https://www.instagram.com/aviyoplantbased', icon: FaInstagram },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-display font-semibold text-xl text-white">
                Aviyo
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Enzyme-enhanced plant-based nutrition from Uganda's heart. 
              Healthy, affordable, and made with love.
            </p>
            <div className="flex gap-3 mt-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 +256 784 592 947</li>
              <li>✉️ admin@aviyo.online</li>
              <li>📍 Kampala, Uganda</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {currentYear} Aviyo Plant-Based Nutrition Ltd. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with ❤️ in Uganda
          </p>
        </div>
      </div>
    </footer>
  )
}