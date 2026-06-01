import { Github, Linkedin, Twitter, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "<why us>", href: "#why-us" },
  { label: "<services>", href: "#services" },
  { label: "<cases>", href: "#cases" },
  { label: "<tech stack>", href: "#tech-stack" },
  { label: "<careers>", href: "#careers" },
];

const SERVICES_LINKS = [
  "Web Application Development",
  "Mobile App Development",
  "AI & Cloud Solutions",
  "Project Consulting",
  "System Integrations",
];

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#00C48C]"
              >
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              TimeGlobalTech
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-[220px]">
              Delivering world-class software solutions globally. Precision, ambition, and expertise encoded in every project.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00C48C] hover:border-[#00C48C]/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-white/50 hover:text-[#00C48C] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {SERVICES_LINKS.map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:info@timeglobaltech.com"
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-[#00C48C] transition-colors group"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#00C48C]" />
                  info@timeglobaltech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15555550100"
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-[#00C48C] transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#00C48C]" />
                  +1 (555) 555-0100
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#00C48C]" />
                <span>123 Innovation Drive,<br />San Francisco, CA 94105</span>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-4">Our Products</h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">TechFlow Platform</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">DevKit Pro</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider + bottom strip */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} TimeGlobalTech, Inc. — Software Development Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
