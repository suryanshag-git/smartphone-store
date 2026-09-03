export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorHex: string;
  colorSlug: string;
  storage: string;
  storageSlug: string;
  price: number;
  mrp: number;
  image: string;
  gallery: string; // JSON string
  inStock: boolean;
  stockCount: number;
}

export interface EMIPlan {
  id: string;
  productId?: string;
  tenureMonths: number;
  annualInterestRate: number;
  isZeroPercent: boolean;
  cashbackAmount: number;
  cashbackTag?: string;
  mfPledgePercentage: number;
  processingFee: number;
  popularTag?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  mrp: number;
  category: string;
  badge?: string;
  featured: boolean;
  specs: string; // JSON string
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userType: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  shippingAddress: any;
  totalAmount: number;
  downPayment: number;
  emiMonthlyAmount: number;
  emiTenure: number;
  status: string;
  mfPledgeId: string;
  mfPledgedUnits: number;
  mfFundName: string;
  createdAt: string;
  product?: Product;
  emiPlan?: EMIPlan;
}
