import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const playgroundTopics = [
  { name: "HTML/CSS", description: "Web design basics" },
  { name: "React", description: "Dynamic UI creation" },
  { name: "Vue 3", description: "Interactive UI building" },
  { name: "Solidity", description: "Smart contract programming" },
  { name: "Python", description: "Versatile coding language" },
  { name: "Java", description: "Object-oriented programming" },
  { name: "Golang", description: "Backend development language" },
  { name: "Node.js", description: "Server-side JavaScript" },
  { name: "C++", description: "Performance-critical coding" },
  { name: "C", description: "Low-level programming" },
  { name: "Next.js", description: "React-based framework" },
  { name: "Bun", description: "Fast JavaScript runtime" },
  { name: "SQLite", description: "Lightweight database management" },
  { name: "PHP", description: "Web scripting language" },
  { name: "Rust", description: "Safe systems programming" },
  { name: "Kotlin", description: "Modern Android language" },
  { name: "Swift", description: "Apple app development" },
  { name: "C#", description: "Cross-platform programming" },
  { name: "From GitHub", description: "Clone repositories easily" },
  { name: "Cobol", description: "Legacy application development" },
];

export default async function Page() {
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
