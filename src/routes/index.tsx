import { createFileRoute } from '@tanstack/react-router';
import Home from '@/components/portfolio/Home';
import { copy, site } from '@/data/site';
export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({ meta: [
    { title: copy.title }, { name: 'description', content: copy.description },
    { property: 'og:title', content: copy.title }, { property: 'og:description', content: copy.description },
    { property: 'og:type', content: 'website' }, { property: 'og:url', content: '/' },
    { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: copy.title }, { name: 'twitter:description', content: copy.description },
  ], links: [{ rel: 'canonical', href: '/' }], scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, sameAs: [site.githubUrl,site.linkedinUrl].filter(Boolean) }) }] }),
});
