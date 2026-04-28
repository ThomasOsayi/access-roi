import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Ticker from "@/components/Ticker";

export const metadata: Metadata = {
  title: "Shop — Access ROI",
  description:
    "Tees, hoodies, and essentials. Printed on-demand, shipped direct.",
};

const STORE_URL = "https://renaissance21.org/collections/access-roi";

const PRODUCTS = [
  {
    name: "Access ROI Team Hoodie",
    image: "/products/team-hoodie.jpg",
    meta: "Heavy Blend · Black",
    price: "$50",
    badge: "Best Seller",
    url: "https://renaissance21.org/collections/access-roi/products/access-roi-team-hoodie",
  },
  {
    name: "Access ROI Team Tee",
    image: "/products/team-tee.jpg",
    meta: "Softstyle · Black",
    price: "$29.99",
    badge: null,
    url: "https://renaissance21.org/collections/access-roi/products/access-roi-team-tee",
  },
  {
    name: "Access the Mind Tee",
    image: "/products/mind-tee.jpg",
    meta: "Softstyle · Black",
    price: "$29.99",
    badge: "New",
    url: "https://renaissance21.org/collections/access-roi/products/access-the-mind-tee",
  },
  {
    name: "Options Over Obligations Tee",
    image: "/products/options-tee.jpg",
    meta: "Softstyle · Black",
    price: "$29.99",
    badge: null,
    url: "https://renaissance21.org/collections/access-roi/products/options-over-obligations-tee",
  },
  {
    name: "ROI Mindset Hat",
    image: "/products/mindset-hat.jpg",
    meta: "Dad Cap · Black",
    price: "$21.99",
    badge: null,
    url: "https://renaissance21.org/collections/access-roi/products/roi-mindset-hat",
  },
  {
    name: "Access ROI Team Crew",
    image: "/products/team-crew.jpg",
    meta: "Premium Sweatshirt · Black",
    price: "$44.99",
    badge: "New",
    url: "https://renaissance21.org/collections/access-roi/products/access-roi-team-crew",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="shop-hero">
        <div className="container">
          <div className="shop-hero-inner">
            <nav className="crumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: "var(--green)" }}>The Shop</span>
            </nav>
            <div className="shop-hero-grid">
              <div>
                <div className="eyebrow shop-hero-eyebrow">
                  The Drop · Printed On-Demand
                </div>
                <h1>
                  Wear the
                  <br />
                  <span className="italic">philosophy.</span>
                </h1>
                <p>
                  Tees, hoodies, and essentials built around the Access ROI
                  brand. No warehouse, no dead stock, every piece is printed and
                  shipped when you order.
                </p>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open the Shop
                  <svg
                    className="arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M1 7H13M13 7L7 1M13 7L7 13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>

              {/* HERO PRODUCT IMAGE */}
              <div className="shop-hero-image">
                <Image
                  src="/products/team-hoodie.jpg"
                  alt="Access ROI Team Hoodie"
                  width={900}
                  height={900}
                  className="shop-hero-img"
                  priority
                />
                <div className="shop-hero-image-tag">$50</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <Ticker
        items={[
          "Assets over Liabilities",
          "Options over Obligations",
          "Data over Debt",
          "Math over Mascots",
        ]}
      />

      {/* ============ PRODUCT GRID ============ */}
      <section className="shop-drop">
        <div className="container">
          <div className="shop-drop-head">
            <div>
              <div
                className="eyebrow"
                style={{ color: "var(--green-deep)", marginBottom: "1rem" }}
              >
                Drop 001 · Core Collection
              </div>
              <h2>
                Six pieces.
                <br />
                One <span className="italic">manifesto.</span>
              </h2>
            </div>
            <p>
              Every piece is print-on-demand, click through to view sizes,
              colorways, and check out.
            </p>
          </div>

          <div className="shop-product-grid">
            {PRODUCTS.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shop-product"
              >
                <div className="shop-product-visual">
                  {product.badge && (
                    <div className="shop-product-badge">{product.badge}</div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={900}
                    className="shop-product-img"
                  />
                </div>
                <div className="shop-product-info">
                  <div className="shop-product-name">{product.name}</div>
                  <div className="shop-product-meta">
                    <span>{product.meta}</span>
                    <span className="shop-product-price">{product.price}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="shop-how">
        <div className="container">
          <div className="shop-how-inner">
            <div className="shop-how-head">
              <div className="eyebrow" style={{ color: "var(--green)" }}>
                How Ordering Works
              </div>
              <h2>
                Simple.
                <br />
                Built <span className="italic">on demand.</span>
              </h2>
            </div>
            <div className="shop-how-grid">
              <div className="shop-how-card">
                <div className="shop-how-num">01</div>
                <h3>Pick your piece</h3>
                <p>
                  Choose the product, size, and colorway you want from the
                  storefront.
                </p>
              </div>
              <div className="shop-how-card">
                <div className="shop-how-num">02</div>
                <h3>Printed after purchase</h3>
                <p>
                  Your order is produced on demand, which keeps inventory lean
                  and avoids dead stock.
                </p>
              </div>
              <div className="shop-how-card">
                <div className="shop-how-num">03</div>
                <h3>Shipped direct</h3>
                <p>
                  Fulfillment and shipping straight to your door, with tracking
                  included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-inner">
            <div
              className="eyebrow"
              style={{ color: "var(--green)", marginBottom: "1.5rem" }}
            >
              Open the Drop
            </div>
            <h2>
              Browse the full <span className="italic">collection.</span>
            </h2>
            <p>
              Every piece, every size, every colorway. Secure checkout with
              tracked shipping worldwide.
            </p>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Full Shop
              <svg
                className="arrow"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <div className="final-cta-note" style={{ marginTop: "1.25rem" }}>
              Live · Print-on-demand · Ships worldwide
            </div>
          </div>
        </div>
      </section>
    </>
  );
}