import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Page from "@/components/profile-page/page";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const cookieStore = cookies();
  if (!cookieStore.has("auth-token")) return notFound();

  return <Page />;
}
