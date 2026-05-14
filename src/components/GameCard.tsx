import Image from "next/image";

type GameCardProps = {
    title: string;
    image: string;
    genres: string[];
    platforms: string[];
    rating: number;
}

export default function GameCard({ title, image, genres, platforms, rating }: GameCardProps) {
    return (
        <div className="bg-slate-800 rounded-2xl overflow-hidden hover:scale-105 transition">
            {/* Game Image */}
            <div className="relative w-full h-56">
                <Image src={image} alt={title} fill className="object-cover"/>
            </div>

            {/* content */}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                    {title}
                </h2>
                <p className="text-slate-300 text-sm mb-2">
                    {genres} | {platforms}
                </p>
                <p className="text-violet-400 font-semibold">
                    ⭐ {rating} 
                </p>
            </div>
        </div>
    );
}