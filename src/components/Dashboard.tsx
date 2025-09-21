import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  MapPin,
  MessageSquare,
  Bell,
  CheckCircle,
  Clock,
  Globe,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total Reports',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-primary',
    },
    {
      title: 'Active Users',
      value: '3,421',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-success',
    },
    {
      title: 'Verified Reports',
      value: '89%',
      change: '+2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success',
    },
    {
      title: 'Response Time',
      value: '3.2min',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'text-warning',
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'Severe Storm',
      location: 'North Atlantic',
      severity: 'high',
      time: '5 minutes ago',
      status: 'active',
    },
    {
      id: 2,
      type: 'Rip Current',
      location: 'Pacific Coast',
      severity: 'medium',
      time: '12 minutes ago',
      status: 'monitoring',
    },
    {
      id: 3,
      type: 'Navigation Hazard',
      location: 'Gulf of Mexico',
      severity: 'low',
      time: '28 minutes ago',
      status: 'resolved',
    },
  ];

  const socialMediaTrends = [
    { platform: 'Twitter', mentions: 1247, sentiment: 'positive', growth: '+23%' },
    { platform: 'Facebook', mentions: 892, sentiment: 'neutral', growth: '+15%' },
    { platform: 'Instagram', mentions: 634, sentiment: 'positive', growth: '+31%' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'monitoring': return 'default';
      case 'resolved': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <section id="analytics" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Analytics Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into ocean hazard reports, community engagement, and social media trends.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={metric.title} className="shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  <Badge 
                    variant={metric.trend === 'up' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Hazard Alerts
              </CardTitle>
              <CardDescription>
                Latest hazard reports and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{alert.type}</span>
                          <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(alert.status)} className="mb-2">
                        {alert.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Social Media Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Social Media Trends
              </CardTitle>
              <CardDescription>
                Hazard-related social media activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {socialMediaTrends.map((trend, index) => (
                  <div key={trend.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{trend.platform}</span>
                      <Badge variant="outline" className="text-xs">
                        {trend.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{trend.mentions} mentions</span>
                      <span className={`text-xs ${
                        trend.sentiment === 'positive' ? 'text-success' : 
                        trend.sentiment === 'negative' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {trend.sentiment}
                      </span>
                    </div>
                    <Progress value={(trend.mentions / 1500) * 100} className="h-2" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                <BarChart3 className="h-4 w-4 mr-2" />
                Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-wave border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Global Coverage</h3>
                  <p className="text-sm text-muted-foreground">156 countries</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>North America</span>
                  <span>34%</span>
                </div>
                <Progress value={34} />
                <div className="flex justify-between text-sm">
                  <span>Europe</span>
                  <span>28%</span>
                </div>
                <Progress value={28} />
                <div className="flex justify-between text-sm">
                  <span>Asia Pacific</span>
                  <span>38%</span>
                </div>
                <Progress value={38} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-wave border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Activity className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-semibold text-foreground">System Health</h3>
                  <p className="text-sm text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Uptime</span>
                  <Badge variant="secondary">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Report Processing</span>
                  <Badge variant="secondary">2.1s avg</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Accuracy</span>
                  <Badge variant="secondary">97.3%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-wave border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="h-8 w-8 text-warning" />
                <div>
                  <h3 className="font-semibold text-foreground">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Emergency controls</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button size="sm" variant="destructive" className="w-full">
                  Broadcast Emergency Alert
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  Export Data Report
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  Update System Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;