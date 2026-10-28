import * as React from 'react';

import { exactTime, relativeTime } from '../utils/relativeTime.js';

export interface RelativeTimeProps
  extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, 'dateTime' | 'children'> {
  /** An ISO string or a `Date`. */
  date: string | Date;
  /** A BCP 47 locale for both labels; the viewer's locale when omitted. */
  locale?: string;
}

/**
 * A point in time as "3 days ago", with the exact local date and time on hover.
 *
 * Renders a semantic `<time dateTime>` and nothing else: plain inline text that takes the
 * surrounding typography, so a caller writes `Updated <RelativeTime date={…} />` or wraps it
 * in a `Badge`. The exact time is a `title`, not a `Tooltip`: a tooltip needs a provider and
 * a focusable trigger, and a timestamp is read in lists where a tooltip per row is heavy.
 *
 * The label is computed at render and is not refreshed on a timer; it updates whenever the
 * caller re-renders. Server and client render it at different moments, so the text may differ
 * at hydration; `suppressHydrationWarning` accepts the client's. A date that does not parse
 * renders its input (a string) as the text.
 */
const RelativeTime = React.forwardRef<HTMLTimeElement, RelativeTimeProps>(
  ({ date, locale, title, ...props }, ref) => {
    const parsed = typeof date === 'string' ? new Date(date) : date;
    const valid = Number.isFinite(parsed.getTime());
    return (
      <time
        ref={ref}
        suppressHydrationWarning
        dateTime={valid ? parsed.toISOString() : undefined}
        title={title ?? (valid ? exactTime(parsed, locale) : undefined)}
        {...props}
      >
        {relativeTime(date, Date.now(), locale)}
      </time>
    );
  }
);
RelativeTime.displayName = 'RelativeTime';

export { RelativeTime };
