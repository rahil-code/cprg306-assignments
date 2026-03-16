"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./ItemList";
import MealIdeas from "./MealIdeas";
import { useUserAuth } from "../../contexts/AuthContext";
import Link from "next/link";

function cleanItemName(name) {
  return name
    .split(",")[0]
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim();
}

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <main className="p-6 text-white">
        <p>You must login first.</p>
        <Link href="/week-9">Go to login</Link>
      </main>
    );
  }

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  function handleItemSelect(item) {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-white text-3xl font-bold mb-4">Shopping List</h1>

      <button
        onClick={firebaseSignOut}
        className="bg-red-600 text-white px-3 py-1 rounded mb-4"
      >
        Logout
      </button>

      <div className="flex gap-6">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
