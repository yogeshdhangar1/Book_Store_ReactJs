import axios from "axios";

class OrderService{
    baseUrl ="http://localhost:9094/order";

    placeOrder(userId, data){
        return axios.post(`${this.baseUrl}/placeOrder/${userId}`,data);
    }

    getOrdersByUserId(userId){
        return axios.get(`${this.baseUrl}/userOrders/${userId}`);
    }

    cancelOrder(orderId, userId){
        return axios.put(`${this.baseUrl}/cancelOrder/${orderId}/${userId}`);
    }

    getOrderDetails(){
        return axios.get(`${this.baseUrl}`+"/getAllOrder")
    }

}

export default new OrderService();
