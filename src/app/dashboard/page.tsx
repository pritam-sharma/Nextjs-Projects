import { cookies } from "next/headers";
import { supabase } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get("sb-access-token")?.value;

  if (!access_token) redirect("/login");

  const { data, error } = await supabase.auth.getUser(access_token);
  if (error) redirect("/login");

  return (
    <div className="bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold">Welcome, {data.user.email}!</h1>
      <p className="mt-4">This is your dashboard.</p>
    </div>
  );
}
