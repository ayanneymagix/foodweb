import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { DishCard } from "@/components/dish-card";
import type { Dish } from "@shared/schema";
import { motion } from "framer-motion";

interface MenuProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

export default function Menu({ dishes, onAddToCart }: MenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterVeg, setFilterVeg] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const categories = [
    { id: "all", label: "All Dishes", count: dishes.length },
    { id: "starters", label: "Starters", count: dishes.filter(d => d.category === "starters").length },
    { id: "main-course", label: "Main Course", count: dishes.filter(d => d.category === "main-course").length },
    { id: "breads", label: "Breads", count: dishes.filter(d => d.category === "breads").length },
    { id: "desserts", label: "Desserts", count: dishes.filter(d => d.category === "desserts").length },
    { id: "beverages", label: "Beverages", count: dishes.filter(d => d.category === "beverages").length },
  ];

  const filteredDishes = dishes
    .filter(dish => {
      if (selectedCategory !== "all" && dish.category !== selectedCategory) return false;
      if (filterVeg === "veg" && !dish.isVeg) return false;
      if (filterVeg === "non-veg" && dish.isVeg) return false;
      if (searchQuery && !dish.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !dish.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === "popular") return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-menu-title">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of authentic North Indian dishes
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-dishes"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterVeg} onValueChange={setFilterVeg}>
                <SelectTrigger className="w-[140px]" data-testid="select-veg-filter">
                  <SelectValue placeholder="Diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="veg">Veg Only</SelectItem>
                  <SelectItem value="non-veg">Non-Veg</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 whitespace-nowrap"
                data-testid={`tab-category-${category.id}`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground" data-testid="text-no-dishes">
              No dishes found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-dishes">
            {filteredDishes.map((dish, index) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAddToCart={onAddToCart}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
