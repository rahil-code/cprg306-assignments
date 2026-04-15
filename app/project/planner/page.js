"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../../contexts/AuthContext";
import { addProfile, getProfiles } from "../_services/profile-service";
import ProfileForm from "./ProfileForm";
import RecommendationCard from "./RecommendationCard";
import SavedProfilesList from "./SavedProfilesList";

function generateRecommendation(profile) {
  let stickFlex = "55-65";
  let curve = "Mid curve";
  let skateFit = "Standard fit";
  let notes = "";

  const numericWeight = parseInt(profile.weight);

  if (profile.position === "forward") {
    stickFlex = profile.skillLevel === "beginner" ? "50-60" : "65-75";
    curve = "Mid curve";
    skateFit = "Tapered fit";
    notes = "Great for quicker puck handling, agility, and offensive play.";
  } else if (profile.position === "defense") {
    stickFlex = profile.skillLevel === "beginner" ? "65-75" : "75-85";
    curve = "Heel curve";
    skateFit = "Standard fit";
    notes = "Good for stronger shots, reach, and defensive control.";
  } else if (profile.position === "goalie") {
    stickFlex = "Goalie stick";
    curve = "Paddle curve";
    skateFit = "Wide fit";
    notes = "Designed for puck stopping, balance, and crease movement.";
  }

  if (!isNaN(numericWeight)) {
    if (numericWeight > 200 && profile.position !== "goalie") {
      stickFlex = "75-85";
    } else if (numericWeight < 140 && profile.position !== "goalie") {
      stickFlex = "40-50";
    }
  }

  if (profile.handedness === "right" && profile.position !== "goalie") {
    notes += " Right-handed setup recommended.";
  } else if (profile.handedness === "left" && profile.position !== "goalie") {
    notes += " Left-handed setup recommended.";
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
    async function loadProfiles() {
      if (!user) return;

      const userProfiles = await getProfiles(user.uid);
      setProfiles(userProfiles);
    }

    loadProfiles();
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

    const id = await addProfile(user.uid, profileToSave);

    setProfiles((prevProfiles) => [{ id, ...profileToSave }, ...prevProfiles]);
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
