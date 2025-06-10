
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, Target, Zap, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

interface PredictionData {
  month: string;
  revenue: number;
  churn: number;
  acquisition: number;
  confidence: number;
}

interface ROIMetrics {
  campaign: string;
  investment: number;
  revenue: number;
  roi: number;
  segment: string;
}

const mockPredictions: PredictionData[] = [
  { month: 'Jan', revenue: 2100000, churn: 12, acquisition: 150, confidence: 94 },
  { month: 'Feb', revenue: 2350000, churn: 10, acquisition: 180, confidence: 91 },
  { month: 'Mar', revenue: 2580000, churn: 8, acquisition: 220, confidence: 89 },
  { month: 'Apr', revenue: 2750000, churn: 7, acquisition: 250, confidence: 92 },
  { month: 'May', revenue: 2920000, churn: 6, acquisition: 280, confidence: 95 },
  { month: 'Jun', revenue: 3100000, churn: 5, acquisition: 320, confidence: 93 }
];

const mockROIData: ROIMetrics[] = [
  { campaign: 'VIP Retention', investment: 50000, revenue: 180000, roi: 260, segment: 'High-Value' },
  { campaign: 'Price Promotions', investment: 75000, revenue: 220000, roi: 193, segment: 'Price-Conscious' },
  { campaign: 'Onboarding Program', investment: 30000, revenue: 95000, roi: 217, segment: 'Emerging' },
  { campaign: 'Win-Back Campaign', investment: 40000, revenue: 120000, roi: 200, segment: 'At-Risk' }
];

const EnhancedAnalyticsDashboard = () => {
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 1247,
    conversionRate: 3.8,
    avgSessionTime: 285,
    revenueToday: 47580
  });

  const [aiProcessing, setAiProcessing] = useState(false);

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.1),
        avgSessionTime: Math.max(0, prev.avgSessionTime + Math.floor(Math.random() * 20 - 10)),
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 500)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const runAdvancedAnalysis = () => {
    setAiProcessing(true);
    setTimeout(() => setAiProcessing(false), 4000);
  };

  const totalROI = mockROIData.reduce((sum, item) => sum + item.roi, 0) / mockROIData.length;

  return (
    <div className="space-y-6">
      {/* Real-time Performance Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            Enhanced Analytics Dashboard
            <Badge className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced ML-powered insights with predictive analytics and ROI optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{liveMetrics.activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{liveMetrics.conversionRate.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{Math.floor(liveMetrics.avgSessionTime / 60)}m {liveMetrics.avgSessionTime % 60}s</p>
              <p className="text-sm text-muted-foreground">Avg Session</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">${liveMetrics.revenueToday.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Revenue Today</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="advanced">Advanced ML</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Revenue Prediction Model</CardTitle>
                <CardDescription>6-month revenue forecast with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockPredictions}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'revenue' ? `$${Number(value).toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Confidence'
                      ]} />
                      <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                      <Line type="monotone" dataKey="confidence" stroke="#10B981" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Churn Risk Forecast</CardTitle>
                <CardDescription>Predicted churn rates by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPredictions}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Churn rate trending downward - retention strategies working effectively
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Campaign ROI Performance</CardTitle>
                <CardDescription>Return on investment by campaign type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockROIData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="campaign" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                      <Bar dataKey="roi" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Investment Distribution</CardTitle>
                <CardDescription>Budget allocation across segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{totalROI.toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">Average ROI</p>
                  </div>
                  
                  {mockROIData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.campaign}</p>
                        <p className="text-sm text-muted-foreground">{item.segment} Segment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{item.roi}%</p>
                        <p className="text-sm text-muted-foreground">${item.investment.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                AI-Powered Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">High Impact Opportunities</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Revenue Optimization</span>
                        <Badge className="bg-green-600">+15% Revenue</Badge>
                      </div>
                      <p className="text-sm text-green-700">
                        Implement dynamic pricing for High-Value Enthusiasts segment
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Retention Boost</span>
                        <Badge variant="secondary">-25% Churn</Badge>
                      </div>
                      <p className="text-sm text-blue-700">
                        Deploy AI-generated personalized retention campaigns
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600">Quick Wins</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Automation Setup</span>
                        <Badge variant="outline">2 hours</Badge>
                      </div>
                      <p className="text-sm text-orange-700">
                        Set up automated email sequences for Emerging Explorers
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Model Enhancement</span>
                        <Badge variant="outline">1 day</Badge>
                      </div>
                      <p className="text-sm text-purple-700">
                        Retrain segmentation models with latest behavioral data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Advanced Machine Learning Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/60 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">97.3%</p>
                    <p className="text-sm text-muted-foreground">Model Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">0.23s</p>
                    <p className="text-sm text-muted-foreground">Inference Time</p>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">5.2M</p>
                    <p className="text-sm text-muted-foreground">Training Samples</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Active ML Models</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">Neural Network Segmentation</p>
                        <p className="text-sm text-muted-foreground">Deep learning customer clustering</p>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">XGBoost Churn Predictor</p>
                        <p className="text-sm text-muted-foreground">Gradient boosting risk assessment</p>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">LSTM Revenue Forecaster</p>
                        <p className="text-sm text-muted-foreground">Time series revenue prediction</p>
                      </div>
                      <Badge variant="secondary">Training</Badge>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={runAdvancedAnalysis}
                  disabled={aiProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {aiProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Running Advanced Analysis...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Run Advanced ML Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;
