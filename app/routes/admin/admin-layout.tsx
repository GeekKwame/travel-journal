import NavItems from '@/components/NavItems'
import { Outlet } from 'react-router'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'
import MobileSidebar from '@/components/MobileSidebar'
import { redirect } from 'react-router'
import { getUser } from "~/lib/auth"

export async function clientLoader() {
  try {
    const user = await getUser();
    if (!user) return redirect('/sign-in');

    // Check if user is admin
    if (user.status === 'user') {
      return redirect('/');
    }

    return user;
  } catch (e) {
    console.error("Error in clientLoader", e);
    return redirect('/sign-in');
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <main className="children w-full">
        <div className="wrapper py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
