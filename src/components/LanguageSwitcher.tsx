import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: t('language.english'), nativeName: 'English' },
    { code: 'hi' as Language, name: t('language.hindi'), nativeName: 'हिन्दी' },
    { code: 'mr' as Language, name: t('language.marathi'), nativeName: 'मराठी' },
    { code: 'gu' as Language, name: t('language.gujarati'), nativeName: 'ગુજરાતી' },
    { code: 'ta' as Language, name: t('language.tamil'), nativeName: 'தமிழ்' },
    { code: 'bn' as Language, name: t('language.bengali'), nativeName: 'বাংলা' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.nativeName || currentLanguage?.name}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-popover/95 backdrop-blur-md border-border/50 shadow-wave"
        sideOffset={5}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
              language === lang.code 
                ? 'bg-accent text-accent-foreground font-medium' 
                : 'hover:bg-accent/50'
            }`}
          >
            <span>{lang.nativeName}</span>
            {language === lang.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;