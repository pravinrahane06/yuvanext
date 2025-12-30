import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
}

interface LeadershipSectionProps {
  variant?: "full" | "compact";
  className?: string;
}

const LeadershipSection = ({ variant = "full", className = "" }: LeadershipSectionProps) => {
  const { t } = useTranslation();

  const leadershipData: LeadershipMember[] = [
    {
      id: "1",
      name: t("leadership.members.rahul.name"),
      designation: t("leadership.members.rahul.designation"),
      description: t("leadership.members.rahul.description"),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "2",
      name: t("leadership.members.anjali.name"),
      designation: t("leadership.members.anjali.designation"),
      description: t("leadership.members.anjali.description"),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "3",
      name: t("leadership.members.sanjay.name"),
      designation: t("leadership.members.sanjay.designation"),
      description: t("leadership.members.sanjay.description"),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "4",
      name: t("leadership.members.amit.name"),
      designation: t("leadership.members.amit.designation"),
      description: t("leadership.members.amit.description"),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const displayMembers = variant === "compact" ? leadershipData.slice(0, 3) : leadershipData;

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("leadership.title")}
          subtitle={t("leadership.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {displayMembers.map((member, index) => (
            <Card
              key={member.id}
              className="group relative overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-elevated transition-all duration-500 ease-out hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                {/* Profile Image */}
                <div className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.designation}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary/80 mb-3">
                  {member.designation}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {member.description}
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <Link to="/get-involved" aria-label={`Get involved with ${member.name}`}>
                    {t("leadership.cta")}
                  </Link>
                </Button>
              </CardContent>

              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-saffron transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>

        {variant === "compact" && (
          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="hover-scale">
              <Link to="/about">{t("leadership.viewAll")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadershipSection;
