import { useState, useEffect } from "react";

export function useFetchData(jsonDir) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(jsonDir);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error(`Error loading JSON from ${jsonDir}:`, error);
            }
        }
        fetchData();
    }, [jsonDir]);
    return data;
}