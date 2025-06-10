
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Brain, Zap, Target, DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';

interface LifetimeValueData {
  segment: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: number;
}

interface BehaviorPattern {
  id: string;
  pattern: string;
  frequency: number;
  segments: string[];
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface PricingOptimization {
  segment: string;
  currentPrice: number;
  optimizedPrice: number;
  expectedLift: number;
  confidence: number;
}

const mockLTVData: LifetimeValueData[] = [
  { segment: 'High-Value Enthusiasts', current: 4200, predicted: 5100, confidence: 89, trend: 21.4 },
  { segment: 'Price-Conscious Regulars', current: 1200, predicted: 1350, confidence: 76, trend: 12.5 },
  { segment: 'Emerging Explorers', current: 680, predicted: 920, confidence: 82, trend: 35.3 },
  { segment: 'At-Risk Churners', current: 580, predicted: 320, confidence: 91, trend: -44.8 },
  { segment: 'Seasonal Shoppers', current: 1100, predicted: 1180, confidence: 73, trend: 7.3 }
];

const mockBehaviorPatterns: BehaviorPattern[] = [
  {
    id: '1',
    pattern: 'Weekend Evening Shopping Sprees',
    frequency: 78,
    segments: ['High-Value Enthusiasts', 'Seasonal Shoppers'],
    impact: 'high',
    description: 'Customers tend to make larger purchases between 6-9 PM on weekends'
  },
  {
    id: '2',
    pattern: 'Email-to-Purchase Conversion',
    frequency: 65,
    segments: ['Price-Conscious Regulars'],
    impact: 'medium',
    description: 'Strong correlation between promotional emails and purchases within 48 hours'
  },
  {
    id: '3',
    pattern: 'Mobile-First Discovery',
    frequency: 82,
    segments: ['Emerging Explorers'],
    impact: 'high',
    description: 'New customers predominantly discover products through mobile devices'
  }
];

const mockPricingData: PricingOptimization[] = [
  { segment: 'High-Value Enthusiasts', currentPrice: 299, optimizedPrice: 349, expectedLift: 18, confidence: 87 },
  { segment: 'Price-Conscious Regulars', currentPrice: 99, optimizedPrice: 89, expectedLift: 12, confidence: 92 },
  { segment: 'Emerging Explorers', currentPrice: 149, optimizedPrice: 129, expectedLift: 25, confidence: 79 }
];

const sentimentData = [
  { month: 'Jan', positive: 78, neutral: 15, negative: 7 },
  { month: 'Feb', positive: 82, neutral: 12, negative: 6 },
  { month: 'Mar', positive: 75, neutral: 18, negative: 7 },
  { month: 'Apr', positive: 85, neutral: 10, negative: 5 },
  { month: 'May', positive: 88, neutral: 8, negative: 4 },
  { month: 'Jun', positive: 91, neutral: 6, negative: 3 }
];

const AdvancedAnalyticsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ltv" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="ltv">Lifetime Value</TabsTrigger>
          <TabsTrigger value="patterns">Behavior Patterns</TabsTrigger>
          <TabsTrigger value="pricing">Smart Pricing</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment AI</TabsTrigger>
          <TabsTrigger value="predictions">Neural Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="ltv" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Predictive Customer Lifetime Value
              </CardTitle>
              <CardDescription>AI-powered LTV predictions with trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {mockLTVData.map((item) => (
                      <div key={item.segment} className="p-4 border border-white/20 rounded-lg bg-white/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{item.segment}</h4>
                          <Badge variant={item.trend > 0 ? 'default' : 'destructive'}>
                            {item.trend > 0 ? '+' : ''}{item.trend}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Current LTV</p>
                            <p className="text-lg font-bold">${item.current}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Predicted LTV</p>
                            <p className="text-lg font-bold text-blue-600">${item.predicted}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Confidence</span>
                            <span>{item.confidence}%</span>
                          </div>
                          <Progress value={item.confidence} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockLTVData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="segment" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="current" fill="#94A3B8" name="Current LTV" />
                        <Bar dataKey="predicted" fill="#3B82F6" name="Predicted LTV" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI-Detected Behavior Patterns
              </CardTitle>
              <CardDescription>Machine learning insights into customer behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBehaviorPatterns.map((pattern) => (
                <div key={pattern.id} className="p-4 border border-white/20 rounded-lg bg-white/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {pattern.pattern}
                        <Badge className={getImpactColor(pattern.impact)}>
                          {pattern.impact} impact
                        </Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{pattern.frequency}%</p>
                      <p className="text-xs text-muted-foreground">frequency</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pattern.segments.map((segment) => (
                      <Badge key={segment} variant="outline">{segment}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Dynamic Pricing Optimization
              </CardTitle>
              <CardDescription>AI-recommended pricing strategies by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPricingData.map((item) => (
                  <div key={item.segment} className="p-4 border border-white/20 rounded-lg bg-white/30">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h4 className="font-semibold">{item.segment}</h4>
                        <p className="text-sm text-muted-foreground">Pricing optimization</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-600">${item.currentPrice}</p>
                        <p className="text-xs text-muted-foreground">Current</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">${item.optimizedPrice}</p>
                        <p className="text-xs text-muted-foreground">Optimized</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">+{item.expectedLift}%</p>
                        <p className="text-xs text-muted-foreground">Expected lift</p>
                        <Progress value={item.confidence} className="h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Customer Sentiment Analysis
              </CardTitle>
              <CardDescription>Real-time sentiment tracking across all touchpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="positive" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="neutral" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Neural Network Predictions
              </CardTitle>
              <CardDescription>Advanced ML predictions for business outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <Badge variant="secondary">94% confidence</Badge>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">+18.5%</p>
                  <p className="text-sm text-blue-700">Revenue growth next quarter</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <Badge variant="secondary">89% confidence</Badge>
                  </div>
                  <p className="text-2xl font-bold text-green-600">156</p>
                  <p className="text-sm text-green-700">New high-value customers</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <Badge variant="secondary">91% confidence</Badge>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">73%</p>
                  <p className="text-sm text-purple-700">Campaign success rate</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <Badge variant="secondary">87% confidence</Badge>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">-12%</p>
                  <p className="text-sm text-orange-700">Churn rate reduction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
