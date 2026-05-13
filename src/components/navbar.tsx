import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-violet-400" />
          <h1 className="text-2xl font-bold">GameVault</h1>
        </div>

        {/* Menu*/}
        <div className="flex items-center gap-6 ml-auto ">
          <Link href={"/"} className="hover:text-violet-400">
            Home
          </Link>
          <Link href={"/games"} className="hover:text-violet-400">
            Games
          </Link>
          <Link href={"/wishlist"} className="hover:text-violet-400">
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
