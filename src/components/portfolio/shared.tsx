import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight, Moon, Sun, Menu, ArrowRight } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copy, site, navItems } from "@/data/site";
import { terms, decodePhrases, type Term } from "@/data/terms";
import type { ChartData, FigureData } from "@/data/projects";
import { useActiveSection, useReducedMotion, useScrollProgress, useTheme } from "./hooks";
export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="min-h-11 min-w-11"
      onClick={toggle}
      aria-label={dark ? copy.lightTheme : copy.darkTheme}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </Button>
  );
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const active = useActiveSection(navItems.map((item) => item.id));
  const headerItems = navItems.filter((item) => item.id !== "beyond" && item.id !== "progress");

  const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname !== "/") return;

    event.preventDefault();
    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const updatePosition = () => setAtTop(window.scrollY <= 1);
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <nav className={`site-nav${atTop ? "" : " is-scrolled"}`} aria-label={copy.menuTitle}>
        <div className="container nav-inner">
          <a href="/" className="wordmark">
            {site.name}
            <span className="wordmark-dot">.</span>
          </a>
          <div className="nav-right">
            <div className="nav-links">
              {headerItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id === "about" ? "/" : `/#${item.id}`}
                  className="nav-link"
                  onClick={(event) => handleSectionNavigation(event, item.id)}
                  aria-current={
                    location.pathname === "/" && active === item.id ? "location" : undefined
                  }
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              className="nav-resume"
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.resume}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  className="mobile-menu min-h-11 min-w-11"
                  variant="ghost"
                  size="icon"
                  aria-label={copy.openMenu}
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>{copy.menuTitle}</SheetTitle>
                <SheetDescription className="sr-only">{copy.menuDescription}</SheetDescription>
                <div className="sheet-nav">
                  {headerItems.map((item) => (
                    <a
                      href={item.id === "about" ? "/" : `/#${item.id}`}
                      key={item.id}
                      onClick={(event) => {
                        handleSectionNavigation(event, item.id);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                    {copy.resume} (PDF)
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
export function GridBackground() {
  return <div className="grid-background" aria-hidden="true" />;
}
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
export function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <>
      <p className="mono section-label">{label}</p>
      <h2 className="section-heading">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </>
  );
}
export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="text-link"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
    </a>
  );
}
export function TermTip({ term, children }: { term: Term; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const entry = terms.find((item) => item.term === term);
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="term-tip"
            onClick={() => setOpen(true)}
            aria-label={typeof children === "string" ? children : term}
          >
            {children ?? term}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="term-tooltip">{entry?.meaning}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export function DecodeText({ text, term }: { text: string; term?: Term | undefined }) {
  const match = term ? { term } : decodePhrases.find((item) => item.text === text);
  if (!match) return <>{text}</>;
  const start = text.toLowerCase().indexOf(match.term);
  if (start < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, start)}
      <TermTip term={match.term}>{text.slice(start, start + match.term.length)}</TermTip>
      {text.slice(start + match.term.length)}
    </>
  );
}
export function Microcopy() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % copy.microcopy.length), 4500);
    return () => clearInterval(timer);
  }, [reduced, paused]);
  return (
    <div
      className="mono microcopy"
      aria-live="off"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span key={reduced ? 0 : index} className="microcopy-text">
        <DecodeText text={copy.microcopy[reduced ? 0 : index] ?? ""} />
      </span>
    </div>
  );
}
export function DataTrail() {
  const ref = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [height, setHeight] = useState(1800);
  const [points, setPoints] = useState<{ id: string; label: string; x: number; y: number }[]>([]);
  const [cursor, setCursor] = useState({ x: 24, y: 0, progress: 0, label: "About" });
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const svg = ref.current;
      if (!svg) return;
      const top = svg.getBoundingClientRect().top + scrollY;
      const ids = ["about", "experience", "work", "toolkit", "beyond", "progress", "contact"];
      const next = ids.flatMap((id, index) => {
        const section = document.getElementById(id);
        return section
          ? [
              {
                id,
                label: navItems.find((item) => item.id === id)?.label ?? "In the lab",
                x: [24, 48, 20, 46, 22, 42, 26][index] ?? 24,
                y: Math.max(24, section.getBoundingClientRect().top + scrollY - top + 24),
              },
            ]
          : [];
      });
      setPoints(next);
      setHeight(Math.max(400, (next.at(-1)?.y ?? 1800) + 100));
      requestAnimationFrame(() => requestAnimationFrame(update));
    };
    const update = () => {
      frame = 0;
      const svg = ref.current;
      const path = pathRef.current;
      if (!svg || !path) return;
      const top = svg.getBoundingClientRect().top + scrollY;
      const atPageBottom = scrollY >= document.documentElement.scrollHeight - innerHeight - 2;
      const markers = svg.querySelectorAll<SVGCircleElement>(".trail-marker");
      const lastMarker = markers.item(markers.length - 1);
      const local =
        atPageBottom && lastMarker
          ? Number(lastMarker.getAttribute("cy"))
          : Math.max(0, scrollY + innerHeight * 0.3 - top);
      const length = path.getTotalLength();
      let low = 0,
        high = length;
      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        if (path.getPointAtLength(mid).y < local) low = mid;
        else high = mid;
      }
      const point = path.getPointAtLength(low);
      const sections = ["about", "experience", "work", "toolkit", "beyond", "progress", "contact"];
      let label = atPageBottom ? "Contact" : "About";
      sections.forEach((id) => {
        if (atPageBottom) return;
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < innerHeight * 0.4)
          label = navItems.find((item) => item.id === id)?.label ?? "In progress";
      });
      setCursor({
        x: atPageBottom && lastMarker ? Number(lastMarker.getAttribute("cx")) : point.x,
        y: atPageBottom && lastMarker ? Number(lastMarker.getAttribute("cy")) : point.y,
        progress: length ? low / length : 0,
        label,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(measure);
    if (ref.current?.parentElement?.parentElement)
      observer.observe(ref.current.parentElement.parentElement);
    document
      .querySelectorAll(".hero, #about, #experience, #work, #toolkit, #beyond, #progress, #contact")
      .forEach((section) => {
        observer.observe(section);
      });
    measure();
    document.fonts.ready.then(measure);
    addEventListener("load", measure);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("scrollend", schedule);
    addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("load", measure);
      removeEventListener("scroll", schedule);
      removeEventListener("scrollend", schedule);
      removeEventListener("resize", measure);
    };
  }, []);
  const path =
    "M24 0 " +
    points
      .map((point, index) => {
        if (index === 0) return `L${point.x} ${point.y}`;
        const prev = points[index - 1] ?? { x: 24, y: 0 };
        const mid = (prev.y + point.y) / 2;
        return `L${index % 2 ? 14 : 54} ${mid} L${point.x} ${point.y}`;
      })
      .join(" ") +
    ` L36 ${height}`;
  return (
    <div className="trail-rail" aria-hidden="true">
      <svg ref={ref} height={height} width="150" viewBox={`0 0 150 ${height}`}>
        {points.map((point) => (
          <path key={`grid-${point.id}`} className="trail-grid" d={`M8 ${point.y}H146`} />
        ))}
        <path className="trail-baseline" d={`M34 0V${height}`} />
        <path ref={pathRef} className="trail-base" d={path} />
        <path
          className="trail-progress"
          d={path}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={reduced ? 0 : 1 - cursor.progress}
        />
        {points.map((point) => (
          <g key={point.id}>
            <path className="trail-tick" d={`M8 ${point.y}h8`} />
            <circle cx={point.x} cy={point.y} r="5.5" className="trail-marker" />
            {cursor.label === point.label && (
              <circle cx={point.x} cy={point.y} r="10" className="trail-active-ring" />
            )}
            <g className="trail-label">
              <rect x="64" y={point.y - 15} width="85" height="30" rx="2" />
              <text x="70" y={point.y + 5}>
                {point.label}
              </text>
            </g>
          </g>
        ))}
        <g className="trail-cursor" transform={`translate(${cursor.x} ${cursor.y})`}>
          <circle r="5.5" />
          <rect x="12" y="-34" width="102" height="27" rx="2" />
          <text x="18" y="-16">
            {cursor.label}
          </text>
        </g>
      </svg>
      <span className="mono trail-mobile-tag">{cursor.label}</span>
    </div>
  );
}
export function HeroFigure() {
  return (
    <figure className="hero-figure paper-taped" aria-label={copy.heroFigure.note}>
      <p className="mono figure-label">{copy.heroFigure.label}</p>
      <svg viewBox="0 0 430 350" role="img" aria-label={copy.heroFigure.note}>
        <defs>
          <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" className="figure-grid" fill="none" />
          </pattern>
        </defs>
        <rect x="40" y="32" width="350" height="260" fill="url(#hero-grid)" />
        <path d="M40 32V292H390" className="figure-axis" fill="none" />
        <path
          d="M47 266C60 260 69 256 82 254S101 254 111 259 133 239 145 221 164 217 174 225 194 200 205 180 222 179 232 188 249 152 259 134 276 135 285 145 304 110 315 98 334 101 343 107 367 65 378 48"
          className="figure-path"
        />
        <path
          d="M49 270C63 264 72 260 85 258S103 258 114 263 136 243 148 225 167 221 177 229 197 204 208 184 225 183 235 192 252 156 262 138 279 139 288 149 307 114 318 102 337 105 346 111 370 69 381 52"
          className="figure-sketch"
        />
        {[
          [48, 264],
          [145, 220],
          [232, 187],
          [315, 95],
          [378, 48],
        ].map(([x, y], i) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r={i === 4 ? 4 : 3}
            className={`figure-dot ${i === 4 ? "figure-dot-filled" : ""}`}
          />
        ))}
        <text x="42" y="318" className="figure-note">
          {copy.heroFigure.x}
        </text>
        <text x="18" y="177" transform="rotate(-90 18 177)" className="figure-note">
          {copy.heroFigure.y}
        </text>
        <text x="65" y="283" className="figure-note">
          {copy.heroFigure.start}
        </text>
        <text x="236" y="32" className="figure-note">
          {copy.heroFigure.end}
        </text>
        <path d="M390 292h6M40 26v6" className="figure-axis" />
      </svg>
      <figcaption className="mono figure-label">{copy.heroFigure.note}</figcaption>
    </figure>
  );
}
export function FigureSlot({ figure }: { figure: FigureData }) {
  return (
    <figure className="figure-slot">
      {figure.src ? (
        <Reveal>
          <img src={figure.src} alt={figure.alt} width={1200} height={750} loading="lazy" />
        </Reveal>
      ) : (
        <div className="figure-empty mono">
          {copy.figureMissing} — {figure.description}
        </div>
      )}
      {figure.src && <figcaption className="mono">{figure.description}</figcaption>}
    </figure>
  );
}
export function StaticBarChart({ chart }: { chart: ChartData }) {
  return (
    <figure className="chart">
      <h3 className="chart-title">{chart.title}</h3>
      {chart.bars.map((bar) => (
        <div className="chart-row" key={bar.label}>
          <div className="chart-row-label">
            <span>{bar.label}</span>
            <span className="mono">{bar.display}</span>
          </div>
          <svg
            viewBox="0 0 620 18"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${bar.label}: ${bar.display}`}
          >
            <rect
              x="0"
              y="0"
              width={(bar.value / chart.max) * 620}
              height="18"
              className={bar.secondary ? "bar-secondary" : "bar-primary"}
            />
          </svg>
        </div>
      ))}
      <figcaption className="mono">{copy.staticCaption}</figcaption>
      {chart.note && <p className="chart-note">{chart.note}</p>}
    </figure>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <p>{copy.footer}</p>
      <p className="mono">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
