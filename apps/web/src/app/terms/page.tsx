import Container from "@/components/ui/Container";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-cairo text-4xl font-bold text-[#022859]">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <div className="mt-8 space-y-6 text-slate-700 leading-relaxed bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-cairo text-2xl font-bold text-[#022859]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the VERTEX Workout platform, you agree to be bound by these Terms and Conditions. If you do not agree to all terms, please do not use our services.
            </p>

            <h2 className="font-cairo text-2xl font-bold text-[#022859]">2. User Accounts & Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
            </p>

            <h2 className="font-cairo text-2xl font-bold text-[#022859]">3. Training & Health Disclaimer</h2>
            <p>
              Our fitness programs and exercises are designed for educational and training purposes. You should consult a physician before starting any intense physical training or nutrition program. VERTEX Workout is not liable for any injuries sustained during training.
            </p>

            <h2 className="font-cairo text-2xl font-bold text-[#022859]">4. Purchases & Store Policies</h2>
            <p>
              All purchases made through our store or academy are subject to product availability and confirmation of the order price. We reserve the right to refuse or cancel any order.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}