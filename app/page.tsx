import { redirect } from 'next/navigation';

export default function RootPage() {
  // For now, redirect to dashboard. Later this will be the landing page.
  redirect('/dashboard');
}
