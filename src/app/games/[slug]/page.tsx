"use client";

import { useState, useSyncExternalStore, useEffect, use } from "react";
import { games } from "@/data/games";
import Image from "next/image";
import { notFound } from "next/navigation";
import Spinner from "@/components/spinner";

const WISHLIST_EVENT = "wishlist-change";

/*   Wishlist Store */

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

/*Page*/

type Props = {
  params: Promise<{ slug: string }>;
};

export default function GameDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [loading, setLoading] = useState(true);

  const game = games.find((g) => g.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const wishlist = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    () => serverSnapshot,
  );

  if (!game) return notFound();

  const isWishlisted = wishlist.includes(game.slug);

  const toggleWishlist = () => {
    const updated = isWishlisted
      ? wishlist.filter((s) => s !== game.slug)
      : [...wishlist, game.slug];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event(WISHLIST_EVENT));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/*  HEADER*/}
      <div className="grid gap-10 md:grid-cols-2">
        <Image
          src={game.coverImage}
          alt={game.title}
          width={1200}
          height={800}
          className="w-full rounded-2xl object-cover"
        />

        <div className="space-y-3 ms-8">
          <h1 className="text-4xl font-bold">{game.title}</h1>

          <p className="text-slate-400">{game.longDescription}</p>

          <div className="space-y-1 text-sm text-slate-300">
            <p>⭐ {game.rating}</p>
            <p>💰 ${game.price}</p>
            <p>🎮 {game.platforms.join(", ")}</p>
            <p>📅 {game.releaseDate}</p>
            <p>🏷️ {game.genres.join(", ")}</p>
          </div>

          <button
            onClick={toggleWishlist}
            className={`mt-4 rounded-xl px-6 py-3 font-semibold transition ${
              isWishlisted
                ? "bg-red-500 hover:bg-red-600"
                : "bg-violet-500 hover:bg-violet-600"
            }`}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* SCREENSHOTS  */}
      <div>
        <h2 className="mb-6 text-2xl font-bold my-6">Screenshots</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {game.screenshots.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-0.5 hover:scale-[1.02] hover:border-violet-500/50"
            >
              <Image
                src={img}
                alt={`screenshot ${index + 1}`}
                width={900}
                height={600}
                className="h-48 w-full object-cover "
              />
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative flex h-[88vh] w-[94vw] max-w-7xl items-center justify-center overflow-hidden rounded-3xl border border-slate-700 bg-black shadow-2xl">
            <Image
              src={selectedImage}
              alt="preview"
              fill
              className="object-contain p-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}
