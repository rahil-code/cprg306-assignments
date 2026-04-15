"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";
import { addProfile, subscribeToProfiles } from "./_services/profile-service";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [position, setPosition] = useState("forward");
  const [handedness, setHandedness] = useState("left");
  const [skillLevel, setSkillLevel] = useState("beginner");

  const [recommendation, setRecommendation] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToProfiles(user.uid, (profiles) => {
      setSavedProfiles(profiles);
    });

    return () => unsubscribe();
  }, [user]);

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

  function handleGenerateRecommendation(event) {
    event.preventDefault();

    let stickFlex = "55";
    let curve = "Mid Curve";
    let skateFit = "Standard Fit";
    let notes = "";

    const numericWeight = parseInt(weight);

    if (position === "goalie") {
      stickFlex = "Goalie Stick";
      curve = "Paddle Curve";
      skateFit = "Wide Fit";
      notes =
        "Designed for puck stopping, crease movement, and goalie balance.";
    } else {
      let targetFlex = !isNaN(numericWeight) ? numericWeight / 2 : 55;

      if (skillLevel === "beginner") {
        targetFlex -= 10;
      } else if (skillLevel === "intermediate") {
        targetFlex -= 5;
      }

      const flexOptions = [40, 50, 55, 65, 75, 85, 95];

      const closestFlex = flexOptions.reduce((prev, curr) =>
        Math.abs(curr - targetFlex) < Math.abs(prev - targetFlex) ? curr : prev,
      );

      stickFlex = `${closestFlex}`;

      if (position === "forward") {
        curve = "Mid Curve";
        skateFit = "Tapered Fit";
        notes =
          "Optimized for puck handling, agility, and quick release shots.";
      } else if (position === "defense") {
        curve = "Heel Curve";
        skateFit = "Standard Fit";
        notes =
          "Better for stronger shots, defensive reach, and more stability.";
      }

      notes += " Recommended flex is based on roughly half of body weight.";

      if (handedness === "left") {
        notes += " Left-handed setup recommended.";
      } else {
        notes += " Right-handed setup recommended.";
      }
    }

    setRecommendation({
      height,
      weight,
      position,
      handedness,
      skillLevel,
      stickFlex,
      curve,
      skateFit,
      notes,
    });
  }

  async function handleSaveProfile() {
    if (!recommendation || !user) return;

    try {
      const profileToSave = {
        height: recommendation.height,
        weight: recommendation.weight,
        position: recommendation.position,
        handedness: recommendation.handedness,
        skillLevel: recommendation.skillLevel,
        stickFlex: recommendation.stickFlex,
        curve: recommendation.curve,
        skateFit: recommendation.skateFit,
        notes: recommendation.notes,
        createdAt: Date.now(),
      };

      await addProfile(user.uid, profileToSave);

      setRecommendation(null);
      setHeight("");
      setWeight("");
      setPosition("forward");
      setHandedness("left");
      setSkillLevel("beginner");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-900 p-6 text-white">
        <div className="mx-auto max-w-2xl rounded-xl bg-slate-800 p-6 shadow-md">
          <h1 className="mb-4 text-4xl font-bold">Hockey Gear Planner</h1>
          <p className="mb-6 text-slate-300">
            Log in with GitHub to generate and save hockey gear recommendations.
          </p>

          <button
            onClick={handleLogin}
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Login with GitHub
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Hockey Gear Planner</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl bg-slate-800 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Player Profile Form</h2>

            <form onSubmit={handleGenerateRecommendation} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 5'10"
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
                >
                  <option value="forward">Forward</option>
                  <option value="defense">Defense</option>
                  <option value="goalie">Goalie</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Handedness
                </label>
                <select
                  value={handedness}
                  onChange={(e) => setHandedness(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Skill Level
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Generate Recommendation
              </button>
            </form>
          </section>

          <section className="rounded-xl bg-slate-800 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Recommended Gear</h2>

            {!recommendation ? (
              <p className="text-slate-300">
                Fill out the form and generate a recommendation.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="rounded-md bg-slate-700 p-4">
                  <p className="text-sm text-slate-300">Stick Flex</p>
                  <p className="text-lg font-semibold text-white">
                    {recommendation.stickFlex}
                  </p>
                </div>

                <div className="rounded-md bg-slate-700 p-4">
                  <p className="text-sm text-slate-300">Curve</p>
                  <p className="text-lg font-semibold text-white">
                    {recommendation.curve}
                  </p>
                </div>

                <div className="rounded-md bg-slate-700 p-4">
                  <p className="text-sm text-slate-300">Skate Fit</p>
                  <p className="text-lg font-semibold text-white">
                    {recommendation.skateFit}
                  </p>
                </div>

                <div className="rounded-md bg-slate-700 p-4">
                  <p className="text-sm text-slate-300">Notes</p>
                  <p className="text-lg font-semibold text-white">
                    {recommendation.notes}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="w-full rounded-md bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
                >
                  Save Profile
                </button>
              </div>
            )}
          </section>

          <section className="rounded-xl bg-slate-800 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Saved Profiles</h2>

            {savedProfiles.length === 0 ? (
              <p className="text-slate-300">No saved profiles yet.</p>
            ) : (
              <div className="space-y-4">
                {savedProfiles.map((profile) => (
                  <div key={profile.id} className="rounded-md bg-slate-700 p-4">
                    <p className="font-semibold text-white">
                      {profile.position} • {profile.skillLevel}
                    </p>
                    <p className="text-sm text-slate-300">
                      Height: {profile.height} | Weight: {profile.weight}
                    </p>
                    <p className="text-sm text-slate-300">
                      Handedness: {profile.handedness}
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      Stick Flex: {profile.stickFlex}
                    </p>
                    <p className="text-sm text-slate-200">
                      Curve: {profile.curve}
                    </p>
                    <p className="text-sm text-slate-200">
                      Skate Fit: {profile.skateFit}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
