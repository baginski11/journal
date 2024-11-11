import { PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar/AppSidebar";
import { UserContextProvider } from "@/contexts/UserContext";
import { getAuthUser } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/api/user";
import { OrganizationListContextProvider } from "@/contexts/OrganizationListContext";
import { OrganizationContextProvider } from "@/contexts/OrganizationContext";
import { getUserOrganizations } from "@/lib/api/organization";
import { getOrganizationGroups } from "@/lib/api/groups";
import { GroupListContextProvider } from "@/contexts/GroupListContext";

export default async function Layout({ children }: PropsWithChildren) {
  const authUser = await getAuthUser();

  if (!authUser) {
    return redirect("/auth");
  }

  const user = await getUser(authUser.id);

  if (!user) {
    return redirect("/auth");
  }

  const organizations = await getUserOrganizations(user.userId)

  const groups =
    organizations.length > 1
      ? await getOrganizationGroups(organizations[0].orgId)
      : [];

  return (
    <UserContextProvider user={user}>
      <OrganizationListContextProvider organizations={organizations}>
        <OrganizationContextProvider organization={organizations[0]}>
          <GroupListContextProvider>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </GroupListContextProvider>
        </OrganizationContextProvider>
      </OrganizationListContextProvider>
    </UserContextProvider>
  );
}
