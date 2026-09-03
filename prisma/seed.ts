import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding smartphone store database...');

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.eMIPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.mutualFundPortfolio.deleteMany();

  // 1. Apple iPhone 17 Pro
  const iphone17 = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'Apple iPhone 17 Pro',
      brand: 'Apple',
      description: 'The pinnacle of smartphone innovation featuring the A19 Pro 3nm chip, grade-5 titanium unibody, anti-reflective ceramic shield, and 48MP triple tetraprism zoom studio camera system.',
      rating: 4.9,
      reviewCount: 428,
      basePrice: 134900,
      mrp: 144900,
      category: 'Flagship',
      badge: 'Flagship Launch',
      featured: true,
      specs: JSON.stringify({
        display: '6.3" Super Retina XDR ProMotion 120Hz Always-On OLED',
        chipset: 'Apple A19 Pro (3nm) Neural Engine',
        camera: '48MP Main + 48MP Ultra-Wide + 48MP 5x Optical Telephoto',
        battery: 'Up to 29 hrs Video Playback, 30W Fast Charge',
        os: 'iOS 19 with Apple Intelligence',
        warranty: '1 Year Apple India Warranty'
      }),
      variants: {
        create: [
          {
            color: 'Natural Titanium',
            colorHex: '#8A8682',
            colorSlug: 'natural-titanium',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify([
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop'
            ]),
            inStock: true,
            stockCount: 24
          },
          {
            color: 'Natural Titanium',
            colorHex: '#8A8682',
            colorSlug: 'natural-titanium',
            storage: '512GB',
            storageSlug: '512gb',
            price: 154900,
            mrp: 164900,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify([
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop'
            ]),
            inStock: true,
            stockCount: 18
          },
          {
            color: 'Desert Titanium',
            colorHex: '#D2B48C',
            colorSlug: 'desert-titanium',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify([
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop'
            ]),
            inStock: true,
            stockCount: 12
          },
          {
            color: 'White Titanium',
            colorHex: '#F5F5F7',
            colorSlug: 'white-titanium',
            storage: '256GB',
            storageSlug: '256gb',
            price: 134900,
            mrp: 144900,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify([
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop'
            ]),
            inStock: true,
            stockCount: 9
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 7500, cashbackTag: 'Additional cashback of ₹7,500', popularTag: 'Zero Liquidation Special' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 5000, cashbackTag: 'Additional cashback of ₹5,000', popularTag: 'Most Popular' },
          { tenureMonths: 12, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 3000, cashbackTag: 'No Cost EMI + ₹3,000 Cashback' },
          { tenureMonths: 24, annualInterestRate: 8.5, isZeroPercent: false, cashbackAmount: 2000, cashbackTag: 'Lowest Monthly Payment' },
          { tenureMonths: 36, annualInterestRate: 10.5, isZeroPercent: false, cashbackAmount: 0 },
          { tenureMonths: 48, annualInterestRate: 11.5, isZeroPercent: false, cashbackAmount: 0 },
          { tenureMonths: 60, annualInterestRate: 12.0, isZeroPercent: false, cashbackAmount: 0 }
        ]
      }
    }
  });

  // 2. Samsung Galaxy S24 Ultra
  await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      description: 'Powered by Galaxy AI, integrated S-Pen, Titanium armor frame, 200MP Quad Telephoto camera with 100x Space Zoom, and Snapdragon 8 Gen 3 for Galaxy.',
      rating: 4.8,
      reviewCount: 312,
      basePrice: 129999,
      mrp: 139999,
      category: 'Flagship',
      badge: 'Best Seller',
      featured: true,
      specs: JSON.stringify({
        display: '6.8" Dynamic AMOLED 2X QHD+ 120Hz Anti-Reflective Glass',
        chipset: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
        camera: '200MP Main + 50MP 5x Zoom + 10MP 3x Zoom + 12MP Ultra-Wide',
        battery: '5000mAh, 45W Super Fast Charging 2.0',
        os: 'Android 14 with One UI 6.1 (7 Years OS Updates)',
        spen: 'Built-in Bluetooth S-Pen with Air Actions'
      }),
      variants: {
        create: [
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
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 6000, cashbackTag: 'Flat ₹6,000 Instant MF Cashback', popularTag: 'Zero Liquidation Special' },
          { tenureMonths: 6, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 4000, cashbackTag: 'No Cost EMI for 6 Months', popularTag: 'Most Popular' },
          { tenureMonths: 12, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 2500, cashbackTag: 'Special MF SIP Discount' },
          { tenureMonths: 24, annualInterestRate: 9.0, isZeroPercent: false, cashbackAmount: 1000 }
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
      description: 'Built for Gemini AI advanced features, pro camera controls, Super Actua display, Google Tensor G4 security chip, and 7 years of Pixel Drops.',
      rating: 4.7,
      reviewCount: 189,
      basePrice: 124999,
      mrp: 134999,
      category: 'AI Smartphone',
      badge: 'AI Special',
      featured: true,
      specs: JSON.stringify({
        display: '6.8" LTPO Super Actua OLED 120Hz 3000 nits Peak',
        chipset: 'Google Tensor G4 with Titan M2 Security Coprocessor',
        camera: '50MP Octa PD Main + 48MP Quad PD Ultra-Wide + 48MP 5x Telephoto',
        battery: '5060mAh, 37W Fast Charge & Qi2 Wireless',
        os: 'Android 15 with Gemini Nano & Magic Editor'
      }),
      variants: {
        create: [
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
            color: 'Hazel',
            colorHex: '#5E625B',
            colorSlug: 'hazel',
            storage: '512GB',
            storageSlug: '512gb',
            price: 134999,
            mrp: 144999,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 8
          }
        ]
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, annualInterestRate: 0.0, isZeroPercent: true, cashbackAmount: 5000, cashbackTag: '₹5,000 Cashback on Mutual Fund Backing' },
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
      description: 'Co-developed with Hasselblad, 4th Gen Hasselblad Camera System, 2K 120Hz ProXDR display, 5400mAh battery with 100W SUPERVOOC charging.',
      rating: 4.8,
      reviewCount: 265,
      basePrice: 64999,
      mrp: 69999,
      category: 'Performance',
      badge: 'Value Flagship',
      featured: true,
      specs: JSON.stringify({
        display: '6.82" 2K 120Hz LTPO AMOLED 4500 nits Peak Brightness',
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        camera: '50MP Sony LYT-808 + 64MP 3x Periscope Telephoto + 48MP Ultra-Wide',
        battery: '5400mAh dual-cell, 100W Wired + 50W AIRVOOC Wireless'
      }),
      variants: {
        create: [
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
      description: 'Leica Summilux optical lens system, 1-inch Sony LYT-900 sensor with stepless variable aperture f/1.63-f/4.0, WQHD+ AMOLED display.',
      rating: 4.6,
      reviewCount: 140,
      basePrice: 99999,
      mrp: 119999,
      category: 'Photography',
      badge: 'Leica Optics',
      featured: false,
      specs: JSON.stringify({
        display: '6.73" WQHD+ AMOLED 120Hz Dolby Vision 3000 nits',
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        camera: '50MP 1" Main + 50MP 75mm Telephoto + 50MP 120mm Periscope + 50MP Ultra-Wide',
        battery: '5000mAh, 90W HyperCharge + 80W Wireless'
      }),
      variants: {
        create: [
          {
            color: 'Black Leather',
            colorHex: '#121212',
            colorSlug: 'black-leather',
            storage: '512GB',
            storageSlug: '512gb',
            price: 99999,
            mrp: 119999,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop']),
            inStock: true,
            stockCount: 7
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

  // 6. Vivo X100 Pro
  await prisma.product.create({
    data: {
      slug: 'vivo-x100-pro',
      name: 'Vivo X100 Pro 5G (ZEISS APO Telephoto)',
      brand: 'Vivo',
      description: 'ZEISS APO Floating Telephoto Camera, Dimensity 9300 flagship chip, V3 Imaging Chip, and 100W FlashCharge.',
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
        camera: '50MP 1" ZEISS Main + 50MP ZEISS APO Telephoto + 50MP Ultra-Wide',
        battery: '5400mAh, 100W FlashCharge'
      }),
      variants: {
        create: [
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

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
