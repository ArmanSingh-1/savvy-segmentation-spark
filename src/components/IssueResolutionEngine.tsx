
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap, Target, Brain, TrendingUp } from 'lucide-react';

interface AutoFix {
  id: string;
  issueId: string;
  title: string;
  description: string;
  steps: string[];
  estimatedTime: string;
  successRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'automation' | 'manual' | 'hybrid';
}

interface ResolutionTracker {
  issueId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  startTime: string;
  estimatedCompletion: string;
}

const mockAutoFixes: AutoFix[] = [
  {
    id: '1',
    issueId: '1',
    title: 'Automated Retention Campaign',
    description: 'Deploy AI-generated personalized retention offers to at-risk customers',
    steps: [
      'Identify high-churn risk customers',
      'Generate personalized offer content',
      'Create email campaign templates',
      'Schedule automated delivery',
      'Set up tracking and monitoring'
    ],
    estimatedTime: '2 hours',
    successRate: 94,
    riskLevel: 'low',
    category: 'automation'
  },
  {
    id: '2',
    issueId: '2',
    title: 'Model Retraining Pipeline',
    description: 'Automatically retrain segmentation models with latest data',
    steps: [
      'Extract latest customer data',
      'Validate data quality',
      'Run feature engineering',
      'Train updated models',
      'Validate model performance',
      'Deploy new models'
    ],
    estimatedTime: '4 hours',
    successRate: 89,
    riskLevel: 'medium',
    category: 'automation'
  },
  {
    id: '3',
    issueId: '3',
    title: 'Content Strategy Optimization',
    description: 'Generate and deploy targeted content for underperforming segments',
    steps: [
      'Analyze segment preferences',
      'Generate content recommendations',
      'Create content calendar',
      'Deploy across channels',
      'Monitor engagement metrics'
    ],
    estimatedTime: '6 hours',
    successRate: 76,
    riskLevel: 'medium',
    category: 'hybrid'
  }
];

const IssueResolutionEngine = () => {
  const [activeResolutions, setActiveResolutions] = useState<ResolutionTracker[]>([]);
  const [completedFixes, setCompletedFixes] = useState<Set<string>>(new Set());

  const startAutoFix = (fix: AutoFix) => {
    const resolution: ResolutionTracker = {
      issueId: fix.issueId,
      status: 'in_progress',
      progress: 0,
      currentStep: fix.steps[0],
      startTime: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    };

    setActiveResolutions(prev => [...prev, resolution]);

    // Simulate progress
    let progress = 0;
    const stepCount = fix.steps.length;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        setActiveResolutions(prev => 
          prev.map(res => 
            res.issueId === fix.issueId 
              ? { ...res, status: 'completed', progress: 100, currentStep: 'Completed' }
              : res
          )
        );
        setCompletedFixes(prev => new Set([...prev, fix.id]));
        clearInterval(interval);
      } else {
        const currentStepIndex = Math.floor((progress / 100) * stepCount);
        setActiveResolutions(prev => 
          prev.map(res => 
            res.issueId === fix.issueId 
              ? { 
                  ...res, 
                  progress: Math.min(progress, 100),
                  currentStep: fix.steps[Math.min(currentStepIndex, stepCount - 1)]
                }
              : res
          )
        );
      }
    }, 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return <Zap className="h-4 w-4" />;
      case 'manual': return <Target className="h-4 w-4" />;
      case 'hybrid': return <Brain className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Intelligent Issue Resolution Engine
        </CardTitle>
        <CardDescription>
          AI-powered automated fixes and resolution tracking for detected issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resolution Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{completedFixes.size}</p>
            <p className="text-sm text-muted-foreground">Issues Resolved</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{activeResolutions.length}</p>
            <p className="text-sm text-muted-foreground">Active Resolutions</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>

        {/* Active Resolutions */}
        {activeResolutions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Active Resolutions
            </h3>
            {activeResolutions.map((resolution) => (
              <div key={resolution.issueId} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="font-medium">Resolution in Progress</span>
                  </div>
                  <Badge className="bg-blue-600">
                    {resolution.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Step: {resolution.currentStep}</span>
                    <span>{Math.round(resolution.progress)}% Complete</span>
                  </div>
                  <Progress value={resolution.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Available Auto-Fixes */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Available Auto-Fixes
          </h3>
          {mockAutoFixes.map((fix) => (
            <div key={fix.id} className="p-4 border border-white/20 rounded-lg bg-white/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getRiskColor(fix.riskLevel)}`}>
                    {getCategoryIcon(fix.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{fix.title}</h4>
                      <Badge variant="outline">{fix.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{fix.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{fix.successRate}%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium mb-2">Implementation Steps:</p>
                  <ul className="space-y-1">
                    {fix.steps.slice(0, 3).map((step, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        {step}
                      </li>
                    ))}
                    {fix.steps.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{fix.steps.length - 3} more steps...
                      </li>
                    )}
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Time:</span>
                    <span className="font-medium">{fix.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Level:</span>
                    <Badge variant={fix.riskLevel === 'low' ? 'default' : 'secondary'}>
                      {fix.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={completedFixes.has(fix.id) || activeResolutions.some(r => r.issueId === fix.issueId)}
                >
                  Preview Steps
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => startAutoFix(fix)}
                  disabled={completedFixes.has(fix.id) || activeResolutions.some(r => r.issueId === fix.issueId)}
                  className="bg-gradient-to-r from-green-600 to-blue-600"
                >
                  {completedFixes.has(fix.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </>
                  ) : activeResolutions.some(r => r.issueId === fix.issueId) ? (
                    'In Progress...'
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-1" />
                      Start Auto-Fix
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueResolutionEngine;
