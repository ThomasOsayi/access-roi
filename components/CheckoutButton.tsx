"use client";

import { useRouter } from "next/navigation";

export default function CheckoutButton({
  label = "Pre-Order Now, $29",
  className = "btn-primary",
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/ebook/checkout")}
      className={className}
      style={style}
    >
      {label}
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
    </button>
  );
}