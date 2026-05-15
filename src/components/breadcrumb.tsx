"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 text-m text-slate-400">
      <Link href="/" className="hover:text-violet-400">
        Home
      </Link>
      {paths.map((path, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");

        return (
          <span key={href}>
            {" > "}
            <Link href={href} className="capitalize hover:text-violet-400">
              {path}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
