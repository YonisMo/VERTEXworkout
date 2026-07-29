import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Login | VERTEXworkout",
  description: "Login to your VERTEXworkout account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-xl">
          <div className="text-center">
            <span className="rounded-full bg-[#F2EA79] px-4 py-2 font-bold text-[#022859]">
              VERTEXWORKOUT
            </span>

            <h1 className="mt-6 text-4xl font-black text-[#022859]">
              Welcome Back
            </h1>

            <p className="mt-3 text-slate-600">
              Login to continue your training journey.
            </p>
          </div>

          <form className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-[#022859]">
                Email
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#022859]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#022859]">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#022859]"
              />
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <div className="mt-8 text-center text-slate-600">
            Don't have an account?
            <a href="/auth/register" className="ml-2 font-bold text-[#022859]">
              Create Account
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
