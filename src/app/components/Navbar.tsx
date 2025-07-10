"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/login"; // or "/"
};


  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link href="/">
        <button className="font-bold text-black">🏠 Home</button>{" "}
      </Link>
      {user ? (
        <div className="space-x-4 flex flex-row">
          <Link href="/dashboard">
            <button className="mt-1">Dashboard</button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row space-x-4">
          <Link href="/login">
            <button className="font-bold text-black">Login</button>{" "}
          </Link>
          <Link href="/signup">
            <button className="font-bold text-black">Sign Up</button>{" "}
          </Link>
        </div>
      )}
    </nav>
  );
}
