import type { ReactNode } from "react";
import { usePageTitle } from "@/hooks/use-page-title";

export const METHODS_PATH = "/methods";

/** A short, plain-language account of how the ledgers were transcribed. */
export function MethodsPage() {
  usePageTitle("How these records were made");

  return (
    <article className="flex flex-col gap-6">
      <h1 tabIndex={-1} className="font-heading text-3xl font-semibold text-foreground outline-none">
        How these records were made
      </h1>

      <Section title="Scanning the ledgers">
        The ledgers that were scanned by the GT Library were split into single pages from two-page spreads and cropped accordingly.
        This allowed us to maximize accuracy and use AI for the automated transcription process.
      </Section>

      <Section title="Reading the handwriting">
       A large language model (LLM) and subagents were used to transcribe pages. The LLM zoomed in on hard-to-read parts to improve accuracy.
        The agents were given instructions about the layout of the ledgers as well as examples on how to fill out the transcriptions.
        If the agent had uncertainty, that was marked and documented and visible on the site.

      </Section>



      <Section title="A note on accuracy">
        All of these transcriptions were done with an LLM, so there may be accuracy issues. Follow the uncertainty markings when you want to determine the model's confidence.
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
      <p className="leading-relaxed">{children}</p>
    </section>
  );
}
