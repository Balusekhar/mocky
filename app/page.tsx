import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-x-hidden">
      {/* Updated background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgb(5, 5, 5)",
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}></div>

      <main className="relative h-screen flex flex-col justify-center items-center z-10 px-6 pt-24 pb-16 max-w-7xl mx-auto text-center">
        <div className="space-y-12 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-medium leading-tight">
            <div className="text-[#ff8b3e]">AI-Powered Interviews</div>
            <div className="text-white flex items-center justify-center gap-4">
              Prepare <span className="inline-block rotate-45 text-5xl">✦</span>{" "}
              Achieve
            </div>
            <div className="text-[#ff8b3e]">Practice with Mocky</div>
          </h1>

          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Enhance your interview skills with AI-generated questions. Get
            real-time feedback and improve your performance.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}>
            <Button
              variant="outline"
              size="lg"
              className="mt-8 bg-transparent text-white border-white/40 hover:bg-[#ff8b3e] text-lg px-8 py-6 transition-colors duration-500 ease-linear">
              Start Interview <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
