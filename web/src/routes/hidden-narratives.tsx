import type { ReactNode } from "react";
import { Link } from "react-router";
import ledger from "@/assets/george-wilder-ledger.jpg";
import transcription from "@/assets/george-wilder-transcription.png";
import { usePageTitle } from "@/hooks/use-page-title";

export const HIDDEN_NARRATIVES_PATH = "/hidden-narratives";

const linkClass =
  "font-medium text-foreground underline underline-offset-4 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

const COALITION_URL = "https://1906atlantaracemassacre.org/";

/** How the ledgers bring overlooked lives to light, with the 1906 Atlanta Race Massacre as a case study. */
export function HiddenNarrativesPage() {
  usePageTitle("Hidden Narratives");

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 tabIndex={-1} className="font-heading text-3xl font-semibold text-foreground outline-none">
          Hidden Narratives
        </h1>
        <p className="text-lg leading-relaxed">
          Cemetery ledgers often contain hidden insights that can lead us to better understanding stories and historical events. The dates, locations, and names of individuals buried during certain time periods can provide these insights.
        </p>
      </header>

      <section aria-labelledby="case-study" className="flex flex-col gap-4">
        <h2 id="case-study" className="font-heading text-2xl font-semibold text-foreground">
          Case study: the 1906 Atlanta Race Massacre
        </h2>
        <p className="leading-relaxed">
          In late September 1906, the Atlanta Race Massacre occurred. Throughout four days, white mobs killed at least twenty-five Black Atlantans.
          False and sensational news reports detailing assaults on white women from white newspapers, radicalized the mob leading to this race-driven attack{" "}
          <Cite href={COALITION_URL}>Coalition to Remember</Cite>.
        </p>
        <p className="leading-relaxed">
          George Wilder was one of the victims. The South-View Records Index project found his name in the ledger and detailed information below.
        </p>

        <Figure
          number="01"
          label="The ledger"
          image={
            <a href={ledger} className="block rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <img
                src={ledger}
                alt="Handwritten ledger page. The top line is “Geo Wilder,” followed by the numbers 24, 60, and 88, the letter B, and the plat MS."
                className="w-full border border-border"
              />
            </a>
          }
        >
          “Geo Wilder” is on the top line of the ledger, page 31. The record contains the day of the burial (24), his age (60), and
          his cemetery location. Select the image to view it larger.
        </Figure>

        <Figure
          number="02"
          label="The transcription"
          image={
            <img
              src={transcription}
              alt="The same record on this site: Geo Wilder, buried September 24, 1906, age 60, Section 1, Block 3, Lot 88, Range B, Grave 1, plat MS. His name and the range are marked as uncertain readings."
              className="w-full"
            />
          }
        >
          The highlights show what was hard to read in our automated process,
          including his name, so a search for a different or similar spelling will still be picked up.
        </Figure>

        <p className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <Link to="/search?q=Wilder&from=1906-09-24&to=1906-09-24" className={linkClass}>
            See George Wilder’s record
          </Link>
          <Link to="/search?from=1906-09-22&to=1906-09-30" className={linkClass}>
            See everyone buried September 22–30, 1906
          </Link>
        </p>
      </section>

      <section aria-labelledby="sources" className="flex flex-col gap-3 border-t border-border pt-6">
        <h2 id="sources" className="font-heading text-xl font-semibold text-foreground">
          Sources
        </h2>
        <ul className="flex flex-col gap-2 text-sm leading-relaxed">
          <li>
            Coalition to Remember the 1906 Atlanta Race Massacre, The 1906 Atlanta Race Massacre, 1906atlantaracemassacre.org,{" "}
            <a href={COALITION_URL} className={linkClass}>
              {COALITION_URL}
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

/** A short in-text citation, e.g. "(Coalition to Remember)", linking to the source. */
function Cite({ href, children }: { href: string; children: ReactNode }) {
  return (
    <>
      (
      <a href={href} className={linkClass}>
        {children}
      </a>
      )
    </>
  );
}

/** An image with a numbered, labeled caption, e.g. "01 · THE LEDGER". */
function Figure({ number, label, image, children }: { number: string; label: string; image: ReactNode; children: ReactNode }) {
  return (
    <figure className="flex flex-col gap-3">
      {image}
      <figcaption className="leading-relaxed text-muted-foreground">
        <span className="mr-2 text-sm font-medium tracking-wider text-gold-ink uppercase">
          {number} · {label}
        </span>
        {children}
      </figcaption>
    </figure>
  );
}
