import MapVisualization from '../components/MapVisualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Satellite, 
  Navigation, 
  Download,
  Share,
  Bookmark,
  RefreshCw,
  Settings
} from 'lucide-react';

const LiveMap = () => {
  const mapFeatures = [
    {
      title: 'Real-time Updates',
      description: 'Live hazard reports updated every 30 seconds',
      icon: RefreshCw,
    },
    {
      title: 'Satellite Overlay',
      description: 'Current weather and ocean conditions from satellite data',
      icon: Satellite,
    },
    {
      title: 'Navigation Integration',
      description: 'Export waypoints to popular marine navigation apps',
      icon: Navigation,
    },
  ];

  const legendItems = [
    { color: 'bg-destructive', label: 'High Priority Hazards', count: 12 },
    { color: 'bg-warning', label: 'Medium Priority Hazards', count: 28 },
    { color: 'bg-secondary', label: 'Low Priority Hazards', count: 45 },
    { color: 'bg-primary', label: 'Verified Reports', count: 67 },
    { color: 'bg-muted', label: 'Unverified Reports', count: 18 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Live Hazard Map</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Interactive map showing real-time ocean hazards, weather conditions, and community reports worldwide.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share Map
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save View
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Map Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-destructive">12</div>
            <div className="text-xs text-muted-foreground">Active Alerts</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-primary">247</div>
            <div className="text-xs text-muted-foreground">Total Reports</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-success">89%</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-accent">156</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-warning">3.2m</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-wave">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Monitoring</div>
          </Card>
        </div>

        {/* Map Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mapFeatures.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-wave border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <feature.icon className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Map Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map Legend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.count} reports</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Map Component */}
        <MapVisualization />

        {/* Map Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-foreground">How to Use the Map</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">1</Badge>
                <p>Use the filter panel on the left to customize what hazards are displayed</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">2</Badge>
                <p>Click on hazard markers to view detailed reports and photos</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">3</Badge>
                <p>Toggle map layers to show weather, marine traffic, or social media posts</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">4</Badge>
                <p>Use zoom and pan controls to navigate to your area of interest</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-foreground">Data Sources</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Community Reports</span>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weather Services</span>
                <Badge variant="outline">15min delay</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coast Guard Updates</span>
                <Badge variant="outline">Official</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Satellite Data</span>
                <Badge variant="outline">1hr delay</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Social Media</span>
                <Badge variant="outline">AI Filtered</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;