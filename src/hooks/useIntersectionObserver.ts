import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Hook that triggers when an element enters the viewport
 */
export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  // Using type assertion to tell TypeScript that this ref will be used properly
  const elementRef = useRef<T>(null) as RefObject<T>;
  const { threshold = 0.1, rootMargin = '0px', root = null } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element enters viewport
        if (entry.isIntersecting && !isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, isIntersecting]);

  // Return the ref and intersection state
  return [elementRef, isIntersecting];
};
