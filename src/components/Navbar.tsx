
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scrolling for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" fill="white" />
          </div>
          <span className="font-display text-xl tracking-tight">KreativAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/templates' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Templates
          </Link>
          <Link 
            to="/pricing" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/pricing' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="h-9">
            Sign In
          </Button>
          <Link to="/create">
            <Button size="sm" className="h-9 px-4 group">
              Start Creating
              <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <nav className="container mx-auto px-6 py-8 flex flex-col space-y-6">
          <Link 
            to="/" 
            className={`text-xl font-medium transition-colors ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`text-xl font-medium transition-colors ${
              location.pathname === '/templates' ? 'text-primary' : 'text-foreground'
            }`}
          >
            Templates
          </Link>
          <Link 
            to="/pricing" 
            className={`text-xl font-medium transition-colors ${
              location.pathname === '/pricing' ? 'text-primary' : 'text-foreground'
            }`}
          >
            Pricing
          </Link>
          <div className="pt-6 flex flex-col space-y-4">
            <Button variant="outline" size="lg" className="w-full">
              Sign In
            </Button>
            <Link to="/create" className="w-full">
              <Button size="lg" className="w-full">
                Start Creating
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
