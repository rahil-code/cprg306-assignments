"use client";

import { useState } from "react";
import Item from "./Item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  const active = "bg-slate-900 text-white";
  const inactive = "bg-slate-200 text-slate-900 hover:bg-slate-300";

  return (
    <section className="w-full max-w-2xl">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setSortBy("name")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${sortBy === "name" ? active : inactive}`}
        >
          Sort by Name
        </button>
        <button
          type="button"
          onClick={() => setSortBy("category")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${sortBy === "category" ? active : inactive}`}
        >
          Sort by Category
        </button>
      </div>

      <ul className="space-y-3">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </section>
  );
}
