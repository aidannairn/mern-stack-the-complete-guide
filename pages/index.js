import React from 'react'
import axios from 'axios'

import baseUrl from '../utils/baseUrl'
import ProductList from '../components/Index/ProductList'

function Home({ products }) {
  return <ProductList products={products} />
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  // fetch data on server
  const response = await axios.get(url)
  // return response data as an object
  return { products: response.data }
  // note: this object will be merged with existing props
}

export default Home
