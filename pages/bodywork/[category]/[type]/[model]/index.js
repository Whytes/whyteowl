import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaTools, FaCogs, FaChevronRight } from 'react-icons/fa';
import bodyworkData from '../../../../../data/bodywork.json';

// Icon mapping for different part types
const getPartIcon = (partName) => {
  const name = partName.toLowerCase();
  if (name.includes('spoiler') || name.includes('bumper') || name.includes('fender')) {
    return <FaTools className="inline mr-2 text-accent transition-transform duration-200 group-hover:rotate-12" />;
  }
  return <FaCogs className="inline mr-2 text-accent transition-transform duration-200 group-hover:rotate-12" />;
};

export default function ModelPage() {
  const router = useRouter();
  const { category, type, model } = router.query;
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load parts data for the specific model
  useEffect(() => {
    if (!category || !type || !model) return;
    
    const modelData = bodyworkData
      .find(cat => cat.category === category)
      ?.types?.find(t => t.type === type)
      ?.models?.find(m => m.slug === model);
    
    if (modelData) {
      const partsWithIcons = modelData.parts.map(part => ({
        ...part,
        icon: getPartIcon(part.name),
        options: part.options.map((option, index) => ({
          ...option,
          slug: `option-${index + 1}`,
          image: option.image || `https://images.unsplash.com/photo-${1500000000000 + index}`
        }))
      }));
      setParts(partsWithIcons);
    }
    setLoading(false);
  }, [category, type, model]);

  const handlePartClick = (part) => {
    setSelectedPart(part);
    setSelectedOption(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-textSecondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <nav className="mb-4 text-sm text-gray-300">
        <Link href="/bodywork" className="hover:underline">Bodywork</Link> /
        <Link href={`/bodywork/${category}`} className="hover:underline ml-1 capitalize">{category}</Link> /
        <Link href={`/bodywork/${category}/${type}`} className="hover:underline ml-1 capitalize">{type}</Link> /
        <span className="capitalize text-textPrimary ml-1">{model?.replace(/-/g, ' ')}</span>
      </nav>
      <div className="rounded-2xl shadow-2xl bg-gray-800 max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Sidebar: Parts */}
          <aside className="md:w-56 bg-primary p-4 flex flex-col items-center">
            <h2 className="font-heading font-bold mb-4 text-white text-lg">Parts</h2>
            <ul className="space-y-2 w-full">
              {parts.map((part) => (
                <li key={part.slug}>
                  <button
                    className={`group w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-accent border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent/60 text-left ${selectedPart?.slug === part.slug ? 'bg-accent text-white font-bold shadow-card border-accent' : 'text-white bg-primary'}`}
                    onClick={() => handlePartClick(part)}
                  >
                    {part.icon}{part.name}
                    <FaChevronRight className="ml-auto text-xs opacity-60 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          {/* Middle Panel: Options */}
          <section className="md:w-64 bg-gray-700 p-4 flex flex-col items-center">
            <h3 className="font-heading font-semibold mb-4 text-white text-base text-center">Options</h3>
            {selectedPart ? (
              <div className="grid grid-cols-3 gap-2 w-full justify-items-center">
                {selectedPart.options.map((option, index) => (
                  <button
                    key={option.slug}
                    className={`group aspect-square rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-accent border border-transparent focus:outline-none focus:ring-1 focus:ring-accent/60 flex items-center justify-center ${selectedOption?.slug === option.slug ? 'bg-accent text-white shadow-lg border-accent' : 'text-white bg-gray-600 hover:bg-gray-500 border-gray-500'}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-gray-300 text-center italic">Select a part to see options</div>
            )}
          </section>
          {/* Main Panel: Image/Details */}
          <main className="flex-1 p-8 flex flex-col items-center justify-center bg-gray-900 transition-all duration-300">
            {selectedOption ? (
              <>
                <h1 className="text-2xl font-heading font-bold mb-4 capitalize text-textPrimary drop-shadow animate-fade-in">{model?.replace(/-/g, ' ')}<span className="mx-2 text-accent">/</span>{selectedPart.name}<span className="mx-2 text-accent">/</span>{selectedOption.name}</h1>
                <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl-glass border-2 border-accent/40 bg-gray-800 animate-fade-in">
                  <img
                    src={selectedOption.image}
                    alt={`${selectedPart.name} ${selectedOption.name}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </>
            ) : selectedPart ? (
              <div className="text-gray-300 text-center italic animate-fade-in">Select an option to view image</div>
            ) : (
              <div className="text-gray-400 text-center italic animate-fade-in">Select a part and option to view details</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
