import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <svg className="logo-mark" viewBox="0 0 32 32" fill="none">
                <path
                  d="M22 14V10.5C22 6.91015 19.0899 4 15.5 4C11.9101 4 9 6.91015 9 10.5V14"
                  stroke="#00D26A"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
                <rect
                  x="6"
                  y="14"
                  width="20"
                  height="16"
                  rx="1"
                  fill="#00D26A"
                />
                <circle cx="16" cy="21" r="2" fill="#0A2426" />
                <rect x="15" y="21" width="2" height="5" fill="#0A2426" />
              </svg>
              Access&nbsp;ROI
            </Link>
            <p>
              Options <span className="italic">over</span> Obligations.
            </p>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li>
                <Link href="/join">Join the List</Link>
              </li>
              <li>
                <Link href="/ebook">E-Book</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/session">Book a Session</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="#">Free webinars</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">For parents</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Access ROI</div>
          <div className="footer-bottom-right">
            <span>Privacy · Terms · Cookies</span>
            <Link href="/admin" className="footer-admin-link">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11 7V5.5C11 3.567 9.433 2 7.5 2C5.567 2 4 3.567 4 5.5V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                <rect x="3" y="7" width="10" height="8" rx="1" fill="currentColor" />
              </svg>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}