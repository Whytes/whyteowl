import Link from 'next/link';
import { FaCarSide } from 'react-icons/fa';

const bodyworkCategories = [
  { name: 'Imports', slug: 'imports' },
];

export default function Bodywork() {
  return (
    <div className="pt-16">
      <h1 className="text-4xl font-heading font-extrabold mb-10 text-textPrimary drop-shadow text-center">Bodywork</h1>
      <div className="flex justify-center">
        <div className="max-w-sm w-full">
          {bodyworkCategories.map(category => (
            <Link key={category.slug} href={`/bodywork/${category.slug}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-8 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
              <FaCarSide className="mx-auto mb-4 text-4xl text-accent group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-heading font-bold group-hover:text-textPrimary">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
