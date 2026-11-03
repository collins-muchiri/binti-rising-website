import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * useIsMobile: true when the viewport is below the mobile breakpoint.
 *
 * Implemented with useSyncExternalStore so the matchMedia query drives React
 * updates directly. This replaces the older mount-then-setState pattern,
 * which the react-hooks/set-state-in-effect lint rule flags for causing
 * cascading renders (and which also produced a first frame with a wrong
 * value). Server snapshot reports desktop so SSR markup stays consistent.
 */
function subscribe(onChange: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false, // server snapshot: assume desktop until hydration
  )
}
