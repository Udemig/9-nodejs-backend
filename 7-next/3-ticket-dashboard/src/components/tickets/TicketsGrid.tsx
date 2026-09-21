import { Ticket } from "@/types";
import { getTickets } from "@/utils/service";
import { FC } from "react";
import TicketCard from "./TicketCard";

const TicketsGrid: FC = async () => {
  const { tickets } = await getTickets();

  // api'dan gelen ticket verilerini kategorilerine göre ayır
  const ticketsByCategory = tickets.reduce<Record<string, Ticket[]>>((obj, ticket) => {
    if (obj[ticket.category]) {
      obj[ticket.category].push(ticket);
    } else {
      obj[ticket.category] = [];
    }

    return obj;
  }, {});

  return (
    <div>
      {Object.entries(ticketsByCategory).map(([category, categoryTickets]) => (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              {category}
            </h2>

            <span className="bg-blue-600/20 text-sm py-1 px-2 rounded-md">
              {categoryTickets.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 kg:grid-cols-3 gap-3">
            {categoryTickets.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket._id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketsGrid;
