import { LazyMotion, domMax } from 'framer-motion';
import { PropsWithChildren } from 'react';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = domMax;

export default function MotionLazyContainer({ children }: PropsWithChildren<{}>) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
