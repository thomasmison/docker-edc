import useSWR from 'swr'


// fetcher is current host with port 3000
const fetcher = (url: string) => {
    const host = window.location.host
    return fetch(`http://${host}:3000/${url}`).then(res => res.json())
}

export function useCounter() {
    const {data, error, isLoading, mutate} = useSWR('api/counter', fetcher)


  return { counter: data?.counter, error, isLoading, mutate };
}

