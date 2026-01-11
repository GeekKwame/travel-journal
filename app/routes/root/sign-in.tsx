import { Link, redirect } from "react-router";
import { loginWithGoogle, getUser } from "~/lib/auth";

export async function clientLoader() {
    try {
        const user = await getUser();
        if (user) return redirect('/');
    } catch (e) {
        console.error("Error fetching user:", e);
        return null;
    }
}

export default function SignIn() {
    const handleSignIn = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Sign in error:", error);
            alert("Failed to sign in. Please try again.");
        }
    };
    return (
        <main className="auth">
            <section className="size-full glassmorphism flex-center px-6">
                <div className="sign-in-card">
                    <header className="header">
                        <Link to="/">
                            <img
                                src="/assets/icons/logo.svg"
                                alt="logo"
                                className="size-[30px]"
                            />
                        </Link>
                        <h1 className="p-28-bold text-dark-100">The Tourist's Planner</h1>
                    </header>
                    <article>
                        <h2 className="p-28-semibold text-dark-100 text-center">
                            Start Your Travel Journey
                        </h2>
                        <p className="p-18-regular text-center text-gray-100 !leading-7">
                            Sign in with Google to manage destinations and user activities with ease.

                        </p>
                    </article>
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-glow"
                    >
                        <img
                            src="/assets/icons/google.svg"
                            className="size-5"
                            alt="google"
                        />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </section>
        </main>
    );
};