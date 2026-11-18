import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from '@/components/wedding-invitation';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Lokeshwari Devi & Shiva Kumar | Wedding Invitation · 26 November 2026' },
    { name: 'description', content: 'We solicit your gracious presence at the wedding of our elder daughter Chi. Sow. Lokeshwari Devi with Chi. Shiva Kumar on Thursday, 26th November 2026 at 9:16 AM at Parimala Convention, Narayanguda, Hyderabad.' },
    { property: 'og:title', content: 'Lokeshwari Devi & Shiva Kumar — Wedding Invitation' },
    { property: 'og:description', content: 'Sumuhurtham: Thursday, 26th November 2026 at 9:16 a.m. ("Dhanur Lagnam") · Parimala Convention, Narayanguda, Hyderabad.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: WeddingInvitation,
});
