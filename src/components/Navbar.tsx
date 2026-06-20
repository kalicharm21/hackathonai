import React, { useState } from "react";
import { Sparkles, HelpCircle, Menu, X, ShieldCheck } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  authenticated: boolean;
  onLoginClick: () => void;
  userEmail: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  authenticated,
  onLoginClick,
  userEmail,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { id: "landing", label: "Home" },
    { id: "solutions", label: "Solutions" },
    { id: "trust", label: "Trust Engine" },
    { id: "twin", label: "Digital Twin" },
    { id: "dashboard", label: "Dashboard" },
    { id: "reports", label: "Reports" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#050816]/85 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick("landing")}>
        <div className="w-8 h-8 bg-gradient-to-br from-[#00E5FF] to-[#4F46E5] rounded-lg flex items-center justify-center relative">
          <ShieldCheck className="h-4 w-4 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-lg blur-[2px] -z-10"></div>
        </div>
        <span className="text-lg md:text-xl font-bold tracking-tight text-white font-display">
          Bharat Pulse <span className="text-[#00E5FF]">AI</span>
        </span>
      </div>
 
      {/* Center tabs for Desktop */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            className={`pb-1 text-xs font-semibold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
              activeTab === link.id
                ? "text-[#00E5FF] border-b-2 border-[#00E5FF] font-bold"
                : "text-gray-400 hover:text-white border-b-2 border-transparent"
            }`}
            id={`nav-link-${link.id}`}
          >
            {link.label}
          </button>
        ))}
      </div>
 
      {/* Auth action / Hamburger */}
      <div className="flex items-center space-x-3">
        {authenticated ? (
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">{userEmail}</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#00E5FF] flex items-center justify-center text-xs text-white border border-white/10 font-bold uppercase">
              {userEmail.charAt(0)}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={onLoginClick} 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer"
              id="nav-login-btn"
            >
              Login
            </button>
            <button 
              onClick={onLoginClick} 
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-white rounded-full hover:shadow-lg hover:shadow-[#00E5FF]/20 transition-all cursor-pointer border border-[#00E5FF]/30 font-mono tracking-wide uppercase text-xs"
              id="nav-demo-btn"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 px-2.5 py-2 hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white lg:hidden cursor-pointer"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#050816]/95 border-b border-white/10 backdrop-blur-lg flex flex-col p-6 space-y-4 lg:hidden z-50 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2 text-sm font-semibold tracking-wider uppercase transition-colors ${
                  activeTab === link.id ? "text-[#00E5FF]" : "text-gray-400 hover:text-white"
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          {!authenticated && (
            <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
              <button 
                onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Login
              </button>
              <button 
                onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs font-semibold bg-[#00E5FF] text-[#050816] rounded-full hover:bg-white transition-colors uppercase font-mono tracking-wider"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
