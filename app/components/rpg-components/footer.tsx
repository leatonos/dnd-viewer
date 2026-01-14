"use client";

type FooterProps = {
  isConnected: boolean;
  version: string;
};

export default function Footer({ isConnected, version }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 primary-bg text-sm flex items-center px-4">
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Connection Status (Center) */}
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="white-text">
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Version (Right) */}
      <div className="flex-1 white-text text-right">
        v{version}
      </div>
    </footer>
  );
}
