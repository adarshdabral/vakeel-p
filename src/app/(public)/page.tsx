'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { LawyerCard } from '@/components/cards/LawyerCard';
import { lawyers } from '@/data/mock';

const featureCards = [
  {
    title: 'Verified lawyers',
    description: 'Every expert passes document checks, mock hearings, and live interviews before appearing in search.',
  },
  {
    title: 'Secure OTP sessions',
    description: 'Two-factor OTP access and encrypted WebRTC calls protect each consultation end-to-end.',
  },
  {
    title: 'Smart bookings',
    description: 'Choose slots, lock payments, and receive reminders that sync across user, lawyer, and admin portals.',
  },
  {
    title: 'Integrated payments',
    description: 'Razorpay-powered flows with instant refunds, GST invoices, and admin monitoring built-in.',
  },
];

const cityOptions = ['all', ...new Set(lawyers.map((lawyer) => lawyer.city).filter((city): city is string => Boolean(city)))];
const categoryOptions = ['all', ...new Set(
  lawyers.map((lawyer) => lawyer.category ?? lawyer.specialization).filter((value): value is string => Boolean(value)),
)];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLawyers = useMemo(() => {
    return lawyers
      .filter((lawyer) => {
        const matchesName = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCityInput = (lawyer.city ?? '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSearch = searchTerm ? matchesName || matchesCategory || matchesCityInput : true;
        const matchesCity = selectedCity === 'all' ? true : lawyer.city?.toLowerCase() === selectedCity.toLowerCase();
        const categoryValue = (lawyer.category ?? lawyer.specialization).toLowerCase();
        const matchesCategoryFilter =
          selectedCategory === 'all' ? true : categoryValue === selectedCategory.toLowerCase();

        return matchesSearch && matchesCity && matchesCategoryFilter;
      })
      .slice(0, 3);
  }, [searchTerm, selectedCity, selectedCategory]);

  return (
    <div className="min-h-screen bg-secondary/60">
      <PublicNavbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 rounded-3xl bg-white/90 px-10 py-12 shadow-soft md:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
              Legal help in 60 seconds
            </p>
            <h1 className="font-display text-4xl text-accent">
              India’s fastest way to book verified lawyers
            </h1>
            <p className="text-lg text-slate-600">
              Vakeel Pro connects clients, lawyers, and admins on a single secure workspace with OTP protected video calls,
              intuitive bookings, and role-aware dashboards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/auth/register">Get started</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/user/lawyers">Browse lawyers</Link>
              </Button>
            </div>
          </div>
          <Card className="space-y-4 bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-white">Live session snapshot</CardTitle>
              <CardDescription className="text-white/70">
                Realtime availability, secure Razorpay payments, and crisp notes sync across devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                <div>
                  <p className="text-sm text-white/70">Next session</p>
                  <p className="text-lg font-semibold">Adv. Aisha Khan</p>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase">10:00 AM</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 px-3 py-2">
                  <p className="text-white/70">OTP</p>
                  <p className="text-lg font-semibold tracking-widest">123456</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2">
                  <p className="text-white/70">Status</p>
                  <p className="text-lg font-semibold">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Search by name or keyword"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-accent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="all">All cities</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-accent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="all">All categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-accent">Available lawyers</h2>
              <p className="text-slate-500">Filtered by your city, name, or category preferences.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/user/lawyers">See all lawyers</Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {filteredLawyers.length ? (
              filteredLawyers.map((lawyer) => <LawyerCard key={lawyer.id} lawyer={lawyer} />)
            ) : (
              <p className="text-sm text-slate-500">No lawyers match your filters yet.</p>
            )}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {featureCards.map((item) => (
            <Card key={item.title} className="bg-white/90">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
