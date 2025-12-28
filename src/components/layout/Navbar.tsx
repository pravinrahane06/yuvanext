import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.about"),
      href: "/about",
      submenu: [
        { label: t("nav.aboutUs"), href: "/about" },
        { label: t("nav.visionMission"), href: "/vision-mission" },
        { label: t("nav.objectives"), href: "/objectives" },
      ],
    },
    { label: t("nav.programs"), href: "/programs" },
    { label: t("nav.activities"), href: "/activities" },
    { label: t("nav.getInvolved"), href: "/get-involved" },
    { label: t("nav.transparency"), href: "/transparency" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-background shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="YUVANEXT Foundation Logo" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.submenu ? (
                  <>
                    <button
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
                        isActive(link.href)
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-card rounded-lg shadow-lg border p-2 min-w-[180px]">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className={cn(
                              "block px-4 py-2 rounded-md text-sm transition-colors",
                              isActive(sub.href)
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button + Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button asChild variant="outline" size="sm">
              <Link to="/donate">{t("nav.donate")}</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/get-involved">{t("nav.joinUs")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 bg-background",
            isOpen ? "max-h-[80vh] pb-6" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-4 border-t border-border">
            {/* Language Switcher for Mobile */}
            <div className="px-4 pb-4">
              <LanguageSwitcher />
            </div>
            
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === link.label ? null : link.label)
                      }
                      className={cn(
                        "w-full px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between",
                        isActive(link.href)
                          ? "text-primary bg-primary/5"
                          : "text-foreground/80"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openSubmenu === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        openSubmenu === link.label ? "max-h-40" : "max-h-0"
                      )}
                    >
                      <div className="pl-4 space-y-1 py-2">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className={cn(
                              "block px-4 py-2 rounded-md text-sm transition-colors",
                              isActive(sub.href)
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/70 hover:text-primary"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-4 px-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/donate">{t("nav.donate")}</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/get-involved">{t("nav.joinUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
