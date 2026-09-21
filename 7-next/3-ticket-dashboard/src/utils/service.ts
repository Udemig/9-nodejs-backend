import { StatisticsResponse, TicketResponse, TicketsResponse } from "@/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const getStatistics = async (): Promise<StatisticsResponse> => {
  const res = await fetch(`${APP_URL}/api/statistics`);

  return res.json();
};

export const getTickets = async (): Promise<TicketsResponse> => {
  const res = await fetch(`${APP_URL}/api/tickets`);

  return res.json();
};

export const deleteTicket = async (id: string) => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, { method: "DELETE" });

  return res.json();
};

export const getTicketById = async (id: string): Promise<TicketResponse> => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`);

  return res.json();
};
