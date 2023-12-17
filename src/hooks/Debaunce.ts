import { useEffect, useState } from "react";

export function useDebaunce(value: string, delay=300):string{
    const [ debaunce, setDebaunce ] = useState(value)

    useEffect(() => {
    const handler = setTimeout(() => setDebaunce(value), delay)
    return () => clearTimeout(handler)
    },[value,delay])

    return debaunce
}