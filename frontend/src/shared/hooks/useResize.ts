import { useEffect, RefObject } from "react";

export const useResize = <T extends HTMLElement>(
  ref: RefObject<T | null> | null,
  callbackFn: () => void,
  deps: any[]
) => {
  useEffect(() => {
    if (!ref?.current) return;

    const observer = new ResizeObserver(() => {
      callbackFn();
    });

    observer.observe(ref.current);
    callbackFn();

    return () => observer.disconnect();
  }, [ref, ...deps]);
};
