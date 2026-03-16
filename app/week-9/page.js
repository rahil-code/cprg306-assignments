"use client";

import Link from "next/link";
import { useUserAuth } from "../contexts/AuthContext";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-xl bg-slate-800 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">Week 9 Login</h1>

        {!user ? (
          <button
            onClick={handleLogin}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Login with GitHub
          </button>
        ) : (
          <>
            <p className="mb-4">
              Welcome, {user.displayName} ({user.email})
            </p>

            <div className="flex gap-3">
              <Link
                href="/week-9/shopping-list"
                className="bg-green-600 px-4 py-2 rounded text-white"
              >
                Go to Shopping List
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
