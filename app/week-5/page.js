import NewItem from "./NewItem";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          New Item
        </h1>
        <NewItem />
      </div>
    </main>
  );
}