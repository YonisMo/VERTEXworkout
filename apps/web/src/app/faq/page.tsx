import Container from "@/components/ui/Container";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is VERTEX Workout?",
      answer: "VERTEX Workout is a professional functional fitness platform combining training, education, equipment, and innovation under one ecosystem.",
    },
    {
      question: "How can I start my training program?",
      answer: "You can sign up for an account, browse our programs section, and select the program that best fits your fitness goals.",
    },
    {
      question: "Do you ship fitness equipment internationally?",
      answer: "Yes, we provide shipping options for our store products. You can check shipping availability during checkout.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to our team anytime through the Contact page or via our support email.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-cairo text-4xl font-bold text-[#022859]">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-slate-600">
            Find answers to common questions about our platform, programs, and store.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-cairo text-xl font-bold text-[#022859]">{faq.question}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}