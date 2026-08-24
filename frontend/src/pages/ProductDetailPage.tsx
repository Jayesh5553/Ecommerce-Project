import React, { useState } from 'react';
import { Star, ShoppingCart, Zap, Heart, CheckCircle2, ShieldCheck, Truck, RefreshCw, Tag, ThumbsUp } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product.image_url);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);

  // New review state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  const isWishlisted = isInWishlist(product.id);
  const allImages = [product.image_url, ...(product.additional_images || [])];

  const handleBuyNow = () => {
    addToCart(product, 1);
    onNavigate('checkout');
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    try {
      const newRev = await productService.addReview(product.id, {
        user_name: reviewerName,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewsList([newRev, ...reviewsList]);
    } catch (err) {
      setReviewsList([
        { id: Date.now(), user_name: reviewerName, rating: reviewRating, comment: reviewComment, created_at: new Date().toISOString() },
        ...reviewsList,
      ]);
    }

    setReviewerName('');
    setReviewComment('');
    showToast('Review submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 flex flex-col md:sticky md:top-20">
          <div className="relative border border-gray-200 rounded-sm p-6 flex items-center justify-center bg-white h-80 sm:h-96 mb-4 group">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md border border-gray-200 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {allImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-14 h-14 rounded-sm border cursor-pointer p-1 bg-white flex items-center justify-center transition-all ${
                    selectedImage === imgUrl ? 'border-fk-blue ring-2 ring-blue-100 scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => addToCart(product)}
              className="py-3.5 px-4 bg-fk-yellow hover:bg-yellow-400 text-fk-textDark font-extrabold text-xs uppercase rounded-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 tracking-wider"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              <span>ADD TO CART</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 bg-fk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase rounded-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 tracking-wider"
            >
              <Zap className="w-5 h-5 fill-white stroke-none" />
              <span>BUY NOW</span>
            </button>
          </div>

        </div>
        <div className="md:col-span-7 space-y-5">
          <div>
            <div className="text-xs text-gray-500 mb-1 font-semibold">
              Home &gt; {product.category_name} &gt; <span className="text-gray-900 font-bold">{product.brand}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-sm">
              <span>{product.rating}</span>
              <Star className="w-3.5 h-3.5 fill-white stroke-none" />
            </div>
            <span className="text-xs text-gray-500 font-semibold">{product.review_count} Ratings & Reviews</span>

            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-fk-blue italic bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm">
              <span>Flipkart Assured</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-fk-blue fill-fk-yellow" />
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
            <div className="text-xs font-bold text-fk-green uppercase tracking-wider mb-1">Special price</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{product.discount_price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400 line-through font-normal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-extrabold text-fk-green">
                {product.discount_percentage}% off
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-fk-green" />
              <span>Available Offers</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 font-normal">
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1 rounded mt-0.5">BANK</span>
                <span><strong>Bank Offer</strong> 10% Instant Discount on HDFC Bank Credit Cards, up to ₹1,500</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1 rounded mt-0.5">CASHBACK</span>
                <span><strong>5% Unlimited Cashback</strong> on Flipkart Axis Bank Credit Card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1 rounded mt-0.5">SPECIAL</span>
                <span><strong>Special Price</strong> Get extra ₹3,000 off (price inclusive of discount)</span>
              </li>
            </ul>
          </div>
          <div className="border-t border-b border-gray-100 py-3 flex items-center gap-3">
            <div className="text-xs font-bold text-gray-600 uppercase">Delivery:</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                className="w-28 text-xs font-bold px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-fk-blue"
              />
              <button
                onClick={() => setPincodeChecked(true)}
                className="text-xs font-bold text-fk-blue hover:underline uppercase"
              >
                Check
              </button>
            </div>
            {pincodeChecked && (
              <span className="text-xs font-bold text-fk-green flex items-center gap-1">
                <Truck className="w-4 h-4" /> Delivery by Tomorrow, Free
              </span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              Product Description
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-sm border border-gray-100">
              {product.description}
            </p>
          </div>
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Specifications
              </h3>
              <div className="border border-gray-200 rounded-sm overflow-hidden text-xs">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div key={key} className={`flex ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-2.5 border-b border-gray-100`}>
                    <span className="w-1/3 font-semibold text-gray-500">{key}</span>
                    <span className="w-2/3 font-bold text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Ratings & Customer Reviews
            </h3>
            <form onSubmit={handleAddReview} className="bg-blue-50 border border-blue-100 p-4 rounded-sm mb-6 space-y-3">
              <h4 className="text-xs font-bold text-fk-blue uppercase">Write a Review</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-fk-blue"
                  required
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="px-3 py-1.5 text-xs border border-gray-300 rounded-sm outline-none font-bold text-emerald-700"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>
              <textarea
                placeholder="Share your experience with this product..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-fk-blue h-20"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-fk-blue text-white font-bold text-xs rounded-sm shadow-sm hover:bg-fk-darkBlue transition-colors"
              >
                Submit Review
              </button>
            </form>
            <div className="space-y-3">
              {reviewsList.map((rev, i) => (
                <div key={i} className="border-b border-gray-100 pb-3 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                      {rev.rating} <Star className="w-2.5 h-2.5 fill-white stroke-none" />
                    </span>
                    <span className="font-bold text-gray-800">{rev.user_name}</span>
                    <span className="text-[10px] text-gray-400">Verified Buyer</span>
                  </div>
                  <p className="text-gray-700">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
