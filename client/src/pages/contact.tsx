import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    console.log(values);
    form.reset();
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: ["123 Spice Street", "Delhi, India - 110001"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@spicepalace.com", "orders@spicepalace.com"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: ["Mon-Sun: 11:00 AM - 11:00 PM", "Delivery: 11:00 AM - 10:30 PM"],
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-contact-title">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" data-testid="input-contact-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            data-testid="input-contact-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" data-testid="input-contact-phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="min-h-[120px]"
                            data-testid="input-contact-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-contact">
                    Send Message
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all"
                data-testid={`card-info-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Map Placeholder */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Find Us</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map integration coming soon</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
