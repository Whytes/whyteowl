import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCarSide } from 'react-icons/fa';
import bodyworkData from '../../../data/bodywork.json';

export default function BodyworkCategory() {
  const router = useRouter();
  const { category } = router.query;

  // Get the types for this category
  const categoryData = bodyworkData.find(cat => cat.category === category);
  const types = categoryData?.types || [];

  return (
    <div className="pt-16">
      <nav className="mb-4 text-sm text-gray-300">
        <Link href="/bodywork" className="hover:underline">Bodywork</Link> / <span className="capitalize text-textPrimary">{category}</span>
      </nav>
      <h1 className="text-3xl font-heading font-bold mb-8 capitalize text-textPrimary drop-shadow text-center">{category} Cars</h1>
  <div className="flex justify-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {types.map(type => (
          <Link key={type.type} href={`/bodywork/${category}/${type.type}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-8 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
            <FaCarSide className="mx-auto mb-4 text-3xl text-accent group-hover:scale-110 transition-transform" />
            <span className="text-xl font-heading font-bold group-hover:text-textPrimary capitalize">{type.type}</span>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
