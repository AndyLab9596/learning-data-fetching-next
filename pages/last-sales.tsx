import { GetStaticPropsContext, NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface ILastSalesPage {
    sales:{[x: string]: string | number}[]
}

const LastSalesPage : NextPage<ILastSalesPage> = (props) => {
    const [sales, setSales] = useState<{ [x: string]: string | number }[]>(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR('https://next-practice-1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json', fetcher)

    useEffect(() => {
        if (data) {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
            }
            setSales(transformedSales)
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://next-practice-1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
    //         .then((res) => res.json())
    //         .then((data) => {

    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
    //             }

    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         })
    // }, [])

    if (error) {
        return <p>fail to load</p>
    }

    if (!data && !sales) {
        return <p>Loading ...</p>
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const response = await fetch('https://next-practice-1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json');
    const data = await response.json();
    const transformedSales = [];


    for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
    }
    return {
        props: {
            sales: transformedSales
        },
        revalidate: 10
    }


}

export default LastSalesPage