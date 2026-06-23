import { useEffect } from "react";

export function useScrollSnap(enabled: boolean) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!enabled || !isMobile) {
      return;
    }

    const html = document.documentElement;
    const prevScrollSnapType = html.style.scrollSnapType;
    const prevScrollPaddingTop = html.style.scrollPaddingTop;

    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "7.9rem";

    return () => {
      html.style.scrollSnapType = prevScrollSnapType;
      html.style.scrollPaddingTop = prevScrollPaddingTop;
    };
  }, [enabled]);
}
