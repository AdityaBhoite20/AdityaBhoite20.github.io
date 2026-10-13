import { createFileRoute, notFound } from '@tanstack/react-router';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => { const project = projects.find(item => item.slug === params.slug); if (!project) throw notFound(); return project; },
  head: ({ loaderData }) => { if (!loaderData) return {}; const title = `${loaderData.title} — ${site.name}`; return { meta: [{ title }, { name: 'description', content: loaderData.problem }, { property: 'og:title', content: title }, { property: 'og:description', content: loaderData.problem }, { property: 'og:type', content: 'article' }, { property: 'og:url', content: `/work/${loaderData.slug}` }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: title }, { name: 'twitter:description', content: loaderData.problem }], links: [{ rel: 'canonical', href: `/work/${loaderData.slug}` }] }; },
});
