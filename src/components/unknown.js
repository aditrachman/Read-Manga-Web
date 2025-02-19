const stats = [
  { name: "Total Manga", stat: "12" },
  { name: "Jumlah Genre", stat: "9" },
  { name: "Manga Hari ini", stat: "4" },
];

export default function Unknown() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-base font-semibold text-gray-300">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow-sm sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-400">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
