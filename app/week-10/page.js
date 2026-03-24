"use client";

import Link from "next/link";
import { useUserAuth } from "../contexts/AuthContext";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-2xl rounded-xl bg-slate-800 p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">
          Week 10 - Firebase + Firestore
        </h1>

        {!user ? (
          <>
            <p className="mb-4 text-slate-300">
              Please sign in with GitHub to access your shopping list.
            </p>
            <button
              onClick={handleLogin}
              className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Login with GitHub
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">
              Welcome, {user.displayName} ({user.email})
            </p>

            <div className="flex gap-3">
              <Link
                href="/week-10/shopping-list"
                className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
              >
                Go to Shopping List
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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
