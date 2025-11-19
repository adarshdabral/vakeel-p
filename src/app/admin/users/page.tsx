import { UserCard } from '@/components/cards/UserCard';
import { users } from '@/data/mock';

export default function AdminUsersPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Clients</h1>
        <p className="text-slate-500">All registered client accounts.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
