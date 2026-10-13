import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav, GridBackground, Footer, DecodeText } from "@/components/portfolio/shared";
import { copy, site } from "@/data/site";
import { Button } from "@/components/ui/button";
function NotFoundComponent() {
  return (
    <div className="container not-found">
      <p className="mono">404</p>
      <h1>{copy.notFound}</h1>
      <p className="body-text">
        <DecodeText text="This page is cooked." />
      </p>
      <div>
        <Button asChild variant="editorial">
          <Link to="/">{copy.goHome}</Link>
        </Button>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container not-found">
      <h1>{copy.errorTitle}</h1>
      <p className="body-text">{copy.errorBody}</p>
      <div className="flex gap-4">
        <Button
          variant="editorial"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          {copy.retry}
        </Button>
        <Button asChild variant="outline">
          <a href="/">{copy.goHome}</a>
        </Button>
      </div>
    </div>
  );
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Patrick+Hand&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.toggle('dark',localStorage.getItem('portfolio-theme')==='dark')}catch(e){document.documentElement.classList.remove('dark')}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(
        () => document.getElementById(location.hash)?.scrollIntoView(),
        80,
      );
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    return undefined;
  }, [location.pathname, location.hash]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="site-shell">
        <GridBackground />
        <Nav />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
