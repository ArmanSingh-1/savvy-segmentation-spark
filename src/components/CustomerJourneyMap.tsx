
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Mouse, Eye, ShoppingCart, CreditCard, MessageSquare, Star } from 'lucide-react';

interface JourneyEvent {
  id: string;
  timestamp: string;
  type: 'page_view' | 'click' | 'purchase' | 'email_open' | 'cart_add' | 'review' | 'support';
  description: string;
  value?: number;
  metadata: Record<string, any>;
}

interface CustomerJourney {
  customerId: string;
  customerName: string;
  segment: string;
  events: JourneyEvent[];
  totalValue: number;
  riskScore: number;
}

const mockJourneys: CustomerJourney[] = [
  {
    customerId: 'CX001',
    customerName: 'Sarah Johnson',
    segment: 'High-Value Enthusiasts',
    totalValue: 2840,
    riskScore: 78,
    events: [
      {
        id: '1',
        timestamp: '2024-06-10T14:30:00Z',
        type: 'page_view',
        description: 'Viewed premium product category',
        metadata: { page: '/premium-collection', duration: 240 }
      },
      {
        id: '2',
        timestamp: '2024-06-10T14:35:00Z',
        type: 'click',
        description: 'Clicked on luxury handbag',
        metadata: { product: 'luxury-handbag-001', price: 450 }
      },
      {
        id: '3',
        timestamp: '2024-06-10T14:40:00Z',
        type: 'cart_add',
        description: 'Added item to cart',
        value: 450,
        metadata: { product: 'luxury-handbag-001' }
      },
      {
        id: '4',
        timestamp: '2024-06-10T14:45:00Z',
        type: 'page_view',
        description: 'Visited checkout page',
        metadata: { page: '/checkout' }
      }
    ]
  }
];

const CustomerJourneyMap = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>(mockJourneys[0].customerId);

  const currentJourney = mockJourneys.find(j => j.customerId === selectedCustomer);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'page_view': return <Eye className="h-4 w-4" />;
      case 'click': return <Mouse className="h-4 w-4" />;
      case 'purchase': return <CreditCard className="h-4 w-4" />;
      case 'cart_add': return <ShoppingCart className="h-4 w-4" />;
      case 'email_open': return <MessageSquare className="h-4 w-4" />;
      case 'review': return <Star className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-600 bg-green-50';
      case 'cart_add': return 'text-blue-600 bg-blue-50';
      case 'page_view': return 'text-gray-600 bg-gray-50';
      case 'click': return 'text-purple-600 bg-purple-50';
      case 'email_open': return 'text-orange-600 bg-orange-50';
      case 'review': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentJourney) return null;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Real-Time Customer Journey
            </CardTitle>
            <CardDescription>Live tracking of customer interactions and behavior</CardDescription>
          </div>
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockJourneys.map((journey) => (
                <SelectItem key={journey.customerId} value={journey.customerId}>
                  {journey.customerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="font-semibold">{currentJourney.customerName}</p>
            <Badge variant="outline" className="mt-1">{currentJourney.segment}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-xl font-bold text-green-600">${currentJourney.totalValue}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Churn Risk</p>
            <p className={`text-xl font-bold ${currentJourney.riskScore > 50 ? 'text-red-600' : 'text-green-600'}`}>
              {currentJourney.riskScore}%
            </p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
            
            <div className="space-y-4">
              {currentJourney.events.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-white ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.description}</p>
                      <div className="flex items-center gap-2">
                        {event.value && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            +${event.value}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatTime(event.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Event metadata */}
                    <div className="mt-2 text-sm text-muted-foreground">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <span key={key} className="mr-4">
                          {key}: {typeof value === 'string' ? value : JSON.stringify(value)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-white/20">
          <Button variant="outline" size="sm">
            Export Journey Data
          </Button>
          <Button variant="outline" size="sm">
            Set Up Alerts
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            Send Targeted Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerJourneyMap;
