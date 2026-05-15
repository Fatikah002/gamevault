"use client";

import Link from "next/link";
import { useState } from "react";
import { Gamepad2, Menu } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="text-violet-400" />
            <h1 className="text-xl font-bold md:text-2xl">GameVault</h1>
          </Link>
        

        {/* Menu*/}
        <div className="hidden gap-6 md:flex">
          <Link href={"/"} className="hover:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href={"/games"} className="hover:text-violet-400 hover:underline">
            Games
          </Link>
          <Link href={"/wishlist"} className="hover:text-violet-400 hover:underline">
            Wishlist
          </Link>
        </div>

        {/* button mobile*/}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden">
          <Menu />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
          <Link href={"/"} className="hover:text-violet-400 " onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href={"/games"} className="hover:text-violet-400" onClick={() => setOpen(false)}>
            Games
          </Link>
          <Link href={"/wishlist"} className="hover:text-violet-400" onClick={() => setOpen(false)}>
            Wishlist
          </Link>
        </div>
        )}
    </nav>
  );
}
