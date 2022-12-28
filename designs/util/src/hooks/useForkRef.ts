import { Ref, useMemo } from 'react';

import { setRef } from 'src/ref';

export default function useForkRef<Instance>(
  refA?: Ref<Instance> | null,
  refB?: Ref<Instance> | null,
): Ref<Instance> | null {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
