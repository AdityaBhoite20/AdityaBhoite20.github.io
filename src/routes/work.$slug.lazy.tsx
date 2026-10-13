import { createLazyFileRoute } from '@tanstack/react-router';
import CaseStudy from '@/components/portfolio/CaseStudy';
export const Route = createLazyFileRoute('/work/$slug')({ component: Study });
function Study() { const project = Route.useLoaderData(); return <CaseStudy project={project}/>; }
