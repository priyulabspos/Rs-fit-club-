import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { AdminNav } from '@/components/admin-nav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role === 'MEMBER') {
    redirect('/portal');
  }

  return (
    <div className="min-h-screen flex bg-[#fcfbf9]">
      <AdminNav user={user} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              RS Fit Club
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold text-gray-800">Admin Management</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-600">Gate Agent: Simulator Mode</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
