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
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayerGroup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapVisualization = () => {
  const [activeFilter, setActiveFilter] = useState('today_2_4');
  const [layersVisible, setLayersVisible] = useState({
    hazards: true,
    weather: true,
    traffic: false,
    social: true,
    citizens: true,
  });

  const hazardTypes = [
    { id: 'high_waves', label: 'High Waves', count: 4, color: 'destructive', icon: Wind },
    { id: 'flooding', label: 'Flooding', count: 3, color: 'warning', icon: Waves },
    { id: 'swell', label: 'Swell Surge', count: 2, color: 'secondary', icon: Zap },
    { id: 'other', label: 'Other', count: 1, color: 'secondary', icon: AlertTriangle },
  ];

  const recentReports = [
    { id: 1, type: 'High Waves', location: 'Puri Fishing Harbor, Odisha', time: '2:45 PM', priority: 'high', verified: true },
    { id: 2, type: 'Flooding', location: 'Balisahi, Puri', time: '2:52 PM', priority: 'medium', verified: true },
    { id: 3, type: 'High Waves', location: 'Chakratirtha Rd, Puri', time: '3:05 PM', priority: 'high', verified: false },
  ];

  // Demo dataset for Odisha scenario (Cyclone near Puri): Citizens + Social
  type Hazard = {
    id: string;
    position: [number, number];
    title: string;
    eventType: 'High Waves' | 'Flooding' | 'Swell Surge' | 'Other';
    severity: 'high' | 'medium' | 'low';
    source: 'Citizen' | 'Social';
    updated: string; // HH:MM
    confidence: number; // 0-1
  };

  const hazardsPuri: Hazard[] = [
    { id: 'fisherman-jetty', position: [19.8137, 85.8365], title: 'High waves at Puri Fishing Harbor', eventType: 'High Waves', severity: 'high', source: 'Citizen', updated: '14:45', confidence: 0.9 },
    { id: 'street-flood', position: [19.7982, 85.8339], title: 'Street flooding reported', eventType: 'Flooding', severity: 'medium', source: 'Citizen', updated: '14:52', confidence: 0.82 },
    { id: 'chakratirtha', position: [19.8173, 85.8421], title: 'Strong swell observed on beach', eventType: 'High Waves', severity: 'high', source: 'Citizen', updated: '15:05', confidence: 0.78 },
    // Social signals (lower spatial certainty represented the same for demo)
    { id: 'social-1', position: [19.809, 85.84], title: 'Odia tweet: roads filling with sea water', eventType: 'Flooding', severity: 'medium', source: 'Social', updated: '15:00', confidence: 0.7 },
    { id: 'social-2', position: [19.806, 85.828], title: 'FB video: big waves near shore (unclear)', eventType: 'High Waves', severity: 'low', source: 'Social', updated: '14:58', confidence: 0.5 },
  ];

  const withinTimeWindow = (updated: string) => {
    if (activeFilter !== 'today_2_4') return true;
    const [hh, mm] = updated.split(':').map(Number);
    const minutes = hh * 60 + mm;
    return minutes >= 14 * 60 && minutes <= 16 * 60;
  };

  const displayedHazards = hazardsPuri.filter(h =>
    layersVisible.hazards &&
    withinTimeWindow(h.updated) &&
    ((h.source === 'Social' && layersVisible.social) || (h.source === 'Citizen' && layersVisible.citizens))
  );

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
                      <SelectItem value="today_2_4">Today 2–4 PM</SelectItem>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
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
                  citizens: 'Citizen Reports',
                  social: 'Social Mentions',
                  weather: 'Weather Data',
                  traffic: 'Marine Traffic',
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
                  <MapContainer center={[19.8135, 85.8312]} zoom={11} className="w-full h-full">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />

                    {/* Model prediction area (INCOIS) around 3 PM near Puri coast */}
                    <LayerGroup>
                      <Rectangle
                        bounds={[
                          [19.825, 85.80],
                          [19.785, 85.86],
                        ]}
                        pathOptions={{ color: '#3b82f6', weight: 2, fillOpacity: 0.1 }}
                      >
                        <Tooltip>Model: High waves likely ~3:00 PM</Tooltip>
                        <Popup>
                          <div className="space-y-1">
                            <div className="font-medium">INCOIS Model Prediction</div>
                            <div className="text-xs text-muted-foreground">Event: High Waves</div>
                            <div className="text-xs text-muted-foreground">Time: ~3:00 PM IST</div>
                            <div className="text-xs text-muted-foreground">Area: Puri coastal strip</div>
                          </div>
                        </Popup>
                      </Rectangle>
                    </LayerGroup>

                    {/* Hazard markers: Odisha (Puri) scenario */}
                    <LayerGroup>
                      {displayedHazards.map((h) => {
                        const color = h.severity === 'high' ? '#ef4444' : h.severity === 'medium' ? '#f59e0b' : '#22c55e';
                        const radius = h.severity === 'high' ? 12 : h.severity === 'medium' ? 10 : 8;
                        const fillOpacity = h.source === 'Social' ? 0.25 : 0.4;
                        return (
                          <CircleMarker key={h.id} center={h.position} pathOptions={{ color, fillColor: color, fillOpacity }} radius={radius}>
                            <Tooltip>{h.title}</Tooltip>
                            <Popup>
                              <div className="space-y-1">
                                <div className="font-medium">{h.title}</div>
                                <div className="text-xs text-muted-foreground">Type: {h.eventType} • Severity: {h.severity}</div>
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

                  {/* Legend + Analytics Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-wave">
                      <div className="text-xs font-medium mb-2">Hazard Severity</div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} /> High</div>
                        <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }} /> Medium</div>
                        <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} /> Low</div>
                      </div>
                    </div>
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-wave">
                      <div className="text-xs font-medium mb-2">Validation Snapshot (Puri, Today 2–4 PM)</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">{displayedHazards.filter(h => h.source === 'Citizen').length}</div>
                          <div className="text-xs text-muted-foreground">Citizen Reports</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent">12</div>
                          <div className="text-xs text-muted-foreground">Social Mentions</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-success">Yes</div>
                          <div className="text-xs text-muted-foreground">Model Match</div>
                        </div>
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