import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCarSide, FaChevronDown, FaChevronUp, FaIndustry } from 'react-icons/fa';
import bodyworkData from '../../../data/bodywork.json';

export default function BodyworkCategory() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { category } = router.query;

  // Get the types for this category
  const categoryData = bodyworkData.find(cat => cat.category === category);
  const types = categoryData?.types || [];

  // Helper to extract manufacturer from model name (simple split, customize as needed)
  const getManufacturer = (modelName) => {
    const parts = modelName.split(' ');
    // If first part is a year, use second part
    if (/^\d{2,4}'?/.test(parts[0])) {
      return parts[1] || parts[0];
    }
    return parts[0];
  };

  // State for collapsible categories and manufacturers
  // Start all categories and manufacturers expanded by default
  const [openTypes, setOpenTypes] = useState({});
  const [openManufacturers, setOpenManufacturers] = useState({});

  // Reset expanded state when categoryData changes
  useEffect(() => {
    const initialTypes = {};
    const initialManufacturers = {};
    (categoryData?.types || []).forEach(type => {
      initialTypes[type.type] = true;
      initialManufacturers[type.type] = {};
      (type.models || []).forEach(model => {
        const manufacturer = getManufacturer(model.name);
        initialManufacturers[type.type][manufacturer] = true;
      });
    });
    setOpenTypes(initialTypes);
    setOpenManufacturers(initialManufacturers);
  }, [categoryData]);

  // Toggle type section
  const toggleType = (type) => {
    setOpenTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  // Toggle manufacturer section
  const toggleManufacturer = (type, manufacturer) => {
    setOpenManufacturers((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        [manufacturer]: !((prev[type] || {})[manufacturer])
      }
    }));
  };

  return (
  <div className="pt-16">
      <nav className="mb-4 text-sm text-gray-300 bg-slate-900 px-4 py-2 rounded-lg shadow-card border border-border">
        <Link href="/bodywork" className="hover:underline">Bodywork</Link> / <span className="capitalize text-textPrimary">{category}</span>
      </nav>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search vehicles or manufacturers..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/60 text-lg bg-surfaceElevated text-textPrimary shadow-card"
        />
      </div>
      <h1 className="text-3xl font-heading font-bold mb-8 capitalize text-textPrimary drop-shadow text-center">{category} Cars</h1>
      <div className="space-y-8 max-w-4xl mx-auto">
        {types.map(type => {
          // Group models by manufacturer
          const manufacturerGroups = {};
          (type.models || []).forEach(model => {
            const manufacturer = getManufacturer(model.name);
            if (!manufacturerGroups[manufacturer]) manufacturerGroups[manufacturer] = [];
            manufacturerGroups[manufacturer].push(model);
          });
          // Filter manufacturers and models by search
          const filteredManufacturers = Object.keys(manufacturerGroups).filter(manufacturer => {
            if (!search) return true;
            return manufacturer.toLowerCase().includes(search.toLowerCase()) ||
              manufacturerGroups[manufacturer].some(model => model.name.toLowerCase().includes(search.toLowerCase()));
          });
          return (
            <section key={type.type} className="rounded-2xl bg-white/5 backdrop-blur-xl shadow-md border border-white/10 mb-6">
              <button
                className="w-full flex items-center justify-between px-6 py-3 text-xl font-heading font-extrabold text-accent capitalize focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all rounded-2xl bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/20 hover:shadow-md border border-white/10"
                onClick={() => toggleType(type.type)}
                aria-expanded={!!openTypes[type.type]}
              >
                <span className="flex items-center gap-3">
                  <FaCarSide className="text-xl text-accent drop-shadow" />
                  {type.type}
                </span>
                {openTypes[type.type] ? <FaChevronUp className="text-lg" /> : <FaChevronDown className="text-lg" />}
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openTypes[type.type] ? 'opacity-100 max-h-[2000px] py-2' : 'opacity-0 max-h-0 py-0 pointer-events-none'}`}>
                <div className="space-y-4 px-4">
                  {filteredManufacturers.map(manufacturer => {
                    // Filter models by search
                    const filteredModels = manufacturerGroups[manufacturer].filter(model =>
                      !search || model.name.toLowerCase().includes(search.toLowerCase()) || manufacturer.toLowerCase().includes(search.toLowerCase())
                    );
                    if (filteredModels.length === 0) return null;
                    return (
                      <div key={manufacturer} className="rounded-xl bg-white/5 backdrop-blur-lg shadow-sm border border-white/10 mb-2">
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 text-lg font-heading font-bold text-textPrimary capitalize focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all rounded-xl bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/20 hover:shadow-md border border-white/10"
                          onClick={() => toggleManufacturer(type.type, manufacturer)}
                          aria-expanded={!!(openManufacturers[type.type] && openManufacturers[type.type][manufacturer])}
                        >
                          <span className="flex items-center gap-2">
                            <FaIndustry className="text-base text-accent" />
                            {manufacturer}
                          </span>
                          {openManufacturers[type.type] && openManufacturers[type.type][manufacturer] ? <FaChevronUp className="text-base" /> : <FaChevronDown className="text-base" />}
                        </button>
                        <div className={`transition-all duration-500 ease-in-out ${openManufacturers[type.type] && openManufacturers[type.type][manufacturer] ? 'opacity-100 max-h-[2000px] py-2' : 'opacity-0 max-h-0 py-0 pointer-events-none'}`}>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-1">
                            {filteredModels.map(model => (
                              <Link key={model.slug} href={`/bodywork/${category}/${type.type}/${model.slug}`} className="group block bg-surface text-textPrimary border border-border rounded-lg p-3 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
                                <span className="mx-auto mb-2 flex justify-center text-2xl text-accent transition-transform drive-hover">
                                  <FaCarSide />
                                </span>
                                <span className="text-base font-heading font-bold group-hover:text-textPrimary capitalize">{
                                  model.name.startsWith(manufacturer + ' ')
                                    ? model.name.slice(manufacturer.length + 1)
                                    : model.name
                                }</span>
                              </Link>
/* Add driving animation to global styles if not present */
/*
@keyframes drive {
  0% { transform: translateX(0); }
  30% { transform: translateX(10px); }
  60% { transform: translateX(0); }
  100% { transform: translateX(0); }
}
.animate-drive {
  animation: drive 0.5s cubic-bezier(0.4,0.0,0.2,1);
}
*/
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredManufacturers.length === 0 && (
                    <div className="text-gray-400 col-span-full">No vehicles found for this search.</div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
