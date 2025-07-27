import Aside from "@/components/Aside";
import { factoryManagers } from "@/utils/factoryManager";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value || 
  '';

   if (!token) {
    redirect('/auth/login');
  }
  
  const factory = new factoryManagers(token);
  const session = factory.createSessionManager();
  try {
    await session.validateToken();
  } catch (error) {
    redirect('/auth/login');
  }

  return (
    <>
      <Aside></Aside>
      <div className="px-15 py-10 w-full">{children}</div>
    </>
  );
}
