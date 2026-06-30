'use client'

import { useEffect } from 'react'

/**
 * Cal.com "exploring-aeo-geo" 15-min booking popup (the user's element-click embed).
 *
 * CalBookingScript loads the Cal embed once per page; after it mounts, ANY element
 * carrying the data-cal-* attributes below (see CalBookButton) opens the booking
 * popup on click. Rendered on every article so the author-perspective CTA works.
 */
const CAL_NAMESPACE = 'exploring-aeo-geo'
const CAL_LINK = 'krishna-kaanth/exploring-aeo-geo'
const CAL_CONFIG = '{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'

export function CalBookingScript() {
  useEffect(() => {
    /* eslint-disable */
    // Official Cal.com loader (queue shim + script injection). Kept verbatim from the
    // embed snippet; params typed `any` so it compiles, idempotent via Cal.loaded.
    ;(function (C: any, A: string, L: string) { let p = function (a: any, ar: any) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar: any = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api: any = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    const Cal = (window as any).Cal
    Cal('init', CAL_NAMESPACE, { origin: 'https://app.cal.com' })
    Cal.ns[CAL_NAMESPACE]('ui', {
      theme: 'light', // force the white (light) popup regardless of the visitor's OS dark mode
      cssVarsPerTheme: { light: { 'cal-brand': '#013087' }, dark: { 'cal-brand': '#449afb' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
    /* eslint-enable */
  }, [])
  return null
}

/** Booking trigger. The data-cal-* attrs are picked up by the embed loaded above. */
export function CalBookButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={CAL_CONFIG}
    >
      {children}
    </button>
  )
}
