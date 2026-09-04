import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding official smartphone variants dataset...');

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.eMIPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.mutualFundPortfolio.deleteMany();

  // 1. Apple iPhone 17 Pro
  await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'Apple iPhone 17 Pro',
      brand: 'Apple',
      description: 'Next-gen flagship with A19 Pro chip, anti-reflective ceramic shield, and 48MP triple camera system.',
      rating: 4.9,
      reviewCount: 428,
      basePrice: 134900,
      mrp: 144900,
      category: 'Flagship',
      badge: 'Flagship Launch',
      featured: true,
      specs: JSON.stringify({
        display: '6.3" Super Retina XDR ProMotion 120Hz OLED',
        chipset: 'Apple A19 Pro (3nm) Neural Engine',
        camera: '48MP Main + 48MP Ultra-Wide + 48MP 5x Optical Telephoto',
        battery: 'Up to 29 hrs Video Playback, 30W Fast Charge'
      }),
      variants: {
        create: [
          // Cosmic Orange (#F15A24) — 256GB, 512GB, 1TB
          {
            color: 'Cosmic Orange',
            colorHex: '#F15A24',
            colorSlug: 'cosmic-orange',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 24
          },
          {
            color: 'Cosmic Orange',
            colorHex: '#F15A24',
            colorSlug: 'cosmic-orange',
            storage: '512GB',
            storageSlug: '512gb',
            price: 154900,
            mrp: 164900,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 18
          },
          {
            color: 'Cosmic Orange',
            colorHex: '#F15A24',
            colorSlug: 'cosmic-orange',
            storage: '1TB',
            storageSlug: '1tb',
            price: 174900,
            mrp: 184900,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          // Deep Blue (#003366) — 256GB, 512GB, 1TB
          {
            color: 'Deep Blue',
            colorHex: '#003366',
            colorSlug: 'deep-blue',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 15
          },
          {
            color: 'Deep Blue',
            colorHex: '#003366',
            colorSlug: 'deep-blue',
            storage: '512GB',
            storageSlug: '512gb',
            price: 154900,
            mrp: 164900,
            image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          },
          {
            color: 'Deep Blue',
            colorHex: '#003366',
            colorSlug: 'deep-blue',
            storage: '1TB',
            storageSlug: '1tb',
            price: 174900,
            mrp: 184900,
            image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          },
          // Silver (#DDDDDD) — 256GB, 512GB, 1TB
          {
            color: 'Silver',
            colorHex: '#DDDDDD',
            colorSlug: 'silver',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 20
          },
          {
            color: 'Silver',
            colorHex: '#DDDDDD',
            colorSlug: 'silver',
            storage: '512GB',
            storageSlug: '512gb',
            price: 154900,
            mrp: 164900,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 14
          },
          {
            color: 'Silver',
            colorHex: '#DDDDDD',
            colorSlug: 'silver',
            storage: '1TB',
            storageSlug: '1tb',
            price: 174900,
            mrp: 184900,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 9
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 7500, cashbackTag: 'Flat ₹7,500 Cashback', popularTag: 'Zero Liquidation Special' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 5000, cashbackTag: 'Flat ₹5,000 Cashback', popularTag: 'Most Popular' },
          { tenureMonths: 12, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 3000, cashbackTag: 'No Cost EMI + ₹3,000 Cashback' },
          { tenureMonths: 24, annualInterestRate: 8.5, isZeroPercent: false, cashbackAmount: 2000 },
          { tenureMonths: 36, annualInterestRate: 10.5, isZeroPercent: false, cashbackAmount: 0 },
          { tenureMonths: 48, annualInterestRate: 11.5, isZeroPercent: false, cashbackAmount: 0 }
        ]
      }
    }
  });

  // 2. Samsung Galaxy S24 Ultra 5G
  await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      description: 'Galaxy AI powered flagship with Titanium armor frame, built-in S-Pen, and 200MP Quad Telephoto camera with 100x zoom.',
      rating: 4.8,
      reviewCount: 312,
      basePrice: 129999,
      mrp: 139999,
      category: 'Flagship',
      badge: 'Best Seller',
      featured: true,
      specs: JSON.stringify({
        display: '6.8" Dynamic AMOLED 2X QHD+ 120Hz Anti-Reflective',
        chipset: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
        camera: '200MP Main + 50MP 5x Zoom + 10MP 3x Zoom + 12MP Ultra-Wide',
        battery: '5000mAh, 45W Super Fast Charging'
      }),
      variants: {
        create: [
          // Titanium Gray (#7B7B7D) — 256GB, 512GB, 1TB
          {
            color: 'Titanium Gray',
            colorHex: '#7B7B7D',
            colorSlug: 'titanium-gray',
            storage: '256GB',
            storageSlug: '256gb',
            price: 129999,
            mrp: 139999,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 15
          },
          {
            color: 'Titanium Gray',
            colorHex: '#7B7B7D',
            colorSlug: 'titanium-gray',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          },
          {
            color: 'Titanium Gray',
            colorHex: '#7B7B7D',
            colorSlug: 'titanium-gray',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 6
          },
          // Titanium Black (#2B2B2C) — 256GB, 512GB, 1TB
          {
            color: 'Titanium Black',
            colorHex: '#2B2B2C',
            colorSlug: 'titanium-black',
            storage: '256GB',
            storageSlug: '256gb',
            price: 129999,
            mrp: 139999,
            image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 20
          },
          {
            color: 'Titanium Black',
            colorHex: '#2B2B2C',
            colorSlug: 'titanium-black',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 15
          },
          {
            color: 'Titanium Black',
            colorHex: '#2B2B2C',
            colorSlug: 'titanium-black',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          },
          // Titanium Violet (#4A3F6B) — 256GB, 512GB, 1TB
          {
            color: 'Titanium Violet',
            colorHex: '#4A3F6B',
            colorSlug: 'titanium-violet',
            storage: '256GB',
            storageSlug: '256gb',
            price: 129999,
            mrp: 139999,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 14
          },
          {
            color: 'Titanium Violet',
            colorHex: '#4A3F6B',
            colorSlug: 'titanium-violet',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 11
          },
          {
            color: 'Titanium Violet',
            colorHex: '#4A3F6B',
            colorSlug: 'titanium-violet',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 5
          },
          // Titanium Yellow (#E5C564) — 256GB, 512GB, 1TB
          {
            color: 'Titanium Yellow',
            colorHex: '#E5C564',
            colorSlug: 'titanium-yellow',
            storage: '256GB',
            storageSlug: '256gb',
            price: 129999,
            mrp: 139999,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          {
            color: 'Titanium Yellow',
            colorHex: '#E5C564',
            colorSlug: 'titanium-yellow',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          },
          {
            color: 'Titanium Yellow',
            colorHex: '#E5C564',
            colorSlug: 'titanium-yellow',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 4
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 6000, cashbackTag: 'Flat ₹6,000 Instant Cashback', popularTag: 'Zero Liquidation Special' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 4000, cashbackTag: 'No Cost EMI for 6 Months', popularTag: 'Most Popular' },
          { tenureMonths: 12, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 2500 }
        ]
      }
    }
  });

  // 3. Google Pixel 9 Pro XL
  await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro XL',
      brand: 'Google',
      description: 'Built for Gemini AI with Super Actua display, Google Tensor G4 chip, and 50MP pro camera with 30x Super Res Zoom.',
      rating: 4.7,
      reviewCount: 189,
      basePrice: 124999,
      mrp: 134999,
      category: 'AI Smartphone',
      badge: 'AI Special',
      featured: true,
      specs: JSON.stringify({
        display: '6.8" LTPO Super Actua OLED 120Hz 3000 nits Peak',
        chipset: 'Google Tensor G4 with Titan M2 Security',
        camera: '50MP Main + 48MP Ultra-Wide + 48MP 5x Telephoto',
        battery: '5060mAh, 37W Fast Charge'
      }),
      variants: {
        create: [
          // Obsidian (#1E1F22) — 128GB, 256GB, 512GB, 1TB
          {
            color: 'Obsidian',
            colorHex: '#1E1F22',
            colorSlug: 'obsidian',
            storage: '128GB',
            storageSlug: '128gb',
            price: 114999,
            mrp: 124999,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 22
          },
          {
            color: 'Obsidian',
            colorHex: '#1E1F22',
            colorSlug: 'obsidian',
            storage: '256GB',
            storageSlug: '256gb',
            price: 124999,
            mrp: 134999,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 20
          },
          {
            color: 'Obsidian',
            colorHex: '#1E1F22',
            colorSlug: 'obsidian',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 14
          },
          {
            color: 'Obsidian',
            colorHex: '#1E1F22',
            colorSlug: 'obsidian',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          },
          // Porcelain (#F0EFEB) — 128GB, 256GB, 512GB, 1TB
          {
            color: 'Porcelain',
            colorHex: '#F0EFEB',
            colorSlug: 'porcelain',
            storage: '128GB',
            storageSlug: '128gb',
            price: 114999,
            mrp: 124999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 18
          },
          {
            color: 'Porcelain',
            colorHex: '#F0EFEB',
            colorSlug: 'porcelain',
            storage: '256GB',
            storageSlug: '256gb',
            price: 124999,
            mrp: 134999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 16
          },
          {
            color: 'Porcelain',
            colorHex: '#F0EFEB',
            colorSlug: 'porcelain',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          {
            color: 'Porcelain',
            colorHex: '#F0EFEB',
            colorSlug: 'porcelain',
            storage: '1TB',
            storageSlug: '1tb',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 6
          },
          // Hazel (#5E625B) — 128GB, 256GB, 512GB, 1TB
          {
            color: 'Hazel',
            colorHex: '#5E625B',
            colorSlug: 'hazel',
            storage: '256GB',
            storageSlug: '256gb',
            price: 124999,
            mrp: 134999,
            image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          },
          {
            color: 'Hazel',
            colorHex: '#5E625B',
            colorSlug: 'hazel',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          },
          // Rose Quartz (#E8C5C8) — 128GB, 256GB, 512GB, 1TB
          {
            color: 'Rose Quartz',
            colorHex: '#E8C5C8',
            colorSlug: 'rose-quartz',
            storage: '256GB',
            storageSlug: '256gb',
            price: 124999,
            mrp: 134999,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          {
            color: 'Rose Quartz',
            colorHex: '#E8C5C8',
            colorSlug: 'rose-quartz',
            storage: '512GB',
            storageSlug: '512gb',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 6
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 5000, cashbackTag: '₹5,000 Cashback on MF Backing' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 3000, cashbackTag: '0% Interest No-Cost Plan', popularTag: 'Recommended' },
          { tenureMonths: 12, annualInterestRate: 8.5, isZeroPercent: false, cashbackAmount: 1500 }
        ]
      }
    }
  });

  // 4. OnePlus 12 5G
  await prisma.product.create({
    data: {
      slug: 'oneplus-12',
      name: 'OnePlus 12 5G',
      brand: 'OnePlus',
      description: 'Co-developed with Hasselblad, 4th Gen Hasselblad Camera System, 2K 120Hz ProXDR display, 5400mAh battery with 100W SUPERVOOC.',
      rating: 4.8,
      reviewCount: 265,
      basePrice: 64999,
      mrp: 69999,
      category: 'Performance',
      badge: 'Value Flagship',
      featured: true,
      specs: JSON.stringify({
        display: '6.82" 2K 120Hz LTPO AMOLED 4500 nits',
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        camera: '50MP Sony LYT-808 + 64MP Periscope + 48MP Ultra-Wide',
        battery: '5400mAh, 100W Wired + 50W AIRVOOC'
      }),
      variants: {
        create: [
          // Flowy Emerald (#1C4D43) — 256GB, 512GB
          {
            color: 'Flowy Emerald',
            colorHex: '#1C4D43',
            colorSlug: 'flowy-emerald',
            storage: '256GB',
            storageSlug: '256gb',
            price: 64999,
            mrp: 69999,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 30
          },
          {
            color: 'Flowy Emerald',
            colorHex: '#1C4D43',
            colorSlug: 'flowy-emerald',
            storage: '512GB',
            storageSlug: '512gb',
            price: 69999,
            mrp: 74999,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 20
          },
          // Silky Black (#1C1C1E) — 256GB, 512GB
          {
            color: 'Silky Black',
            colorHex: '#1C1C1E',
            colorSlug: 'silky-black',
            storage: '256GB',
            storageSlug: '256gb',
            price: 64999,
            mrp: 69999,
            image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 25
          },
          {
            color: 'Silky Black',
            colorHex: '#1C1C1E',
            colorSlug: 'silky-black',
            storage: '512GB',
            storageSlug: '512gb',
            price: 69999,
            mrp: 74999,
            image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 14
          },
          // Glacial White (#F4F5F7) — 256GB, 512GB
          {
            color: 'Glacial White',
            colorHex: '#F4F5F7',
            colorSlug: 'glacial-white',
            storage: '256GB',
            storageSlug: '256gb',
            price: 64999,
            mrp: 69999,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 18
          },
          {
            color: 'Glacial White',
            colorHex: '#F4F5F7',
            colorSlug: 'glacial-white',
            storage: '512GB',
            storageSlug: '512gb',
            price: 69999,
            mrp: 74999,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 3000, cashbackTag: '₹3,000 Instant MF Voucher' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 2000, cashbackTag: 'Zero Interest EMI', popularTag: 'Best Value' },
          { tenureMonths: 12, annualInterestRate: 7.5, isZeroPercent: false, cashbackAmount: 1000 }
        ]
      }
    }
  });

  // 5. Xiaomi 14 Ultra
  await prisma.product.create({
    data: {
      slug: 'xiaomi-14-ultra',
      name: 'Xiaomi 14 Ultra (Leica Quad Camera)',
      brand: 'Xiaomi',
      description: 'Leica Summilux optical lens with 1-inch Sony LYT-900 sensor and stepless variable aperture.',
      rating: 4.6,
      reviewCount: 140,
      basePrice: 99999,
      mrp: 119999,
      category: 'Photography',
      badge: 'Leica Optics',
      featured: false,
      specs: JSON.stringify({
        display: '6.73" WQHD+ AMOLED 120Hz Dolby Vision',
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        camera: '50MP 1" Main + 50MP 75mm Tele + 50MP 120mm Periscope + 50MP Ultra-Wide',
        battery: '5000mAh, 90W HyperCharge + 80W Wireless'
      }),
      variants: {
        create: [
          // Black (Vegan Leather) (#121212) — 512GB
          {
            color: 'Black (Vegan Leather)',
            colorHex: '#121212',
            colorSlug: 'black-vegan-leather',
            storage: '512GB',
            storageSlug: '512gb',
            price: 99999,
            mrp: 119999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          },
          // White (Vegan Leather) (#FDFDFD) — 512GB
          {
            color: 'White (Vegan Leather)',
            colorHex: '#FDFDFD',
            colorSlug: 'white-vegan-leather',
            storage: '512GB',
            storageSlug: '512gb',
            price: 99999,
            mrp: 119999,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          // Titanium Gray (#6B6B6D) — 512GB
          {
            color: 'Titanium Gray',
            colorHex: '#6B6B6D',
            colorSlug: 'titanium-gray',
            storage: '512GB',
            storageSlug: '512gb',
            price: 109999,
            mrp: 129999,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 6
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 4000, cashbackTag: '₹4,000 MF Backed Discount' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 2500, cashbackTag: 'No Cost EMI 6 Months' }
        ]
      }
    }
  });

  // 6. Vivo X100 Pro 5G
  await prisma.product.create({
    data: {
      slug: 'vivo-x100-pro',
      name: 'Vivo X100 Pro 5G (ZEISS APO Telephoto)',
      brand: 'Vivo',
      description: 'ZEISS APO Floating Telephoto Camera with Dimensity 9300 flagship chip and V3 Imaging Chip.',
      rating: 4.7,
      reviewCount: 96,
      basePrice: 89999,
      mrp: 96999,
      category: 'Photography',
      badge: 'ZEISS Optics',
      featured: false,
      specs: JSON.stringify({
        display: '6.78" 8B LTPO AMOLED 120Hz 3000 nits',
        chipset: 'MediaTek Dimensity 9300 (4nm) + Vivo V3 Chip',
        camera: '50MP 1" ZEISS Main + 50MP ZEISS APO Tele + 50MP Ultra-Wide',
        battery: '5400mAh, 100W FlashCharge'
      }),
      variants: {
        create: [
          // Asteroid Black (#232428) — 512GB
          {
            color: 'Asteroid Black',
            colorHex: '#232428',
            colorSlug: 'asteroid-black',
            storage: '512GB',
            storageSlug: '512gb',
            price: 89999,
            mrp: 96999,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 15
          },
          // Sunset Orange (#E85A2A) — 512GB
          {
            color: 'Sunset Orange',
            colorHex: '#E85A2A',
            colorSlug: 'sunset-orange',
            storage: '512GB',
            storageSlug: '512gb',
            price: 89999,
            mrp: 96999,
            image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 10
          },
          // Moonlight White (#F5F5F7) — 512GB
          {
            color: 'Moonlight White',
            colorHex: '#F5F5F7',
            colorSlug: 'moonlight-white',
            storage: '512GB',
            storageSlug: '512gb',
            price: 89999,
            mrp: 96999,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 12
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 3500, cashbackTag: '₹3,500 Cashback Pill' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 2000 }
        ]
      }
    }
  });

  // Seed sample Mutual Fund portfolio
  await prisma.mutualFundPortfolio.create({
    data: {
      userPhone: '9876543210',
      userName: 'Rahul Sharma',
      panNumber: 'ABCDE1234F',
      totalPortfolioValue: 485000,
      eligiblePledgeLimit: 363750,
      holdings: JSON.stringify([
        { fundName: 'HDFC Top 100 Fund Direct Growth', folionumber: '10293847', category: 'Large Cap', units: 142.5, nav: 820.4, currentPrice: 116907, annualizedReturn: '+18.4%' },
        { fundName: 'Parag Parikh Flexi Cap Fund Direct', folionumber: '55443322', category: 'Flexi Cap', units: 310.8, nav: 78.2, currentPrice: 243045, annualizedReturn: '+22.1%' },
        { fundName: 'Nippon India Small Cap Fund Direct', folionumber: '99887766', category: 'Small Cap', units: 620.0, nav: 201.6, currentPrice: 125048, annualizedReturn: '+28.7%' }
      ])
    }
  });

  console.log('Seeding official smartphone variants completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
