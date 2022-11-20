//return type 은 2개의 item 이 있는 array [function, object] = useMutation(url)
import { useState } from "react";

interface useMutationProps<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}

type useMutationResults<T> = [(data: any) => void, useMutationProps<T>];

const useMutation = <T = any>(url: string): useMutationResults<T> => {
  const [state, setState] = useState<useMutationProps<T>>({
    isLoading: false,
    error: undefined,
    data: undefined,
  });
  const mutate = (data: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error: any) => setState((prev) => ({ ...prev, error })))
      .finally(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      });
  };

  return [mutate, { ...state }];
};

export default useMutation;
