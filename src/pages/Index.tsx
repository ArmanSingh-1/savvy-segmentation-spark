
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, DollarSign, AlertTriangle, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import DashboardNav from '@/components/DashboardNav';
import { useAuth } from '@/hooks/useAuth';

// Simple mock data
const mockSegments = [
  {
    id: 1,
    name: "High-Value Customers",
    description: "Premium customers",
    size: 245,
    percentage: 30,
    avgValue: 2840,
    churnRisk: 8,
    growth: 12.5,
    color: "#8B5CF6",
    characteristics: ["High spending"],
    aiInsight: "Strong loyalty segment."
  },
  {
    id: 2,
    name: "Regular Customers",
    description: "Standard customers",
    size: 512,
    percentage: 50,
    avgValue: 680,
    churnRisk: 25,
    growth: 8.2,
    color: "#06B6D4",
    characteristics: ["Regular buyers"],
    aiInsight: "Core customer base."
  },
  {
    id: 3,
    name: "New Customers",
    description: "Recent customers",
    size: 189,
    percentage: 20,
    avgValue: 420,
    churnRisk: 45,
    growth: 34.6,
    color: "#10B981",
    characteristics: ["New customers"],
    aiInsight: "Growth potential."
  }
];

const Index = () => {
  const [totalCustomers] = useState(946);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardNav />

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.firstName}!
          </h2>
          <p className="text-gray-600">Upload CSV files to analyze your data</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload Your Data</h3>
                <p className="text-sm text-muted-foreground mb-4">Import CSV files to start analyzing</p>
                <Link to="/upload">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV File
                  </Button>
                </Link>
              </div>
              <Upload className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Active customers</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Segments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSegments.length}</div>
              <p className="text-xs text-muted-foreground">Customer groups</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$1,247</div>
              <p className="text-xs text-muted-foreground">Per customer</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">42</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <CustomerSegmentChart segments={mockSegments} />
      </div>
    </div>
  );
};

export default Index;
