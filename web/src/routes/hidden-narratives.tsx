import type { ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import ledger from "@/assets/george-wilder-ledger.jpg";
import transcription from "@/assets/george-wilder-transcription.png";
import { usePageTitle } from "@/hooks/use-page-title";
import { formatDate } from "@/lib/format";
import { METHODS_PATH } from "@/routes/methods";
import { cn } from "@/lib/utils";

export const HIDDEN_NARRATIVES_PATH = "/hidden-narratives";

const linkClass =
  "font-medium text-foreground underline underline-offset-4 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

const COALITION_URL = "https://1906atlantaracemassacre.org/";
const CONTACT_URL = "https://southviewcemetery.com/contact-us/";
const ROJAS_URL = "https://www.nytimes.com/2023/09/30/us/atlanta-race-massacre-1906.html";

/** Victims of the massacre found in the ledger, with details as the ledger records them. */
const FOUND = [
  { name: "George Wilder", asWritten: "Geo Wilder", buried: "1906-09-24", age: "60", line: 36 },
  { name: "Marshall Carter", asWritten: "Marshal Carter", buried: "1906-09-25", age: "13", line: 33 },
  { name: "Milton Brown", asWritten: "Milton Brown", buried: "1906-09-24", age: "22", line: 39 },
  { name: "Frank Smith", asWritten: "Frank Smith", buried: "1906-09-24", age: "76", line: 45 },
  {
    name: "Stinson Ferguson",
    asWritten: "Hindson Ferguson",
    buried: "1906-09-27",
    age: "25",
    line: 7,
    possible: true,
  },
] satisfies { name: string; asWritten: string; buried: string; age: string; line: number; possible?: boolean }[];

/** A search for one name on one burial date, so the link keeps working if record ids change. */
const recordSearch = (asWritten: string, date: string) =>
  `/search?${new URLSearchParams({ q: asWritten, from: date, to: date })}`;

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
          Cemetery ledgers often contain hidden insights that can lead to a better understanding of stories and
          historical events. The dates, locations, and names of individuals buried during certain time periods can provide these
          insights.
        </p>
      </header>

      <section aria-labelledby="case-study" className="flex flex-col gap-4">
        <h2 id="case-study" className="font-heading text-2xl font-semibold text-foreground">
          Case study: the 1906 Atlanta Race Massacre
        </h2>
        <p className="leading-relaxed">
          In late September 1906, the Atlanta Race Massacre occurred. Throughout four days, white mobs killed at least
          twenty-five Black Atlantans. False and sensational news reports detailing assaults on white women from white
          newspapers, radicalized the mob leading to this race-driven attack{" "}
          <Cite href={COALITION_URL}>Coalition to Remember</Cite>.
        </p>
        <p className="leading-relaxed">
          George Wilder was one of the victims <Cite href={COALITION_URL}>Coalition to Remember</Cite>. The South-View Burial Records Index Project found his name in the ledger and
          detailed information below.
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
          “Geo Wilder” is on line 36 of the ledger, page 31. The record contains the day of the burial (24), his age
          (60), and his cemetery location. Select the image to view it larger.
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
          The highlights show what was hard to read in the automated transcription process, including his name, so searches for a
          different or similar spelling will still be picked up.
        </Figure>
      </section>

      <section aria-labelledby="additional-records" className="flex flex-col gap-4">
        <h2 id="additional-records" className="font-heading text-2xl font-semibold text-foreground">
          Additional Records Found
        </h2>
        <p className="leading-relaxed">
          From the 16 identified victims of the Massacre, the record system identified a total of four buried at
          South-View (George Wilder, Marshall Carter, Milton Brown, Frank Smith). Although Stinson Ferguson is also
          believed to be buried at South-View <Cite href={ROJAS_URL}>Rojas</Cite>, the system did not identify his records (It did find a Hindson Ferguson with
          the same age buried on September 27, 1906, which may be a potential match.) On the Coalition to Remember’s site, Wilder,
          Carter, and Smith are all already recorded as being buried at South-View; however, Brown’s record makes note
          that where he is buried is unknown <Cite href={COALITION_URL}>Coalition to Remember</Cite>.
        </p>

        <ul className="flex flex-wrap justify-center gap-4 py-2">
          {FOUND.map((person) => (
            <FoundCard key={person.name} person={person} />
          ))}
        </ul>

        <p className="leading-relaxed">
          This project is a possible first ever indication of Brown’s burial location and age. Without a digitized
          and searchable index, finding and analyzing these records would have been a very tedious process. It would have
          involved a manual search over fragile records, while analyzing difficult handwriting. The system’s automated flow makes
          this and even more research possible. For example, it found a discrepancy in that Wilder’s age is recorded
          as 60 years old in the ledger and 70 years old on the Coalition to Remember site and a similar, even greater
          discrepancy with Smith’s age being recorded as 76 in the ledger and 19 on the site <Cite href={COALITION_URL}>Coalition to Remember</Cite>. These discrepancies provide
          additional areas for researchers to uncover the truth and stories behind these victims.
        </p>
      </section>

      <section aria-labelledby="hidden-narratives" className="flex flex-col gap-4">
        <h2 id="hidden-narratives" className="font-heading text-2xl font-semibold text-foreground">
          Hidden Narratives Found
        </h2>
        <p className="leading-relaxed">
          The South-View Burial Records Index Project provides a unique insight into the African American community of the early
          1900s in Atlanta. Many of those buried at South-View, especially the poorer, were buried in unmarked graves{" "}
          <Cite href={ROJAS_URL}>Rojas</Cite>. But by providing this interface to the public, the hidden become more
          visible. For example, in The New York Times article, Carter was said to be buried in an unmarked grave, but
          the system’s records provide a location <Cite href={ROJAS_URL}>Rojas</Cite>. These hidden narratives now come through, a history that was once buried in
          books and ink is now accessible and at the fingertips of all.
        </p>
      </section>

      <section aria-labelledby="invitation" className="flex flex-col gap-4">
        <h2 id="invitation" className="font-heading text-2xl font-semibold text-foreground">
          Invitation to Readers
        </h2>
        <p className="leading-relaxed">
          If you have any family members or history that you want to share, please reach out to the{" "}
          <a href={CONTACT_URL} className={linkClass}>
            South-View Cemetery team
          </a>
          .
        </p>
      </section>

      <p className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        <Link to={recordSearch("Geo Wilder", "1906-09-24")} className={linkClass}>
          See George Wilder’s record
        </Link>
        <Link to="/search?from=1906-09-22&to=1906-09-30" className={linkClass}>
          See everyone buried September 22–30, 1906
        </Link>
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        All burial records are courtesy of South-View’s handwritten ledgers, and scanned by the Georgia Tech Library.
        Transcription process is documented in{" "}
        <Link to={METHODS_PATH} className={linkClass}>
          methods
        </Link>
        .
      </p>

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
          <li>
            Rick Rojas, In a ‘City Too Busy to Hate,’ New Attention to an Overlooked Race Massacre, The New York Times,
            2023,{" "}
            <a href={ROJAS_URL} className={`${linkClass} break-all`}>
              {ROJAS_URL}
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

/** One person found in the ledger: where they appear, the name as the clerk wrote it, and the key details. */
function FoundCard({ person }: { person: (typeof FOUND)[number] }) {
  const possible = "possible" in person;
  return (
    <li
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm sm:w-[calc(50%-0.5rem)]",
        possible ? "border-dashed border-gold-ink/60" : "border-border",
      )}
    >
      <div aria-hidden="true" className={cn("h-1", possible ? "bg-gold-ink/40" : "bg-gold-ink")} />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium tracking-wider text-gold-ink uppercase">
            Page 31 · Line {person.line}
          </span>
          {possible ? (
            <span className="rounded-full border border-gold-ink/50 px-2 py-0.5 text-xs font-medium text-gold-ink">
              Possible match
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-xl font-semibold text-foreground">{person.name}</h3>
          <p className="font-heading text-muted-foreground italic">Written as “{person.asWritten}”</p>
        </div>
        <dl className="grid grid-cols-[3fr_2fr] divide-x divide-border border-y border-border py-3">
          <div className="flex flex-col gap-0.5 pr-3">
            <dt className="text-xs text-muted-foreground uppercase tracking-wider">Buried</dt>
            <dd className="font-medium whitespace-nowrap">{formatDate(person.buried)}</dd>
          </div>
          <div className="flex flex-col gap-0.5 pl-3">
            <dt className="text-xs text-muted-foreground uppercase tracking-wider">Age</dt>
            <dd className="font-medium">{person.age} years</dd>
          </div>
        </dl>
        <Link
          to={recordSearch(person.asWritten, person.buried)}
          className="group mt-auto inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="underline underline-offset-4">See the record for “{person.asWritten}”</span>
          <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </li>
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
