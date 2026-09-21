import { ChartArea, House, Mail, Plus, Ticket, Users } from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Yeni Ticket",
    href: "/ticket/add",
    icon: Plus,
  },
  {
    label: "Takımlar",
    href: "#",
    icon: Users,
  },
  {
    label: "Gelen Kutusu",
    href: "#",
    icon: Mail,
  },
  {
    label: "İstatistikler",
    href: "#",
    icon: ChartArea,
  },
];

export const dateFormat = {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
} as const;

export const statusColor = {
  Beklemede: "bg-yellow-500",
  Çözüldü: "bg-green-500",
  "Devam Ediyor": "bg-blue-500",
};

export const categoryOptions = ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu", "Diğer"];

export const ticketOptions = ["Devam Ediyor", "Beklemede", "Çözüldü"];

export const ticketPriorities = [1, 2, 3, 4, 5];

export enum PriorityLabels {
  "Çok Düşük" = 1,
  "Düşük",
  "Orta",
  "Yüksek",
  "Kritik",
}
