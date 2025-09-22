import HazardReporting from '../components/HazardReporting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MapPin, Users } from 'lucide-react';

const ReportHazard = () => {
  const emergencyContacts = [
    { region: 'West Coast (Gujarat, Maharashtra)', phone: '1554 (Coast Guard)', email: 'mrcc-mumbai@indiancoastguard.nic.in' },
    { region: 'East Coast (Odisha, West Bengal)', phone: '1554 / +91-33-2469-6969', email: 'mrcc-chennai@indiancoastguard.nic.in' },
    { region: 'South Coast (Tamil Nadu, Kerala)', phone: '1554 / +91-44-2534-4040', email: 'mrcc-kochi@indiancoastguard.nic.in' },
    { region: 'Andaman & Nicobar Islands', phone: '+91-3192-232102', email: 'mrcc-portblair@indiancoastguard.nic.in' },
    { region: 'Lakshadweep Islands', phone: '+91-4896-262445', email: 'cgstation-minicoy@indiancoastguard.nic.in' },
  ];

  const reportingGuidelines = [
    {
      title: 'Immediate Danger',
      description: 'If lives are at immediate risk, contact local emergency services first, then submit a report.',
      priority: 'high',
      icon: AlertTriangle,
    },
    {
      title: 'Accurate Location',
      description: 'Provide precise GPS coordinates or detailed location description for effective response.',
      priority: 'medium', 
      icon: MapPin,
    },
    {
      title: 'Timely Reporting',
      description: 'Submit reports as soon as safely possible to help others avoid hazardous conditions.',
      priority: 'medium',
      icon: Clock,
    },
    {
      title: 'Community Safety',
      description: 'Your report helps protect fellow mariners, fishermen, and coastal communities.',
      priority: 'low',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Report Ocean Hazard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your reports are crucial for maritime safety. Help protect lives by sharing accurate, 
            timely information about ocean hazards and dangerous conditions.
          </p>
        </div>

        {/* Emergency Banner */}
        <Card className="mb-8 border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Emergency Situation?</h3>
                <p className="text-muted-foreground mb-3">
                  If lives are in immediate danger, contact your local coast guard or emergency services first, 
                  then submit a report to help others.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="destructive">Coast Guard: 1554</Badge>
                  <Badge variant="outline">Police: 100</Badge>
                  <Badge variant="outline">Fire: 101</Badge>
                  <Badge variant="outline">Medical: 102</Badge>
                  <Badge variant="outline">Disaster: 108</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Reporting Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reporting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportingGuidelines.map((guideline, index) => (
                  <div key={index} className="flex gap-3">
                    <guideline.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      guideline.priority === 'high' ? 'text-destructive' :
                      guideline.priority === 'medium' ? 'text-warning' : 'text-primary'
                    }`} />
                    <div>
                      <h4 className="font-medium text-sm mb-1">{guideline.title}</h4>
                      <p className="text-xs text-muted-foreground">{guideline.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">{contact.region}</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Phone: <span className="font-mono">{contact.phone}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Email: <span className="font-mono text-xs">{contact.email}</span>
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Reporting Form */}
          <div className="lg:col-span-3">
            <HazardReporting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;