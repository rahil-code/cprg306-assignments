"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./ItemList";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold text-white">Shopping List</h1>

        <div className="mb-6">
          <NewItem onAddItem={handleAddItem} />
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <ItemList items={items} />
        </div>
      </div>
    </main>
  );
}
