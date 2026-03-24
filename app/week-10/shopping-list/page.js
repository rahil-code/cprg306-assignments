"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NewItem from "./NewItem";
import ItemList from "./ItemList";
import MealIdeas from "./MealIdeas";
import { useUserAuth } from "../../contexts/AuthContext";
import { getItems, addItem } from "../_services/shopping-list-service";

function cleanItemName(name) {
  return name
    .split(",")[0]
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim();
}

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    async function loadItems() {
      if (!user) return;

      const userItems = await getItems(user.uid);
      setItems(userItems);
    }

    loadItems();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-900 p-6 text-white">
        <div className="mx-auto max-w-xl rounded-xl bg-slate-800 p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">Access Denied</h1>
          <p className="mb-4 text-slate-300">
            You must be logged in to view the shopping list.
          </p>
          <Link
            href="/week-10"
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  async function handleAddItem(newItem) {
    const id = await addItem(user.uid, {
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    });

    setItems((prevItems) => [...prevItems, { ...newItem, id }]);
  }

  function handleItemSelect(item) {
    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Shopping List</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

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
