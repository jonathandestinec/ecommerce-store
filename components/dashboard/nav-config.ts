import {
  Heart,
  LayoutDashboard,
  LogIn,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tag,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type DashboardNavItem = {
  label: string
  href: string
  icon: LucideIcon
  requiresAuth: boolean
  badgeKey?: "cart"
  description: string
}

export type DashboardNavSection = {
  title: string
  items: DashboardNavItem[]
}

export const dashboardNav: DashboardNavSection[] = [
  {
    title: "Shop",
    items: [
      { label: "Shop", href: "/fashion", icon: Store, requiresAuth: false, description: "Browse collection" },
      { label: "Deals", href: "/#deals", icon: Tag, requiresAuth: false, description: "Monthly deals" },
      { label: "Cart", href: "/cart", icon: ShoppingBag, requiresAuth: false, badgeKey: "cart", description: "Your shopping cart" },
      { label: "Checkout", href: "/checkout", icon: Wallet, requiresAuth: false, description: "Pay with Paystack" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard, requiresAuth: true, description: "Account summary" },
      { label: "Orders", href: "/dashboard/orders", icon: Package, requiresAuth: true, description: "Your order history" },
      { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart, requiresAuth: true, description: "Saved items" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/dashboard/profile", icon: UserRound, requiresAuth: true, description: "Name and phone" },
      { label: "Settings", href: "/dashboard/settings", icon: Settings, requiresAuth: true, description: "Session and sign out" },
    ],
  },
]

export const protectedHrefs = dashboardNav
  .flatMap((s) => s.items)
  .filter((i) => i.requiresAuth)
  .map((i) => i.href.split("#")[0])

export const dashboardTabs = [
  { value: "overview", label: "Overview", href: "/dashboard" },
  { value: "orders", label: "Orders", href: "/dashboard/orders" },
  { value: "wishlist", label: "Wishlist", href: "/dashboard/wishlist" },
  { value: "profile", label: "Profile", href: "/dashboard/profile" },
  { value: "settings", label: "Settings", href: "/dashboard/settings" },
]

export const signInItem: DashboardNavItem = {
  label: "Sign in",
  href: "/login",
  icon: LogIn,
  requiresAuth: false,
  description: "Access your account",
}
