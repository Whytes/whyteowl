import Link from 'next/link';
import { FaCarSide, FaTools } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-5xl font-heading font-extrabold mb-12 text-textPrimary drop-shadow text-center">Welcome to WhyteOwl</h1>
      <div className="flex flex-col sm:flex-row gap-10 w-full max-w-2xl justify-center">
        <Link href="/wheels" className="flex-1 group bg-surface text-textPrimary border-2 border-border shadow-xl-glass rounded-2xl px-10 py-16 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-accent hover:text-textPrimary hover:scale-105 hover:shadow-2xl">
          <FaCarSide className="text-6xl text-accent mb-6 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-heading font-bold group-hover:text-textPrimary">Wheels</span>
        </Link>
        <Link href="/bodywork" className="flex-1 group bg-surface text-textPrimary border-2 border-border shadow-xl-glass rounded-2xl px-10 py-16 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-accent hover:text-textPrimary hover:scale-105 hover:shadow-2xl">
          <FaTools className="text-6xl text-accent mb-6 group-hover:rotate-12 transition-transform" />
          <span className="text-3xl font-heading font-bold group-hover:text-textPrimary">Bodywork</span>
        </Link>
      </div>
    </div>
  );
}
