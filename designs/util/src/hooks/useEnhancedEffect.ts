import { EffectCallback, DependencyList, useEffect, useLayoutEffect } from 'react';

const useEnhancedEffect: (effect: EffectCallback, deps?: DependencyList) => void =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useEnhancedEffect;
