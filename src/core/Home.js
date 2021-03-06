/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const Home = () => {
    const [productBySell,setProductBySell] = useState([]);
    const [productByArrival,setProductByArrival] = useState([]);
    const [error,setError] = useState(false);

    const loadProductBySell = () =>{
        getProducts('sold').then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setProductBySell(data);
            }
        })
    };

    const loadProductByArrival = () =>{
        getProducts('createdAt').then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setProductByArrival(data);
            }
        })
    };

    useEffect(() =>{
        loadProductByArrival();
        loadProductBySell();
    },[]);

    return (
      <Layout title="Home Page" description="Ecommerce site" className="container-fluid">
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
            {productByArrival.map((product, i) => (
            <Card key={i} product={product} />
            ))}
        </div>
        

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
            {productBySell.map((product, i) => (
            <Card key={i} product={product} />
            ))}
        </div>
      </Layout>
    );
};

export default Home;