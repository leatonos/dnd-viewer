"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="icons/objects/shield.svg" // put this in /public
              alt="DnD Viewer"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-lg font-semibold text-gray-900">
              DnD Viewer
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm text-gray-600 hover:text-gray-900">Other Projects</a>
            <a className="text-sm text-gray-600 hover:text-gray-900">How to Use</a>
            <a className="text-sm text-gray-600 hover:text-gray-900">About</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/*
                <button className="text-sm text-gray-600 hover:text-gray-900">
                Sign in
                </button>
            */}
            <button className="rounded-md bg-indigo-600 px-8 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              Start Campaign
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            <a className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Dashboard
            </a>
            <a className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Projects
            </a>
            <a className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Team
            </a>
            <button className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm text-white">
              Start Campaign
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
