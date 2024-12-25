import { auth } from "@/auth";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns"; // Import date-fns

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const allInterviews = await prisma.interview.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="ms-10 mt-8">
      {/* Styling for the h1 */}
      <h1 className="text-3xl font-bold mb-6">Your Interview History</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allInterviews.map((interview) => (
          <Link
            key={interview.id}
            href={`/feedback/${interview.id}`}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer block">
            <h2 className="text-lg font-semibold mb-2">{interview.topic}</h2>
            <p className="text-sm text-gray-500">
              {format(new Date(interview.createdAt), "PPP")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
