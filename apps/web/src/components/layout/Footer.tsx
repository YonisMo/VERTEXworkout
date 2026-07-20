export default function Footer() {
  return (
    <footer className="bg-[#011d42] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#F2EA79]">
              VERTEXworkout
            </h2>

            <p className="leading-7 text-slate-300">
              Professional Functional Training,
              Coaching, Academy and Premium
              Fitness Equipment.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Navigation
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>Home</li>
              <li>Programs</li>
              <li>Academy</li>
              <li>Store</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>Alexandria, Egypt</li>
              <li>info@vertexworkout.com</li>
              <li>+20 XXX XXX XXXX</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-[#F2EA79]" />
              <div className="h-10 w-10 rounded-full bg-[#F2EA79]" />
              <div className="h-10 w-10 rounded-full bg-[#F2EA79]" />
              <div className="h-10 w-10 rounded-full bg-[#F2EA79]" />
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-400">
          © 2026 VERTEXworkout. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}