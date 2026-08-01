import Container from "@/components/ui/Container";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-cairo text-4xl font-bold text-[#022859]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <div className="mt-8 space-y-6 text-slate-700 leading-relaxed bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-cairo text-2xl font-bold text-[#022859]">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, purchase a product, subscribe to our newsletter, or contact our support team.
            </p>

            <h2 className="font-cairo text-2xl font-bold text-[#022859]">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process your transactions, send you technical notices, and communicate with you.
            </p>

            <h2 className="font-cairo text-2xl font-bold text-[#022859]">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}