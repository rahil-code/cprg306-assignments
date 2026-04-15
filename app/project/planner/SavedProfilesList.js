export default function SavedProfilesList({ profiles }) {
  return (
    <section className="rounded-xl bg-slate-800 p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-white">Saved Profiles</h2>

      {profiles.length === 0 ? (
        <p className="text-slate-300">No saved profiles yet.</p>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="rounded-md bg-slate-700 p-4">
              <p className="font-semibold text-white">
                {profile.position} • {profile.skillLevel}
              </p>
              <p className="text-sm text-slate-300">
                Height: {profile.height} | Weight: {profile.weight}
              </p>
              <p className="text-sm text-slate-300">
                Handedness: {profile.handedness}
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Stick Flex: {profile.stickFlex}
              </p>
              <p className="text-sm text-slate-200">Curve: {profile.curve}</p>
              <p className="text-sm text-slate-200">
                Skate Fit: {profile.skateFit}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
