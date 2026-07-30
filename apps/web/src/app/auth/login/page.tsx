import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Login | VERTEXworkout",
  description: "Login to your VERTEXworkout account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-24 font-tajawal" dir="ltr">
      <Container>
        <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-xl border border-slate-100">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#F2EA79] px-4 py-1.5 text-xs font-bold text-[#022859] shadow-sm">
              VERTEXWORKOUT
            </span>

            <h1 className="mt-6 font-cairo text-3xl font-black text-[#022859]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Login to continue your training journey.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold text-[#022859]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#022859]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-[#022859]">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#022859]"
              />
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#022859] hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}