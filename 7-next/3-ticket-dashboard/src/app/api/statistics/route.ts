import connectMongo from "@/utils/connect-mongo";
import Ticket from "../models/ticket";
import { NextResponse as res } from "next/server";
import { Stats } from "fs";

export async function GET(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // tarihleri hazırla
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // ticket verilerini al
    const [aggregateResult] = await Ticket.aggregate([
      {
        // $facet: Aynı anda birden fazla hesaplamayı yapmamızı sağlar
        $facet: {
          // 1. Hesaplama: Genel
          overall: [
            {
              // $group: verileri gruplandırmak için kullanırlır
              $group: {
                _id: null,

                // $sum: gruptaki her belge için değere 1 ekler
                totalTickets: { $sum: 1 },

                // $cond: [ <Koşul>, <Doğruysa>, <Yanlışsa> ] (Ternary / If-Else mantığı)
                // $eq: Eşittir operatörü. status == "Çözüldü" ise 1 ekle(say), değilse 0 ekle.
                completedTickets: { $sum: { $cond: [{ $eq: ["$status", "Çözüldü"] }, 1, 0] } },

                criticalTickets: { $sum: { $cond: [{ $gt: ["$priority", 4] }, 1, 0] } },

                totalPriority: { $sum: "$priority" },

                ticketsCreatedToday: { $sum: { $cond: [{ $gte: ["$createdAt", today] }, 1, 0] } },
                ticketsCreatedLast7Days: {
                  $sum: { $cond: [{ $gte: ["$createdAt", thisWeek] }, 1, 0] },
                },
                ticketsCreatedThisYear: {
                  $sum: { $cond: [{ $gte: ["$createdAt", thisYear] }, 1, 0] },
                },
              },
            },
          ],

          // 2. Hesaplama: Kategori Dağılımı
          byCategory: [{ $group: { _id: "$category", count: { $sum: 1 } } }],

          // 3. Hesaplama: Durum Dağılımı
          byStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        },
      },
    ]);

    // nodejs tarafındaki formatlama işlemleri
    const stats = aggregateResult.overall[0] || {
      totalTickets: 0,
      completedTickets: 0,
      criticalTickets: 0,
      totalPriority: 0,
      ticketsCreatedToday: 0,
      ticketsCreatedLast7Days: 0,
      ticketsCreatedThisYear: 0,
    };

    // ortalama öncelik değerini hesapla
    const averagePriority =
      stats.totalTickets > 0 ? +(stats.totalPriority / stats.totalTickets).toFixed(1) : 0;

    // Aggregate'ten array [{_id: "Donanım", count: 5}, {_id: "Yazılım", count: 3}] şeklinde dönen
    // veriyi obje { "Donanım": 5, "Yazılım": 3 } formatına çevir.
    const ticketsByCategory = aggregateResult.byCategory.reduce(
      (acc: Record<string, number>, curr: { _id: string; count: number }) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {},
    );
    const ticketsByStatus = aggregateResult.byStatus.reduce(
      (acc: Record<string, number>, curr: { _id: string; count: number }) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {},
    );

    // client'a yanıt gönder
    return res.json({
      message: "İstatistikler hesaplandı",
      data: {
        overview: {
          totalTickets: stats.totalTickets,
          completedTickets: stats.completedTickets,
          criticalTickets: stats.criticalTickets,
          averagePriority: averagePriority,
        },

        dateStats: {
          createdToday: stats.ticketsCreatedToday,
          createdLast7Days: stats.ticketsCreatedLast7Days,
          createdThisYear: stats.ticketsCreatedThisYear,
        },

        distributions: {
          byCategory: ticketsByCategory,
          byStatus: ticketsByStatus,
        },
      },
    });
  } catch (error) {
    return res.json(
      {
        message: "İstatistikler hesaplanıken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}
