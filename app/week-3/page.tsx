import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Shopping List
        </h1>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <GroceryItemList />
        </div>
      </div>
    </main>
  );
}
