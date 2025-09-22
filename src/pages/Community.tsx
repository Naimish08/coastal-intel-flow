import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Trophy, 
  Star, 
  MessageSquare,
  Heart,
  Award,
  Globe,
  Calendar,
  MapPin,
  Shield,
  Anchor,
  Fish
} from 'lucide-react';

const Community = () => {
  const topContributors = [
    {
      id: 1,
      name: 'Captain Ravi Kumar',
      role: 'Traditional Fisher',
      location: 'Rameswaram, Tamil Nadu',
      reports: 287,
      verified: 279,
      badges: ['Cyclone Spotter', 'Community Leader', 'Accuracy Expert'],
      avatar: '/api/placeholder/40/40',
      joinDate: '2022-01-15',
    },
    {
      id: 2,
      name: 'Priya Nair',
      role: 'Marine Biologist',
      location: 'Kochi, Kerala',
      reports: 234,
      verified: 231,
      badges: ['Research Partner', 'Pollution Reporter', 'Technical Expert'],
      avatar: '/api/placeholder/40/40',
      joinDate: '2022-04-22',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      role: 'Coast Guard Officer',
      location: 'Mumbai, Maharashtra',
      reports: 198,
      verified: 198,
      badges: ['Verified Authority', 'Storm Tracker', 'Safety Advocate'],
      avatar: '/api/placeholder/40/40',
      joinDate: '2021-09-08',
    },
  ];

  const communityStats = [
    { label: 'Active Contributors', value: '5,647', icon: Users, color: 'text-primary' },
    { label: 'Total Reports', value: '18,923', icon: MessageSquare, color: 'text-success' },
    { label: 'Verified Reports', value: '17,234', icon: Shield, color: 'text-success' },
    { label: 'Coastal States', value: '13', icon: Globe, color: 'text-accent' },
  ];

  const recentActivity = [
    {
      user: 'Captain Suresh Babu',
      action: 'reported cyclonic conditions',
      location: 'Bay of Bengal, Visakhapatnam',
      time: '8 minutes ago',
      type: 'report',
    },
    {
      user: 'Indian Coast Guard',
      action: 'verified tidal surge warning',
      location: 'Sundarbans, West Bengal',
      time: '18 minutes ago',
      type: 'verification',
    },
    {
      user: 'Anjali Sharma',
      action: 'earned Monsoon Monitor badge',
      location: 'Mangalore, Karnataka',
      time: '45 minutes ago',
      type: 'achievement',
    },
    {
      user: 'IMD Weather Station',
      action: 'issued cyclone warning based on fishermen reports',
      location: 'Odisha Coast',
      time: '1 hour ago',
      type: 'official',
    },
  ];

  const communityPrograms = [
    {
      title: 'Verified Reporter Program',
      description: 'Earn verified status through consistent, accurate reporting',
      participants: 2847,
      icon: Shield,
    },
    {
      title: 'Storm Spotter Network',
      description: 'Specialized training for severe weather reporting',
      participants: 1243,
      icon: Award,
    },
    {
      title: 'Youth Maritime Safety',
      description: 'Educational program for young mariners',
      participants: 892,
      icon: Star,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report': return MessageSquare;
      case 'verification': return Shield;
      case 'achievement': return Trophy;
      case 'official': return Award;
      default: return MessageSquare;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Maritime Safety Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of mariners, fishermen, researchers, and safety professionals 
            working together to make our oceans safer for everyone.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-wave">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Contributors */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Contributors This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback>
                            {contributor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{contributor.name}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4" />
                            <span>{contributor.reports} reports</span>
                            <Shield className="h-4 w-4 text-success ml-2" />
                            <span>{contributor.verified} verified</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Anchor className="h-4 w-4" />
                          <span>{contributor.role}</span>
                          <MapPin className="h-4 w-4 ml-2" />
                          <span>{contributor.location}</span>
                          <Calendar className="h-4 w-4 ml-2" />
                          <span>Since {new Date(contributor.joinDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {contributor.badges.map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  View All Contributors
                </Button>
              </CardContent>
            </Card>

            {/* Community Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Community Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {communityPrograms.map((program, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/30">
                      <program.icon className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{program.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{program.description}</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {program.participants.toLocaleString()} participants
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Join Program
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={index} className="flex gap-3">
                        <IconComponent className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{' '}
                            {activity.action}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{activity.location}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Join Community */}
            <Card className="bg-gradient-ocean text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Fish className="h-12 w-12 mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                <p className="text-primary-foreground/90 mb-4 text-sm">
                  Become part of the global maritime safety network and help protect lives at sea.
                </p>
                <Button variant="secondary" className="w-full">
                  Sign Up Today
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Report accurate, verified information only</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Respect fellow community members</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Provide constructive feedback and support</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Contribute to global maritime safety</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;