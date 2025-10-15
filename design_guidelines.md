# Design Guidelines: Premium North Indian Restaurant Food Ordering Website

## Design Approach & Philosophy

**Reference-Based Approach**: Drawing inspiration from iman-gadzhi.com's animation polish and sophisticated interactions, combined with elevated food industry standards that surpass Foodie Crush. The design creates an immersive, mouth-watering experience that feels premium and modern.

**Core Principle**: Every element should evoke the warmth, richness, and premium quality of North Indian cuisine while maintaining smooth, purposeful interactions that enhance rather than distract.

---

## Color Palette

### Primary Colors (Dark Mode First)
- **Deep Maroon**: 350 75% 25% - Primary brand color, navigation, CTAs
- **Rich Gold**: 42 85% 55% - Accent for highlights, premium touches, badges
- **Warm Cream**: 38 60% 92% - Text on dark backgrounds, card backgrounds
- **Saffron Red**: 12 80% 45% - Secondary accent, alerts, special offers

### Supporting Colors
- **Deep Green**: 145 35% 20% - Success states, veg indicators
- **Charcoal**: 0 0% 12% - Main backgrounds, cards
- **Soft Burgundy**: 350 40% 15% - Section dividers, subtle backgrounds

---

## Typography

### Font Families
- **Headings**: "Playfair Display" (serif) - elegant, sophisticated, premium feel
- **Body**: "Inter" (sans-serif) - clean, highly readable, modern
- **Accents**: "Cormorant Garamond" (serif) - for special callouts, taglines

### Type Scale
- Hero Headline: text-6xl md:text-7xl lg:text-8xl font-bold
- Section Headers: text-4xl md:text-5xl font-semibold
- Dish Titles: text-2xl font-medium
- Body Text: text-base leading-relaxed
- Small Text: text-sm

---

## Layout System

### Spacing Primitives
Primary spacing units: **2, 4, 6, 8, 12, 16, 20, 24, 32**
- Micro spacing: p-2, gap-4
- Component spacing: p-6, p-8
- Section spacing: py-16, py-20, py-24, py-32
- Large margins: mb-12, mt-16

### Grid System
- Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Dish Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Feature Sections: 2-column layouts on desktop, stack on mobile

---

## Component Design

### Hero Section
- Full viewport height (min-h-screen) with parallax background layers
- High-quality hero image of signature dish with slow-motion steam overlay
- Layered elements: background image → translucent gradient → content
- Auto-reveal animation sequence: tagline (fade up) → CTA (scale in) → scroll indicator (bounce)
- Chef specials carousel with smooth slide transitions, 3-5 second auto-advance

### Dish Cards
- Elevated design with rounded-2xl, overflow-hidden
- Image container with aspect-square, object-cover
- Hover state: scale-105 transform, shadow-2xl, overlay with "Add to Cart" button
- Scroll reveal: fade-up + slight scale (0.95 → 1) using Framer Motion
- Badge overlays for "Popular", "New", "Chef's Special" in gold

### Navigation
- Sticky header with blur backdrop (backdrop-blur-lg bg-charcoal/80)
- Smooth transitions between sections, highlight active section
- Mobile: slide-in drawer with stagger animation for menu items
- Cart icon with animated badge showing item count

### Cart Drawer
- Slide-in from right, backdrop blur overlay
- Real-time updates with subtle bounce animation on item add
- Coupon input field with gold border on focus
- Reward points display with progress bar animation
- Sticky checkout button at bottom with pulse effect

### Address Management
- Card-based layout with radio button selection
- "Add New Address" modal with smooth fade + scale entrance
- Address proof upload with drag-drop zone, preview thumbnail
- Edit/delete with confirm modal, slide-out animation on delete

### Rewards & Coupons Section
- Points balance displayed prominently with animated counter on load
- Coupon cards with dashed border, shimmer effect on active coupons
- "Copy Code" with success feedback (checkmark + color change)
- Expiration countdown with urgency styling (red when < 24hrs)

### Order Tracking
- Horizontal timeline with animated progress bar
- Status icons with check animations when reached
- Estimated time with live countdown
- Delivery person details card with call/message buttons

---

## Animation Strategy

### Page Transitions
- Framer Motion page variants: fade + slide (20px vertical offset)
- 0.4s duration with easeInOut easing
- Maintain scroll position on navigation

### Scroll-Triggered Animations
- Dish cards: stagger children, fade-up from y: 40, scale: 0.95
- Section headers: slide from left with 0.2s delay
- Images: fade + slight parallax (transform: translateY)
- Use Intersection Observer, trigger at 20% visibility

### Micro-Interactions
- Button hover: scale-105, shadow-lg, 0.2s transition
- Image zoom: scale-110 on hover, smooth 0.3s ease
- Form focus: border-2 border-gold, shadow-gold glow
- Cart badge: bounce animation on count change
- Loading states: skeleton screens with shimmer gradient

### Background Effects
- Subtle floating spice/particle elements (very minimal, low opacity)
- Parallax layers: background moves 0.5x scroll speed, foreground 1.2x
- Hero section: slow ken burns effect on background image

---

## Images & Media

### Hero Images
- **Primary Hero**: High-resolution shot of Paneer Butter Masala in elegant bowl, steam rising, garnished with cream swirl and cilantro. Warm lighting, shallow depth of field.
- **Secondary Heroes**: Dal Makhani in traditional copper bowl, Butter Naan stack with butter melting

### Dish Photography
- Consistent styling: overhead or 45° angle shots
- Dark wooden or slate backgrounds for contrast
- Warm, appetizing lighting with highlights on textures
- Garnish visible, steam effects where appropriate

### Background Elements
- Textured overlays: subtle fabric patterns, traditional Indian motifs at 5% opacity
- Ingredient close-ups as blurred backgrounds (spices, grains)

---

## Responsive Behavior

### Breakpoints
- Mobile: < 768px - single column, simplified animations
- Tablet: 768px - 1024px - 2 columns, medium animations
- Desktop: > 1024px - 3 columns, full animation suite

### Mobile Optimizations
- Reduce parallax intensity to 0.3x
- Simplify reveal animations (fade only, no scale)
- Sticky "View Cart" FAB in bottom-right
- Swipe gestures for carousel navigation

---

## Interactive States

### Buttons & CTAs
- Primary: bg-maroon, hover:bg-maroon/90, active:scale-95
- Outline on images: backdrop-blur-md, border-cream/40, bg-cream/10
- Disabled: opacity-50, cursor-not-allowed

### Form Elements
- Inputs: border-cream/20, focus:border-gold, bg-charcoal/50
- Dropdowns: animated chevron rotation on open
- Checkboxes/Radio: custom styled with gold checkmarks

### Error & Success States
- Success: green border, slide-in checkmark icon
- Error: red border, shake animation, error text fade-in
- Loading: gold spinner with rotation animation

---

## Accessibility & Performance

- Color contrast ratio minimum 4.5:1 for text
- Focus indicators: 2px gold outline with 4px offset
- Keyboard navigation with visible focus states
- Lazy load images below fold, blur-up technique
- Reduce motion: respect prefers-reduced-motion
- Semantic HTML with proper ARIA labels