
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, Zap } from 'lucide-react';

interface Segment {
  id: number;
  name: string;
  size: number;
  churnRisk: number;
  growth: number;
  color: string;
}

interface PredictiveAnalyticsProps {
  segments: Segment[];
}

const PredictiveAnalytics = ({ segments }: PredictiveAnalyticsProps) => {
  // Mock predictive data
  const churnPrediction = [
    { month: 'Jan', actual: 12, predicted: 11 },
    { month: 'Feb', actual: 15, predicted: 14 },
    { month: 'Mar', actual: 18, predicted: 17 },
    { month: 'Apr', actual: 14, predicted: 16 },
    { month: 'May', actual: 16, predicted: 15 },
    { month: 'Jun', predicted: 18 },
    { month: 'Jul', predicted: 20 },
    { month: 'Aug', predicted: 17 },
    { month: 'Sep', predicted: 15 },
    { month: 'Oct', predicted: 14 },
    { month: 'Nov', predicted: 16 },
    { month: 'Dec', predicted: 19 }
  ];

  const segmentGrowthForecast = segments.map(segment => ({
    name: segment.name.split(' ')[0],
    current: segment.size,
    predicted3m: Math.round(segment.size * (1 + segment.growth / 100 * 0.25)),
    predicted6m: Math.round(segment.size * (1 + segment.growth / 100 * 0.5)),
    predicted12m: Math.round(segment.size * (1 + segment.growth / 100)),
    color: segment.color
  }));

  const customerLifetimeValue = [
    { segment: 'High-Value', current: 2840, predicted: 3200, confidence: 87 },
    { segment: 'Price-Conscious', current: 680, predicted: 750, confidence: 92 },
    { segment: 'Emerging', current: 420, predicted: 680, confidence: 78 },
    { segment: 'At-Risk', current: 320, predicted: 180, confidence: 94 },
    { segment: 'Seasonal', current: 890, predicted: 950, confidence: 85 }
  ];

  const upcomingEvents = [
    {
      date: '2024-07-15',
      event: 'Summer Sale',
      expectedImpact: 'High',
      affectedSegments: ['Price-Conscious', 'Seasonal'],
      predictedUplift: '+25%'
    },
    {
      date: '2024-08-01',
      event: 'New Product Launch',
      expectedImpact: 'Medium',
      affectedSegments: ['High-Value', 'Emerging'],
      predictedUplift: '+15%'
    },
    {
      date: '2024-09-15',
      event: 'Back-to-School',
      expectedImpact: 'High',
      affectedSegments: ['Seasonal', 'Emerging'],
      predictedUplift: '+30%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Prediction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Growth Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18.5%</div>
            <p className="text-sm text-muted-foreground">Expected customer growth (12m)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Churn Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">156</div>
            <p className="text-sm text-muted-foreground">Customers at risk (next 3m)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$127K</div>
            <p className="text-sm text-muted-foreground">Potential revenue at risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Churn Prediction Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Churn Rate Prediction</CardTitle>
          <CardDescription>Historical data vs. AI predictions for customer churn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 shadow-lg">
                          <p className="font-semibold">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.dataKey}: {entry.value}%
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8B5CF6" strokeWidth={2} name="Actual Churn Rate" />
                <Line type="monotone" dataKey="predicted" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} name="Predicted Churn Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Segment Growth Forecast */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Segment Growth Forecast</CardTitle>
          <CardDescription>Predicted customer growth by segment over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {segmentGrowthForecast.map((forecast, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/50 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: forecast.color }} />
                    <span className="font-semibold">{forecast.name}</span>
                  </div>
                  <Badge variant="outline">
                    {forecast.predicted12m > forecast.current ? '+' : ''}
                    {((forecast.predicted12m - forecast.current) / forecast.current * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-semibold">{forecast.current}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">3 Months</p>
                    <p className="font-semibold">{forecast.predicted3m}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">6 Months</p>
                    <p className="font-semibold">{forecast.predicted6m}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">12 Months</p>
                    <p className="font-semibold">{forecast.predicted12m}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Lifetime Value Predictions */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Customer Lifetime Value Predictions</CardTitle>
          <CardDescription>Predicted CLV changes over the next 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerLifetimeValue.map((clv, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/50 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{clv.segment} Segment</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {clv.confidence}% confidence
                    </Badge>
                    {clv.predicted > clv.current ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current CLV</p>
                    <p className="text-lg font-bold">${clv.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Predicted CLV</p>
                    <p className="text-lg font-bold">${clv.predicted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Change</p>
                    <p className={`text-lg font-bold ${clv.predicted > clv.current ? 'text-green-600' : 'text-red-600'}`}>
                      {clv.predicted > clv.current ? '+' : ''}${clv.predicted - clv.current}
                    </p>
                  </div>
                </div>
                <Progress value={clv.confidence} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events Impact */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events Impact
          </CardTitle>
          <CardDescription>Predicted impact of upcoming marketing events and campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/50 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold">{event.event}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.expectedImpact === 'High' ? 'default' : 'secondary'}>
                      {event.expectedImpact} Impact
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      {event.predictedUplift}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Date: {event.date}</div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Affected segments:</span>
                  {event.affectedSegments.map((segment, segIndex) => (
                    <Badge key={segIndex} variant="outline" className="text-xs">
                      {segment}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
