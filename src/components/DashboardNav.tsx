
import { NavLink } from 'react-router-dom';
import { Home, Upload, BarChart, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardNav = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/upload', icon: Upload, label: 'Upload CSV' },
    { to: '/analytics', icon: BarChart, label: 'Analytics' },
    { to: '/data', icon: Database, label: 'Data Management' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data Analytics Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Analyze your data with AI-powered insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {({ isActive }) => (
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    size="sm"
                    className={isActive ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
