import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

interface WhatsAppLinkProps {
  className?: string;
  compact?: boolean;
  label?: string;
  message?: string;
}

export default function WhatsAppLink({ className, compact = false, label, message }: WhatsAppLinkProps) {
  const { contact } = siteConfig;
  const text = label ?? (compact ? "WhatsApp" : "Scrivici su WhatsApp");
  const href = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={`WhatsApp · ${contact.whatsappDisplay}`}
      aria-label={label ?? "Scrivici su WhatsApp"}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{text}</span>
    </a>
  );
}
