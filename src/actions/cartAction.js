import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { CREATE_CART,GET_MY_CART,DELETE_CART_ITEM,INC_QTY,DEC_QTY } from '../apis/api';
export const startCreateCart=(cart)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(CREATE_CART,cart,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(createCart(response.data))
         
        }catch(err){
            console.log(err)
        }
    }
}
const createCart =(cartItems)=>{
    return{
        type:'CREATE_CART',
        payload:cartItems
    }
}

export const startGetMyCart = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(GET_MY_CART,{
                headers:{
                    "Authorization" : localStorage.getItem('token')
                }
            })
            // console.log(response.data)
            dispatch(getMyCart(response.data))
        }catch(err){
            // toast.error('add first item to cart')
            console.log(err)
        }
    }
}
const getMyCart = (myCart)=>{
    return{
        type:"GET_CART",
        payload:myCart
    }
}

export const startDeleteMyCartLineItem = (id) => {
    return async(dispatch) => {
        try {
            // console.log("hii 2")
            const response = await axios.delete(`${DELETE_CART_ITEM}${id}`, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele.productId === id
            })
            dispatch(deleteMyCartLineItem(response.data))
            // window.location.reload()
            console.log(id, response.data)
        } catch(err) {
            console.log(err)
        }
    }
}

const deleteMyCartLineItem = (lineItem) => {
    return {
        type : "DELETE_LINEITEM",
        payload : lineItem
    }
}

export const startIncQty = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`${INC_QTY}${id}`, {}, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele.productId === id
            })
            
            dispatch(incQty(lineItem))
            console.log(id, response.data)
            console.log(lineItem)
        } catch(err) {
            console.log(err)
        }
    }
}

const incQty = (lineItem) => {
    return {
        type : "INC_QTY",
        payload : lineItem
    }
}

export const startDecQty = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`${DEC_QTY}${id}`, {}, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele.productId === id
            })
            
            dispatch(decQty(lineItem))
            console.log(id, response.data)
            // window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }
}

const decQty = (lineItem) => {
    return {
        type : "DEC_QTY",
        payload : lineItem
    }
}
