import React, { Fragment, useEffect } from "react";
import Product from "./Product.js";
import "./Home.css";
import MetaData from "../layout/Footer/MetaData"
import { getProduct } from "../../actions/productAction.js";
import {useSelector,useDispatch} from "react-redux";


const Home = () =>{
    const dispatch = useDispatch();
    const {products} = useSelector(
        (state => state.products)
    )
    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch])
    return  <Fragment>
        
        <MetaData title ="GameStore"/>
        <h2 className="homeHeading">GameStore</h2>
        <div className="container" id="container">
            {products && products.map((product)=><Product product={product}/>)}
        </div>

        </Fragment>;
    
}
export default Home