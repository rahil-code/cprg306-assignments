"use client";

import { useState } from "react";

export default function Page() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [position, setPosition] = useState("forward");
  const [handedness, setHandedness] = useState("left");
  const [skillLevel, setSkillLevel] = useState("beginner");

  const [recommendation, setRecommendation] = useState(null);

  function handleGenerateRecommendation(event) {
    event.preventDefault();

    let stickFlex = "55-65";
    let curve = "Mid curve";
    let skateFit = "Standard fit";
    let notes = "";

    const numericWeight = parseInt(weight);

    if (position === "forward") {
      stickFlex = skillLevel === "beginner" ? "50-60" : "65-75";
      curve = "Mid curve";
      skateFit = "Tapered fit";
      notes = "Great for quicker puck handling, agility, and offensive play.";
    } else if (position === "defense") {
      stickFlex = skillLevel === "beginner" ? "65-75" : "75-85";
      curve = "Heel curve";
      skateFit = "Standard fit";
      notes = "Good for stronger shots, reach, and defensive control.";
    } else if (position === "goalie") {
      stickFlex = "Goalie stick";
      curve = "Paddle curve";
      skateFit = "Wide fit";
      notes = "Designed for puck stopping, balance, and crease movement.";
    }

    if (!isNaN(numericWeight)) {
      if (numericWeight > 200 && position !== "goalie") {
        stickFlex = "75-85";
      } else if (numericWeight < 140 && position !== "goalie") {
        stickFlex = "40-50";
      }
    }

    if (handedness === "right" && position !== "goalie") {
      notes += " Right-handed setup recommended.";
    } else if (handedness === "left" && position !== "goalie") {
      notes += " Left-handed setup recommended.";
    }

    setRecommendation({
      stickFlex,
      curve,
      skateFit,
      notes,
    });
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold">Hockey Gear Planner</h1>

        <div className="grid gap-6 lg:grid-cols-2">
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
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
