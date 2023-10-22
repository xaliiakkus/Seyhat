import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SignIn from "@/components/auth/log-in/page";

export const dynamic = "force-dynamic";

export default async function LogInPage() {
  const cookieStore = cookies();
  if (cookieStore.has("auth-token")) return notFound();

  return <SignIn />;
}
