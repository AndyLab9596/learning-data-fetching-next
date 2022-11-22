import { GetStaticPropsContext, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Fragment } from 'react'
import { IProduct } from '.'
import fs from 'fs/promises';
import path from 'path';

interface IProductDetailPageProps {
    loadedProduct: IProduct;
}

const ProductDetailPage: NextPage<IProductDetailPageProps> = (props) => {

    const { loadedProduct } = props;

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, { product: IProduct }>) => {

    const { params } = context;
    const productId = params?.id

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');

    const data = JSON.parse(jsonData);
    const product = data.products.find((product: IProduct) => product.id === productId);

    return {
        props: {
            product
        }
    }
}

export default ProductDetailPage