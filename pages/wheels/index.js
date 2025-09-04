import Link from 'next/link';
import { GiCarWheel } from 'react-icons/gi';

const wheelCategories = [
  { name: 'Sport', slug: 'sport' },
  { name: 'High End', slug: 'high-end' },
  { name: 'Tuner', slug: 'tuner' },
  { name: 'Track', slug: 'track' },
  { name: 'SUV', slug: 'suv' },
  { name: 'Street', slug: 'street' },
  { name: 'Off Road', slug: 'off-road' },
  { name: 'Low Rider', slug: 'low-rider' },
  { name: 'Muscle', slug: 'muscle' },
  { name: 'Bike', slug: 'bike' },
  { name: "Benny's OG", slug: 'bennys-og' },
  { name: "Benny's Bespoke", slug: 'bennys-bespoke' },
];

export default function Wheels() {
  return (
    <div className="pt-16">
      <h1 className="text-4xl font-heading font-extrabold mb-10 text-textPrimary drop-shadow text-center">Wheels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2">
        {wheelCategories.map(cat => (
          <Link key={cat.slug} href={`/wheels/${cat.slug}`} className="group block bg-surface text-textPrimary border-2 border-transparent shadow-card rounded-xl p-4 text-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent hover:bg-accent">
            <GiCarWheel className="mx-auto mb-4 text-4xl text-accent group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-heading font-bold group-hover:text-textPrimary">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
