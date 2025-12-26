import { LucideIcon } from "lucide-react";
import * as icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

const DynamicIcon = ({ name, className }: DynamicIconProps) => {
  const IconComponent = (icons as unknown as Record<string, LucideIcon>)[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default DynamicIcon;
