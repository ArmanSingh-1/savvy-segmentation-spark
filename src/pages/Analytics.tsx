
import DashboardNav from '@/components/DashboardNav';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import SegmentInsights from '@/components/SegmentInsights';
import PredictiveAnalytics from '@/components/PredictiveAnalytics';

// Mock data for demonstration
const mockSegments = [
  {
    id: 1,
    name: "High-Value Customers",
    description: "Premium customers with high engagement",
    size: 245,
    percentage: 15.2,
    avgValue: 2840,
    churnRisk: 8,
    growth: 12.5,
    color: "#8B5CF6",
    characteristics: ["High spending", "Frequent purchases"],
    aiInsight: "Strong loyalty segment for VIP programs."
  },
  {
    id: 2,
    name: "Budget Conscious",
    description: "Price-sensitive regular buyers",
    size: 512,
    percentage: 31.8,
    avgValue: 680,
    churnRisk: 25,
    growth: 8.2,
    color: "#06B6D4",
    characteristics: ["Price sensitive", "Discount seekers"],
    aiInsight: "Responds well to promotions and loyalty rewards."
  },
  {
    id: 3,
    name: "New Customers",
    description: "Recent customers with growth potential",
    size: 189,
    percentage: 11.7,
    avgValue: 420,
    churnRisk: 45,
    growth: 34.6,
    color: "#10B981",
    characteristics: ["New customers", "Experimental"],
    aiInsight: "High potential segment requiring onboarding focus."
  }
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600">Deep dive into your customer data and segments</p>
        </div>
        
        <div className="space-y-8">
          <CustomerSegmentChart segments={mockSegments} />
          <SegmentInsights segments={mockSegments} />
          <PredictiveAnalytics segments={mockSegments} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
