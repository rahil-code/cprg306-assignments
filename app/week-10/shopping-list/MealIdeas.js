"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas);
    }

    loadMeals();
  }, [ingredient]);

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">Meal Ideas</h2>

      {!ingredient ? (
        <p className="text-slate-600">Select an item to see meal ideas.</p>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-600">
            Showing meal ideas for:{" "}
            <span className="font-semibold">{ingredient}</span>
          </p>

          {meals.length === 0 ? (
            <p className="text-slate-600">No meal ideas found.</p>
          ) : (
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="rounded-md border border-slate-200 p-3"
                >
                  <p className="font-medium text-slate-900">{meal.strMeal}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
