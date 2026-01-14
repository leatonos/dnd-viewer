"use client";

import { useState } from "react";
import Image from "next/image";
import DMRoomOptions from "./dm-room-options";
import { RoomInfo } from "@/app/types";

type Props = {
  roomInfo: {
    room_name:string,room_bg:string
  };
  roomId: string;
  dmKey: string;
};

export default function DM_Header({roomInfo,roomId,dmKey}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <>
      <header className="primary-bg w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/icons/objects/shield.svg"
                alt="DnD Viewer"
                width={32}
                height={32}
              />
              <h1 className="text-lg font-extrabold primary-text-color">
                DM Dashboard
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-extrabold primary-text-color">Home</a>
              <a className="text-sm font-extrabold primary-text-color">How to Use</a>
              <a className="text-sm font-extrabold primary-text-color">About</a>
            </nav>

            {/* Actions */}
            <button
              onClick={() => setOptionsOpen(true)}
              className="third-bg white-text px-6 py-2 rounded font-bold hover:brightness-110 transition"
            >
              Options
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden rounded p-2 white-text"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden secondary-bg px-4 py-4 space-y-2">
            <a className="block white-text">How to Use</a>
            <a className="block white-text">About</a>
          </div>
        )}
      </header>

      {/* Room Options Modal */}
      {optionsOpen && (
        <DMRoomOptions
          roomInfo={roomInfo}
          roomId={roomId}
          dmKey={dmKey}
          onClose={() => setOptionsOpen(false)}
        />
      )}
    </>
  );
}
