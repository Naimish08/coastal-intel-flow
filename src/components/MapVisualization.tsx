import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
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
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <MapContainer center={[19.076, 72.8777]} zoom={10} className="w-full h-full">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />

                    {/* Hazard markers: coastal Mumbai and nearby Maharashtra coast */}
                    <LayerGroup>
                      {[
                        {
                          id: 'worli-seaface',
                          position: [19.0169, 72.8178],
                          title: 'High Waves near Worli Sea Face',
                          type: 'High Waves',
                          severity: 'high',
                          source: 'Citizen + Satellite',
                          updated: '12 min ago',
                          confidence: 0.88,
                        },
                        {
                          id: 'marine-drive',
                          position: [18.941, 72.8238],
                          title: 'Coastal Flooding - Marine Drive',
                          type: 'Urban Flooding',
                          severity: 'high',
                          source: 'Citizen + Social NLP',
                          updated: '25 min ago',
                          confidence: 0.81,
                        },
                        {
                          id: 'versova-beach',
                          position: [19.134, 72.812],
                          title: 'Unusual Tide - Versova Beach',
                          type: 'Unusual Tide',
                          severity: 'medium',
                          source: 'Tide Gauge + Citizen',
                          updated: '48 min ago',
                          confidence: 0.75,
                        },
                        {
                          id: 'juhu-beach',
                          position: [19.0988, 72.8267],
                          title: 'Swell Surge - Juhu',
                          type: 'Swell Surge',
                          severity: 'medium',
                          source: 'Wave Model + Drone',
                          updated: '1 hr ago',
                          confidence: 0.79,
                        },
                        {
                          id: 'colaba',
                          position: [18.9067, 72.8147],
                          title: 'Waterlogging - Colaba',
                          type: 'Flooding',
                          severity: 'low',
                          source: 'Citizen',
                          updated: '1 hr 20 min ago',
                          confidence: 0.62,
                        },
                        {
                          id: 'alibaug',
                          position: [18.6412, 72.8722],
                          title: 'High Waves - Alibaug Coast',
                          type: 'High Waves',
                          severity: 'medium',
                          source: 'Satellite + Buoy',
                          updated: '36 min ago',
                          confidence: 0.83,
                        },
                        {
                          id: 'mira-bhayandar',
                          position: [19.2936, 72.8721],
                          title: 'Tidal Inundation - Mira Bhayandar',
                          type: 'Tide Flooding',
                          severity: 'low',
                          source: 'Citizen + Gauge',
                          updated: '2 hr ago',
                          confidence: 0.58,
                        },
                      ].map((h) => {
                        const color = h.severity === 'high' ? '#ef4444' : h.severity === 'medium' ? '#f59e0b' : '#22c55e';
                        const radius = h.severity === 'high' ? 12 : h.severity === 'medium' ? 10 : 8;
                        return (
                          <CircleMarker key={h.id} center={h.position as [number, number]} pathOptions={{ color, fillColor: color, fillOpacity: 0.35 }} radius={radius}>
                            <Tooltip>{h.title}</Tooltip>
                            <Popup>
                              <div className="space-y-1">
                                <div className="font-medium">{h.title}</div>
                                <div className="text-xs text-muted-foreground">Type: {h.type} • Severity: {h.severity}</div>
                                <div className="text-xs text-muted-foreground">Source: {h.source}</div>
                                <div className="text-xs text-muted-foreground">Updated: {h.updated} • Confidence: {(h.confidence * 100).toFixed(0)}%</div>
                              </div>
                            </Popup>
                          </CircleMarker>
                        );
                      })}
                    </LayerGroup>
                  </MapContainer>

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

                  {/* Legend Overlay */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-wave">
                    <div className="text-xs font-medium mb-2">Hazard Severity</div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} /> High</div>
                      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }} /> Medium</div>
                      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} /> Low</div>
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