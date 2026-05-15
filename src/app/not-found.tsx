import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-6xl font-bold">404</h1>
            <p className="mb-2 text-2xl font-semibold">Game Not Found</p>
            <p className="mb-6 text-slate-400">This game could not be found.</p>
            <Link href="/" className="text-violet-500 hover:text-violet-400">
                Back to Home
            </Link>
        </div>
    );
}