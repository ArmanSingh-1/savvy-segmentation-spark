
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Segment {
  id: number;
  name: string;
  size: number;
  percentage: number;
  avgValue: number;
  churnRisk: number;
  growth: number;
  color: string;
}

interface CustomerSegmentChartProps {
  segments: Segment[];
}

const CustomerSegmentChart = ({ segments }: CustomerSegmentChartProps) => {
  const pieData = segments.map(segment => ({
    name: segment.name,
    value: segment.size,
    percentage: segment.percentage,
    color: segment.color
  }));

  const barData = segments.map(segment => ({
    name: segment.name.split(' ')[0], // Shortened names for bar chart
    customers: segment.size,
    avgValue: segment.avgValue,
    churnRisk: segment.churnRisk
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
              {entry.dataKey === 'avgValue' && '$'}
              {entry.dataKey === 'churnRisk' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Customers: {data.value}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Segment Distribution</CardTitle>
          <CardDescription>Customer distribution across segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  className="outline-none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Segment Metrics</CardTitle>
          <CardDescription>Average value and churn risk by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="avgValue" fill="#8B5CF6" name="Avg Value ($)" radius={[2, 2, 0, 0]} />
                <Bar yAxisId="right" dataKey="churnRisk" fill="#EF4444" name="Churn Risk (%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSegmentChart;
