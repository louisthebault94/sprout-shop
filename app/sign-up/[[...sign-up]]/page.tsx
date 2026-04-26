import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <SignUp signInUrl="/sign-in" forceRedirectUrl="/" />
    </div>
  );
}
