import {useEffect, useRef} from 'react';

export function useLifecycleScope<T>() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return (promise: () => Promise<T>) => {
    return new Promise<T>((resolve, reject) => {
      if (!mounted.current) {
        reject(new Error("Promise can't be executed on unmounted component."));
      }
      promise()
        .then((result: any) => {
          if (mounted.current) {
            resolve(result);
          }
        })
        .catch((error: Error) => {
          if (mounted.current) {
            reject(error);
          }
        });
    });
  };
}
