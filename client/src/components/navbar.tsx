import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export function Navbar({ cartItemCount, onCartClick, onAuthClick, isAuthenticated }: NavbarProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/rewards", label: "Rewards" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent">
              Spice Palace
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce-subtle"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            {isAuthenticated ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" data-testid="button-profile">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button onClick={onAuthClick} variant="default" data-testid="button-login">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      className={`text-lg font-medium transition-colors hover-elevate px-4 py-2 rounded-md w-full text-left ${
                        isActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
                <div className="flex items-center gap-3 mt-4 px-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onCartClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 relative"
                    data-testid="button-mobile-cart"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <Badge className="ml-2" variant="default">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                  {isAuthenticated ? (
                    <Link href="/profile">
                      <Button
                        variant="outline"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1"
                        data-testid="button-mobile-profile"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        onAuthClick();
                        setMobileMenuOpen(false);
                      }}
                      variant="default"
                      className="flex-1"
                      data-testid="button-mobile-login"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
