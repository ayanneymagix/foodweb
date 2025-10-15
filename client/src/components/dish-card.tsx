import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star, Leaf } from "lucide-react";
import type { Dish } from "@shared/schema";
import { motion } from "framer-motion";

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
  index?: number;
}

export function DishCard({ dish, onAddToCart, index = 0 }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Card
        className="group overflow-hidden border-card-border hover-elevate transition-all duration-300"
        data-testid={`card-dish-${dish.id}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {dish.isVeg && (
              <Badge className="bg-green-600 hover:bg-green-700 text-white border-0" data-testid={`badge-veg-${dish.id}`}>
                <Leaf className="h-3 w-3 mr-1" />
                Veg
              </Badge>
            )}
            {dish.isPopular && (
              <Badge className="bg-ring/90 hover:bg-ring text-primary-foreground border-0" data-testid={`badge-popular-${dish.id}`}>
                Popular
              </Badge>
            )}
            {dish.isNew && (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                New
              </Badge>
            )}
            {dish.isChefSpecial && (
              <Badge className="bg-gradient-to-r from-primary to-destructive text-primary-foreground border-0" data-testid={`badge-chef-special-${dish.id}`}>
                Chef's Special
              </Badge>
            )}
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="lg"
              onClick={() => onAddToCart(dish)}
              className="backdrop-blur-md bg-primary/90 hover:bg-primary shadow-xl"
              data-testid={`button-add-to-cart-${dish.id}`}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight" data-testid={`text-dish-name-${dish.id}`}>
              {dish.name}
            </h3>
            <p className="text-lg font-bold text-primary whitespace-nowrap" data-testid={`text-dish-price-${dish.id}`}>
              ₹{dish.price}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-dish-description-${dish.id}`}>
            {dish.description}
          </p>

          {dish.rating && Number(dish.rating) > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-ring text-ring" />
                <span className="text-sm font-medium" data-testid={`text-dish-rating-${dish.id}`}>
                  {Number(dish.rating).toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({dish.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
