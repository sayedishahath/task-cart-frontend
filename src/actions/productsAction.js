import axios from "axios"
export const startGetProducts =()=>{
    return async(dispatch)=>{
        try{
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                dispatch(getProducts(json))
            })
        }catch(err){
            console.log(err)
        }
    }
}
const getProducts = (products)=>{
    return{
        type:"GET_PRODUCTS",
        payload:products
    }
}