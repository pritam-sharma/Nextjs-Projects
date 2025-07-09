"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleSendSuggestion = async () => {
    if (!suggestion.trim()) return;

    try {
      const { error } = await supabase
        .from("suggestion")
        .insert([{ suggestion: suggestion.trim() }]);

      if (error) {
        console.error("Error saving suggestion:", error.message);
        alert("Failed to send suggestion. Please try again.");
        return;
      }

      setSuggestion("");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Checking session...</p>
      </div>
    );
  }

  if (!user) {
    return null; // wait for redirect
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          🎉 Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-700 mb-4">
          Hello <span className="font-semibold">{user.email}</span> 👋
        </p>
        <p className="text-gray-600 mb-2">
          Thank you for being part of our community. We&apos;re thrilled to have
          you on board!
        </p>
        <p className="text-gray-600 mb-2">
          Stay tuned for more updates, exciting features, and useful tools to
          make your experience even better.
        </p>
        <p className="text-gray-600 mb-6">
          If you have any feedback or suggestions, we&apos;d love to hear from
          you.
        </p>

        <div className="flex flex-col space-y-3">
          <textarea
            rows={4}
            className="p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your suggestion here..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />

          <button
            onClick={handleSendSuggestion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          Sent successfully!
        </div>
      )}
    </div>
  );
}
