"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../../contexts/AuthContext";
import { addProfile, subscribeToProfiles } from "../_services/profile-service";
import ProfileForm from "./ProfileForm";
import RecommendationCard from "./RecommendationCard";
import SavedProfilesList from "./SavedProfilesList";

function generateRecommendation(profile) {
  let stickFlex = "55";
  let curve = "Mid Curve";
  let skateFit = "Standard Fit";
  let notes = "";

  const numericWeight = parseInt(profile.weight);

  if (profile.position === "goalie") {
    stickFlex = "Goalie Stick";
    curve = "Paddle Curve";
    skateFit = "Wide Fit";
    notes = "Designed for puck stopping, crease movement, and goalie balance.";
  } else {
    let targetFlex = !isNaN(numericWeight) ? numericWeight / 2 : 55;

    if (profile.skillLevel === "beginner") {
      targetFlex -= 10;
    } else if (profile.skillLevel === "intermediate") {
      targetFlex -= 5;
    }

    const flexOptions = [40, 50, 55, 65, 75, 85, 95];

    const closestFlex = flexOptions.reduce((prev, curr) =>
      Math.abs(curr - targetFlex) < Math.abs(prev - targetFlex) ? curr : prev,
    );

    stickFlex = `${closestFlex}`;

    if (profile.position === "forward") {
      curve = "Mid Curve";
      skateFit = "Tapered Fit";
      notes = "Optimized for puck handling, agility, and quick release shots.";
    } else if (profile.position === "defense") {
      curve = "Heel Curve";
      skateFit = "Standard Fit";
      notes = "Better for stronger shots, defensive reach, and more stability.";
    }

    notes += " Recommended flex is based on roughly half of body weight.";

    if (profile.handedness === "left") {
      notes += " Left-handed setup recommended.";
    } else {
      notes += " Right-handed setup recommended.";
    }
  }

  return {
    ...profile,
    stickFlex,
    curve,
    skateFit,
    notes,
  };
}

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [recommendation, setRecommendation] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToProfiles(user.uid, (profilesData) => {
      setProfiles(profilesData);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-900 p-6 text-white">
        <div className="mx-auto max-w-xl rounded-xl bg-slate-800 p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">Access Denied</h1>
          <p className="mb-4 text-slate-300">
            You must be logged in to use the planner.
          </p>
          <Link
            href="/project"
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  function handleGenerate(profile) {
    const result = generateRecommendation(profile);
    setRecommendation(result);
  }

  async function handleSaveProfile() {
    if (!recommendation) return;

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
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
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
          <div>
            <ProfileForm onGenerate={handleGenerate} />
          </div>

          <div>
            <RecommendationCard
              recommendation={recommendation}
              onSave={handleSaveProfile}
            />
          </div>

          <div>
            <SavedProfilesList profiles={profiles} />
          </div>
        </div>
      </div>
    </main>
  );
}
