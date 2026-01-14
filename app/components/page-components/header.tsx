"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="secondary-bg w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/objects/shield.svg"
                alt="DnD Viewer"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-extrabold primary-text-color">
                DnD Viewer
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
             <a href="/" className="text-sm primary-text-color font-extrabold hover:opacity-80 cursor-pointer">
              Home
            </a>
            <a href="/how-to-use" className="text-sm primary-text-color font-extrabold hover:opacity-80 cursor-pointer">
              How to Use
            </a>
            <a href="/about" className="text-sm primary-text-color font-extrabold hover:opacity-80 cursor-pointer">
              About
            </a>
          </nav>

          {/* Actions */}
          <Link href="/dm" className="third-bg white-text px-6 py-2 rounded font-bold hover:brightness-110 transition">
            Start Campaign
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded p-2 white-text hover:opacity-80"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden secondary-bg">
          <div className="space-y-2 px-4 py-4">
            <a className="block rounded px-3 py-2 white-text hover:opacity-80">
              Other Projects
            </a>
            <a className="block rounded px-3 py-2 white-text hover:opacity-80">
              How to Use
            </a>
            <a className="block rounded px-3 py-2 white-text hover:opacity-80">
              About
            </a>
            <button className="mt-3 w-full third-bg white-text px-4 py-2 rounded font-bold hover:brightness-110 transition">
              Start Campaign
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
