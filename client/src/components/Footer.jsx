import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E2E] text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">LMS App</h2>
            <p className="mt-3 text-gray-400 text-sm">
              Empowering students with modern learning solutions.  
              Learn anywhere, anytime with our LMS platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="/courses" className="hover:text-blue-400 transition">Courses</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="hover:text-blue-400 transition">Help Center</a></li>
              <li><a href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500 transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-sky-400 transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-pink-500 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LMS App. All rights reserved.  
            Built with ❤️ by <span className="text-blue-400 font-medium">Fahad Ansari</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
