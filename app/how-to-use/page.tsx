import Header from "../components/page-components/header";

export default function Home() {
  return (
    <main className="w-full">

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="secondary-bg flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-6xl font-extrabold mb-6 primary-text max-w-3xl">
          How to use it
        </h1>
        <p className="text-2xl primary-text mb-10 max-w-2xl">
          Bring your ideas to life with high-contrast colors, bold sections, and lively buttons. Perfectly styled using your custom color palette.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <button className="white-bg third-text px-8 py-4 rounded font-bold hover:brightness-110 transition">
            Get Started
          </button>
          <button className="third-bg white-text px-8 py-4 rounded font-bold hover:brightness-110 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="secondary-bg py-24 px-6">
        <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-3">

          <div className="white-bg rounded-lg border border-white p-8 text-center">
            <h3 className="text-3xl font-extrabold mb-4 primary-text">
              Fast Setup
            </h3>
            <p className="third-text">
              Ready-to-go structure with modern Next.js patterns. Build fast and confidently.
            </p>
          </div>

          <div className="white-bg rounded-lg border border-white p-8 text-center">
            <h3 className="text-3xl font-extrabold mb-4 primary-text">
              Custom Styling
            </h3>
            <p className="third-text">
              Use your unique color palette to create bold, lively designs.
            </p>
          </div>

          <div className="white-bg rounded-lg border border-white p-8 text-center">
            <h3 className="text-3xl font-extrabold mb-4 primary-text">
              Scalable
            </h3>
            <p className="third-text">
              Flexible structure to grow into a full-featured product or app.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="third-bg py-24 text-center px-6">
        <h2 className="text-5xl font-extrabold mb-6 white-text max-w-3xl mx-auto">
          Ready to Build Something Amazing?
        </h2>
        <p className="secondary-text text-xl mb-10 max-w-2xl mx-auto">
          Take your project to the next level with high-contrast, bold designs that feel alive.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <button className="primary-bg white-text px-8 py-4 rounded font-bold hover:brightness-110 transition">
            Start Now
          </button>
          <button className="secondary-bg white-text px-8 py-4 rounded font-bold hover:brightness-110 transition">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="primary-bg py-12 text-center">
        <p className="white-text">
          © {new Date().getFullYear()} Your Project Name
        </p>
      </footer>

    </main>
  );
}
