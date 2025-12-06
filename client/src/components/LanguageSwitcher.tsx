import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

interface LanguageSwitcherProps {
  isDarkBackground?: boolean;
}

export default function LanguageSwitcher({ isDarkBackground = false }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language);
    // In a real app, this would trigger translation updates
  };

  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative w-10 h-10 sm:w-8 sm:h-8 p-0 rounded-full border border-gray-200 hover:border-bitcoin/40 hover:bg-orange-50/50 transition-all duration-200 overflow-hidden bg-white min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
          >
            {/* Flag image covering the circle */}
            {currentLang.code === 'en' && (
              <img
                src="/website-photos/header-language-button-image.svg"
                alt="US Flag"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {currentLang.code === 'es' && (
              <img
                src="/website-photos/header-language-button-image-esp.webp"
                alt="Spain Flag"
                className="absolute inset-0 w-full h-full object-cover scale-150"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        {/* Language code outside the circle */}
        <span className={`text-xs font-semibold ${isDarkBackground ? "text-white/80" : "text-gray-700"}`}>
          {currentLang.code.toUpperCase()}
        </span>
      </div>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`cursor-pointer ${currentLang.code === language.code ? 'bg-bitcoin/10' : ''}`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}