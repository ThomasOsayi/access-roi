import type { Metadata } from "next";
import Link from "next/link";
import Ticker from "@/components/Ticker";

export const metadata: Metadata = {
  title: "Shop — Access ROI",
  description:
    "Hoodies, tees, and essentials built around the mantras. Printed on-demand via Printful.",
};

const PRODUCTS = [
  {
    name: "Assets Hoodie",
    line1: "ASSETS",
    connector: "OVER",
    line2: "LIABILITIES",
    meta: "Heavyweight · Black",
    price: "$65",
    badge: "Best Seller",
    cream: false,
  },
  {
    name: "Options Tee",
    line1: "OPTIONS",
    connector: "OVER",
    line2: "OBLIGATIONS",
    meta: "Heavyweight · Cream",
    price: "$35",
    badge: "New",
    cream: true,
  },
  {
    name: "Data Tee",
    line1: "DATA",
    connector: "OVER",
    line2: "DEBT",
    meta: "Heavyweight · Black",
    price: "$35",
    badge: null,
    cream: false,
  },
  {
    name: "Math Tee",
    line1: "MATH",
    connector: "OVER",
    line2: "MASCOTS",
    meta: "Heavyweight · Black",
    price: "$35",
    badge: null,
    cream: false,
  },
  {
    name: "Assets Tee",
    line1: "ASSETS",
    connector: "OVER",
    line2: "LIABILITIES",
    meta: "Heavyweight · Cream",
    price: "$35",
    badge: null,
    cream: true,
  },
  {
    name: "Logo Cap",
    line1: "ACCESS",
    connector: "—",
    line2: "ROI",
    meta: "Dad Cap · Black",
    price: "$30",
    badge: "Ltd.",
    cream: false,
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
                  Hoodies, tees, and essentials built around the mantras. No
                  warehouse, no dead stock — every piece is printed and shipped
                  when you order, straight from Printful.
                </p>
                <a
                  href="https://printful.com"
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

              {/* HOODIE MOCKUP */}
              <div className="hoodie-mockup">
                <div className="hoodie-card">
                  <div className="hoodie-tag">AR · 001</div>
                  <div className="hoodie-text">
                    <span className="ht-line-1">ASSETS</span>
                    <span className="ht-divider">OVER</span>
                    <span className="ht-line-2">LIABILITIES</span>
                  </div>
                  <div className="hoodie-price">$65</div>
                </div>
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
              A preview of what&apos;s in the shop. Every piece is
              print-on-demand via Printful — click through to view sizes,
              colorways, and check out.
            </p>
          </div>

          <div className="shop-product-grid">
            {PRODUCTS.map((product) => (
              <a
                key={product.name}
                href="https://printful.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-product"
              >
                <div
                  className={`shop-product-visual ${product.cream ? "cream" : ""}`}
                >
                  {product.badge && (
                    <div className="shop-product-badge">{product.badge}</div>
                  )}
                  <div className="shop-product-art">
                    <span className="spa-line-1">{product.line1}</span>
                    <span className="spa-div">{product.connector}</span>
                    <span className="spa-line-2">{product.line2}</span>
                  </div>
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
                  Choose the product, size, and colorway you want from the live
                  Printful storefront.
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
                  Printful handles fulfillment and shipping straight to your
                  door, with tracking included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}