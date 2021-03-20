import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
