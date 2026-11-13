export function lockPageScroll(locked: boolean) {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("no-scroll", locked);
  window.dispatchEvent(
    new CustomEvent("kanaar:scroll-lock", { detail: locked }),
  );
}

declare global {
  interface Window {
    __kanaarIntroMode?: "skip" | "play";
    __lenis?: {
      stop: () => void;
      start: () => void;
      scrollTo: (
        target: string | number | HTMLElement,
        options?: Record<string, unknown>,
      ) => void;
      destroy: () => void;
    };
  }
}