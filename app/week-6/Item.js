export default function Item({ name, quantity, category }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div>
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-600">
          Category: <span className="capitalize">{category}</span>
        </p>
      </div>

      <span className="ml-4 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
        x{quantity}
      </span>
    </li>
  );
}
