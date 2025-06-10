
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Zap, Target, DollarSign, Users, Send, Clock, Star } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'campaign' | 'pricing' | 'product' | 'retention' | 'acquisition';
  title: string;
  description: string;
  segment: string;
  priority: 'high' | 'medium' | 'low';
  impact: {
    revenue: number;
    customers: number;
    confidence: number;
  };
  implementation: string[];
  timeline: string;
  roi: number;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'retention',
    title: 'VIP Retention Campaign',
    description: 'Launch exclusive early access program for High-Value Enthusiasts showing churn signals',
    segment: 'High-Value Enthusiasts',
    priority: 'high',
    impact: {
      revenue: 125000,
      customers: 89,
      confidence: 94
    },
    implementation: [
      'Create VIP early access portal',
      'Design exclusive product previews',
      'Set up personalized concierge service',
      'Launch targeted email sequence'
    ],
    timeline: '2 weeks',
    roi: 340
  },
  {
    id: '2',
    type: 'pricing',
    title: 'Dynamic Bundle Pricing',
    description: 'Implement AI-powered bundle recommendations for Price-Conscious Regulars',
    segment: 'Price-Conscious Regulars',
    priority: 'high',
    impact: {
      revenue: 89000,
      customers: 267,
      confidence: 87
    },
    implementation: [
      'Deploy recommendation algorithm',
      'Create dynamic pricing engine',
      'A/B test bundle configurations',
      'Monitor conversion metrics'
    ],
    timeline: '3 weeks',
    roi: 280
  },
  {
    id: '3',
    type: 'acquisition',
    title: 'Social Proof Campaign',
    description: 'Leverage customer reviews and UGC to attract Emerging Explorers',
    segment: 'Emerging Explorers',
    priority: 'medium',
    impact: {
      revenue: 56000,
      customers: 134,
      confidence: 78
    },
    implementation: [
      'Collect and curate customer content',
      'Create social media campaign',
      'Implement review widgets',
      'Launch influencer partnerships'
    ],
    timeline: '4 weeks',
    roi: 210
  }
];

const SmartRecommendationEngine = () => {
  const [implementedRecs, setImplementedRecs] = useState<Set<string>>(new Set());

  const handleImplement = (recId: string) => {
    setImplementedRecs(prev => new Set([...prev, recId]));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Send className="h-4 w-4" />;
      case 'pricing': return <DollarSign className="h-4 w-4" />;
      case 'product': return <Star className="h-4 w-4" />;
      case 'retention': return <Users className="h-4 w-4" />;
      case 'acquisition': return <Target className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const totalPotentialRevenue = mockRecommendations.reduce((sum, rec) => sum + rec.impact.revenue, 0);
  const averageROI = mockRecommendations.reduce((sum, rec) => sum + rec.roi, 0) / mockRecommendations.length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            AI-Powered Smart Recommendations
          </CardTitle>
          <CardDescription>Intelligent suggestions to optimize customer segments and drive growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">${(totalPotentialRevenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Potential Revenue Impact</p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{averageROI.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Average ROI</p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{mockRecommendations.length}</p>
              <p className="text-sm text-muted-foreground">Active Recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
          <TabsTrigger value="implemented">Implemented</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockRecommendations.map((rec) => (
            <Card key={rec.id} className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <Badge variant={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                        <Badge variant="outline">{rec.segment}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{rec.roi}% ROI</p>
                    <p className="text-xs text-muted-foreground">Expected return</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">${(rec.impact.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Revenue Impact</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{rec.impact.customers}</p>
                    <p className="text-xs text-muted-foreground">Customers Affected</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">{rec.impact.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence Level</p>
                    <Progress value={rec.impact.confidence} className="h-1 mt-1" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Implementation Steps:</h4>
                    <ul className="space-y-1">
                      {rec.implementation.map((step, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Timeline: {rec.timeline}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleImplement(rec.id)}
                        disabled={implementedRecs.has(rec.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        {implementedRecs.has(rec.id) ? (
                          <>
                            <Zap className="h-4 w-4 mr-1" />
                            Implemented
                          </>
                        ) : (
                          'Implement Now'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="high">
          {mockRecommendations
            .filter(rec => rec.priority === 'high')
            .map(rec => (
              <Card key={rec.id} className="bg-white/70 backdrop-blur-sm border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">URGENT</Badge>
                    <h3 className="font-semibold">{rec.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-bold text-green-600">${(rec.impact.revenue / 1000).toFixed(0)}K Revenue</p>
                      <p className="text-sm text-muted-foreground">{rec.impact.customers} customers</p>
                    </div>
                    <div className="text-right">
                      <Button 
                        className="bg-gradient-to-r from-red-600 to-orange-600"
                        onClick={() => handleImplement(rec.id)}
                        disabled={implementedRecs.has(rec.id)}
                      >
                        Implement Immediately
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="implemented">
          {Array.from(implementedRecs).length === 0 ? (
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">No recommendations implemented yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockRecommendations
                .filter(rec => implementedRecs.has(rec.id))
                .map(rec => (
                  <Card key={rec.id} className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600">IMPLEMENTED</Badge>
                        <h3 className="font-semibold">{rec.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Implementation started. Monitoring results...
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartRecommendationEngine;
