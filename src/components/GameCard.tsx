import Image from "next/image";
import Link from "next/link";
type GameCardProps = {
    slug: string;
    title: string;
    image: string;
    genres: string[];
    platforms: string[];
    rating: number;
    price: number;
}

export default function GameCard({ slug, title, image, genres, platforms, rating, price }: GameCardProps) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(price);

    return (
        <Link href={`/games/${slug}`}>
            <div className="bg-slate-800 rounded-2xl overflow-hidden hover:scale-105 transition">
                {/* Game Image */}
                <div className="relative w-full h-56">
                    <Image src={image} alt={title} fill className="object-cover"/>
                </div>

            {/* content */}
            <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold leading-tight">
                        {title}
                    </h2>

                    <p className="shrink-0 text-sm font-semibold text-violet-400">
                        {formattedPrice}
                    </p>
                </div>
                <p className="text-slate-300 text-sm mb-2">
                    {genres} | {platforms}
                </p>
                <p className="text-violet-400 font-semibold">
                    ⭐ {rating} 
                </p>
            </div>
        </div>
    </Link> 
    );
}