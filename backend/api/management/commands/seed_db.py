from django.core.management.base import BaseCommand
from django.utils.text import slugify
from api.models import Category, Product, Review

class Command(BaseCommand):
    help = 'Seeds database with realistic Categories, Products, and Reviews'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Clearing old product & category data...'))
        Review.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Seeding categories...'))
        categories_data = [
            {'name': 'Mobiles & Tablets', 'icon': 'Smartphone', 'slug': 'mobiles', 'image': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'},
            {'name': 'Electronics & Laptops', 'icon': 'Laptop', 'slug': 'electronics', 'image': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'},
            {'name': 'Fashion & Wear', 'icon': 'Shirt', 'slug': 'fashion', 'image': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'},
            {'name': 'Home & Furniture', 'icon': 'Home', 'slug': 'home-furniture', 'image': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'},
            {'name': 'TV & Appliances', 'icon': 'Tv', 'slug': 'appliances', 'image': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80'},
            {'name': 'Beauty & Toys', 'icon': 'Sparkles', 'slug': 'beauty-toys', 'image': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80'},
        ]

        cat_objs = {}
        for cdata in categories_data:
            cat = Category.objects.create(
                name=cdata['name'],
                slug=cdata['slug'],
                icon=cdata['icon'],
                image_url=cdata['image']
            )
            cat_objs[cdata['slug']] = cat

        self.stdout.write(self.style.SUCCESS('Seeding 30+ products with 100% UNIQUE product images...'))

        products_data = [
            # --- MOBILES ---
            {
                'name': 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
                'category': 'mobiles',
                'brand': 'Samsung',
                'price': 134999.00,
                'discount_price': 119999.00,
                'description': 'Experience next-gen Galaxy AI with 200MP camera resolution, integrated S Pen, and Snapdragon 8 Gen 3 for Galaxy processor.',
                'image_url': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80',
                    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80'
                ],
                'specifications': {'RAM': '12 GB', 'Storage': '256 GB', 'Display': '6.8 inch Quad HD+ Dynamic AMOLED', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5000 mAh'},
                'rating': 4.8,
                'review_count': 1420,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)',
                'category': 'mobiles',
                'brand': 'Apple',
                'price': 159900.00,
                'discount_price': 148900.00,
                'description': 'Forged in titanium with A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
                'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&q=80',
                    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80'
                ],
                'specifications': {'RAM': '8 GB', 'Storage': '256 GB', 'Display': '6.7 inch Super Retina XDR OLED', 'Processor': 'A17 Pro', 'Camera': '48MP + 12MP + 12MP'},
                'rating': 4.9,
                'review_count': 2310,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'Google Pixel 8 Pro (Bay Blue, 128 GB)',
                'category': 'mobiles',
                'brand': 'Google',
                'price': 106999.00,
                'discount_price': 93999.00,
                'description': 'Google Tensor G3 chip, fully upgraded triple camera system, specialized AI Magic Eraser, and 7 years of OS updates.',
                'image_url': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&q=80'
                ],
                'specifications': {'RAM': '12 GB', 'Storage': '128 GB', 'Display': '6.7 inch LTPO OLED', 'Processor': 'Google Tensor G3', 'Battery': '5050 mAh'},
                'rating': 4.6,
                'review_count': 890,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': False
            },
            {
                'name': 'OnePlus 12 5G (Flowy Emerald, 16GB RAM + 512GB)',
                'category': 'mobiles',
                'brand': 'OnePlus',
                'price': 69999.00,
                'discount_price': 64999.00,
                'description': '4th Gen Hasselblad Camera for Mobile, 100W SUPERVOOC charging, Snapdragon 8 Gen 3, and 2K 120Hz ProXDR display.',
                'image_url': 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80'
                ],
                'specifications': {'RAM': '16 GB', 'Storage': '512 GB', 'Display': '6.82 inch 2K AMOLED 120Hz', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5400 mAh'},
                'rating': 4.7,
                'review_count': 1150,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'Nothing Phone (2a) 5G (Black, 8GB + 128GB)',
                'category': 'mobiles',
                'brand': 'Nothing',
                'price': 25999.00,
                'discount_price': 23999.00,
                'description': 'Iconic transparent back design with customized Glyph Interface, Dimensity 7200 Pro chipset, and 50MP dual rear cameras.',
                'image_url': 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
                ],
                'specifications': {'RAM': '8 GB', 'Storage': '128 GB', 'Display': '6.7 inch Flexible AMOLED 120Hz', 'Processor': 'MediaTek Dimensity 7200 Pro', 'Battery': '5000 mAh'},
                'rating': 4.4,
                'review_count': 720,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': True
            },

            # --- ELECTRONICS & LAPTOPS ---
            {
                'name': 'Apple MacBook Air M3 (15.3-inch, Midnight, 16GB, 512GB)',
                'category': 'electronics',
                'brand': 'Apple',
                'price': 154900.00,
                'discount_price': 139900.00,
                'description': 'Strikingly thin design with liquid Retina display, blazing fast M3 chip, up to 18 hours battery life, and silent fanless design.',
                'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
                ],
                'specifications': {'RAM': '16 GB', 'Storage': '512 GB SSD', 'Display': '15.3 inch Liquid Retina', 'Processor': 'Apple M3 8-Core', 'Weight': '1.51 kg'},
                'rating': 4.9,
                'review_count': 940,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'ASUS ROG Strix G16 Gaming Laptop (Intel i9-13980HX, RTX 4070)',
                'category': 'electronics',
                'brand': 'ASUS',
                'price': 199990.00,
                'discount_price': 174990.00,
                'description': 'Dominate gaming battlefield with ROG Nebula 240Hz display, 3-fan cooling architecture, and per-key RGB Aura Sync keyboard.',
                'image_url': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'
                ],
                'specifications': {'RAM': '32 GB DDR5', 'Storage': '1 TB Gen4 SSD', 'Graphics': 'NVIDIA RTX 4070 8GB', 'Display': '16 inch QHD+ 240Hz'},
                'rating': 4.7,
                'review_count': 410,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
                'category': 'electronics',
                'brand': 'Sony',
                'price': 34990.00,
                'discount_price': 26990.00,
                'description': 'Industry leading noise cancellation with two processors and 8 microphones, crystal clear hands-free calling, and 30-hour battery life.',
                'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
                ],
                'specifications': {'Battery': '30 Hours', 'Driver': '30mm Precise Audio Driver', 'Bluetooth': '5.2', 'Weight': '250 grams'},
                'rating': 4.8,
                'review_count': 3820,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Dell UltraSharp 27 4K USB-C Hub Monitor (U2723QE)',
                'category': 'electronics',
                'brand': 'Dell',
                'price': 58900.00,
                'discount_price': 49990.00,
                'description': 'Be productive on this 27-inch 4K monitor with brilliant color and contrast that features IPS Black technology and a connectivity hub.',
                'image_url': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80'
                ],
                'specifications': {'Screen': '27 inch 4K UHD', 'Panel': 'IPS Black', 'Resolution': '3840 x 2160', 'Ports': 'USB-C 90W PD, DisplayPort, HDMI'},
                'rating': 4.7,
                'review_count': 260,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': False
            },
            {
                'name': 'Logitech MX Master 3S Wireless Performance Mouse',
                'category': 'electronics',
                'brand': 'Logitech',
                'price': 10995.00,
                'discount_price': 8495.00,
                'description': 'An iconic ergonomic mouse remastered with 8K DPI track-on-glass sensor and Quiet Clicks technology.',
                'image_url': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
                ],
                'specifications': {'DPI': '8000 DPI', 'Connectivity': 'Bluetooth / Logi Bolt', 'Battery Life': 'Up to 70 days', 'Buttons': '7 Customizable'},
                'rating': 4.8,
                'review_count': 5120,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': True
            },

            # --- FASHION ---
            {
                'name': "Men's Premium Leather Biker Jacket (Dark Walnut)",
                'category': 'fashion',
                'brand': 'Roadster',
                'price': 8999.00,
                'discount_price': 3999.00,
                'description': 'Handcrafted genuine lambskin leather jacket with asymmetrical front zip, quilted shoulder patches, and soft satin lining.',
                'image_url': 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
                ],
                'specifications': {'Material': '100% Lambskin Leather', 'Fit': 'Regular Fit', 'Pattern': 'Solid', 'Closure': 'Heavy Zipper'},
                'rating': 4.5,
                'review_count': 640,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Nike Air Jordan 1 Retro High OG (Chicago Red)',
                'category': 'fashion',
                'brand': 'Nike',
                'price': 16995.00,
                'discount_price': 13995.00,
                'description': 'The classic basketball sneaker that changed footwear culture forever. Premium full-grain leather upper with Air-Sole unit heel cushioning.',
                'image_url': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80'
                ],
                'specifications': {'Sole': 'Rubber', 'Upper': 'Leather', 'Closure': 'Lace-Up', 'Type': 'High Top Sneakers'},
                'rating': 4.9,
                'review_count': 4900,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': "Women's Floral Print Chiffon Maxi Dress (Earthy Sage)",
                'category': 'fashion',
                'brand': 'Zara',
                'price': 4990.00,
                'discount_price': 2790.00,
                'description': 'Flowy tiered maxi dress with delicate floral prints, long bishop sleeves, and an adjustable belted waist.',
                'image_url': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'
                ],
                'specifications': {'Fabric': 'Poly-Chiffon', 'Length': 'Maxi', 'Sleeve': 'Long Sleeve', 'Wash': 'Dry Clean'},
                'rating': 4.6,
                'review_count': 380,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': False
            },
            {
                'name': 'Fossil Gen 6 Touchscreen Smartwatch (Rose Gold Steel)',
                'category': 'fashion',
                'brand': 'Fossil',
                'price': 24995.00,
                'discount_price': 15995.00,
                'description': 'Powered with Wear OS by Google, SpO2 sensor, fast charging (80% in 30 mins), and elegant stainless steel mesh strap.',
                'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'
                ],
                'specifications': {'Display': '1.28 inch AMOLED', 'Strap': 'Stainless Steel', 'Water Resistance': '3 ATM', 'Sensors': 'Heart Rate, SpO2, GPS'},
                'rating': 4.3,
                'review_count': 820,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'Ray-Ban Aviator Classic Sunglasses (Gold/G-15 Green)',
                'category': 'fashion',
                'brand': 'Ray-Ban',
                'price': 9990.00,
                'discount_price': 7490.00,
                'description': 'Originally created for US Aviators in 1937, timeless tear-drop frame design with 100% UV protection glass lenses.',
                'image_url': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80'
                ],
                'specifications': {'Frame Material': 'Metal', 'Lens Color': 'G-15 Green', 'UV Protection': '100% UV400', 'Frame Color': 'Arista Gold'},
                'rating': 4.7,
                'review_count': 1950,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'is_trending': False
            },

            # --- HOME & FURNITURE ---
            {
                'name': 'Ergonomic Mesh High Back Office Chair (Chrome Base)',
                'category': 'home-furniture',
                'brand': 'Green Soul',
                'price': 18990.00,
                'discount_price': 9990.00,
                'description': '3D adjustable armrests, heavy duty tilt mechanism, breathable Korean mesh back, and 2-way adjustable lumbar support.',
                'image_url': 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80'
                ],
                'specifications': {'Mechanism': 'Any-position Tilt Lock', 'Max Weight': '135 kg', 'Base': 'Heavy Chrome Steel', 'Warranty': '3 Years'},
                'rating': 4.6,
                'review_count': 1230,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Nordic Solid Teak Wood 3-Seater Sofa (Ocean Blue Velvet)',
                'category': 'home-furniture',
                'brand': 'Wakefit',
                'price': 34999.00,
                'discount_price': 22499.00,
                'description': 'Crafted with seasoned Neem wood frame, high resilience foam cushions, and stain-resistant velvet fabric upholstery.',
                'image_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
                ],
                'specifications': {'Primary Material': 'Solid Wood', 'Seating Capacity': '3 Seater', 'Fabric': 'High-GSM Velvet', 'Warranty': '5 Years Structural'},
                'rating': 4.7,
                'review_count': 780,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'Modern Minimalist Solid Oak Dining Table Set (4 Chairs)',
                'category': 'home-furniture',
                'brand': 'Urban Ladder',
                'price': 42999.00,
                'discount_price': 28999.00,
                'description': 'Sleek geometric dining set featuring natural grain oak finish and ergonomically cushioned dining chairs.',
                'image_url': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80'
                ],
                'specifications': {'Table Dimensions': '120 x 80 cm', 'Wood Type': 'Solid Oak Wood', 'Finish': 'Natural Matte Honey'},
                'rating': 4.5,
                'review_count': 320,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': False
            },
            {
                'name': 'Smart Ambient Dimmable Ceramic Table Lamp (Warm Amber)',
                'category': 'home-furniture',
                'brand': 'Philips',
                'price': 4999.00,
                'discount_price': 2999.00,
                'description': 'Handcrafted glazed ceramic base topped with linen drum shade, soft touch dimmable warm ambient light control.',
                'image_url': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
                ],
                'specifications': {'Bulb Base': 'E27 LED included', 'Wattage': '9W', 'Body': 'Ceramic & Linen', 'Cord Length': '1.8 Meters'},
                'rating': 4.6,
                'review_count': 540,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': True
            },

            # --- TV & APPLIANCES ---
            {
                'name': 'LG 55-inch OLED evo C3 4K Smart TV (120Hz, Dolby Vision)',
                'category': 'appliances',
                'brand': 'LG',
                'price': 169990.00,
                'discount_price': 119990.00,
                'description': 'Self-lit OLED pixels for infinite contrast, Alpha9 AI Processor 4K Gen6, G-Sync & FreeSync compatible for gaming.',
                'image_url': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'
                ],
                'specifications': {'Display': '55 inch OLED 4K', 'Refresh Rate': '120Hz', 'Audio': '40W 2.2 Channel Dolby Atmos', 'OS': 'webOS 23'},
                'rating': 4.9,
                'review_count': 1850,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Samsung 653L Convertible 5-in-1 Side-by-Side Refrigerator',
                'category': 'appliances',
                'brand': 'Samsung',
                'price': 112900.00,
                'discount_price': 79990.00,
                'description': 'Twin Cooling Plus technology, digital inverter compressor with 20-year warranty, integrated water & ice dispenser.',
                'image_url': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80'
                ],
                'specifications': {'Capacity': '653 Litres', 'Energy Rating': '3 Star', 'Compressor': 'Digital Inverter', 'Color': 'Refined Inox'},
                'rating': 4.7,
                'review_count': 640,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': False
            },
            {
                'name': 'Dyson V15 Detect Cordless Vacuum Cleaner (Laser Illumination)',
                'category': 'appliances',
                'brand': 'Dyson',
                'price': 65900.00,
                'discount_price': 52900.00,
                'description': 'Precisely angled laser reveals invisible dust on hard floors. Piezo sensor counts and measures size of dust particles in real-time.',
                'image_url': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80'
                ],
                'specifications': {'Suction Power': '240 AW', 'Run Time': 'Up to 60 Mins', 'Bin Volume': '0.77 L', 'Weight': '3.1 kg'},
                'rating': 4.8,
                'review_count': 910,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'is_trending': True
            },
            {
                'name': 'IFB 8 Kg 5 Star Fully Automatic Front Load Washing Machine',
                'category': 'appliances',
                'brand': 'IFB',
                'price': 44990.00,
                'discount_price': 34990.00,
                'description': 'Deep Clean Steam Wash, 3D Wash system, Inbuilt Heater, and Aqua Energie water softener device for sensitive fabrics.',
                'image_url': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80'
                ],
                'specifications': {'Capacity': '8 Kg', 'RPM': '1400 RPM', 'Programs': '14 Wash Cycles', 'Energy': '5 Star Rating'},
                'rating': 4.6,
                'review_count': 1420,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': False
            },

            # --- BEAUTY, TOYS & SPORTS ---
            {
                'name': 'Dior Sauvage Eau de Parfum Pour Homme (100ml)',
                'category': 'beauty-toys',
                'brand': 'Dior',
                'price': 14500.00,
                'discount_price': 11990.00,
                'description': 'A radically fresh composition dictated by a name that has the ring of a manifesto. Radiant top notes of Calabrian Bergamot.',
                'image_url': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80'
                ],
                'specifications': {'Volume': '100 ml', 'Scent Family': 'Woody & Spicy', 'Notes': 'Bergamot, Sichuan Pepper, Ambroxan'},
                'rating': 4.9,
                'review_count': 3410,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'LEGO Technic Bugatti Bolide Hypercar Building Kit (905 Pcs)',
                'category': 'beauty-toys',
                'brand': 'LEGO',
                'price': 6999.00,
                'discount_price': 4999.00,
                'description': 'Explore motorsport engineering excellence with working W16 engine, steering mechanism, and iconic scissor doors.',
                'image_url': 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80'
                ],
                'specifications': {'Piece Count': '905 Pieces', 'Age': '9+ Years', 'Dimensions': '31 x 13 x 8 cm'},
                'rating': 4.9,
                'review_count': 1120,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'is_trending': True
            },
            {
                'name': 'Yonex Nanoflare 1000Z Professional Badminton Racket',
                'category': 'beauty-toys',
                'brand': 'Yonex',
                'price': 21990.00,
                'discount_price': 16490.00,
                'description': 'Built for lightning-fast drive speeds with Sonic Flare System and Ultra PE FIBER shaft for maximum shuttle acceleration.',
                'image_url': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
                'additional_images': [
                    'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&q=80'
                ],
                'specifications': {'Weight / Grip': '4U (83g) G5', 'Flex': 'Extra Stiff', 'Frame': 'HM Graphite', 'Origin': 'Made in Japan'},
                'rating': 4.8,
                'review_count': 670,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'is_trending': False
            }
        ]

        created_count = 0
        for pdata in products_data:
            cat_slug = pdata.pop('category')
            category_obj = cat_objs[cat_slug]
            
            product_name = pdata['name']
            product_slug = slugify(product_name)

            product = Product.objects.create(
                category=category_obj,
                slug=product_slug,
                **pdata
            )
            created_count += 1

            # Create realistic initial customer reviews
            Review.objects.create(
                product=product,
                user_name='Rahul Sharma',
                rating=5,
                comment=f"Extremely satisfied with the {product.name}! Fast delivery and authentic product."
            )
            Review.objects.create(
                product=product,
                user_name='Priya Patel',
                rating=4,
                comment="Value for money. Build quality is top notch. Highly recommended!"
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_count} products across {len(cat_objs)} categories!'))
