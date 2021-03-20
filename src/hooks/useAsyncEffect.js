import { useEffect } from "react";

/**
 *
 * @param callback callback
 * @param deps dependencies
 */
export default function useAsyncEffect(callback, deps) {
  useEffect(() => {
    callback().catch((e) => console.log("useAsyncEffect error:", e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
