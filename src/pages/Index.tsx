
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign, AlertTriangle, Upload, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import DashboardNav from '@/components/DashboardNav';

// Mock data for demonstration
const mockSegments = [
  {
    id: 1,
    name: "High-Value Customers",
    description: "Premium customers with high engagement",
    size: 245,
    percentage: 15.2,
    avgValue: 2840,
    churnRisk: 8,
    growth: 12.5,
    color: "#8B5CF6",
    characteristics: ["High spending", "Frequent purchases"],
    aiInsight: "Strong loyalty segment for VIP programs."
  },
  {
    id: 2,
    name: "Budget Conscious",
    description: "Price-sensitive regular buyers",
    size: 512,
    percentage: 31.8,
    avgValue: 680,
    churnRisk: 25,
    growth: 8.2,
    color: "#06B6D4",
    characteristics: ["Price sensitive", "Discount seekers"],
    aiInsight: "Responds well to promotions and loyalty rewards."
  },
  {
    id: 3,
    name: "New Customers",
    description: "Recent customers with growth potential",
    size: 189,
    percentage: 11.7,
    avgValue: 420,
    churnRisk: 45,
    growth: 34.6,
    color: "#10B981",
    characteristics: ["New customers", "Experimental"],
    aiInsight: "High potential segment requiring onboarding focus."
  }
];

const Index = () => {
  const [totalCustomers] = useState(1611);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardNav />

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">Get insights from your data with AI-powered analytics</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload New Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">Import CSV files to analyze your customer data</p>
                  <Link to="/upload">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV
                    </Button>
                  </Link>
                </div>
                <Upload className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">Explore detailed customer segments and insights</p>
                  <Link to="/analytics">
                    <Button variant="outline">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </div>
                <BarChart className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Segments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSegments.length}</div>
              <p className="text-xs text-muted-foreground">Customer segments identified</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Customer Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$1,247</div>
              <p className="text-xs text-muted-foreground">Across all segments</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">98</div>
              <p className="text-xs text-muted-foreground">Customers at risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerSegmentChart segments={mockSegments} />
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest data processing and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                <div>
                  <p className="font-medium">Customer segmentation completed</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="default">Success</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                <div>
                  <p className="font-medium">New CSV file uploaded</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                <Badge variant="secondary">Processing</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                <div>
                  <p className="font-medium">AI insights generated</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
                <Badge variant="default">Complete</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
