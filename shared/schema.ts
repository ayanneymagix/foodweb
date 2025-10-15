import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phone: text("phone"),
  rewardPoints: integer("reward_points").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, rewardPoints: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Addresses table
export const addresses = pgTable("addresses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // 'home', 'work', 'other'
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode").notNull(),
  landmark: text("landmark"),
  proofImageUrl: text("proof_image_url"),
  isDefault: boolean("is_default").notNull().default(false),
});

export const insertAddressSchema = createInsertSchema(addresses).omit({ id: true });
export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type Address = typeof addresses.$inferSelect;

// Dishes table
export const dishes = pgTable("dishes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'starters', 'main-course', 'breads', 'desserts', 'beverages'
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  isVeg: boolean("is_veg").notNull().default(true),
  isPopular: boolean("is_popular").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isChefSpecial: boolean("is_chef_special").notNull().default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer("review_count").notNull().default(0),
});

export const insertDishSchema = createInsertSchema(dishes).omit({ id: true, rating: true, reviewCount: true });
export type InsertDish = z.infer<typeof insertDishSchema>;
export type Dish = typeof dishes.$inferSelect;

// Coupons table
export const coupons = pgTable("coupons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  description: text("description").notNull(),
  discountType: text("discount_type").notNull(), // 'percentage', 'fixed'
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minOrderValue: decimal("min_order_value", { precision: 10, scale: 2 }),
  maxDiscount: decimal("max_discount", { precision: 10, scale: 2 }),
  expiresAt: timestamp("expires_at").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertCouponSchema = createInsertSchema(coupons).omit({ id: true });
export type InsertCoupon = z.infer<typeof insertCouponSchema>;
export type Coupon = typeof coupons.$inferSelect;

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  addressId: varchar("address_id").notNull(),
  items: text("items").notNull(), // JSON string of cart items
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).notNull().default('0'),
  deliveryFee: decimal("delivery_fee", { precision: 10, scale: 2 }).notNull().default('0'),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  couponCode: text("coupon_code"),
  rewardPointsUsed: integer("reward_points_used").notNull().default(0),
  status: text("status").notNull().default('received'), // 'received', 'preparing', 'out-for-delivery', 'delivered'
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  estimatedDeliveryTime: text("estimated_delivery_time"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Reviews table
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dishId: varchar("dish_id").notNull(),
  userId: varchar("user_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Reward history
export const rewardHistory = pgTable("reward_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  points: integer("points").notNull(),
  reason: text("reason").notNull(),
  orderId: varchar("order_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertRewardHistorySchema = createInsertSchema(rewardHistory).omit({ id: true, createdAt: true });
export type InsertRewardHistory = z.infer<typeof insertRewardHistorySchema>;
export type RewardHistory = typeof rewardHistory.$inferSelect;

// Cart item type (frontend only, not stored in DB)
export type CartItem = {
  dishId: string;
  dish: Dish;
  quantity: number;
};
