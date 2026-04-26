import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <SignIn signUpUrl="/sign-up" forceRedirectUrl="/" />
    </div>
  );
}
