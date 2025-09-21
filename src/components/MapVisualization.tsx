import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Layers, 
  Filter, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  Waves,
  Wind,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

const MapVisualization = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [layersVisible, setLayersVisible] = useState({
    hazards: true,
    weather: true,
    traffic: false,
    social: true,
  });

  const hazardTypes = [
    { id: 'storm', label: 'Severe Storms', count: 12, color: 'destructive', icon: Wind },
    { id: 'current', label: 'Dangerous Currents', count: 8, color: 'warning', icon: Waves },
    { id: 'lightning', label: 'Lightning Activity', count: 5, color: 'warning', icon: Zap },
    { id: 'debris', label: 'Floating Debris', count: 15, color: 'secondary', icon: AlertTriangle },
  ];

  const recentReports = [
    {
      id: 1,
      type: 'Severe Storm',
      location: 'Gulf of Mexico, 25.7617° N',
      time: '12 minutes ago',
      priority: 'high',
      verified: true,
    },
    {
      id: 2,
      type: 'Rip Current',
      location: 'Pacific Coast, CA',
      time: '28 minutes ago',
      priority: 'medium',
      verified: true,
    },
    {
      id: 3,
      type: 'Debris Field',
      location: 'Atlantic Ocean, FL',
      time: '1 hour ago',
      priority: 'low',
      verified: false,
    },
  ];

  const toggleLayer = (layer: string) => {
    setLayersVisible(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Live Hazard Map</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time visualization of ocean hazards and conditions reported by our global community.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Controls */}
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Range</label>
                  <Select value={activeFilter} onValueChange={setActiveFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last Week</SelectItem>
                      <SelectItem value="30d">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Hazard Types</label>
                  <div className="space-y-2">
                    {hazardTypes.map((hazard) => (
                      <div key={hazard.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <hazard.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{hazard.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {hazard.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5" />
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries({
                  hazards: 'Hazard Reports',
                  weather: 'Weather Data',
                  traffic: 'Marine Traffic',
                  social: 'Social Media',
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{label}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleLayer(key)}
                      className="h-8 w-8 p-0"
                    >
                      {layersVisible[key as keyof typeof layersVisible] ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="space-y-2 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{report.type}</span>
                      <Badge 
                        variant={report.priority === 'high' ? 'destructive' : 
                               report.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{report.location}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{report.time}</span>
                      {report.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] shadow-ocean">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full bg-gradient-depth rounded-lg overflow-hidden">
                  {/* Placeholder Map */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-accent/20 to-primary/20">
                    <div className="text-center p-8">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-float" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        This area will display an interactive map showing real-time hazard locations, 
                        weather conditions, and community reports.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-destructive rounded-full" />
                          High Priority
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-warning rounded-full" />
                          Medium Priority
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-secondary rounded-full" />
                          Low Priority
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Controls Overlay */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button variant="secondary" size="sm" className="shadow-wave">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm" className="shadow-wave bg-background/80">
                      <Users className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Map Statistics Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-destructive">12</div>
                        <div className="text-xs text-muted-foreground">Active Alerts</div>
                      </div>
                      <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">247</div>
                        <div className="text-xs text-muted-foreground">Total Reports</div>
                      </div>
                      <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-success">89%</div>
                        <div className="text-xs text-muted-foreground">Verified</div>
                      </div>
                      <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-accent">156</div>
                        <div className="text-xs text-muted-foreground">Contributors</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapVisualization;