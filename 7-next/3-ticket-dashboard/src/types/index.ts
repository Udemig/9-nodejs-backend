export type StatisticsResponse = {
  message: string;
  data: {
    overview: {
      totalTickets: number;
      completedTickets: number;
      criticalTickets: number;
      averagePriority: number;
    };
    dateStats: {
      createdToday: number;
      createdLast7Days: number;
      createdThisYear: number;
    };
    distributions: {
      byCategory: Record<string, number>;
      byStatus: {
        "Devam Ediyor": number;
        Beklemede: number;
        Çözüldü: number;
      };
    };
  };
};

export type Ticket = {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: "Devam Ediyor" | "Beklemede" | "Çözüldü";
  createdAt: string;
  updatedAt: string;
};

export type TicketsResponse = {
  message: string;
  tickets: Ticket[];
};

export type TicketResponse = {
  message: string;
  ticket: Ticket;
};
