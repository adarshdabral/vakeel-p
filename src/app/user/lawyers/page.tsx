'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { lawyers } from '@/data/mock';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { LawyerCard } from '@/components/cards/LawyerCard';

const filterTabs = [
  { value: 'all', label: 'All' },
  { value: 'verified', label: 'Verified' },
  { value: 'experienced', label: '10+ yrs' },
];

export default function LawyerSearchPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');

  const filtered = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const matchesQuery =
        lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(query.toLowerCase()) ||
        (lawyer.city ?? '').toLowerCase().includes(query.toLowerCase());
      const matchesTab =
        tab === 'verified'
          ? lawyer.verified
          : tab === 'experienced'
            ? (lawyer.experience ?? 0) >= 10
            : true;
      return matchesQuery && matchesTab;
    });
  }, [query, tab]);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-display text-3xl text-accent">Find lawyers</h1>
        <p className="text-slate-500">Search by specialty, city, or category.</p>
      </header>
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by name, city, or specialty"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-md"
        />
        <Tabs tabs={filterTabs} value={tab} onChange={setTab} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((lawyer) => (
          <Link key={lawyer.id} href={`/user/lawyers/${lawyer.id}`} className="block">
            <LawyerCard lawyer={lawyer} showProfileLink={false} />
          </Link>
        ))}
      </div>
    </section>
  );
}
