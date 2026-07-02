import AuthForm from "@/app/components/auth/AuthForm";
import AuthScreen from "@/app/components/auth/AuthScreen";
import { customerSignup } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <AuthScreen
      badge={{ icon: "person_add", label: "Create account" }}
      title="Join Tres Marias"
      subtitle="Pick a username (lowercase letters and hyphens) and a password to get started."
      image={{
        src: "https://images.unsplash.com/photo-1610402601271-5b4bd5b3eba4?auto=format&fit=crop&w=1400&q=90",
        alt: "A relaxing hot-stone massage treatment in a calm spa setting",
      }}
      quote={{
        text: "Booking beauty and advanced aesthetics in one place changed my whole routine. I never look elsewhere now.",
        author: "Dr. Temi Akitikori",
        role: "Aesthetics & wellness enthusiast",
      }}
      altPrompt="Already have an account?"
      altLabel="Sign in"
      altHref="/login"
    >
      <AuthForm
        action={customerSignup}
        submitLabel="Create account"
        pendingLabel="Creating account…"
      />
    </AuthScreen>
  );
}
