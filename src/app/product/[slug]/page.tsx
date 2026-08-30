"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, Truck, Shield, RotateCcw, ChevronDown, Minus, Plus } from "lucide-react";
import { products, mockReviews } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import Link from "next/link";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const { addItem, setCartOpen } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const reviews = mockReviews.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[2] || product.sizes[0];
    const color = product.colors[selectedColor]?.name || "Black";
    for (let i = 0; i < quantity; i++) {
      addItem(product, size, color);
    }
    setCartOpen(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    brand: {
      "@type": "Brand",
      name: "ASCEND",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ascend-gray mb-8 font-heading uppercase tracking-wider">
          <Link href="/" className="hover:text-ascend-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ascend-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-ascend-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden group cursor-crosshair">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-heading font-bold text-white/[0.05] group-hover:text-white/[0.1] transition-all duration-500 group-hover:scale-110">
                  {product.name.split(" ")[0]}
                </span>
              </div>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && <Badge variant="new">New</Badge>}
                {product.comparePrice && (
                  <Badge variant="accent">
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 bg-white/[0.02] border transition-all duration-200 flex items-center justify-center ${
                    activeImage === i
                      ? "border-ascend-accent"
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] font-heading text-ascend-gray">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl lg:text-4xl font-heading font-bold">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-ascend-accent text-ascend-accent"
                        : "text-ascend-gray/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-ascend-gray">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-heading font-bold text-ascend-accent">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-ascend-gray line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-ascend-gray">
              Cash on Delivery • Free shipping over $100
            </p>

            <Separator className="my-6" />

            {/* Colors */}
            <div>
              <h3 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-3">
                Color — {product.colors[selectedColor]?.name}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 border-2 transition-all duration-200 ${
                      selectedColor === i
                        ? "border-ascend-accent scale-110"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white">
                  Size {selectedSize && `— ${selectedSize}`}
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-ascend-accent hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-10 px-4 text-sm font-heading border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-ascend-accent bg-ascend-accent/10 text-ascend-accent"
                        : "border-white/10 text-ascend-gray hover:border-white/30 hover:text-ascend-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center border border-white/10 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-ascend-gray hover:text-ascend-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-heading">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-ascend-gray hover:text-ascend-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="h-11 w-11 border border-white/10 flex items-center justify-center text-ascend-gray hover:text-red-500 hover:border-red-500 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto text-ascend-accent mb-2" />
                <p className="text-[10px] font-heading uppercase tracking-wider text-ascend-gray">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto text-ascend-accent mb-2" />
                <p className="text-[10px] font-heading uppercase tracking-wider text-ascend-gray">
                  Premium Quality
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto text-ascend-accent mb-2" />
                <p className="text-[10px] font-heading uppercase tracking-wider text-ascend-gray">
                  Easy Returns
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Accordion */}
            <div className="space-y-0">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex items-center justify-between py-4 border-b border-white/5 text-sm font-heading uppercase tracking-wider"
              >
                Description
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDescription ? "rotate-180" : ""}`} />
              </button>
              {showDescription && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="pb-4"
                >
                  <p className="text-sm text-ascend-gray leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>
              )}

              <button
                onClick={() => setShowReviews(!showReviews)}
                className="w-full flex items-center justify-between py-4 border-b border-white/5 text-sm font-heading uppercase tracking-wider"
              >
                Reviews ({reviews.length})
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showReviews ? "rotate-180" : ""}`} />
              </button>
              {showReviews && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="pb-4 space-y-4"
                >
                  {reviews.length === 0 ? (
                    <p className="text-sm text-ascend-gray">No reviews yet.</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-white/5 pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-heading font-semibold">{review.customerName}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-ascend-accent text-ascend-accent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-ascend-gray mt-1">{review.comment}</p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-heading font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-white/[0.05] group-hover:scale-110 transition-all duration-500">
                        {p.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-heading font-semibold text-ascend-white group-hover:text-ascend-accent transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-sm font-heading font-bold text-ascend-accent">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ascend-black border border-white/10 p-8 max-w-lg w-full"
          >
            <h3 className="text-xl font-heading font-bold mb-6">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 font-heading font-semibold">Size</th>
                    <th className="text-left py-3 font-heading font-semibold">Chest (in)</th>
                    <th className="text-left py-3 font-heading font-semibold">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-ascend-gray">
                  {[
                    { size: "XS", chest: "34-36", length: "26" },
                    { size: "S", chest: "36-38", length: "27" },
                    { size: "M", chest: "38-40", length: "28" },
                    { size: "L", chest: "40-42", length: "29" },
                    { size: "XL", chest: "42-44", length: "30" },
                    { size: "XXL", chest: "44-46", length: "31" },
                  ].map((row) => (
                    <tr key={row.size} className="border-b border-white/5">
                      <td className="py-2.5">{row.size}</td>
                      <td className="py-2.5">{row.chest}</td>
                      <td className="py-2.5">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 btn-outline w-full text-xs"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
