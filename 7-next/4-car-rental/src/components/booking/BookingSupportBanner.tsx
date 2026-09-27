import React from "react";

interface BookingSupportBannerProps {
  title?: string;
  description?: string;
}

export default function BookingSupportBanner({
  title = "Morent VIP Concierge Desteği",
  description = "Herhangi bir soru veya özel istek için asistanınız 7/24 hizmetinizde.",
}: BookingSupportBannerProps) {
  return (
    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs print:hidden">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <span className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
        </span>
        <div>
          <span className="font-bold text-on-surface block">{title}</span>
          <span className="text-on-surface-variant">{description}</span>
        </div>
      </div>
      <a
        href="tel:+908503006673"
        className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 font-bold text-primary hover:bg-primary hover:text-on-primary transition-all shrink-0 flex items-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[16px]">call</span>
        +90 (850) 300 MORENT
      </a>
    </div>
  );
}
