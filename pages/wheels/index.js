import Link from 'next/link';
import { FaCarSide } from 'react-icons/fa';

const wheelCategories = [
  { name: 'Tuner', slug: 'tuner' },
  { name: 'Sport', slug: 'sport' },
  { name: 'Street', slug: 'street' },
  { name: 'BennysOG', slug: 'bennysog' },
];

export default function Wheels() {
  return (
    <div className="pt-16">
      <h1 className="text-4xl font-heading font-extrabold mb-10 text-textPrimary drop-shadow text-center">Wheels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {wheelCategories.map(cat => (
          <Link key={cat.slug} href={`/wheels/${cat.slug}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-8 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
            <FaCarSide className="mx-auto mb-4 text-4xl text-accent group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-heading font-bold group-hover:text-textPrimary">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
