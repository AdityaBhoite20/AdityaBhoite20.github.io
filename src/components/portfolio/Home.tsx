import { ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { copy, site, sectionLabels } from "@/data/site";
import { projects, type Project } from "@/data/projects";
import { experience } from "@/data/experience";
import { toolkit } from "@/data/toolkit";
import { hobbies } from "@/data/hobbies";
import { SectionDoodles } from "./Doodles";
import { useReducedMotion } from "./hooks";
import { headlineStats } from "@/data/study-presentation";
import { progress } from "@/data/progress";
import {
  DataTrail,
  DecodeText,
  HeroFigure,
  Microcopy,
  Reveal,
  SectionHeading,
  TextLink,
} from "./shared";

function TypedName({ name }: { name: string }) {
  const reducedMotion = useReducedMotion();
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCharacters(name.length);
      return;
    }

    let visible = 0;
    const interval = window.setInterval(() => {
      visible += 1;
      setVisibleCharacters(visible);
      if (visible >= name.length) window.clearInterval(interval);
    }, 72);

    return () => window.clearInterval(interval);
  }, [name, reducedMotion]);

  return (
    <h1 aria-label={name}>
      <span className="typed-name" aria-hidden="true">
        <span className="typed-name-reserve">{name}</span>
        <span className="typed-name-live">
          {name.slice(0, visibleCharacters)}
          {visibleCharacters < name.length && <span className="typed-name-cursor" />}
        </span>
      </span>
    </h1>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Reveal className="project-reveal">
      <article
        className={`project-row project-polaroid ${project.fastener === "pin" ? "paper-pinned" : "paper-taped"}`}
      >
        {project.fastener === "pin" && <span className="paper-pin" aria-hidden="true" />}
        <p className="mono project-index">{project.index}</p>
        <div>
          <h3 className="project-title">
            <Link to="/work/$slug" params={{ slug: project.slug }}>
              {project.title}
            </Link>
          </h3>
          <p className="mono project-domain">{project.domain}</p>
          <p className="project-problem">{project.problem}</p>
          {project.highlights.length > 0 && (
            <ul className="project-highlights" aria-label="Selected project findings">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          <div className="project-links">
            <Link className="text-link" to="/work/$slug" params={{ slug: project.slug }}>
              {project.slug === "plant-disease" ? "Know more" : copy.readCase}
              <ArrowRight size={16} />
            </Link>
            {project.repo && (
              <a
                className="text-link"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.github}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="project-stats">
          {headlineStats[project.slug]?.map((stat) => (
            <div key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="mono stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function ExperienceEntry() {
  return (
    <Reveal className="experience-reveal">
      <article className="experience-entry experience-paper experience-hinge paper-taped">
        <div className="experience-marker" aria-hidden="true">
          01
        </div>
        <div className="experience-main">
          <p className="mono experience-organization">{experience.organization}</p>
          <h3 className="experience-role">{experience.role}</h3>
          <p className="experience-project">{experience.project}</p>
          <p className="experience-summary">{experience.summary}</p>
          {experience.details.length > 0 && (
            <ul className="experience-details">
              {experience.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
          <Link
            className="text-link experience-case-link"
            to="/work/$slug"
            params={{ slug: experience.caseStudySlug }}
          >
            Know more
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="experience-outcome">
          <p className="stat-value">88%</p>
          <p className="mono stat-label">Validation accuracy</p>
        </div>
      </article>
    </Reveal>
  );
}

function HobbyIllustration({ kind }: { kind: (typeof hobbies)[number]["icon"] }) {
  const shared = {
    "aria-hidden": true as const,
    viewBox: "0 0 160 130",
    focusable: false,
  };

  if (kind === "travel") {
    return (
      <svg {...shared}>
        <g transform="rotate(-9 80 65)" strokeLinecap="round" strokeLinejoin="round">
          <rect
            x="35"
            y="37"
            width="90"
            height="70"
            rx="10"
            fill="#e6a54c"
            stroke="white"
            strokeWidth="13"
          />
          <rect
            x="35"
            y="37"
            width="90"
            height="70"
            rx="10"
            fill="#e6a54c"
            stroke="#754b35"
            strokeWidth="4"
          />
          <path
            d="M59 37V28c0-6 5-10 11-10h20c6 0 11 4 11 10v9M35 61h90M80 62v44"
            fill="none"
            stroke="#754b35"
            strokeWidth="4"
          />
          <path d="m54 82 9 7 11-12" fill="none" stroke="#f7e2a4" strokeWidth="4" />
          <circle cx="113" cy="88" r="5" fill="#f7e2a4" />
        </g>
      </svg>
    );
  }
  if (kind === "chess") {
    return (
      <svg {...shared}>
        <g
          transform="translate(-4 -3) scale(1.05) rotate(-2 80 65)"
          fill="#f8f4e8"
          stroke="#252b26"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.1"
        >
          <path d="M80 7v25m-10-16h20" fill="none" strokeWidth="4" />
          <circle cx="80" cy="34" r="3.5" />
          <path d="M70 38h20v7h8v12h8v10l-7 7H61l-7-7V57h8V45h8z" />
          <path d="M64 52h32M61 68h38" fill="none" strokeWidth="2.2" />
          <path d="M63 74h34l-5 8H68z" />
          <path d="M69 82c-1 10-4 19-8 27l-8 8c-3 2-4 4-4 7h62c0-3-1-5-4-7l-8-8c-4-8-7-17-8-27z" />
          <path d="M51 119c-7 1-10 3-10 6 7 5 71 5 78 0 0-3-3-5-10-6z" />
          <path
            d="M45 124h70m-59-7 5-5m-1 7 6-6m30 4-5-5m10 5-6-6M71 89l-5 18m11-17-4 24m15-22 5 18M59 58l4 6m4-8 5 8m22-6-5 8"
            fill="none"
            strokeWidth="1.35"
          />
        </g>
      </svg>
    );
  }
  if (kind === "gaming") {
    return (
      <svg {...shared}>
        <g transform="rotate(-4 80 65)" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M46 42c11-8 21-8 34-3 13-5 24-5 35 3 8 6 14 28 13 43-1 13-12 17-22 8l-15-13H69L54 93c-10 9-21 5-22-8-1-15 5-37 14-43z"
            fill="#73bda0"
            stroke="white"
            strokeWidth="13"
          />
          <path
            d="M46 42c11-8 21-8 34-3 13-5 24-5 35 3 8 6 14 28 13 43-1 13-12 17-22 8l-15-13H69L54 93c-10 9-21 5-22-8-1-15 5-37 14-43z"
            fill="#73bda0"
            stroke="#285a48"
            strokeWidth="4"
          />
          <path d="M54 58v22M43 69h22" stroke="#285a48" strokeWidth="5" />
          <circle cx="104" cy="63" r="5" fill="#f3e4b0" />
          <circle cx="116" cy="74" r="5" fill="#c36658" />
        </g>
      </svg>
    );
  }
  if (kind === "tech") {
    return (
      <svg {...shared}>
        <g transform="rotate(4 80 65)" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M40 31q0-8 9-8h63q9 0 9 8v52H40z"
            fill="#9eb6e7"
            stroke="white"
            strokeWidth="13"
          />
          <path
            d="M40 31q0-8 9-8h63q9 0 9 8v52H40z"
            fill="#9eb6e7"
            stroke="#344d78"
            strokeWidth="4"
          />
          <rect x="49" y="32" width="63" height="42" rx="3" fill="#243d52" />
          <path d="m59 46 8 6-8 6m14 0h19m-19 7h30" fill="none" stroke="#94d6aa" strokeWidth="4" />
          <path d="m24 91 14-9h94l14 9-6 8H31z" fill="#e4e7e2" stroke="white" strokeWidth="12" />
          <path d="m24 91 14-9h94l14 9-6 8H31z" fill="#e4e7e2" stroke="#344d78" strokeWidth="4" />
        </g>
      </svg>
    );
  }
  return (
    <svg {...shared}>
      <g
        transform="translate(8 2) rotate(-5 80 65)"
        fill="#f8f4e8"
        stroke="#252b26"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
      >
        <g transform="translate(-10 -22) scale(.74)" opacity=".78">
          <path d="M18 82c13-4 23-14 33-28l11-16c4-6 10-7 15-2l15 15c7 7 19 9 34 13 9 2 14 8 16 16l2 7c1 6-4 10-11 10H32c-14 0-20-5-14-15z" />
          <path
            d="M23 87c23 4 81 4 118 0m-65-46 17 17m-7-21 17 17m-5-20 15 15"
            fill="none"
            strokeWidth="2.4"
          />
          <path d="M74 53h13m-19 8h13m-19 8h13" fill="none" strokeWidth="2.4" />
        </g>
        <path d="M18 82c13-4 23-14 33-28l11-16c4-6 10-7 15-2l15 15c7 7 19 9 34 13 9 2 14 8 16 16l2 7c1 6-4 10-11 10H32c-14 0-20-5-14-15z" />
        <path
          d="M23 87c23 4 81 4 118 0m-65-46 17 17m-7-21 17 17m-5-20 15 15"
          fill="none"
          strokeWidth="2.7"
        />
        <path d="M74 53h13m-19 8h13m-19 8h13" fill="none" strokeWidth="2.7" />
      </g>
    </svg>
  );
}

function HobbySticker({ hobby }: { hobby: (typeof hobbies)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`hobby-card hobby-card-${hobby.icon}${open ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="hobby-sticker"
        aria-expanded={open}
        aria-controls={`hobby-note-${hobby.icon}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((current) => !current);
        }}
      >
        <span className="hobby-sticker-art">
          <HobbyIllustration kind={hobby.icon} />
        </span>
        <span className="hobby-sticker-title">{hobby.title}</span>
      </button>
      <div className="hobby-description" id={`hobby-note-${hobby.icon}`}>
        {hobby.description}
      </div>
    </div>
  );
}

export default function Home() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailCopyStatus, setEmailCopyStatus] = useState("");
  const independentProjects = projects.filter(
    (project) => project.slug !== experience.caseStudySlug,
  );

  useEffect(() => {
    if (!emailOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEmailOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [emailOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setEmailCopyStatus("Email copied.");
    } catch (error) {
      console.error("Unable to copy email address.", error);
      setEmailCopyStatus("Copy failed. Select the email address to copy it.");
    }
  };

  return (
    <>
      <svg className="sticker-filter-defs" aria-hidden="true">
        <defs>
          <filter
            id="sticker-scribble"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".075"
              numOctaves="2"
              seed="7"
              result="paperNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="paperNoise"
              scale="2.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <DataTrail />
      <div className="container">
        <section className="hero" id="hero">
          <div className="hero-copy">
            <p className="mono status">
              <span className="status-dot" />
              {copy.status}
            </p>
            <p className="mono quest-line">Main quest: Built Intelligent Systems</p>
            <TypedName name={site.name} />
            <p className="hero-subhead">{copy.heroTitle}</p>
            <p className="hero-body">{copy.heroBody}</p>
            <div className="hero-actions">
              <Button asChild variant="editorial">
                <a href="#work">
                  {copy.explore}
                  <ArrowRight />
                </a>
              </Button>
              <TextLink href={site.githubUrl} external>
                {copy.github}
              </TextLink>
              {site.linkedinUrl && (
                <TextLink href={site.linkedinUrl} external>
                  {copy.linkedin}
                </TextLink>
              )}
            </div>
            <Microcopy />
          </div>
          <div className="hero-art">
            <SectionDoodles index={0} />
            <HeroFigure />
          </div>
          <a className="mono scroll-cue" href="#about">
            <i aria-hidden="true" />
            {copy.scroll}
          </a>
        </section>

        <section id="about" className="content-section">
          <SectionDoodles index={0} />
          <Reveal>
            <SectionHeading label={sectionLabels.about} title={copy.aboutTitle} />
          </Reveal>
          <Reveal className="about-paper-reveal">
            <div className="about-paper paper-pinned">
              <span className="paper-pin" aria-hidden="true" />
              <div className="about-grid">
                <div>
                  <div className="education">
                    <p className="education-degree">{copy.education.degree}</p>
                    <p className="education-school">{copy.education.institution}</p>
                    <p className="education-location">{copy.education.location}</p>
                    <p className="education-meta">{copy.education.graduation}</p>
                  </div>
                  <div className="about-brain-anchor">
                    <img
                      className="about-brain-sticker"
                      src="/brain-sticker.png"
                      width="504"
                      height="380"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  {site.aboutPhoto && (
                    <img
                      className="editorial-photo"
                      src={site.aboutPhoto}
                      width={500}
                      height={600}
                      alt={site.name}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="about-copy">
                  {copy.aboutParagraphs.map((paragraph) => (
                    <p className="body-text" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  <p className="pull-quote">
                    <DecodeText text="lowkey obsessed with how data behaves" />
                  </p>
                  <div className="focus-list">
                    {copy.focusAreas.map((area) => (
                      <div className="focus-item" key={area}>
                        <ArrowUpRight aria-hidden="true" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="experience" className="content-section">
          <SectionDoodles index={1} />
          <Reveal>
            <SectionHeading label={sectionLabels.experience} title={copy.experienceTitle} />
          </Reveal>
          <ExperienceEntry />
        </section>

        <section id="work" className="content-section">
          <SectionDoodles index={2} />
          <Reveal>
            <div className="work-header">
              <div>
                <SectionHeading
                  label={sectionLabels.work}
                  title={copy.workTitle}
                  intro={copy.workIntro}
                />
              </div>
              <p className="mono work-count">{copy.workCount}</p>
            </div>
          </Reveal>
          {independentProjects.map((project) => (
            <ProjectRow project={project} key={project.slug} />
          ))}
        </section>

        <section id="toolkit" className="content-section">
          <SectionDoodles index={3} />
          <Reveal>
            <SectionHeading label={sectionLabels.toolkit} title={copy.toolkitTitle} />
            <p className="mono playful-line">A few tools I use to build, analyse, and ship.</p>
            <div className="toolbelt" aria-label="Technologies used across my projects">
              <div className="toolbelt-track">
                {[0, 1].map((copyIndex) => (
                  <div
                    className="toolbelt-set"
                    key={copyIndex}
                    role="list"
                    aria-label={copyIndex === 0 ? "Tools I use" : undefined}
                    aria-hidden={copyIndex === 1}
                  >
                    {toolkit.map((tool) => (
                      <div
                        className="toolbelt-item"
                        key={`${copyIndex}-${tool.name}`}
                        role="listitem"
                      >
                        <img src={tool.icon} alt="" width="34" height="34" loading="lazy" />
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="beyond" className="content-section">
          <SectionDoodles index={4} />
          <Reveal>
            <SectionHeading label={sectionLabels.beyond} title={copy.beyondTitle} />
            <div className="hobby-list">
              {hobbies.map((hobby) => (
                <HobbySticker hobby={hobby} key={hobby.title} />
              ))}
            </div>
            {site.travelPhotos.filter(Boolean).map((photo, index) => (
              <img
                className="editorial-photo"
                key={photo}
                src={photo}
                width={1000}
                height={650}
                alt={`${hobbies[0]?.title} — ${index + 1}`}
                loading="lazy"
              />
            ))}
          </Reveal>
        </section>

        <section id="progress" className="content-section">
          <SectionDoodles index={5} />
          <Reveal className="progress-grid">
            <div>
              <SectionHeading label={sectionLabels.progress} title={copy.progressTitle} />
              <p className="mono playful-line">Learning log / current priorities</p>
              {site.lastUpdated && (
                <p className="mono updated">
                  {copy.lastUpdated} / {site.lastUpdated}
                </p>
              )}
            </div>
            <ol className="progress-list">
              {progress.map((item, index) => (
                <li key={item.title}>
                  <span className="mono progress-index">0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="contact" className="contact-section">
          <SectionDoodles index={5} />
          <Reveal>
            <SectionHeading
              label={sectionLabels.contact}
              title={copy.contactTitle}
              intro={copy.contactBody}
            />
            <p className="mono playful-line">
              <DecodeText text="Slide into my inbox." />
            </p>
            <div className="contact-links">
              {site.email && (
                <button
                  className="contact-link"
                  type="button"
                  onClick={() => {
                    setEmailCopyStatus("");
                    setEmailOpen(true);
                  }}
                  aria-haspopup="dialog"
                >
                  <Mail aria-hidden="true" />
                  <span>{copy.email}</span>
                </button>
              )}
              {!site.email && (
                <span
                  className="contact-link contact-link-placeholder"
                  aria-label="Email link to be added"
                >
                  <Mail aria-hidden="true" />
                  <span>{copy.email}</span>
                </span>
              )}
              {site.linkedinUrl && (
                <a
                  className="contact-link"
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin aria-hidden="true" />
                  <span>{copy.linkedin}</span>
                  <ArrowUpRight aria-hidden="true" className="contact-external" />
                </a>
              )}
              {!site.linkedinUrl && (
                <span
                  className="contact-link contact-link-placeholder"
                  aria-label="LinkedIn profile link to be added"
                >
                  <Linkedin aria-hidden="true" />
                  <span>{copy.linkedin}</span>
                </span>
              )}
              <a
                className="contact-link"
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github aria-hidden="true" />
                <span>{copy.github}</span>
                <ArrowUpRight aria-hidden="true" className="contact-external" />
              </a>
              {site.resumeUrl && (
                <a
                  className="contact-link"
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{copy.resume}</span>
                  <ArrowUpRight aria-hidden="true" className="contact-external" />
                </a>
              )}
            </div>
          </Reveal>
        </section>
      </div>
      {emailOpen && (
        <div
          className="email-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setEmailOpen(false);
          }}
          onWheel={(event) => {
            if (event.target === event.currentTarget) setEmailOpen(false);
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) setEmailOpen(false);
          }}
        >
          <section
            className="email-paper-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-paper-title"
          >
            <button
              className="email-paper-close"
              type="button"
              onClick={() => setEmailOpen(false)}
              aria-label="Close email card"
            >
              <X aria-hidden="true" />
            </button>
            <p className="mono email-paper-kicker">A note for your inbox</p>
            <h2 id="email-paper-title">Let’s get in touch.</h2>
            <a className="email-paper-address" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <button className="email-paper-copy" type="button" onClick={copyEmail}>
              {emailCopyStatus === "Email copied." ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
              {emailCopyStatus === "Email copied." ? "Copied" : "Copy email"}
            </button>
            <p className="email-copy-status" role="status" aria-live="polite">
              {emailCopyStatus}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
