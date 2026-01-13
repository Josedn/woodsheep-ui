import { useEffect, type EffectCallback } from "preact/hooks";

export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);
