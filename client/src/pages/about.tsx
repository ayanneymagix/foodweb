import { Card } from "@/components/ui/card";
import { ChefHat, Heart, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import restaurantImage from "@assets/stock_images/indian_restaurant_in_bc90e018.jpg";
import restaurantImage2 from "@assets/stock_images/indian_restaurant_in_497ea6d6.jpg";

export default function About() {
  const values = [
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Authentic Recipes",
      description: "Traditional recipes passed down through generations, preserving the rich heritage of North Indian cuisine.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Made with Love",
      description: "Every dish is crafted with passion and care, using only the finest and freshest ingredients.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award Winning",
      description: "Recognized for excellence in taste, quality, and service by food critics and customers alike.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Tradition",
      description: "A family-owned restaurant bringing authentic North Indian flavors to your table since 1985.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${restaurantImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary-foreground" data-testid="text-about-title">
              Our Story
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed font-accent">
              A journey of flavors, tradition, and passion spanning over three decades
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">The Legacy of Spice Palace</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1985 by Master Chef Rajesh Kumar, Spice Palace began as a small family restaurant 
                  with a simple mission: to share the authentic flavors of North Indian cuisine with the world.
                </p>
                <p>
                  Our recipes have been carefully preserved and passed down through generations, each dish 
                  telling a story of tradition, culture, and culinary excellence. From the rich, creamy 
                  Paneer Butter Masala to the slow-cooked Dal Makhani, every item on our menu reflects 
                  our commitment to authenticity.
                </p>
                <p>
                  Today, Spice Palace continues to honor its heritage while embracing modern conveniences. 
                  We've brought our beloved dishes to your doorstep, ensuring that the same quality and 
                  taste that made us famous reaches you fresh and hot.
                </p>
                <p>
                  Our chefs use only the finest ingredients, traditional cooking methods, and age-old 
                  recipes to create dishes that transport you to the vibrant streets and royal kitchens 
                  of North India.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={restaurantImage2}
                alt="Our Restaurant"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover-elevate transition-all" data-testid={`card-value-${index}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6" data-testid="text-chef-title">Meet Our Master Chef</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Chef Rajesh Kumar brings over 40 years of culinary expertise, having trained in the 
              royal kitchens of Rajasthan and perfected his craft in the bustling streets of Delhi. 
              His passion for authentic North Indian cuisine and dedication to quality has made 
              Spice Palace a beloved name in traditional Indian cooking.
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">40+</p>
                <p>Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p>Signature Dishes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p>Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
