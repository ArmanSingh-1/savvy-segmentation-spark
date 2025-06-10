
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Database, TrendingUp, AlertTriangle, Zap, BarChart, Target, CheckCircle } from 'lucide-react';

interface AnalysisResult {
  id: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'high' | 'medium' | 'low';
  correlation: number;
  timeframe: string;
  insight: string;
}

interface IssueDetection {
  id: string;
  type: 'performance' | 'quality' | 'trend' | 'anomaly';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  estimatedFix: string;
  confidence: number;
}

const mockAnalysisResults: AnalysisResult[] = [
  {
    id: '1',
    metric: 'Customer Lifetime Value',
    value: 2840,
    trend: 'up',
    significance: 'high',
    correlation: 0.89,
    timeframe: 'Last 30 days',
    insight: 'CLV increased by 23% due to improved retention strategies'
  },
  {
    id: '2',
    metric: 'Churn Prediction Accuracy',
    value: 94.7,
    trend: 'up',
    significance: 'high',
    correlation: 0.95,
    timeframe: 'Real-time',
    insight: 'AI model accuracy improved with recent data updates'
  },
  {
    id: '3',
    metric: 'Segment Migration Rate',
    value: 15.3,
    trend: 'down',
    significance: 'medium',
    correlation: 0.72,
    timeframe: 'Last 7 days',
    insight: 'Fewer customers moving between segments indicates stability'
  }
];

const mockIssues: IssueDetection[] = [
  {
    id: '1',
    type: 'anomaly',
    severity: 'critical',
    title: 'Sudden Spike in Churn Rate',
    description: 'High-Value Enthusiasts segment showing 34% increase in churn signals',
    impact: 'Potential revenue loss of $125K over next quarter',
    recommendation: 'Implement immediate retention campaign with personalized offers',
    estimatedFix: '2-3 days',
    confidence: 96
  },
  {
    id: '2',
    type: 'performance',
    severity: 'high',
    title: 'Model Drift Detected',
    description: 'Segmentation accuracy dropped by 8% in past week',
    impact: 'Reduced targeting effectiveness and campaign performance',
    recommendation: 'Retrain models with latest data and adjust feature weights',
    estimatedFix: '1 day',
    confidence: 91
  },
  {
    id: '3',
    type: 'trend',
    severity: 'medium',
    title: 'Declining Engagement Scores',
    description: 'Average engagement down 12% across Emerging Explorers',
    impact: 'Lower conversion rates and segment progression',
    recommendation: 'Launch targeted content strategy and improve onboarding',
    estimatedFix: '1 week',
    confidence: 87
  }
];

const CustomDataAnalysis = () => {
  const [analysisType, setAnalysisType] = useState('realtime');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveData, setLiveData] = useState<any[]>([]);
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      const newDataPoint = {
        timestamp: new Date().toISOString(),
        value: Math.random() * 100,
        metric: 'Real-time Activity'
      };
      setLiveData(prev => [...prev.slice(-20), newDataPoint]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runCustomAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleResolveIssue = (issueId: string) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <BarChart className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Analytics Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI-Powered Custom Data Analysis
            <Badge className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
          <CardDescription>
            Real-time custom analysis with intelligent issue detection and automated recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time Analysis</SelectItem>
                <SelectItem value="custom">Custom Timeframe</SelectItem>
                <SelectItem value="predictive">Predictive Modeling</SelectItem>
                <SelectItem value="comparative">Comparative Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={runCustomAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="results">Analysis Results</TabsTrigger>
          <TabsTrigger value="issues">Issue Detection</TabsTrigger>
          <TabsTrigger value="live">Live Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockAnalysisResults.map((result) => (
              <Card key={result.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(result.trend)}
                      <div>
                        <h3 className="font-semibold">{result.metric}</h3>
                        <p className="text-sm text-muted-foreground">{result.timeframe}</p>
                      </div>
                    </div>
                    <Badge variant={result.significance === 'high' ? 'default' : 'secondary'}>
                      {result.significance} impact
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">{result.value.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Current Value</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Correlation Strength</span>
                        <span>{(result.correlation * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={result.correlation * 100} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">{result.insight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {mockIssues.map((issue) => (
            <Card key={issue.id} className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      issue.severity === 'critical' ? 'text-red-600' :
                      issue.severity === 'high' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{issue.title}</h3>
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{issue.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Impact</p>
                    <p className="text-sm text-red-700">{issue.impact}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Estimated Fix Time</p>
                    <p className="text-sm text-green-700">{issue.estimatedFix}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                  <p className="text-sm font-medium text-blue-800 mb-2">AI Recommendation:</p>
                  <p className="text-sm text-blue-700">{issue.recommendation}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResolveIssue(issue.id)}
                    disabled={resolvedIssues.has(issue.id)}
                  >
                    {resolvedIssues.has(issue.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolved
                      </>
                    ) : (
                      'Mark as Resolved'
                    )}
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Implement Fix
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Live Data Stream
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
              <CardDescription>Real-time monitoring of key metrics and customer behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{liveData.length}</p>
                  <p className="text-sm text-muted-foreground">Live Data Points</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">98.2%</p>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">2.3s</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recent Activity Stream</h4>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {liveData.slice(-10).reverse().map((point, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <span>{point.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{point.value.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          {new Date(point.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomDataAnalysis;
