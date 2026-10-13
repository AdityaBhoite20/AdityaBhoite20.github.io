import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { copy } from "@/data/site";
import { getStudyBlocks, type Project } from "@/data/projects";
import {
  glanceStats,
  plantDiseaseLabels,
  studyLabels,
  summaries,
  studyCopy,
} from "@/data/study-presentation";
import { useActiveSection } from "./hooks";
import { FigureSlot, StaticBarChart, DecodeText, TextLink } from "./shared";
export default function CaseStudy({ project }: { project: Project }) {
  if (project.publicSummary) {
    return <PlantDiseaseSummary project={project} />;
  }
  return <DetailedCaseStudy project={project} />;
}

function PlantDiseaseSummary({ project }: { project: Project }) {
  const summary = project.publicSummary;
  if (!summary) {
    throw new Error("Plant disease summary is missing.");
  }

  return (
    <div className="container study">
      <a href="/#experience" className="text-link study-back">
        <ArrowLeft size={16} />
        Back to experience
      </a>
      <header className="study-header">
        <p className="mono project-domain">VJTI Centre of Excellence AI Lab</p>
        <h1>{project.title}</h1>
        <p className="scope">
          An internship project applying computer vision to plant disease detection.
        </p>
      </header>
      <section className="study-glance" aria-label={studyCopy.glance}>
        <p className="mono block-label">{studyCopy.glance}</p>
        <dl>
          {glanceStats[project.slug]?.map((stat) => (
            <div key={stat.label}>
              <dt className="mono stat-label">{stat.label}</dt>
              <dd className="stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="plant-summary" aria-label="Project overview">
        {plantDiseaseLabels.map(([label, key]) => (
          <article className="plant-summary-item" key={key}>
            <h2 className="mono block-label">{label}</h2>
            <p>{summary[key]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function DetailedCaseStudy({ project }: { project: Project }) {
  const blocks = getStudyBlocks(project);
  const active = useActiveSection(blocks.map((block) => block.id));
  return (
    <div className="container study">
      <a href="/#work" className="text-link study-back">
        <ArrowLeft size={16} />
        {copy.back}
      </a>
      <header className="study-header">
        <p className="mono project-domain">
          {project.index} / {project.domain}
        </p>
        <h1>{project.title}</h1>
        <div className="mono study-meta">
          <span>{project.type}</span>
          <span>{project.methods.join(" / ")}</span>
          <span className="study-status">{project.status}</span>
        </div>
        {project.scope && <p className="scope">{project.scope}</p>}
      </header>
      <section className="study-glance" aria-label={studyCopy.glance}>
        <p className="mono block-label">{studyCopy.glance}</p>
        <dl>
          {glanceStats[project.slug]?.map((stat) => (
            <div key={stat.label}>
              <dt className="mono stat-label">{stat.label}</dt>
              <dd className="stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="study-layout">
        <aside className="study-toc">
          <p className="mono block-label">{copy.onPage}</p>
          <nav aria-label={copy.onPage}>
            {blocks.map((block, index) => (
              <a
                href={`#${block.id}`}
                key={block.id}
                className="toc-link"
                aria-current={active === block.id ? "location" : undefined}
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {studyLabels[block.id]?.label ?? block.title.split(" — ")[0]}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          {blocks.map((block, index) => {
            const label = studyLabels[block.id];
            const bullets =
              summaries[project.slug]?.[block.id] ?? block.items ?? block.paragraphs ?? [];
            const details =
              block.id !== "tools" &&
              Boolean(
                block.paragraphs?.length ||
                block.items?.length ||
                block.charts?.length ||
                block.figures?.length,
              );
            return (
              <article className="study-block" id={block.id} key={block.id}>
                <h2 className="mono block-label">
                  {String(index + 1).padStart(2, "0")} / {label?.label ?? block.title}
                  {label?.phrase && (
                    <>
                      {" "}
                      — <DecodeText text={label.phrase} term={label.term} />
                    </>
                  )}
                </h2>
                {block.id === "tools" ? (
                  <p>{project.tools.join(" / ")}</p>
                ) : (
                  <ol className={`study-list ${block.pending ? "pending" : ""}`}>
                    {bullets.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
                {details && (
                  <Accordion type="single" collapsible className="study-details">
                    <AccordionItem value={block.id}>
                      <AccordionTrigger>{studyCopy.details}</AccordionTrigger>
                      <AccordionContent>
                        {block.callout && <p className="study-callout">{block.callout}</p>}
                        {block.paragraphs?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {block.items && (
                          <ol className="study-list">
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ol>
                        )}
                        {block.charts?.map((chart) => (
                          <StaticBarChart key={chart.title} chart={chart} />
                        ))}
                        {block.figures?.map((figure) => (
                          <FigureSlot key={figure.description} figure={figure} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                {block.id === "repository" && project.repo && (
                  <TextLink href={project.repo} external>
                    {copy.repository}
                  </TextLink>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
