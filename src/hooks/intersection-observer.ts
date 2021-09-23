import { MutableRefObject, useEffect, useRef } from 'react';

interface Options {
  root?: MutableRefObject<any>;
  enabled?: boolean;
  rootMargin?: string;
  threshold: number;
  onIntersect?: (entry?: IntersectionObserverEntry) => void;
  onEnter?: (entry?: IntersectionObserverEntry) => void;
  onExit?: (entry?: IntersectionObserverEntry) => void;
}

const useIntersectionObserver = <Target extends Element>({
  root,
  enabled = true,
  rootMargin,
  threshold = 1,
  onIntersect,
  onEnter,
  onExit
}: Options) => {
  const targetRef = useRef<Target>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        return entries.forEach((entry) => {
          if (targetRef.current) {
            if (onIntersect) onIntersect(entry);
            if (onEnter && entry.isIntersecting) onEnter(entry);
						if (onExit && !entry.isIntersecting) onExit(entry);
          }
        });
      },
      {
        root: root && root.current,
        rootMargin,
        threshold
      }
    );

    if (!targetRef || !targetRef.current) return;
    const el = targetRef.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, root, rootMargin, threshold]);

  return targetRef;
};

export default useIntersectionObserver;
