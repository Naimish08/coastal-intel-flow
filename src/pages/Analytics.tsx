import { useMemo } from 'react';
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
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, Legend as ReLegend } from 'recharts';

const Analytics = () => {
  const reportTypes = [
    { type: 'Cyclones & Monsoons', reports: 456, trend: '+28%', color: 'text-destructive' },
    { type: 'Fishing Ground Hazards', reports: 298, trend: '+18%', color: 'text-warning' },
    { type: 'Coastal Erosion', reports: 234, trend: '+35%', color: 'text-destructive' },
    { type: 'Marine Pollution', reports: 187, trend: '+22%', color: 'text-destructive' },
    { type: 'Tidal Surges', reports: 145, trend: '+15%', color: 'text-warning' },
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
      title: 'Top Contributing State',
      value: 'Tamil Nadu',
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
      title: 'Coastal Communities',
      value: '+347 users',
      description: 'New fishing communities joined',
      icon: Users,
    },
  ];

  // Dummy fused analytics for INCOIS vs Crowd (Today 2–4 PM)
  const regions = [
    { region: 'Puri (Odisha)', model: 'High Waves', modelFlag: true, citizen: 3, social: 12 },
    { region: 'Mumbai (MH)', model: 'Flooding', modelFlag: true, citizen: 2, social: 9 },
    { region: 'Chennai (TN)', model: 'High Waves', modelFlag: true, citizen: 1, social: 5 },
    { region: 'Kochi (Kerala)', model: 'Flooding', modelFlag: true, citizen: 2, social: 4 },
    { region: 'Kolkata Coast (WB)', model: 'Flooding', modelFlag: true, citizen: 1, social: 3 },
  ];

  const confidenceRows = regions.map(r => {
    const citizenWeight = Math.min(1, r.citizen / 3);
    const socialWeight = Math.min(1, r.social / 10);
    const base = r.modelFlag ? 0.4 : 0.1;
    const score = Math.min(1, base + 0.4 * citizenWeight + 0.2 * socialWeight);
    const decision = r.modelFlag && r.citizen >= 2 ? 'Yes flood' : 'No flood';
    return { ...r, score: Math.round(score * 100), decision };
  });

  const sourceMixData = useMemo(() => (
    [
      { name: 'Citizen', value: regions.reduce((a, r) => a + r.citizen, 0) },
      { name: 'Social', value: regions.reduce((a, r) => a + r.social, 0) },
    ]
  ), []);

  const COLORS = ['#3b82f6', '#a78bfa'];

  const reportTypesBars = [
    { type: 'High Waves', count: 22 },
    { type: 'Flooding', count: 17 },
    { type: 'Swell Surge', count: 9 },
    { type: 'Other', count: 6 },
  ];

  const timeBuckets = [
    { bucket: '2:00', citizen: 7, social: 10 },
    { bucket: '2:30', citizen: 9, social: 12 },
    { bucket: '3:00', citizen: 11, social: 14 },
    { bucket: '3:30', citizen: 6, social: 9 },
    { bucket: '4:00', citizen: 4, social: 6 },
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportTypesBars}>
                    <XAxis dataKey="type" fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <ReTooltip />
                    <Bar dataKey="count" fill="#10b981" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sourceMixData} dataKey="value" nameKey="name" outerRadius={80} label>
                      {sourceMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReLegend />
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* INCOIS vs Crowd Confidence Workflow */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              INCOIS Model Validation (Today 2–4 PM)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                {confidenceRows.map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">{row.region}</div>
                      <div className="text-xs text-muted-foreground">Model: {row.model} · Citizen: {row.citizen} · Social: {row.social}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold">{row.score}%</div>
                      <Badge variant={row.decision === 'Yes flood' ? 'default' : 'secondary'}>{row.decision}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeBuckets}>
                    <XAxis dataKey="bucket" fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <ReTooltip />
                    <Bar dataKey="citizen" stackId="a" fill="#3b82f6" radius={[4,4,0,0]} />
                    <Bar dataKey="social" stackId="a" fill="#a78bfa" radius={[4,4,0,0]} />
                    <ReLegend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
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