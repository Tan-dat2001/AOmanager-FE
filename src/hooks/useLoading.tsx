import { useCallback, useState } from "react";

export default function useLoading(initState: Record<string, boolean>) {
  const [loading, setLoading] = useState(initState);
  const toggleLoading = useCallback((key: string) => {
    setLoading((loading: Record<string, boolean>) => ({ ...loading, [key]: !loading[key] }));
  }, []);
  return { loading, toggleLoading };
}
