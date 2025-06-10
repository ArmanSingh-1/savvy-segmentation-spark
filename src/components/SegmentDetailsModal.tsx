
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, TrendingUp, AlertTriangle, Brain, Target, Download, Share2 } from 'lucide-react';

interface Segment {
  id: number;
  name: string;
  description: string;
  size: number;
  percentage: number;
  avgValue: number;
  churnRisk: number;
  growth: number;
  color: string;
  characteristics: string[];
  aiInsight: string;
}

interface SegmentDetailsModalProps {
  segment: Segment | null;
  isOpen: boolean;
  onClose: () => void;
}

const SegmentDetailsModal = ({ segment, isOpen, onClose }: SegmentDetailsModalProps) => {
  if (!segment) return null;

  // Mock detailed data for the segment
  const ageDistribution = [
    { age: '18-25', count: Math.round(segment.size * 0.15) },
    { age: '26-35', count: Math.round(segment.size * 0.35) },
    { age: '36-45', count: Math.round(segment.size * 0.30) },
    { age: '46-55', count: Math.round(segment.size * 0.15) },
    { age: '55+', count: Math.round(segment.size * 0.05) }
  ];

  const purchaseHistory = [
    { month: 'Jan', purchases: Math.round(segment.size * 0.4), revenue: Math.round(segment.avgValue * segment.size * 0.4) },
    { month: 'Feb', purchases: Math.round(segment.size * 0.3), revenue: Math.round(segment.avgValue * segment.size * 0.3) },
    { month: 'Mar', purchases: Math.round(segment.size * 0.45), revenue: Math.round(segment.avgValue * segment.size * 0.45) },
    { month: 'Apr', purchases: Math.round(segment.size * 0.35), revenue: Math.round(segment.avgValue * segment.size * 0.35) },
    { month: 'May', purchases: Math.round(segment.size * 0.5), revenue: Math.round(segment.avgValue * segment.size * 0.5) },
    { month: 'Jun', purchases: Math.round(segment.size * 0.4), revenue: Math.round(segment.avgValue * segment.size * 0.4) }
  ];

  const channelPreference = [
    { channel: 'Email', percentage: 45, color: '#8B5CF6' },
    { channel: 'Social Media', percentage: 30, color: '#06B6D4' },
    { channel: 'Direct', percentage: 15, color: '#10B981' },
    { channel: 'Referral', percentage: 10, color: '#F59E0B' }
  ];

  const productCategories = [
    { category: 'Electronics', purchases: 45, avgValue: segment.avgValue * 1.2 },
    { category: 'Clothing', purchases: 67, avgValue: segment.avgValue * 0.8 },
    { category: 'Home & Garden', purchases: 23, avgValue: segment.avgValue * 1.5 },
    { category: 'Books', purchases: 34, avgValue: segment.avgValue * 0.4 },
    { category: 'Sports', purchases: 28, avgValue: segment.avgValue * 1.1 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: segment.color }} />
            <div>
              <DialogTitle className="text-xl">{segment.name}</DialogTitle>
              <DialogDescription>{segment.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{segment.size}</div>
                <p className="text-xs text-muted-foreground">{segment.percentage}% of total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Avg Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${segment.avgValue}</div>
                <p className="text-xs text-muted-foreground">per customer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Growth Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {segment.growth > 0 ? '+' : ''}{segment.growth}%
                </div>
                <p className="text-xs text-muted-foreground">last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Churn Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${segment.churnRisk > 50 ? 'text-red-600' : segment.churnRisk > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {segment.churnRisk}%
                </div>
                <Progress value={segment.churnRisk} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* AI Insight */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">{segment.aiInsight}</p>
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <Tabs defaultValue="demographics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="recommendations">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="demographics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Customer age breakdown for this segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill={segment.color} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>Monthly purchase patterns and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={purchaseHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="purchases" fill={segment.color} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Category Preferences</CardTitle>
                  <CardDescription>Most popular product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {productCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{category.category}</span>
                          <p className="text-sm text-muted-foreground">{category.purchases} purchases</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">${category.avgValue.toFixed(0)}</span>
                          <p className="text-sm text-muted-foreground">avg value</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Channel Preferences</CardTitle>
                  <CardDescription>Preferred channels for marketing communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelPreference}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ channel, percentage }) => `${channel}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                        >
                          {channelPreference.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Characteristics</CardTitle>
                  <CardDescription>Defining traits of this customer segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {segment.characteristics.map((char, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommended Actions
                  </CardTitle>
                  <CardDescription>AI-suggested strategies for this segment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">High Priority</h4>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Launch targeted retention campaign</li>
                        <li>• Personalize product recommendations</li>
                        <li>• Implement loyalty program</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Medium Priority</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• A/B test email campaign frequency</li>
                        <li>• Optimize checkout process</li>
                        <li>• Create segment-specific content</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Long-term Strategy</h4>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>• Develop premium tier offerings</li>
                        <li>• Create community features</li>
                        <li>• Implement referral program</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1">
              <Target className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Insights
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SegmentDetailsModal;
