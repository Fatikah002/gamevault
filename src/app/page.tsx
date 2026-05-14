"use client";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  // featured game
  const featuredGames = games.filter((game) => game.featured === true);
  return (
    <div>
      {/* Featured Carousel */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Featured Games</h1>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {featuredGames.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
                  <h2 className="text-5xl font-bold mb-4">{game.title}</h2>
                  <p className="text-slate-300 mb-6 max-w-2xl">
                    {game.description}
                  </p>
                  <button className="bg-violet-500 hover:bg-violet-600 px-6 py-3 rounded-xl w-fit font-semibold transition">
                    Explore Game
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Game Grid */}
      <section>
        <h2 className="text-3xl font-bold my-6">All Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              image={game.coverImage}
              genres={game.genres}
              platforms={game.platforms}
              rating={game.rating}
              price={game.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
