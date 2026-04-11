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

    const result = {
      stickFlex: "55-65",
      curve: "Mid curve",
      skateFit: "Standard fit",
      notes: `Recommended for a ${skillLevel} ${position}.`,
    };

    setRecommendation(result);
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
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 170 lbs"
                  className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
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
              <div className="space-y-3 text-slate-200">
                <p>
                  <span className="font-semibold">Stick Flex:</span>{" "}
                  {recommendation.stickFlex}
                </p>
                <p>
                  <span className="font-semibold">Curve:</span>{" "}
                  {recommendation.curve}
                </p>
                <p>
                  <span className="font-semibold">Skate Fit:</span>{" "}
                  {recommendation.skateFit}
                </p>
                <p>
                  <span className="font-semibold">Notes:</span>{" "}
                  {recommendation.notes}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
