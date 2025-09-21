import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Camera, 
  Video, 
  Upload, 
  AlertTriangle, 
  Waves,
  Wind,
  Zap,
  Anchor,
  Fish,
  Compass,
  Clock,
  CheckCircle
} from 'lucide-react';

const HazardReporting = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<string>('');
  
  const hazardTypes = [
    { value: 'storm', label: 'Severe Storm', icon: Wind, color: 'destructive' },
    { value: 'tsunami', label: 'Tsunami Warning', icon: Waves, color: 'destructive' },
    { value: 'rip-current', label: 'Dangerous Currents', icon: Waves, color: 'warning' },
    { value: 'lightning', label: 'Lightning Activity', icon: Zap, color: 'warning' },
    { value: 'debris', label: 'Floating Debris', icon: Anchor, color: 'warning' },
    { value: 'pollution', label: 'Pollution/Oil Spill', icon: Fish, color: 'destructive' },
    { value: 'navigation', label: 'Navigation Hazard', icon: Compass, color: 'warning' },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: 'Location captured',
            description: 'GPS coordinates have been automatically added to your report.',
          });
        },
        (error) => {
          toast({
            title: 'Location error',
            description: 'Unable to get your location. Please enter manually.',
            variant: 'destructive',
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Report submitted successfully',
        description: 'Your hazard report has been received and will be verified by our team.',
      });
    }, 2000);
  };

  return (
    <section id="report" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Report Ocean Hazard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help keep maritime communities safe by reporting hazardous conditions you encounter.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-wave border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Average 3 minutes</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-wave border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-semibold text-foreground">Verification Rate</h3>
                  <p className="text-sm text-muted-foreground">97% accuracy</p>
                </div>
              </div>
            </Card>

            {/* Hazard Types */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-foreground">Common Hazard Types</h3>
              <div className="space-y-2">
                {hazardTypes.slice(0, 4).map((type) => (
                  <div key={type.value} className="flex items-center gap-2 text-sm">
                    <type.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{type.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Report Form */}
          <Card className="md:col-span-2 shadow-wave">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Submit Hazard Report
              </CardTitle>
              <CardDescription>
                Provide detailed information to help authorities and other maritime users stay safe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hazard Type */}
                <div className="space-y-2">
                  <Label htmlFor="hazard-type">Hazard Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hazard type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hazardTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter coordinates or description"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={getCurrentLocation}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the hazard conditions, severity, and any immediate dangers..."
                    rows={4}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporter-name">Your Name</Label>
                    <Input id="reporter-name" placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact (Phone/Email)</Label>
                    <Input id="contact" type="email" placeholder="Optional - for follow-up" />
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <Label>Upload Media (Optional)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button type="button" variant="outline" className="h-20 flex-col">
                      <Camera className="h-6 w-6 mb-2" />
                      <span className="text-xs">Photo</span>
                    </Button>
                    <Button type="button" variant="outline" className="h-20 flex-col">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="text-xs">Video</span>
                    </Button>
                    <Button type="button" variant="outline" className="h-20 flex-col">
                      <Upload className="h-6 w-6 mb-2" />
                      <span className="text-xs">File</span>
                    </Button>
                  </div>
                </div>

                {/* Priority Level */}
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <div className="flex gap-2">
                    <Badge variant="destructive">High - Immediate Danger</Badge>
                    <Badge variant="outline">Medium - Caution Needed</Badge>
                    <Badge variant="secondary">Low - Advisory</Badge>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Submit Hazard Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HazardReporting;