import axios from "axios";
let userId= localStorage.getItem("userId")
class CartService{

    baseUrl ="http://localhost:9094/cart";
    
    getCartDetails(){
        return axios.get(`${this.baseUrl}`+"/getAll")
    }

    getCartItemsByUserId(){
        console.log("user id is ",userId)
        return axios.get(`${this.baseUrl}/getById/${userId}`);
    }

    addToCart(userId, data){
        
        return axios.post(`${this.baseUrl}/addToCart/${userId}`, data);
        
    }

    deleteCartItem(cartId){
        return axios.delete(`${this.baseUrl}/remove/${cartId}`);
    }

    updateCartQuantity(cartId,quantity){
        return axios.put(`${this.baseUrl}`+"/updateQuantity/"+cartId+"/"+quantity);
    }

}

export default new CartService();
