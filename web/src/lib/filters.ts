/** Search filters kept in the /search URL, besides the name query and page. */
export const FILTERS = ["from", "to", "undated", "infant", "uncertain", "plat", "section", "block", "lot", "range", "grave"] as const;

export type Filter = (typeof FILTERS)[number];

/**
 * Years the ledgers cover. Records dated outside them are likely misreadings, so the site
 * leaves them out. Keep in sync with the backend's src/data/burials.ts.
 */
export const LEDGER_YEARS = { first: 1905, last: 1937 } as const;

export type DateBound = "from" | "to";

const pad = (value: number) => String(value).padStart(2, "0");

/** First and last days the date pickers allow, as local dates. */
export const FIRST_DAY = new Date(LEDGER_YEARS.first, 0, 1);
export const LAST_DAY = new Date(LEDGER_YEARS.last, 11, 31);

/** "1906-09-24" -> a local Date, or null for anything else or outside the ledger years. */
export function isoToDate(iso: string | null): Date | null {
  const match = iso ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) : null;
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date < FIRST_DAY || date > LAST_DAY ? null : date;
}

/** A local Date -> "1906-09-24". */
export function dateToIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Reads the filter fields of a search form. The date pickers only allow valid dates in order. */
export function readFilters(form: FormData): Partial<Record<Filter, string>> {
  const text = (name: string) => String(form.get(name) ?? "").trim();
  const values: Partial<Record<Filter, string>> = {};
  for (const name of FILTERS) {
    if (text(name)) values[name] = text(name);
  }
  return values;
}
