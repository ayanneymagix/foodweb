// components/Footer.tsx - Further enhanced version
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleEmailClick = () => {
    window.location.href = "mailto:syntaxsolvers@email.com";
  };

  const handleLinkClick = (link: string) => {
    // You can add navigation logic here for footer links
    console.log(`Navigating to: ${link}`);
  };

  return (
    <footer className="relative bg-primary text-primary-foreground py-12 lg:py-16 mt-auto border-t border-primary-foreground/10">
      {/* Enhanced decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ring/70 to-transparent opacity-60" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center md:text-left">
          {/* Faculty Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 tracking-wide bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Faculty
              </h3>
              <div className="h-0.5 bg-ring/60 rounded-full w-full" />
            </div>
            <p className="text-primary-foreground/90 text-base lg:text-lg font-medium hover:text-primary-foreground transition-colors duration-300">
              Naga Lakshmi
            </p>
            <p className="text-primary-foreground/70 text-sm">
              Project Guide & Mentor
            </p>
          </div>

          {/* Team Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 tracking-wide bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Team
              </h3>
              <div className="h-0.5 bg-ring/60 rounded-full w-full" />
            </div>
            <p className="text-primary-foreground/90 text-base lg:text-lg font-bold tracking-wider hover:scale-105 transition-transform duration-300">
              SyntaxSolvers
            </p>
            <p className="text-primary-foreground/70 text-sm">
              Innovation & Excellence
            </p>
          </div>

          {/* Team Members Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 tracking-wide bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Team Members
              </h3>
              <div className="h-0.5 bg-ring/60 rounded-full w-full" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Sohail', role: 'Full Stack Developer' },
                { name: 'Sameer', role: 'Backend Specialist' },
                { name: 'Waseem', role: 'Frontend Expert' }
              ].map((member, index) => (
                <div key={index} className="group">
                  <p className="text-primary-foreground/90 text-base lg:text-lg font-medium group-hover:text-ring transition-colors duration-300">
                    {member.name}
                  </p>
                  <p className="text-primary-foreground/60 text-xs">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact/Quick Links Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 tracking-wide bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Connect
              </h3>
              <div className="h-0.5 bg-ring/60 rounded-full w-full" />
            </div>
            <div className="space-y-3">
              <p 
                className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-2"
                onClick={handleEmailClick}
              >
                <span>📧</span>
                <span>syntaxsolvers@email.com</span>
              </p>
              <p className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-2">
                <span>🌐</span>
                <span>syntaxsolvers.dev</span>
              </p>
              <p className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-2">
                <span>📍</span>
                <span>LIET</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm font-medium">
              © {currentYear} SyntaxSolvers. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span 
                className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
                onClick={() => handleLinkClick('privacy')}
              >
                Privacy Policy
              </span>
              <span 
                className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
                onClick={() => handleLinkClick('terms')}
              >
                Terms of Service
              </span>
              <span 
                className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
                onClick={() => handleLinkClick('contact')}
              >
                Contact
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;