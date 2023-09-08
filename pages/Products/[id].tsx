import Header from "@/src/components/Header";
import { ReactNode } from "react";
import ProductDetails from "@/src/components/ProductDetails";
import { ProductType, fetchProduct, fetchProducts } from "@/src/services/products";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "reactstrap";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id

  if(typeof id === 'string'){
    const product = await fetchProduct(id)

    return {
      props: {
        product
      }, 
      revalidate: 10
    }
  }
  return {
    redirect: {
      destination: '/products',
      permanent: false
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const prodcuts = await fetchProducts()

  const paths = prodcuts.map(product => {
    return {params : { id : product.id.toString()}}
  })
  return {
    paths,
    fallback: false
  }
}
const Product: NextPage = (props: {
  children?: ReactNode
  product?: ProductType
}) => {
  return (
    <>
      <Head>
        <title>{props.product!.name}</title>
        <meta name="description" content={props.product!.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container className="mt-5">
        <ProductDetails product={props.product!} />
      </Container>
    </>
  )
}

export default Product
