import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Contact | VERTEXworkout",
  description:
    "Contact VERTEXworkout for coaching, training programs and partnerships.",
};

export default function ContactPage() {
  return (
    <main className="py-24">

      <Container>

        <SectionTitle
          badge="CONTACT"
          title="Get In Touch"
          subtitle="We're here to answer your questions and help you start your fitness journey."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

            <h2 className="text-3xl font-bold text-[#022859]">
              Contact Information
            </h2>

            <div className="mt-8 space-y-6">

              <div>
                <p className="font-bold text-[#022859]">
                  Email
                </p>

                <p className="text-slate-600">
                  contact@vertexworkout.com
                </p>
              </div>

              <div>
                <p className="font-bold text-[#022859]">
                  Phone
                </p>

                <p className="text-slate-600">
                  +20 XXX XXX XXXX
                </p>
              </div>

              <div>
                <p className="font-bold text-[#022859]">
                  Location
                </p>

                <p className="text-slate-600">
                  Alexandria, Egypt
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

            <h2 className="text-3xl font-bold text-[#022859]">
              Ready To Start?
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Join VERTEXworkout and discover professional coaching,
              functional training and performance programs designed
              to help you reach your goals.
            </p>

            <div className="mt-10">

              <Button href="/programs" size="lg">
                Explore Programs
              </Button>

            </div>

          </div>

        </div>

      </Container>

    </main>
  );
}
