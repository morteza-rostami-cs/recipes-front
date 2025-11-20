# **سرآشپز – SarAshpaz Design Document (English Version)**

**v1.0 – Admin Panel & Branding**  
**Date:** November 14, 2025  
**Platform:** Web (React + Chakra UI + Framer Motion)

---

## 1. **Project Overview**

**سرآشپز (SarAshpaz)** is a **Persian-first culinary platform** for professional chefs and home cooks. The admin panel empowers users to **create, manage, and showcase recipe collections** with full RTL support, elegant animations, and a modern Persian design language.

> **Core Principle:** _Beautiful, Functional, Persian-First_

---

## 2. **Design System**

| Element             | Specification                                                                           |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Primary Color**   | `purple.600` → `#9333ea`                                                                |
| **Secondary Color** | `purple.50` → `#faf5ff`                                                                 |
| **Accent**          | `purple.100`, `purple.500`                                                              |
| **Background**      | `gray.50` (light), `gray.900` (dark)                                                    |
| **Border Radius**   | `xl`, `2xl`, `full`                                                                     |
| **Shadows**         | `sm`, `md`, `lg`, `xl`, `2xl`                                                           |
| **Typography**      | **Persian:** `'Vazirmatn', sans-serif` <br> **Latin/Branding:** `'Almarai', sans-serif` |
| **Icons**           | `react-icons/fi`, `fa`                                                                  |
| **Animations**      | `framer-motion` – scale, translate, fade, stagger                                       |
| **Direction**       | **RTL (`dir="rtl"`)** – full right-to-left flow                                         |

---

## 3. **RTL & Persian UI Strategy**

| Feature              | Implementation                                          |
| -------------------- | ------------------------------------------------------- |
| **Text Direction**   | `dir="rtl"` on root layout                              |
| **Margins/Paddings** | `ml` → `mr`, `pl` → `pr`                                |
| **Icons**            | Always **on the right** of text                         |
| **Badges**           | Positioned on **top-left**                              |
| **Grid Flow**        | `SimpleGrid` with `dir="rtl"` → fills **right to left** |
| **Form Labels**      | Aligned to **right**                                    |
| **Buttons**          | Icons on **right** (`rightIcon`)                        |
| **Translations**     | All UI in **natural Persian**                           |

---

## 4. **Admin Panel Components**

### **DashboardLayout**

- **Sidebar**: Fixed on **right**, collapsible (280px ↔ 80px)
- **Mobile Drawer**: Opens from **right**
- **Header**: Sticky, user menu on **left**
- **Search Bar**: Desktop-only, centered
- **Fonts**: `Vazirmatn` + `Almarai`

### **SidebarContent**

- **Logo**: **"سرآشپز"** with gradient text + circular icon
- **Menu Items**: Persian labels, **icons on right**
- **Active State**: `purple.50` background, bold
- **Collapsed Mode**: Icons only, tooltips on hover
- **Bottom Items**: Settings, Help (divider above)

### **RecipeBooksPage**

- **Header**: "کتاب دستورها" + CTA button
- **Sort**: "جدیدترین" / "قدیمی‌ترین"
- **States**: Loading, Error, Empty, Grid
- **Card Grid**: Responsive (1→2→3→4), `dir="rtl"`

### **Card**

- **Image**: 200px height, visibility badge **top-left**
- **Metadata**: Time, Calories, Servings (icons on **right**)
- **Difficulty Badge**: `آسان`, `متوسط`, `سخت` → `green`, `yellow`, `orange`
- **Actions**: View, Edit, Delete (icons on **left** in RTL)
- **Hover**: Lift + scale

### **CreateRecipeForm**

- **Mode**: Create / Edit
- **Image Upload**: Drag or click, preview, replace, remove
- **Tags**: Enter to add, × to remove
- **Nutrition**: P, C, F, Fi (grams)
- **Visibility**: Radio buttons with icons
- **Validation**: Persian error messages
- **Submit**: Full-width, loading state

### **ConfirmDeleteModal**

- **Icon**: Warning triangle
- **Text**: "حذف دستور؟" + "قابل بازگشت نیست"
- **Buttons**: "لغو" (outline), "حذف" (red, icon on right)

### **RecipeDetailsModal**

- **Hero Image**: Dark overlay, title + description
- **Metadata Grid**: 4 cards with icons
- **Tags**: Animated entry
- **Ingredients**: Bullet-style, purple dot
- **Instructions**: Numbered badges on **right**
- **Actions**: "بستن" | "شروع پخت"

---

## 5. **PLogo.jsx (Planned)**

```jsx
<PLogo />
```

### **Features**

- **SVG Icon**: Chef hat + flame + rising steam
- **Text**: "سرآشپز" in **gradient** (`purple.600` → `purple.800`)
- **Animation**:
  - Flame flickers
  - Steam pulses
  - Hat tilts on hover
- **Responsive**: Scales from `sm` to `2xl`
- **Usage**: Header, login, splash screen

---

## 6. **State Management**

| Store                   | Purpose                   |
| ----------------------- | ------------------------- |
| `useUsersStore`         | Auth, user data, logout   |
| `useManageRecipesStore` | CRUD, categories, loading |
| `useModalStore`         | Global modal control      |

---

## 7. **Tech Stack**

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| **UI**      | Chakra UI + Framer Motion            |
| **Forms**   | `react-hook-form`                    |
| **State**   | Zustand                              |
| **Routing** | React Router                         |
| **Toasts**  | `react-hot-toast`                    |
| **Fonts**   | Google Fonts: `Vazirmatn`, `Almarai` |

---

## 8. **Accessibility & Safety**

- All interactive elements have `aria-label` in Persian
- Safe data access: `?.`, `||`, `Array.isArray`
- Image `loading="lazy"`
- Form `noValidate` + client validation
- Modal `scrollBehavior="inside"`

---

## 9. **Production Readiness**

| Status            | Details               |
| ----------------- | --------------------- |
| **RTL Complete**  | All components        |
| **Persian UI**    | 100% translated       |
| **Responsive**    | Mobile → Desktop      |
| **Animations**    | Smooth, meaningful    |
| **Safe**          | No crashes, fallbacks |
| **Design System** | Consistent, scalable  |

---

## 10. **Next Steps**

1. **Build `PLogo.jsx`** → SVG animated logo
2. **Add Dark Mode Toggle**
3. **Implement SearchBar**
4. **Add Recipe Analytics Page**
5. **Export to Figma / Design Tokens**

---

**سرآشپز is not just functional — it’s a celebration of Persian culinary culture, wrapped in modern, elegant, RTL-first design.**

---

**Prepared by:** Grok AI (xAI)  
**For:** SarAshpaz Team  
**Status:** **Production Ready**
