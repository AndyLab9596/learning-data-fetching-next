import { GetStaticPropsContext, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Fragment } from 'react'
import { IProduct } from '..'
import fs from 'fs/promises';
import path from 'path';

interface IProductDetailPageProps {
    loadedProduct: IProduct;
}

const ProductDetailPage: NextPage<IProductDetailPageProps> = (props) => {

    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData () {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return data;
}

export const getStaticPaths = async () => {
    const data = await getData();
    const ids = data.products.map((p: IProduct) => p.id);
    const pathsWithParams = ids.map((id: string) => ({
        params: {
            pid: id
        }
    }))
    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, { loadedProduct: IProduct }>) => {

    const { params } = context;
    const productId = params?.pid

    const data = await getData();
    const product = data.products.find((product: IProduct) => product.id === productId);

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            loadedProduct: product,
            
        }
    }
}

export default ProductDetailPage