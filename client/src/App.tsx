import { Switch, Route } from "wouter";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";
import Footer from "@/components/Footer"; // Import the Footer

import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Rewards from "@/pages/rewards";
import Profile from "@/pages/profile";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

import type { Dish, CartItem, User, Address, Order, Coupon, RewardHistory } from "@shared/schema";

function AppContent() {
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
        }
      } catch (error) {
        // User not authenticated, continue without user
      }
    };

    checkAuthStatus();
  }, []);

  // Fetch dishes
  const { data: dishes = [] } = useQuery<Dish[]>({
    queryKey: ["/api/dishes"],
  });

  // Fetch user addresses
  const { data: addresses = [] } = useQuery<Address[]>({
    queryKey: ["/api/addresses/user", currentUser?.id],
    enabled: !!currentUser?.id,
  });

  // Fetch user orders
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders/user", currentUser?.id],
    enabled: !!currentUser?.id,
  });

  // Fetch active coupons
  const { data: coupons = [] } = useQuery<Coupon[]>({
    queryKey: ["/api/coupons"],
    queryFn: async () => {
      const res = await fetch("/api/coupons?active=true");
      if (!res.ok) throw new Error("Failed to fetch coupons");
      return res.json();
    },
  });

  // Fetch reward history
  const { data: rewardHistory = [] } = useQuery<RewardHistory[]>({
    queryKey: ["/api/rewards/user", currentUser?.id],
    enabled: !!currentUser?.id,
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string; phone?: string }) => {
      return await apiRequest<User>("POST", "/api/auth/signup", data);
    },
    onSuccess: (user: User) => {
      setCurrentUser(user);
      setAuthModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/rewards/user", user.id] });
      toast({
        title: "Account created!",
        description: "You've earned 150 welcome bonus points!",
      });
    },
    onError: () => {
      toast({
        title: "Signup failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await apiRequest<User>("POST", "/api/auth/login", data);
    },
    onSuccess: (user: User) => {
      setCurrentUser(user);
      setAuthModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/addresses/user", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders/user", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/rewards/user", user.id] });
      toast({
        title: "Welcome back!",
        description: `Signed in as ${user.email}`,
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: async (address: any) => {
      return await apiRequest<Address>("POST", "/api/addresses", address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses/user", currentUser?.id] });
      toast({
        title: "Address saved",
        description: "Your address has been saved successfully",
      });
    },
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/addresses/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses/user", currentUser?.id] });
      toast({
        title: "Address deleted",
        description: "Your address has been deleted",
      });
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest<Order>("POST", "/api/orders", orderData);
    },
    onSuccess: (order: Order) => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/user", currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/rewards/user", currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", currentUser?.id] });
      
      // Refresh current user to get updated reward points
      if (currentUser) {
        fetch(`/api/users/${currentUser.id}`)
          .then(res => res.json())
          .then(updatedUser => setCurrentUser(updatedUser));
      }

      setCart([]);
      setCartOpen(false);

      const pointsEarned = Math.floor(Number(order.total) / 10);
      toast({
        title: "Order placed successfully!",
        description: `Your order will be delivered in ${order.estimatedDeliveryTime}. You earned ${pointsEarned} reward points!`,
      });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dishId: dish.id, dish, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.dishId !== dishId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.dishId === dishId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dishId !== dishId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const handleCheckout = (couponCode?: string, rewardPoints?: number) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      toast({
        title: "Please sign in",
        description: "You need to sign in to place an order",
      });
      return;
    }

    if (addresses.length === 0) {
      toast({
        title: "Add an address",
        description: "Please add a delivery address to continue",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + Number(item.dish.price) * item.quantity, 0);
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const discount = (rewardPoints || 0) * 0.1;
    const total = subtotal + deliveryFee - discount;

    const orderData = {
      userId: currentUser.id,
      addressId: addresses.find(a => a.isDefault)?.id || addresses[0].id,
      items: JSON.stringify(cart),
      subtotal: subtotal.toString(),
      discount: discount.toString(),
      deliveryFee: deliveryFee.toString(),
      total: total.toString(),
      couponCode: couponCode || null,
      rewardPointsUsed: rewardPoints || 0,
      status: "received",
      scheduledFor: null,
      estimatedDeliveryTime: "30-40 mins",
    };

    createOrderMutation.mutate(orderData);
  };

  const handleLogin = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  const handleSignup = (name: string, email: string, password: string, phone?: string) => {
    signupMutation.mutate({ name, email, password, phone });
  };

  const handleAddAddress = (address: any) => {
    addAddressMutation.mutate(address);
  };

  const handleEditAddress = (id: string, address: any) => {
    // TODO: Implement edit mutation
    toast({
      title: "Feature coming soon",
      description: "Edit address feature will be available soon",
    });
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddressMutation.mutate(id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    queryClient.clear();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthModalOpen(true)}
        isAuthenticated={!!currentUser}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main content area that grows to fill available space */}
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu">
            <Menu dishes={dishes} onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/rewards">
            <Rewards
              rewardPoints={currentUser?.rewardPoints || 0}
              rewardHistory={rewardHistory}
              coupons={coupons}
            />
          </Route>
          <Route path="/profile">
            <Profile
              user={currentUser}
              addresses={addresses}
              orders={orders}
              onAddAddress={handleAddAddress}
              onEditAddress={handleEditAddress}
              onDeleteAddress={handleDeleteAddress}
              onLogout={handleLogout}
            />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Footer sticks to bottom */}
      <Footer />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        rewardPoints={currentUser?.rewardPoints || 0}
      />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;