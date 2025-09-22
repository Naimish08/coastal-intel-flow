import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Smartphone,
  Globe,
  Shield,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { label: t('stats.reportsSubmitted'), value: '18.9K', icon: AlertTriangle },
    { label: t('stats.fishingCommunities'), value: '5.6K', icon: Users },
    { label: t('stats.hazardsMapped'), value: '1.2K', icon: MapPin },
    { label: t('stats.livesProtected'), value: '5.2M+', icon: Shield },
  ];

  const features = [
    { 
      title: t('features.cycloneAlerts.title'), 
      description: t('features.cycloneAlerts.description'),
      icon: Smartphone 
    },
    { 
      title: t('features.coastalStates.title'), 
      description: t('features.coastalStates.description'),
      icon: Globe 
    },
    { 
      title: t('features.fishingCommunity.title'), 
      description: t('features.fishingCommunity.description'),
      icon: Users 
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-wave">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-depth" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-wave" />
      
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        {/* Hero Content */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('hero.badge')}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-ocean bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 shadow-ocean hover:shadow-glow transition-all duration-300">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {t('hero.reportNow')}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <MapPin className="h-5 w-5 mr-2" />
              {t('hero.viewMap')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="p-6 text-center bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-8 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-wave transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 animate-float" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="p-8 md:p-12 bg-gradient-ocean text-primary-foreground text-center shadow-ocean">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t('hero.startReporting')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              {t('hero.learnMore')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;