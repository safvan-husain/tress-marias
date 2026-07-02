import AuthForm from "@/app/components/auth/AuthForm";
import AuthScreen from "@/app/components/auth/AuthScreen";
import { customerLogin } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <AuthScreen
      badge={{ icon: "account_circle", label: "Customer account" }}
      title="Welcome back"
      subtitle="Sign in with your username and password to manage your bookings."
      image={{
        src: "https://images.unsplash.com/photo-1543134968-8752069dbf58?auto=format&fit=crop&w=1400&q=90",
        alt: "Delicate flowers floating in water at a serene spa",
      }}
      quote={{
        text: "The at-home service felt just like the clinic — calm, professional, and completely on my schedule.",
        author: "Layla A.",
        role: "Tres Marias member",
      }}
      altPrompt="No account yet?"
      altLabel="Sign up"
      altHref="/signup"
    >
      <AuthForm
        action={customerLogin}
        submitLabel="Sign in"
        pendingLabel="Signing in…"
      />
    </AuthScreen>
  );
}
