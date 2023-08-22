import { useState, useEffect } from 'react';

type FetchState = 'loading' | 'successful' | 'failed';

export const Question1 = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const { data, error, fetchState } = useFetch<any[]>(apiUrl, []);

  return (
    <div>
      <ul>
        {fetchState === 'loading' ? (
          <span>Loading ...</span>
        ) : (
          data.map((p) => {
            return <li key={p.id}>{p.title}</li>;
          })
        )}
      </ul>
    </div>
  );
};

const useFetch = <T,>(apiUrl: string, initialData: T) => {
  const [fetchState, setFetchState] = useState<FetchState>('successful');

  const [data, setData] = useState<T>(initialData);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetchState('loading');
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setFetchState('successful');
        setError('');
        setData(res);
      })
      .catch((e) => {
        setFetchState('failed');
        setError(e.toString());
      });
  }, [apiUrl]);

  return {
    fetchState,
    data,
    error,
  };
};
