import { Outlet } from "react-router";
import RootNavbar from "../../../components/RootNavbar";
import { getUser } from "~/lib/auth";

export async function clientLoader() {
    try {
        const user = await getUser();
        return { user };
    } catch (e) {
        return { user: null };
    }
}

import Footer from "../../../components/Footer";

const PageLayout = ({ loaderData }: { loaderData?: { user?: any } }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <RootNavbar user={loaderData?.user} />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default PageLayout

