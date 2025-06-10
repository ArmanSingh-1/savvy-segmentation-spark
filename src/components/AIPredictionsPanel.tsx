
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Brain, TrendingUp, Target, Zap, AlertCircle, DollarSign } from 'lucide-react';

interface PredictionData {
  id: string;
  type: 'churn' | 'upgrade' | 'cross_sell' | 'reactivation';
  customerId: string;
  customerName: string;
  currentSegment: string;
  predictedSegment?: string;
  confidence: number;
  timeframe: string;
  value: number;
  reasoning: string;
  actionRecommendation: string;
}

const mockPredictions: PredictionData[] = [
  {
    id: '1',
    type: 'churn',
    customerId: 'CX001',
    customerName: 'Sarah Johnson',
    currentSegment: 'High-Value Enthusiasts',
    confidence: 87,
    timeframe: '2-3 weeks',
    value: -2840,
    reasoning: 'Decreased engagement rate by 45% in last 30 days, no purchases in 3 weeks',
    actionRecommendation: 'Send personalized retention offer with 15% discount on premium products'
  },
  {
    id: '2',
    type: 'upgrade',
    customerId: 'CX002',
    customerName: 'Michael Chen',
    currentSegment: 'Price-Conscious Regulars',
    predictedSegment: 'High-Value Enthusiasts',
    confidence: 72,
    timeframe: '1-2 months',
    value: 1560,
    reasoning: 'Increasing purchase frequency, showing interest in premium categories',
    actionRecommendation: 'Introduce VIP program with exclusive product previews'
  },
  {
    id: '3',
    type: 'cross_sell',
    customerId: 'CX003',
    customerName: 'Emma Davis',
    currentSegment: 'Emerging Explorers',
    confidence: 91,
    timeframe: '1 week',
    value: 320,
    reasoning: 'High engagement with email campaigns, viewed complementary products 8 times',
    actionRecommendation: 'Send targeted product bundle recommendation with time-limited offer'
  }
];

const AIPredictionsPanel = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'churn': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'upgrade': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'cross_sell': return <Target className="h-4 w-4 text-blue-600" />;
      case 'reactivation': return <Zap className="h-4 w-4 text-purple-600" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      churn: 'destructive',
      upgrade: 'default',
      cross_sell: 'secondary',
      reactivation: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants]}>
        {type.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Predictions & Recommendations
        </CardTitle>
        <CardDescription>
          Real-time customer behavior predictions with actionable insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">23</p>
            <p className="text-sm text-muted-foreground">Active Predictions</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-sm text-muted-foreground">Avg Confidence</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">$12.4K</p>
            <p className="text-sm text-muted-foreground">Potential Value</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          {mockPredictions.map((prediction) => (
            <div
              key={prediction.id}
              className="p-4 border border-white/20 rounded-lg bg-white/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(prediction.type)}
                  <div>
                    <h4 className="font-semibold">{prediction.customerName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {prediction.currentSegment}
                      {prediction.predictedSegment && (
                        <span> → {prediction.predictedSegment}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(prediction.type)}
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span className={`font-medium ${prediction.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {prediction.value > 0 ? '+' : ''}${Math.abs(prediction.value)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Confidence Level</span>
                  <span className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Timeframe: </span>
                  <span className="text-muted-foreground">{prediction.timeframe}</span>
                </div>
                <div>
                  <span className="font-medium">Analysis: </span>
                  <span className="text-muted-foreground">{prediction.reasoning}</span>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-200">
                  <span className="font-medium text-blue-800">Recommended Action: </span>
                  <span className="text-blue-700">{prediction.actionRecommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPredictionsPanel;
