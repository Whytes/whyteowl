import catalog from "../data/catalog.json";

export default function Catalog() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Bodywork Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {catalog.map((item) => (
          <div key={item.id} className="border rounded p-4 hover:shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
