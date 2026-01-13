import Image from "next/image";
import Header from "./components/page-components/header";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl">
      <Header />

      {/* Hero section */}
      <section className="mt-24 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Start your DM Campaign easily
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          A easy-to-use tool for DMs who want an interactive tool to manage your players and show information. It is perfect for online DMs and Streamers
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800">
            Get Started
          </button>

          <button className="rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </section>

      {/* Feature section */}
      <section className="mt-24 grid gap-8 sm:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Fast Setup</h3>
          <p className="mt-2 text-sm text-gray-600">
            Ready-to-go structure with modern Next.js patterns.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Tailwind CSS</h3>
          <p className="mt-2 text-sm text-gray-600">
            Utility-first styling with full design control.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Scalable</h3>
          <p className="mt-2 text-sm text-gray-600">
            Easy to grow into a full product or app.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Project Name
      </footer>
    </main>
  );
}
