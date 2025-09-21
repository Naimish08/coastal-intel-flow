import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Waves, 
  AlertTriangle, 
  MapPin, 
  BarChart3, 
  Users, 
  Bell,
  Shield,
  Home
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Report Hazard', href: '/report', icon: AlertTriangle },
    { label: 'Live Map', href: '/map', icon: MapPin },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Community', href: '/community', icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <Waves className="h-8 w-8 text-primary animate-wave" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground">OceanGuard</h1>
            <p className="text-xs text-muted-foreground">Hazard Reporting</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-2 transition-colors ${
                isActive(item.href) 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-4">
            <Button size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-card">
            <div className="flex flex-col gap-6 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-lg font-medium transition-colors ${
                    isActive(item.href) 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <hr className="border-border" />
              <Button className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                View Alerts (3)
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;