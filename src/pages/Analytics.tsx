import Dashboard from '../components/Dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Globe,
  Users,
  AlertTriangle,
  Share2,
  FileText,
  Database
} from 'lucide-react';

const Analytics = () => {
  const reportTypes = [
    { type: 'Storm Systems', reports: 342, trend: '+15%', color: 'text-destructive' },
    { type: 'Navigation Hazards', reports: 189, trend: '+8%', color: 'text-warning' },
    { type: 'Marine Pollution', reports: 156, trend: '+23%', color: 'text-destructive' },
    { type: 'Dangerous Currents', reports: 134, trend: '+12%', color: 'text-warning' },
    { type: 'Equipment Failures', reports: 98, trend: '-5%', color: 'text-muted-foreground' },
  ];

  const timeFrames = [
    { period: 'Last 24 Hours', active: false },
    { period: 'Last Week', active: true },
    { period: 'Last Month', active: false },
    { period: 'Last Quarter', active: false },
    { period: 'Last Year', active: false },
  ];

  const keyInsights = [
    {
      title: 'Peak Reporting Hours',
      value: '06:00 - 18:00 UTC',
      description: 'Most reports submitted during daylight hours',
      icon: Calendar,
    },
    {
      title: 'Top Contributing Region',
      value: 'North Atlantic',
      description: '34% of all verified reports',
      icon: Globe,
    },
    {
      title: 'Average Response Time',
      value: '3.2 minutes',
      description: '15% improvement from last month',
      icon: TrendingUp,
    },
    {
      title: 'Community Growth',
      value: '+247 users',
      description: 'New contributors this week',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Analytics & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive analysis of hazard reports, community engagement, and maritime safety trends.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Insights
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Time Frame Selector */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-foreground mr-4 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Time Frame:
              </span>
              {timeFrames.map((frame, index) => (
                <Button
                  key={index}
                  variant={frame.active ? "default" : "outline"}
                  size="sm"
                >
                  {frame.period}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyInsights.map((insight, index) => (
            <Card key={index} className="p-6 bg-gradient-wave border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <insight.icon className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">{insight.title}</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">{insight.value}</div>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </Card>
          ))}
        </div>

        {/* Report Types Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Hazard Report Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTypes.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className={`h-5 w-5 ${report.color}`} />
                    <div>
                      <h4 className="font-medium text-foreground">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.reports} total reports</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={report.trend.startsWith('+') ? 'default' : 'secondary'}
                      className="mb-2"
                    >
                      {report.trend}
                    </Badge>
                    <div className="text-sm text-muted-foreground">vs. last period</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Analytics Preview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Twitter Mentions</span>
                  <div className="text-right">
                    <div className="font-semibold">1,247</div>
                    <Badge variant="outline" className="text-xs">+23%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Facebook Posts</span>
                  <div className="text-right">
                    <div className="font-semibold">892</div>
                    <Badge variant="outline" className="text-xs">+15%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Instagram Stories</span>
                  <div className="text-right">
                    <div className="font-semibold">634</div>
                    <Badge variant="outline" className="text-xs">+31%</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Sentiment Analysis</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Positive</span>
                      <span className="text-success">67%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Neutral</span>
                      <span className="text-muted-foreground">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Negative</span>
                      <span className="text-destructive">8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Quality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Report Accuracy</span>
                  <Badge variant="secondary" className="font-semibold">97.3%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Verification Rate</span>
                  <Badge variant="secondary" className="font-semibold">89.1%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Duplicate Detection</span>
                  <Badge variant="secondary" className="font-semibold">94.7%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">False Positive Rate</span>
                  <Badge variant="outline" className="font-semibold">2.1%</Badge>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Processing Times</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Processing</span>
                      <span>2.3 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Load Response</span>
                      <span>4.1 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Uptime</span>
                      <span className="text-success">99.97%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Component */}
        <Dashboard />
      </div>
    </div>
  );
};

export default Analytics;