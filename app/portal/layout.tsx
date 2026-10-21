import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="font-extrabold text-xl italic tracking-wider text-[#121212]">
          RS FIT CLUB <span className="text-xs font-normal text-gray-500 uppercase not-italic">| Member Portal</span>
        </div>
        <div className="text-xs text-gray-600">
          Logged in as: <span className="font-semibold">{user.email || user.phone}</span>
        </div>
      </header>
      <main className="p-6 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
