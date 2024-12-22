import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const playgroundTopics = [
  { name: "HTML/CSS", description: "Vanilla HTML/CSS/JS playground" },
  { name: "React", description: "React playground using Vite" },
  { name: "Vue 3", description: "Vue 3 playground using Vite" },
  { name: "Solidity", description: "Hardhat based solidity playground" },
  { name: "Python", description: "Python 3 playground" },
  { name: "Java", description: "Java playground" },
  { name: "Golang", description: "Golang playground" },
  { name: "Node.js", description: "Node.js 18 playground" },
  { name: "C++", description: "C++ playground" },
  { name: "C", description: "C playground" },
  { name: "Next.js", description: "Next.js 14 playground" },
  { name: "Bun", description: "Bun playground" },
  { name: "SQLite", description: "SQLite playground" },
  { name: "PHP", description: "PHP playground" },
  { name: "Rust", description: "Rust playground" },
  { name: "Kotlin", description: "Kotlin playground" },
  { name: "Swift", description: "Swift playground" },
  { name: "C# playground", description: "C# playground powered by .NET" },
  { name: "From GitHub", description: "Clone any Git Repo" },
  { name: "Cobol", description: "cobol interview" },
];

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-8 ms-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Interview Topics</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a topic to start your mock interview session
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playgroundTopics.map((item) => (
            <Link
              key={item.name}
              href={`/dashboard/interview/${encodeURIComponent(item.name)}`}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer block">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
