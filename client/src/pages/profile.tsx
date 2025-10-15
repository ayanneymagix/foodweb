import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Package, Plus, Edit, Trash2, Upload, CheckCircle2, Clock, Truck, Home as HomeIcon, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { User as UserType, Address, Order } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAddressSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ProfileProps {
  user: UserType | null;
  addresses: Address[];
  orders: Order[];
  onAddAddress: (address: any) => void;
  onEditAddress: (id: string, address: any) => void;
  onDeleteAddress: (id: string) => void;
  onLogout: () => void;
}

const orderStatuses = {
  received: { label: "Received", icon: CheckCircle2, color: "text-blue-600" },
  preparing: { label: "Preparing", icon: Clock, color: "text-ring" },
  "out-for-delivery": { label: "Out for Delivery", icon: Truck, color: "text-orange-600" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-green-600" },
};

export default function Profile({ user, addresses, orders, onAddAddress, onEditAddress, onDeleteAddress, onLogout }: ProfileProps) {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(insertAddressSchema),
    defaultValues: {
      userId: user?.id || "",
      type: "home" as const,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      proofImageUrl: "",
      isDefault: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("proofImageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: any) => {
    onAddAddress(values);
    setAddressModalOpen(false);
    form.reset();
    setImagePreview(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-profile-title">
                My Profile
              </h1>
              <p className="text-muted-foreground">Manage your account and orders</p>
            </div>
            <Button variant="outline" onClick={onLogout} data-testid="button-logout">
              Sign Out
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="info" className="space-y-8">
          <TabsList>
            <TabsTrigger value="info" data-testid="tab-info">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="addresses" data-testid="tab-addresses">
              <MapPin className="h-4 w-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="info">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="text-lg font-medium" data-testid="text-user-name">{user.name}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="text-lg font-medium" data-testid="text-user-email">{user.email}</p>
                </div>
                <Separator />
                {user.phone && (
                  <>
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="text-lg font-medium" data-testid="text-user-phone">{user.phone}</p>
                    </div>
                    <Separator />
                  </>
                )}
                <div>
                  <Label className="text-muted-foreground">Reward Points</Label>
                  <p className="text-lg font-medium flex items-center gap-2" data-testid="text-user-points">
                    {user.rewardPoints}
                    <Badge className="bg-ring text-primary-foreground">
                      ₹{(user.rewardPoints * 0.1).toFixed(2)}
                    </Badge>
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Saved Addresses</h2>
                <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-address">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-address-type">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="home">Home</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="addressLine1"
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                  <Input placeholder="Street address" data-testid="input-address-line1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addressLine2"
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormLabel>Address Line 2 (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Apartment, suite, etc." data-testid="input-address-line2" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" data-testid="input-city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" data-testid="input-state" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pincode</FormLabel>
                                <FormControl>
                                  <Input placeholder="123456" data-testid="input-pincode" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="landmark"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Landmark (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Near..." data-testid="input-landmark" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Address Proof (Optional)</Label>
                          <div className="flex items-center gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("proof-upload")?.click()}
                              data-testid="button-upload-proof"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                            <input
                              id="proof-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            {imagePreview && (
                              <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
                            )}
                          </div>
                        </div>

                        <Button type="submit" className="w-full" data-testid="button-submit-address">
                          Save Address
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="grid-addresses">
                {addresses.map((address) => (
                  <Card key={address.id} className="p-6" data-testid={`card-address-${address.id}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {address.type === 'home' && <HomeIcon className="h-5 w-5 text-primary" />}
                        {address.type === 'work' && <Briefcase className="h-5 w-5 text-primary" />}
                        {address.type === 'other' && <MapPin className="h-5 w-5 text-primary" />}
                        <Badge variant={address.isDefault ? "default" : "secondary"}>
                          {address.type}
                        </Badge>
                        {address.isDefault && (
                          <Badge className="bg-ring text-primary-foreground">Default</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onDeleteAddress(address.id)}
                          data-testid={`button-delete-address-${address.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      {address.landmark && <p className="text-muted-foreground">Near: {address.landmark}</p>}
                    </div>
                  </Card>
                ))}
              </div>

              {addresses.length === 0 && (
                <Card className="p-12 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground" data-testid="text-no-addresses">
                    No saved addresses. Add one to get started!
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Order History</h2>
              
              {orders.length === 0 ? (
                <Card className="p-12 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground" data-testid="text-no-orders">
                    No orders yet. Start ordering to see your history!
                  </p>
                </Card>
              ) : (
                <div className="space-y-4" data-testid="list-orders">
                  {orders.map((order) => {
                    const StatusIcon = orderStatuses[order.status as keyof typeof orderStatuses]?.icon || Package;
                    const statusColor = orderStatuses[order.status as keyof typeof orderStatuses]?.color || "text-foreground";
                    
                    return (
                      <Card key={order.id} className="p-6" data-testid={`card-order-${order.id}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                            <Badge className={statusColor}>
                              {orderStatuses[order.status as keyof typeof orderStatuses]?.label || order.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {JSON.parse(order.items).length} items
                            </p>
                            {order.estimatedDeliveryTime && (
                              <p className="text-sm text-muted-foreground">
                                Est. delivery: {order.estimatedDeliveryTime}
                              </p>
                            )}
                          </div>
                          <p className="text-2xl font-bold" data-testid={`text-order-total-${order.id}`}>
                            ₹{order.total}
                          </p>
                        </div>

                        {/* Order Status Timeline */}
                        <div className="mt-6 relative">
                          <div className="flex items-center justify-between">
                            {Object.entries(orderStatuses).map(([key, value], index) => {
                              const isCompleted = Object.keys(orderStatuses).indexOf(order.status) >= index;
                              const Icon = value.icon;
                              
                              return (
                                <div key={key} className="flex flex-col items-center flex-1">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                  }`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <p className="text-xs mt-2 text-center">{value.label}</p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted -z-10">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{
                                width: `${(Object.keys(orderStatuses).indexOf(order.status) / (Object.keys(orderStatuses).length - 1)) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
