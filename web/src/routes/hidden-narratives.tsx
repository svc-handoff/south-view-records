import type { ReactNode } from "react";
import { Link } from "react-router";
import ledger from "@/assets/george-wilder-ledger.jpg";
import transcription from "@/assets/george-wilder-transcription.png";
import { usePageTitle } from "@/hooks/use-page-title";

export const HIDDEN_NARRATIVES_PATH = "/hidden-narratives";

const linkClass =
  "font-medium text-foreground underline underline-offset-4 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

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
          Cemetery ledgers record people that newspapers and official histories often left out. Each line holds a name, a
          burial date, an age, and a grave. Once these handwritten pages can be searched, those lines can be connected to
          the events around them, and the people in them can be found again.
        </p>
      </header>

      <section aria-labelledby="case-study" className="flex flex-col gap-4">
        <h2 id="case-study" className="font-heading text-2xl font-semibold text-foreground">
          Case study: the 1906 Atlanta Race Massacre
        </h2>
        <p className="leading-relaxed">
          Beginning on September 22, 1906, white mobs attacked Black people across Atlanta for several days, after local
          newspapers ran sensational, unproven reports of assaults on white women. Official counts listed about two dozen
          Black people killed. Many historians believe the true number was higher, and many of the dead were never named.
        </p>
        <p className="leading-relaxed">
          George Wilder was one of the victims. The South-View ledger records his burial on September 24, 1906, at the age
          of 60.
        </p>

        <Figure
          number="01"
          label="The ledger"
          image={
            <a href={ledger} className="block rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <img
                src={ledger}
                alt="A handwritten ledger page. The top line reads “Geo Wilder,” followed by the numbers 24, 60, and 88, the letter B, and the plat MS."
                className="w-full border border-border"
              />
            </a>
          }
        >
          “Geo Wilder” on the top line of ledger page 31. The clerk wrote the day of the burial (24), his age (60), and
          where in the cemetery he was laid to rest. Select the image to see it larger.
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
          The same line as it appears on this site, kept exactly as written. The highlights show what was hard to read,
          including his name, so a search for a different spelling will still find him.
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

      <p className="leading-relaxed text-muted-foreground">
        Not every name in these ledgers comes with a story we already know. Making the pages searchable is a first step
        toward finding them.
      </p>
    </article>
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
