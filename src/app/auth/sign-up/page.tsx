import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SignUp from "@/components/auth/sign-up/page";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const cookieStore = cookies();
  if (cookieStore.has("auth-token")) return notFound();

  return <SignUp />;
}
