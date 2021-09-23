import React, { memo } from 'react';
import useIntersectionObserver from '../../hooks/intersection-observer';

interface EntryPointProps {
  enabled?: boolean;
  threshold?: number;
  onEnter?: (entry?: IntersectionObserverEntry) => void;
  onExit?: (entry?: IntersectionObserverEntry) => void;
}

function EntryPoint({ threshold = 1, enabled = true, ...props }: EntryPointProps) {
  const ref = useIntersectionObserver<HTMLSpanElement>({
    threshold: threshold,
    enabled: enabled,
    ...props
  });

  return <span style={{ fontSize: 0 }} ref={ref} />;
}

export default memo(EntryPoint);
