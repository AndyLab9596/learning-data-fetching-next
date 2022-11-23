import React, { useEffect, useState } from 'react'

const LastSalesPage = () => {
    const [sales, setSales] = useState<{[x: string]: string | number}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch('https://next-practice-1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
            .then((res) => res.json())
            .then((data) => {

                const transformedSales = [];

                for (const key in data) {
                    transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
                }

                setSales(transformedSales);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <p>Loading ...</p>
    } 

    if (!sales) {
        return <p>No data yet</p>
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )
}

export default LastSalesPage