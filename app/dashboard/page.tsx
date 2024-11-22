import {auth} from "@/auth";
import {Button} from "@/components/ui/button";
import {
  Brain,
  ChevronRight,
  Code2,
  Database,
  Globe,
  Network,
  Server,
} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";

const interviewCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "React, Vue, Angular interviews",
    icon: Code2,
    topics: [
      {
        name: "React.js",
        description: "Components, Hooks, State Management",
      },
      {name: "Vue.js", description: "Vue 3, Composition API, Vuex"},
      {name: "Angular", description: "Components, Services, RxJS"},
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Node.js, Python, Java interviews",
    icon: Server,
    topics: [
      {
        name: "Node.js",
        description: "Express, APIs, Authentication",
      },
      {name: "Python", description: "Django, Flask, FastAPI"},
      {name: "Java", description: "Spring Boot, Hibernate, JPA"},
    ],
  },
  {
    id: "database",
    title: "Database Engineering",
    description: "SQL, NoSQL, System Design",
    icon: Database,
    topics: [
      {name: "SQL", description: "Queries, Optimization, Design"},
      {name: "MongoDB", description: "Schema Design, Aggregation"},
      {name: "System Design", description: "Scalability, Performance"},
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "AWS, Docker, Kubernetes",
    icon: Network,
    topics: [
      {name: "AWS", description: "EC2, S3, Lambda"},
      {name: "Docker", description: "Containers, Compose"},
      {
        name: "Kubernetes",
        description: "Orchestration, Deployment",
      },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "End-to-end application development",
    icon: Globe,
    topics: [
      {name: "MERN Stack", description: "MongoDB, Express, React, Node"},
      {name: "MEAN Stack", description: "MongoDB, Express, Angular, Node"},
      {name: "JAMstack", description: "JavaScript, APIs, Markup"},
    ],
  },
  {
    id: "behavioral",
    title: "Behavioral Interviews",
    description: "Soft skills and leadership",
    icon: Brain,
    topics: [
      {name: "Leadership", description: "Team Management, Decision Making"},
      {name: "Problem Solving", description: "Critical Thinking, Analysis"},
      {
        name: "Communication",
        description: "Team Collaboration, Presentation",
      },
    ],
  },
];

async function page() {
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
        <div className="flex items-center">
          <Button
            variant="outline"
            size="lg"
            className="text-black border-black hover:bg-[#ff8b3e] text-lg px-6 py-4 transition-colors duration-500 ease-linear">
            Select Custom Topic
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interviewCategories.map((category) => (
          <div
            key={category.id}
            className="group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <h2 className="font-semibold leading-none tracking-tight">
                    {category.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.name}
                    href={`/dashboard/interview/${encodeURIComponent(topic.name)}`}
                    className="flex items-center justify-between rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                    <div>
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {topic.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4"/>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
