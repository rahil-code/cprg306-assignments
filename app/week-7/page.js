"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./ItemList";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-white">Shopping List</h1>

        <NewItem onAddItem={handleAddItem} />

        <div className="w-full rounded-xl bg-slate-800 p-4">
          <ItemList items={items} />
        </div>
      </div>
    </main>
  );
}
