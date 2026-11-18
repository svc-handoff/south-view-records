import { useState } from "react";
import { CalendarIcon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { dateToIso, FIRST_DAY, LAST_DAY } from "@/lib/filters";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * A button that opens a calendar, limited to days between `min` and `max` (the ledger years by
 * default). Month and year dropdowns jump straight to any part of the range. The chosen day is
 * sent with the form as `name`, in YYYY-MM-DD form.
 */
export function DatePicker({
  id,
  name,
  label,
  value,
  onChange,
  min = FIRST_DAY,
  max = LAST_DAY,
  defaultMonth,
  disabled = false,
}: {
  id: string;
  name: string;
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  min?: Date;
  max?: Date;
  defaultMonth?: Date;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const iso = value ? dateToIso(value) : "";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            id={id}
            disabled={disabled}
            className={cn(
              "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 text-left text-base outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{value ? formatDate(iso) : "Any date"}</span>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={value ?? undefined}
              defaultMonth={value ?? defaultMonth ?? min}
              startMonth={min}
              endMonth={max}
              disabled={[{ before: min }, { after: max }]}
              onSelect={(day) => {
                onChange(day ?? null);
                setOpen(false);
              }}
              className="rounded-2xl [--cell-size:--spacing(10)]"
            />
          </PopoverContent>
        </Popover>
        {value && !disabled ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={`Clear the ${label} date`}
            className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <XIcon aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
      <input type="hidden" name={name} value={disabled ? "" : iso} />
    </div>
  );
}
