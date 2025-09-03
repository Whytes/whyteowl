import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCarSide } from 'react-icons/fa';
import bodyworkData from '../../../../data/bodywork.json';

export default function BodyworkType() {
  const router = useRouter();
  const { category, type } = router.query;

  // Get models for this category and type
  const categoryData = bodyworkData.find(cat => cat.category === category);
  const typeData = categoryData?.types?.find(t => t.type === type);
  const models = typeData?.models || [];

  return (
    <div className="pt-16">
      <nav className="mb-4 text-sm text-gray-300">
        <Link href="/bodywork" className="hover:underline">Bodywork</Link> / 
        <Link href={`/bodywork/${category}`} className="hover:underline ml-1 capitalize">{category}</Link> / 
        <span className="capitalize text-textPrimary ml-1">{type}</span>
      </nav>
      <h1 className="text-3xl font-heading font-bold mb-8 capitalize text-textPrimary drop-shadow text-center">{type} Models</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {models.map(model => (
          <Link key={model.slug} href={`/bodywork/${category}/${type}/${model.slug}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-8 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
            <FaCarSide className="mx-auto mb-4 text-3xl text-accent group-hover:scale-110 transition-transform" />
            <span className="text-xl font-heading font-bold group-hover:text-textPrimary">{model.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
