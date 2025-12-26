import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHero = ({ title, subtitle, className }: PageHeroProps) => {
  return (
    <section
      className={cn(
        "pt-32 pb-16 bg-gradient-hero relative overflow-hidden",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-lg md:text-xl text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {subtitle}
            </p>
          )}
          <div
            className="h-1 w-24 bg-gradient-saffron rounded-full mx-auto mt-8 animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </section>
  );
};

export default PageHero;
