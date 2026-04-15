"use client";

import { useState } from "react";

export default function ProfileForm({ onGenerate }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [position, setPosition] = useState("forward");
  const [handedness, setHandedness] = useState("left");
  const [skillLevel, setSkillLevel] = useState("beginner");

  function handleSubmit(event) {
    event.preventDefault();

    onGenerate({
      height,
      weight,
      position,
      handedness,
      skillLevel,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-slate-800 p-6 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Player Profile Form
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-white">
            Height
          </label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 5'10"
            required
            className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white">
            Weight
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 170"
            required
            className="w-full rounded-md border border-slate-600 bg-slate-700 p-2 text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white">
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
          <label className="mb-1 block text-sm font-medium text-white">
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
          <label className="mb-1 block text-sm font-medium text-white">
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
      </div>
    </form>
  );
}
