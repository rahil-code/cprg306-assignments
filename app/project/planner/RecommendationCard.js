export default function RecommendationCard({ recommendation, onSave }) {
  if (!recommendation) {
    return (
      <section className="rounded-xl bg-slate-800 p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Recommended Gear
        </h2>
        <p className="text-slate-300">
          Fill out the form and generate a recommendation.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-slate-800 p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Recommended Gear
      </h2>

      <div className="space-y-4">
        <div className="rounded-md bg-slate-700 p-4">
          <p className="text-sm text-slate-300">Stick Flex</p>
          <p className="text-lg font-semibold text-white">
            {recommendation.stickFlex}
          </p>
        </div>

        <div className="rounded-md bg-slate-700 p-4">
          <p className="text-sm text-slate-300">Curve</p>
          <p className="text-lg font-semibold text-white">
            {recommendation.curve}
          </p>
        </div>

        <div className="rounded-md bg-slate-700 p-4">
          <p className="text-sm text-slate-300">Skate Fit</p>
          <p className="text-lg font-semibold text-white">
            {recommendation.skateFit}
          </p>
        </div>

        <div className="rounded-md bg-slate-700 p-4">
          <p className="text-sm text-slate-300">Notes</p>
          <p className="text-lg font-semibold text-white">
            {recommendation.notes}
          </p>
        </div>

        <button
          onClick={onSave}
          className="w-full rounded-md bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
        >
          Save Profile
        </button>
      </div>
    </section>
  );
}
