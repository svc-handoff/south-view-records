import { useEffect, useRef } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
import mark from "@/assets/south-view-mark.png";
import { HIDDEN_NARRATIVES_PATH } from "@/routes/hidden-narratives";
import { METHODS_PATH } from "@/routes/methods";

const focusRing = "rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

/**
 * Site chrome for every page. On client-side navigation, focus moves to the new
 * page's <h1> so screen-reader and keyboard users know the page changed.
 */
export function Layout() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    document.querySelector<HTMLElement>("main h1")?.focus();
  }, [pathname]);

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      {pathname === "/" ? (
        // The home page shows its own large logo, so it only needs the link.
        <nav aria-label="Site" className="mx-auto flex w-full max-w-3xl justify-end px-4 pt-3 sm:px-6">
          <SiteLinks />
        </nav>
      ) : (
        <SiteHeader />
      )}
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-16 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-sm text-muted-foreground">
        Transcribed from the South-View Cemetery grave record ledgers, 1905–1918. Names and values are shown exactly
        as written.
      </footer>
      <ScrollRestoration />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-6">
        <Link to="/" className={`flex items-center gap-3 ${focusRing}`}>
          <img src={mark} alt="" className="h-8 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-bold text-primary">South-View</span>
            <span className="mt-1 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              Burial Records Index
            </span>
          </span>
        </Link>
        <nav aria-label="Site">
          <SiteLinks />
        </nav>
      </div>
    </header>
  );
}

const SITE_LINKS = [
  [HIDDEN_NARRATIVES_PATH, "Hidden Narratives"],
  [METHODS_PATH, "Methods"],
] as const;

function SiteLinks() {
  return (
    <ul className="flex flex-wrap gap-x-5">
      {SITE_LINKS.map(([path, label]) => (
        <li key={path}>
          <Link to={path} className={`inline-block py-2 font-medium text-foreground underline underline-offset-4 ${focusRing}`}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
