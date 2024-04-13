
import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = ()=>{
    let newCartData = localStorage.getItem("myCart");
    if ( newCartData.length===0) {
        return [];
    }
    else{
        return JSON.parse(newCartData)
    }
}

const initialState = {
    cart : getLocalCartData(),
    total_item : "",
    total_price : "",
    shipping_fee : 50000,
}

const CartProvider = ({children})=>{

    const [state , dispatch] = useReducer(reducer,initialState)

  const  addToCart = (id,color,amount,product) =>{
       dispatch({type:"ADD_TO_CART", payload:{id,color,amount,product}})
  }

  const setDecrease = (id)=>{
     dispatch({type:"SET_DECREMENT", payload:id})
  }

  const setIncrease = (id)=>{
    dispatch({type:"SET_INCREMENT", payload:id})
  }

  const removeItem = (id)=>{
    dispatch({type:"REMOVE_ITEM", payload:id})
  }


  const clearCart = ()=>{
     dispatch({type:"CLEAR_CART"})
  }

  useEffect(()=>{
    dispatch({type:"CART_TOTAL_ITEM"})
    dispatch({type:"CART_TOTAL_PRICE"})
    localStorage.setItem("myCart",JSON.stringify(state.cart))
  },[state.cart])


    return <CartContext.Provider value={{...state , addToCart , removeItem, clearCart, setIncrease, setDecrease}}>
        {children}
    </CartContext.Provider>
}

const useCartContext = ()=>{
    return useContext(CartContext);
}

export {CartProvider , useCartContext};