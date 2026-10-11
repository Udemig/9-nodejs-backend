import type {
  CreateMenuItemInput,
  CreateRestaurantInput,
  QueryParamsInput,
  UpdateMenuItemInput,
} from "./restaurant.dto.js";
import { MenuItem, Restaurant } from "./restaurant.model.js";
import AppError from "./utils/app-eror.js";

//* Restaurant Service - Veritabanı İle Haberleşme
class RestaurantService {
  async createRestaurant(body: CreateRestaurantInput, ownerId: string) {
    return await Restaurant.create({ ...body, ownerId });
  }

  async getAllRestaurants(queryParams: QueryParamsInput) {
    // sayfalama değişkenleri
    const page = queryParams.page;
    const limit = queryParams.limit;
    const skip = (page - 1) * limit;

    // filtreleme değişkenleri
    const filters: Record<string, any> = {};
    if (queryParams.name) filters.name = { $regex: queryParams.name, $options: "i" };
    if (queryParams.categories) filters.categories = { $in: queryParams.categories.split(",") };
    if (queryParams.deliveryTime) filters.deliveryTime = { $lte: queryParams.deliveryTime };
    if (queryParams.minOrderPrice) filters.minOrderPrice = { $lte: queryParams.minOrderPrice };

    // veritabanı sorguları
    const [restaurants, total] = await Promise.all([
      Restaurant.find(filters).skip(skip).limit(limit),
      Restaurant.countDocuments(filters),
    ]);

    // client'a gönderilecek cevabı oluştur
    return { page, limit, totalItem: total, totalPage: Math.ceil(total / limit), restaurants };
  }

  async getRestaurantById(id: string) {
    // veritabanında ara
    const restaurant = await Restaurant.findById(id);

    // bulunamazwsa hata ver
    if (!restaurant) throw new AppError("Restoran bulunamadı", 404);

    // restoranı döndür
    return restaurant;
  }

  async createMenuItem(body: CreateMenuItemInput, restaurantId: string) {
    // restoranı veritabanında ara
    const restaurant = await Restaurant.findById(restaurantId);

    // restoran yoksa hata ver
    if (!restaurant) throw new AppError("Restoran bulunamadı", 404);

    // yeni ürünü veritabanına ekle
    return await MenuItem.create({ ...body, restaurantId });
  }

  async updateMenuItem(restaurantId: string, itemId: string, body: UpdateMenuItemInput) {
    // veritabaınndaki ürünü güncelle
    const updatedItem = await MenuItem.findOneAndUpdate({ _id: itemId, restaurantId }, body, {
      new: true,
    });

    // ürün bulunamadıysa hata ver
    if (!updatedItem) throw new AppError("Ürün bulunamadı", 404);

    // ürünü döndür
    return updatedItem;
  }

  async deleteMenuItem(restaurantId: string, itemId: string) {
    // veritabaınndaki ürünü güncelle
    const deletedItem = await MenuItem.findOneAndDelete({ _id: itemId, restaurantId });

    // ürün bulunamadıysa hata ver
    if (!deletedItem) throw new AppError("Ürün bulunamadı", 404);

    // ürünü döndür
    return deletedItem;
  }

  async getRestaurantMenu(restaurantId: string, category?: string) {
    // filtreli hazırla
    const filters: { restaurantId: string; category?: string } = { restaurantId };

    // kategori parametresi varsa filtreleri ekle
    if (category) filters.category = category;

    // ürünleri veritabanından al & döndür
    return await MenuItem.find(filters);
  }
}

export default new RestaurantService();
