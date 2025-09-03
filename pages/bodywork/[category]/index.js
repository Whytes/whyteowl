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
      <div className="space-y-12 max-w-4xl mx-auto">
        {types.map(type => (
          <section key={type.type}>
            <h2 className="text-2xl font-heading font-extrabold mb-6 text-accent drop-shadow text-left capitalize">{type.type}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {type.models && type.models.length > 0 ? (
                type.models.map(model => (
                  <Link key={model.slug} href={`/bodywork/${category}/${type.type}/${model.slug}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-8 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
                    <FaCarSide className="mx-auto mb-4 text-4xl text-accent group-hover:rotate-12 transition-transform" />
                    <span className="text-xl font-heading font-bold group-hover:text-textPrimary capitalize">{model.name}</span>
                  </Link>
                ))
              ) : (
                <div className="text-gray-400 col-span-full">No vehicles found for this category.</div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
