import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ChefHat, Clock, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroImage from "@assets/stock_images/indian_curry_dish_in_b55f67a3.jpg";
import dish1 from "@assets/stock_images/indian_curry_dish_in_135a477d.jpg";
import dish2 from "@assets/stock_images/indian_curry_dish_in_4dec4710.jpg";
import spices from "@assets/stock_images/indian_spices_colorf_cc65f1d4.jpg";

export default function Home() {
  const chefSpecials = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      description: "Cottage cheese in rich creamy tomato gravy",
      price: "₹299",
      image: heroImage,
      badge: "Chef's Special",
    },
    {
      id: 2,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils with butter and cream",
      price: "₹249",
      image: dish1,
      badge: "Popular",
    },
    {
      id: 3,
      name: "Butter Naan",
      description: "Soft leavened bread with butter",
      price: "₹49",
      image: dish2,
      badge: "Best Seller",
    },
  ];

  const features = [
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Expert Chefs",
      description: "Authentic recipes passed down through generations",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Quick Delivery",
      description: "Fresh food delivered to your doorstep in 30 mins",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Only the finest ingredients for the best taste",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateZ(0)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Spices Background Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url(${spices})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-ring/20 backdrop-blur-sm text-ring border-ring/30" data-testid="badge-hero">
                <Star className="h-3 w-3 mr-1 fill-ring" />
                Authentic North Indian Cuisine
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-primary-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="text-hero-title"
            >
              Taste the Royal
              <br />
              <span className="bg-gradient-to-r from-ring to-primary bg-clip-text text-transparent">
                Heritage
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed font-accent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              data-testid="text-hero-description"
            >
              Experience the rich flavors of traditional North Indian cuisine, crafted with love and served with passion.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/menu">
                <Button 
                  size="lg" 
                  className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-2xl"
                  data-testid="button-order-now"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 backdrop-blur-md bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
                  data-testid="button-explore-menu"
                >
                  Explore Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-ring rounded-full animate-bounce-subtle" />
          </div>
        </motion.div>
      </section>

      {/* Chef's Specials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-chef-specials-title">
              Chef's Special Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked dishes by our master chef, prepared with authentic spices and traditional methods
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefSpecials.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover-elevate transition-all duration-300" data-testid={`card-special-${dish.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-ring text-primary-foreground border-0">
                      {dish.badge}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{dish.price}</span>
                      <Link href="/menu">
                        <Button size="sm" data-testid={`button-view-${dish.id}`}>View Details</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/menu">
              <Button size="lg" variant="outline" data-testid="button-view-full-menu">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`feature-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-destructive to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${spices})`, backgroundSize: 'cover' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary-foreground" data-testid="text-cta-title">
              Ready to Experience Authentic Flavors?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Order now and get 100 reward points on your first order!
            </p>
            <Link href="/menu">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8"
                data-testid="button-start-order"
              >
                Start Your Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
