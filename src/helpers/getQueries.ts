import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetQueries = () => {
  const [searchParams] = useSearchParams();

  const getQueries = useCallback(() => {
    const queryKeys = Array.from(searchParams.keys()) ?? [];
    return queryKeys.reduce(
      (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
      {}
    );
  }, [searchParams]);

  return useMemo(() => getQueries(), [getQueries]);
};
