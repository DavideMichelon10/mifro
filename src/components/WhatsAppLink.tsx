import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function WhatsAppLink({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { contact } = siteConfig;
  return (
    <a
      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={`WhatsApp · ${contact.whatsappDisplay}`}
      aria-label="Scrivici su WhatsApp"
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{compact ? "WhatsApp" : "Scrivici su WhatsApp"}</span>
    </a>
  );
}
