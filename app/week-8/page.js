"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./ItemList";
import MealIdeas from "./MealIdeas";

function cleanItemName(name) {
  return name
    .split(",")[0]
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim();
}

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleItemSelect(item) {
    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold text-white">Shopping List</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-6">
            <NewItem onAddItem={handleAddItem} />
            <div className="rounded-xl bg-slate-800 p-4">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>

          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
