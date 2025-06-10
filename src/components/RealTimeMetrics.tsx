
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Users, ShoppingCart, TrendingUp, Zap, Eye, Heart, MessageSquare } from 'lucide-react';

const RealTimeMetrics = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realTimeData, setRealTimeData] = useState([
    { time: '09:00', visitors: 45, conversions: 3, engagement: 67 },
    { time: '09:15', visitors: 52, conversions: 4, engagement: 72 },
    { time: '09:30', visitors: 48, conversions: 2, engagement: 65 },
    { time: '09:45', visitors: 61, conversions: 5, engagement: 78 },
    { time: '10:00', visitors: 58, conversions: 6, engagement: 74 },
    { time: '10:15', visitors: 64, conversions: 4, engagement: 81 },
  ]);

  const [liveStats, setLiveStats] = useState({
    activeUsers: 342,
    bounceRate: 23.4,
    avgSessionDuration: '3:42',
    pageViews: 1284,
    conversionRate: 4.7
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Anonymous User #1432', action: 'Viewed product page', segment: 'High-Value Enthusiasts', time: '2 minutes ago', icon: Eye },
    { id: 2, user: 'Customer #8765', action: 'Added to cart', segment: 'Price-Conscious Regulars', time: '3 minutes ago', icon: ShoppingCart },
    { id: 3, user: 'Anonymous User #9876', action: 'Signed up for newsletter', segment: 'Emerging Explorers', time: '5 minutes ago', icon: Heart },
    { id: 4, user: 'Customer #2341', action: 'Completed purchase', segment: 'Seasonal Shoppers', time: '7 minutes ago', icon: TrendingUp },
    { id: 5, user: 'Anonymous User #5432', action: 'Left review', segment: 'High-Value Enthusiasts', time: '8 minutes ago', icon: MessageSquare },
  ]);

  const [segmentActivity, setSegmentActivity] = useState([
    { segment: 'High-Value Enthusiasts', activeUsers: 45, trend: '+12%', color: '#8B5CF6' },
    { segment: 'Price-Conscious Regulars', activeUsers: 127, trend: '+8%', color: '#06B6D4' },
    { segment: 'Emerging Explorers', activeUsers: 89, trend: '+23%', color: '#10B981' },
    { segment: 'At-Risk Churners', activeUsers: 12, trend: '-15%', color: '#EF4444' },
    { segment: 'Seasonal Shoppers', activeUsers: 69, trend: '+18%', color: '#F59E0B' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update real-time data
      setRealTimeData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const newTime = new Date(currentTime.getTime() + 15 * 60000).toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        newData.push({
          time: newTime,
          visitors: Math.floor(Math.random() * 30) + 40,
          conversions: Math.floor(Math.random() * 8) + 1,
          engagement: Math.floor(Math.random() * 20) + 60
        });
        
        return newData.slice(-20); // Keep last 20 entries
      });

      // Update live stats
      setLiveStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        bounceRate: Math.max(15, Math.min(35, prev.bounceRate + (Math.random() - 0.5) * 2)),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5) + 1,
        conversionRate: Math.max(3, Math.min(7, prev.conversionRate + (Math.random() - 0.5) * 0.5))
      }));

      // Update segment activity
      setSegmentActivity(prev => 
        prev.map(segment => ({
          ...segment,
          activeUsers: Math.max(5, segment.activeUsers + Math.floor(Math.random() * 6) - 3)
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(timer);
  }, [currentTime]);

  return (
    <div className="space-y-6">
      {/* Real-time Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600 animate-pulse" />
            Live Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Real-time customer behavior and segment activity - Last updated: {currentTime.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Live Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.activeUsers}</div>
            <Badge variant="outline" className="text-green-600 mt-1">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.bounceRate.toFixed(1)}%</div>
            <Progress value={100 - liveStats.bounceRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground mt-1">Duration</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.pageViews.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+47 this hour</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-blue-600 mt-1">Above average</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Live Activity Stream</CardTitle>
          <CardDescription>Real-time visitor activity and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={realTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="engagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <Area type="monotone" dataKey="visitors" stroke="#8B5CF6" fillOpacity={1} fill="url(#visitors)" />
                <Area type="monotone" dataKey="engagement" stroke="#10B981" fillOpacity={1} fill="url(#engagement)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Segment Activity */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Live Segment Activity</CardTitle>
            <CardDescription>Current active users by customer segment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {segmentActivity.map((segment, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/50 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                    <span className="font-medium text-sm">{segment.segment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">{segment.trend}</Badge>
                    <span className="font-bold">{segment.activeUsers}</span>
                  </div>
                </div>
                <Progress value={(segment.activeUsers / 150) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Recent Activity Feed</CardTitle>
            <CardDescription>Live customer interactions and behaviors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-3 rounded-lg bg-white/50 border border-white/20 hover:bg-white/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-blue-100">
                      <activity.icon className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{activity.action}</p>
                      <Badge variant="outline" className="text-xs">{activity.segment}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMetrics;
