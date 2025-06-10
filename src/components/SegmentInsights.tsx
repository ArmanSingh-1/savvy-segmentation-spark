
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target } from 'lucide-react';

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

interface SegmentInsightsProps {
  segments: Segment[];
}

const SegmentInsights = ({ segments }: SegmentInsightsProps) => {
  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getChurnRiskBadge = (risk: number) => {
    if (risk > 50) return <Badge variant="destructive">High Risk</Badge>;
    if (risk > 30) return <Badge variant="secondary">Medium Risk</Badge>;
    return <Badge variant="default">Low Risk</Badge>;
  };

  const generateRecommendations = (segment: Segment) => {
    const recommendations = [];
    
    if (segment.churnRisk > 50) {
      recommendations.push("Implement immediate retention campaigns");
      recommendations.push("Offer personalized discounts or loyalty rewards");
    } else if (segment.churnRisk > 30) {
      recommendations.push("Monitor engagement closely");
      recommendations.push("Proactive customer outreach");
    }
    
    if (segment.growth > 20) {
      recommendations.push("Scale acquisition efforts for this segment");
      recommendations.push("Develop segment-specific marketing content");
    }
    
    if (segment.avgValue > 2000) {
      recommendations.push("Create VIP program offerings");
      recommendations.push("Focus on premium product recommendations");
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* AI-Generated Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI-Generated Insights Summary
          </CardTitle>
          <CardDescription>Key findings from your customer segmentation analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold">Key Opportunities</span>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• High-Value Enthusiasts show 12.5% growth - expand VIP programs</li>
                <li>• Emerging Explorers have 34.6% growth potential</li>
                <li>• Seasonal Shoppers represent 35% of customer base</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-semibold">Priority Actions</span>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 98 customers at high churn risk need immediate attention</li>
                <li>• Emerging Explorers have 45% churn risk - improve onboarding</li>
                <li>• Focus retention efforts on Price-Conscious Regulars</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Segment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {segments.map((segment) => (
          <Card key={segment.id} className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <CardTitle className="text-lg">{segment.name}</CardTitle>
                </div>
                {getChurnRiskBadge(segment.churnRisk)}
              </div>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Segment Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{segment.size}</p>
                  <p className="text-sm text-muted-foreground">Customers ({segment.percentage}%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">${segment.avgValue}</p>
                  <p className="text-sm text-muted-foreground">Average Value</p>
                </div>
              </div>

              {/* Growth Indicator */}
              <div className="flex items-center gap-2">
                {getGrowthIcon(segment.growth)}
                <span className={`font-semibold ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {segment.growth > 0 ? '+' : ''}{segment.growth}% growth
                </span>
              </div>

              {/* Characteristics */}
              <div>
                <p className="font-semibold mb-2">Key Characteristics:</p>
                <div className="flex flex-wrap gap-2">
                  {segment.characteristics.map((char, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">{segment.aiInsight}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Recommended Actions:
                </p>
                <ul className="space-y-1">
                  {generateRecommendations(segment).map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Detailed Analysis
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SegmentInsights;
