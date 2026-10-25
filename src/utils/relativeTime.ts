/**
 * Relative and exact time labels, formatted with `Intl` in the viewer's locale.
 *
 * Both take an ISO string or a `Date`. A value that does not parse to a time is
 * returned as given: a string comes back unchanged (it is the best label there is),
 * an invalid `Date` comes back as `''`.
 */

const UNITS: ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]> = [
  ['second', 1000],
  ['minute', 60_000],
  ['hour', 3_600_000],
  ['day', 86_400_000],
  ['week', 604_800_000],
  ['month', 2_629_800_000],
  ['year', 31_557_600_000],
];

function toDate(date: string | Date): Date {
  return typeof date === 'string' ? new Date(date) : date;
}

function invalidLabel(date: string | Date): string {
  return typeof date === 'string' ? date : '';
}

/**
 * "18 minutes ago", "3 years ago", "in 2 days", "now", "yesterday" — the largest unit
 * that fits, rounded. Pair it with {@link exactTime} on hover.
 *
 * @param now     the reference time in epoch milliseconds (defaults to the current time)
 * @param locale  a BCP 47 locale; the viewer's locale when omitted
 */
export function relativeTime(
  date: string | Date,
  now: number = Date.now(),
  locale?: string
): string {
  const elapsed = now - toDate(date).getTime();
  if (!Number.isFinite(elapsed)) return invalidLabel(date);
  let [unit, size] = UNITS[0];
  for (const [candidate, candidateSize] of UNITS) {
    if (Math.abs(elapsed) >= candidateSize) [unit, size] = [candidate, candidateSize];
  }
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return formatter.format(-Math.round(elapsed / size), unit);
}

/**
 * The exact date and time, e.g. "25/10/2026, 14:03:12".
 *
 * @param locale  a BCP 47 locale; the viewer's locale when omitted
 */
export function exactTime(date: string | Date, locale?: string): string {
  const parsed = toDate(date);
  return Number.isFinite(parsed.getTime()) ? parsed.toLocaleString(locale) : invalidLabel(date);
}
