import AdminSidebar, {
  type AdminNavItem,
} from "@/app/components/admin/AdminSidebar";
import { staffLogout } from "@/app/actions/auth";
import { verifyStaffSession } from "@/app/lib/auth/dal";
import Icon from "@/app/components/Icon";

const navItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Doctors", href: "/admin/doctors", icon: "medical_services" },
];

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifyStaffSession();

  return (
    <div className="flex min-h-svh bg-canvas text-ink">
      <AdminSidebar
        items={navItems}
        username={session.username}
        role={session.role}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-canvas-deep px-6">
          <p className="text-[0.88rem] text-muted">
            Tres Marias{" "}
            <span className="text-ink">Admin</span>
          </p>
          <form action={staffLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2 text-[0.82rem] font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              <Icon name="logout" className="text-[1rem]" />
              Sign out
            </button>
          </form>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
