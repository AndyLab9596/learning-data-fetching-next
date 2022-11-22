import { GetStaticProps, NextPage } from 'next'
import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export interface IProduct {
  id: string;
  title: string;
  description: string;
}

interface IHomePageProps {
  products: IProduct[];
}

const HomePage: NextPage<IHomePageProps> = (props) => {

  const { products } = props;

  return (
    <ul>
      {products.map(product => <li key={product.id}>
        <Link href={`/${product.id}`}>
          {product.title}
        </Link>
      </li>)}
    </ul>
  )
}

export const getStaticProps: GetStaticProps<{ products: IProduct[] }> = async (context) => {
  console.log('(Re-)Generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(jsonData);


  // if (data.products.length === 0) {
  //   return { notFound: true }
  // }

  if (data.products.length === 0) {
    return {
      redirect: '/', props: {
        products: []
      }
    }
  }

  return {
    props: {
      products: data.products
    },
    /**Incremental Static Regeneration */
    revalidate: 10,

  }
}

export default HomePage