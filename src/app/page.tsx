import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <section className="bg-slate-800 rounded-3xl p-10">
        <p className="text-violet-400 mb2">
          Featured Game
        </p>
        <h1 className="text-5xl font-bold mb-4">
          Explore Amazing Games
        </h1>
        <p className="text-slate-300 max-w-2xl mb-6">
          Discover popular games, create your wishlist,
          and explore game details in one platform.
        </p>

        <button className="bg-violet-500 hover:bg-violet-600 px-6 py-3 rounded-xl font-semibold ">
          Explore Now
        </button>
      </section>
    </div>
  );
}
