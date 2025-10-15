import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, Tag, Gift, ShoppingCart } from "lucide-react";
import type { CartItem } from "@shared/schema";
import { useState } from "react";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemoveItem: (dishId: string) => void;
  onCheckout: (couponCode?: string, rewardPoints?: number) => void;
  rewardPoints: number;
}

export function CartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  rewardPoints,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [useRewardPoints, setUseRewardPoints] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + Number(item.dish.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const discount = useRewardPoints * 0.1; // 1 point = ₹0.10
  const total = subtotal + deliveryFee - discount;

  const maxRewardPoints = Math.min(rewardPoints, Math.floor(subtotal * 0.2)); // Max 20% of subtotal

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some delicious dishes to get started!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.dishId}
                  className="flex gap-4 p-3 rounded-lg border hover-elevate"
                  data-testid={`cart-item-${item.dishId}`}
                >
                  <img
                    src={item.dish.imageUrl}
                    alt={item.dish.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.dish.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{item.dish.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.dishId, item.quantity - 1)}
                        data-testid={`button-decrease-${item.dishId}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center" data-testid={`quantity-${item.dishId}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.dishId, item.quantity + 1)}
                        data-testid={`button-increase-${item.dishId}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onRemoveItem(item.dishId)}
                      data-testid={`button-remove-${item.dishId}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <p className="text-sm font-semibold">
                      ₹{(Number(item.dish.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4 py-4">
              {/* Coupon Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Apply Coupon
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    data-testid="input-coupon"
                  />
                  <Button variant="outline" size="sm" data-testid="button-apply-coupon">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Reward Points */}
              {rewardPoints > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Redeem Reward Points
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min="0"
                      max={maxRewardPoints}
                      value={useRewardPoints}
                      onChange={(e) => setUseRewardPoints(Math.min(Number(e.target.value), maxRewardPoints))}
                      placeholder="0"
                      data-testid="input-reward-points"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      of {rewardPoints} pts
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Save ₹{(useRewardPoints * 0.1).toFixed(2)} • Max {maxRewardPoints} pts
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span data-testid="text-delivery-fee">
                    {deliveryFee === 0 ? (
                      <Badge variant="secondary" className="text-xs">FREE</Badge>
                    ) : (
                      `₹${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Reward Discount</span>
                    <span data-testid="text-discount">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span data-testid="text-total">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => onCheckout(couponCode || undefined, useRewardPoints || undefined)}
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
