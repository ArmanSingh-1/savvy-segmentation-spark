
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, Brain, Target, AlertTriangle, Zap } from 'lucide-react';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import SegmentInsights from '@/components/SegmentInsights';
import PredictiveAnalytics from '@/components/PredictiveAnalytics';
import RealTimeMetrics from '@/components/RealTimeMetrics';
import SegmentDetailsModal from '@/components/SegmentDetailsModal';

// Mock data for demonstration
const mockSegments = [
  {
    id: 1,
    name: "High-Value Enthusiasts",
    description: "Premium customers with high engagement and spending",
    size: 245,
    percentage: 15.2,
    avgValue: 2840,
    churnRisk: 8,
    growth: 12.5,
    color: "#8B5CF6",
    characteristics: ["High spending", "Frequent purchases", "Premium product preference"],
    aiInsight: "This segment shows strong loyalty and premium product affinity. Recommended for VIP programs and exclusive offers."
  },
  {
    id: 2,
    name: "Price-Conscious Regulars",
    description: "Frequent buyers who are sensitive to pricing",
    size: 512,
    percentage: 31.8,
    avgValue: 680,
    churnRisk: 25,
    growth: 8.2,
    color: "#06B6D4",
    characteristics: ["Price sensitive", "Discount seekers", "Regular purchase pattern"],
    aiInsight: "This segment responds well to promotions and loyalty rewards. Focus on value-based marketing."
  },
  {
    id: 3,
    name: "Emerging Explorers",
    description: "New customers with high growth potential",
    size: 189,
    percentage: 11.7,
    avgValue: 420,
    churnRisk: 45,
    growth: 34.6,
    color: "#10B981",
    characteristics: ["New customers", "Experimental behavior", "Digital-first"],
    aiInsight: "Fast-growing segment with high potential. Implement onboarding campaigns to reduce churn risk."
  },
  {
    id: 4,
    name: "At-Risk Churners",
    description: "Declining engagement, high churn probability",
    size: 98,
    percentage: 6.1,
    avgValue: 320,
    churnRisk: 78,
    growth: -15.3,
    color: "#EF4444",
    characteristics: ["Declining activity", "Reduced spending", "Long intervals"],
    aiInsight: "Critical segment requiring immediate retention efforts. Deploy win-back campaigns urgently."
  },
  {
    id: 5,
    name: "Seasonal Shoppers",
    description: "Event-driven purchasing behavior",
    size: 567,
    percentage: 35.2,
    avgValue: 890,
    churnRisk: 35,
    growth: 5.8,
    color: "#F59E0B",
    characteristics: ["Seasonal patterns", "Event-driven", "Moderate value"],
    aiInsight: "Predictable purchasing patterns. Optimize seasonal campaigns and inventory planning."
  }
];

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [totalCustomers] = useState(1611);
  const [segmentationAccuracy] = useState(94.7);

  const runSegmentation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Customer Segmentation
                </h1>
                <p className="text-sm text-muted-foreground">Intelligent customer insights powered by AI</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Zap className="h-3 w-3 mr-1" />
                Real-time
              </Badge>
              <Button onClick={runSegmentation} disabled={isAnalyzing} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Re-analyze Segments
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
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
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSegments.length}</div>
              <p className="text-xs text-muted-foreground">AI-discovered segments</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Segmentation Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{segmentationAccuracy}%</div>
              <Progress value={segmentationAccuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Churn Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">98</div>
              <p className="text-xs text-muted-foreground">Customers need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="segments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="segments">Customer Segments</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          <TabsContent value="segments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomerSegmentChart segments={mockSegments} />
              
              <div className="space-y-4">
                <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle>Segment Overview</CardTitle>
                    <CardDescription>Click on any segment for detailed analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockSegments.map((segment) => (
                      <div
                        key={segment.id}
                        className="p-4 rounded-lg border border-white/20 bg-white/30 hover:bg-white/50 cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedSegment(segment)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            />
                            <h3 className="font-semibold">{segment.name}</h3>
                          </div>
                          <Badge variant={segment.churnRisk > 50 ? "destructive" : segment.churnRisk > 30 ? "secondary" : "default"}>
                            {segment.churnRisk}% risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{segment.description}</p>
                        <div className="flex justify-between text-sm">
                          <span>{segment.size} customers ({segment.percentage}%)</span>
                          <span className="font-medium">${segment.avgValue} avg value</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <SegmentInsights segments={mockSegments} />
          </TabsContent>

          <TabsContent value="predictions">
            <PredictiveAnalytics segments={mockSegments} />
          </TabsContent>

          <TabsContent value="realtime">
            <RealTimeMetrics />
          </TabsContent>
        </Tabs>
      </div>

      {selectedSegment && (
        <SegmentDetailsModal
          segment={selectedSegment}
          isOpen={!!selectedSegment}
          onClose={() => setSelectedSegment(null)}
        />
      )}
    </div>
  );
};

export default Index;
