import type { ReactNode } from "react";
import { usePageTitle } from "@/hooks/use-page-title";

export const METHODS_PATH = "/methods";

/** How the ledgers were scanned, transcribed, combined, and checked. */
export function MethodsPage() {
  usePageTitle("Records Processing");

  return (
    <article className="flex flex-col gap-6">
      <h1 tabIndex={-1} className="font-heading text-3xl font-semibold text-foreground outline-none">
        Records Processing
      </h1>

      <Section title="Scanning the Ledgers">
        <p>
          Books one and two, starting in the early 1900s, were completely scanned by the Georgia Tech Library. These were
          uploaded to OneDrive and shared with the South-View partners and members of the group to be processed. Each
          scanned ledger was provided as a PDF with a two-page spread per document page. An automated process was used to
          convert the pages to images, and crop the spreads to individual pages, with a 2% overlap. The second book
          processed spreads as the base unit rather than individual pages.
        </p>
      </Section>

      <Section title="Reading the Handwriting">
        <p>
          An automated cluster of agents were given a specific prompt with specific transcription instructions, inference
          rules, and the output CSV format. They scanned the input in cropped row batches to maintain high quality without
          scaling down the image or processing the entire image at once. Each page was processed up to five times, with a
          strict time limit to prevent excess processing times, and the agent was required to maintain the integrity of
          the image by retaining abnormalities and notes with a distinct uncertainty parameter instead of attempting
          retries.
        </p>
        <p>
          Book one relied on the deepseek-v4.1-flash, gpt-6.1-terra, claude-sonnet-5-5, and glm-5.3-flash models for
          transcription Model selection evolved as pages were being processed, with gemini-3.8-flash and qwen3.8-max being
          used for the second book.
        </p>
      </Section>

      <Section title="Combining the Data">
        <p>
          Page and spread CSV outputs were concatenated to two master lists for books one and two, respectively. Another
          set of agents ran rectification on the main spreadsheets without being granted access to any of the images,
          resulting in over five hundred rows being adjusted. Book two maintained stricter control and forbade inference to
          reduce potential mistakes.
        </p>
      </Section>

      <Section title="Improving the Results">
        <p>
          Initial processing with book one illuminated some issues that required rectification in future transcriptions.
          As a result, book two relied on groups of spreads (two pages) to add more context and maintain the integrity of
          an entire “spread” of the notebook. Additionally, initial transcriptions resulted in numerical values being
          identified for the plat field, which was later discovered to be alphabetical characters only. As a result,
          additional transcription was required for these records focusing on maintaining the correct data type for the
          plat field.
        </p>
        <p>
          Using a combined spreadsheet with labeled page or spread numbers, records without dates were identified and
          given additional context of the previous and next page. The worker was not allowed to infer the dates based on
          nearby records and had to clearly identify the date header; as a result, unknown dates were accepted as a valid
          response from the models, resulting in empty dates being reduced from around two thousand to seven hundred- close
          to 95% of the transcribed records now have dates.
        </p>
      </Section>

      <Section title="Accuracy Analysis">
        <p>
          All transcriptions were completed through automated processes with the assistance of large language models;
          accuracy issues were observed and clearly dictated at the record level with uncertain fields and transcriber
          notes.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 leading-relaxed">
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
