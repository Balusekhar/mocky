import {History, Home, LogOut, SmilePlus} from "lucide-react";
import {auth, signOut} from "@/auth";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "./ui/button";
import {redirect} from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: History,
  },
  {
    title: "Upgrade",
    url: "/dashboard/upgrade",
    icon: SmilePlus,
  },
];

export async function AppSidebar() {
  async function handleLogout() {
    "use server";
    await signOut({redirectTo: "/"});
  }

  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <Sidebar>
      <SidebarHeader className="group-data-[collapsible=icon]:hidden pt-4 ps-6 text-3xl font-bold mb-6">
        Mocky
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="ps-5">
                    <Link href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Separator className="my-4"/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Image
                src={session.user?.image || "/placeholder-avatar.png"}
                alt="User avatar"
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="group-data-[collapsible=icon]:hidden">
               {session.user?.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <button
                onClick={handleLogout}
                className="flex w-full items-center">
                <LogOut className="mr-2 h-4 w-4"/>
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
