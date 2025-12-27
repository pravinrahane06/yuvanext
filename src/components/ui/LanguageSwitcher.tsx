import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-muted/50 rounded-full p-1 text-sm",
        className
      )}
    >
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 rounded-full font-medium transition-all",
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("mr")}
        className={cn(
          "px-3 py-1.5 rounded-full font-medium transition-all",
          language === "mr"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="मराठी मध्ये बदला"
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
