import {
  Monitor,
  UtensilsCrossed,
  Wrench,
  Cpu,
  ChefHat,
  Store,
  Building2,
  CreditCard,
  Printer,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  Shield,
  Facebook,
  ArrowRight,
  type LucideProps,
} from "lucide-react";

export const iconMap = {
  Monitor,
  UtensilsCrossed,
  Wrench,
  Cpu,
  ChefHat,
  Store,
  Building2,
  CreditCard,
  Printer,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  Shield,
  Facebook,
  ArrowRight,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const LucideIcon = iconMap[name];
  return <LucideIcon {...props} />;
}
