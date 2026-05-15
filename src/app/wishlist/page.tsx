"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { games } from "@/data/games";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

const WISHLIST_EVENT = "wishlist-change";

let cache: string[] = [];
let cacheRaw = "";

const serverSnapshot: string[] = [];
function getWishlistSnapshot(): string[] {
  if (typeof window === "undefined") return cache;

  try {
    const raw = localStorage.getItem("wishlist") || "[]";

    if (raw === cacheRaw) return cache;
    cacheRaw = raw;
    cache = JSON.parse(raw);
    return cache;
  } catch {
    cacheRaw = "[]";
    cache = [];
    return cache;
  }
}

function subscribeWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_EVENT, callback as EventListener);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_EVENT, callback as EventListener);
  };
}

export default function WishlistPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Call hooks unconditionally to preserve hook order
  const wishlist = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    () => serverSnapshot,
  );

  const wishlistGames = games.filter((game) => wishlist.includes(game.slug));

  const removeFromWishlist = (slug: string) => {
    const updated = wishlist.filter((item) => item !== slug);

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event(WISHLIST_EVENT));
  };

   if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 ">
      <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

      {wishlistGames.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center flex flex-col items-center gap-4">
          <p className="text-lg text-slate-400 mb-6">
            Your wishlist is empty. Explore games and add them to your wishlist!
          </p>
          <Link
            href="/games"
            className="inline-flex rounded-xl bg-violet-500 px-6 py-3 font-semibold hover:bg-violet-600"
          >
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols2 lg:grid-cols-3 gap-6">
          {wishlistGames.map((game) => (
            <div
              key={game.slug}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              <Link href={`/games/${game.slug}`}>
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover"
                />
              </Link>
              <div className="space-y-4 p-5">
                <div>
                  <h2 className="text-xl font-bold">{game.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>⭐ {game.rating}</span>
                  <span>Rp {game.price}</span>
                </div>

                <button
                  onClick={() => removeFromWishlist(game.slug)}
                  className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold transition hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
