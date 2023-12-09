import { useState } from "react";

export default function useErrors(initState: Record<string, string>) {
  const [errors, setErrors] = useState(initState);
  return {
    errors,
    setErrors: (errors: Record<string, string>) => setErrors({ ...initState, ...errors }),
    clearErrors: () => setErrors(initState),
  };
}
