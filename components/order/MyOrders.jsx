import React, { Component } from 'react';
import OrderService from '../../services/OrderService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';

class MyOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    fetchOrderData() {
        OrderService.getOrdersByUserId(localStorage.getItem("userId")).then(response => {
            console.log(response.data.data);
            this.setState({
                orders: response.data.data

            })

        })
    }

    componentDidMount() {
        this.setState({
            userId: localStorage.getItem("userId"),
        })
        this.fetchOrderData();
    }

    handleCancelOrder = (orderId) => {
        OrderService.cancelOrder(localStorage.getItem("userId"),orderId).then(() => {
            this.fetchOrderData();
        })
    }

    render() {
        return (
            <div>
                <Container>

                    <TableContainer component={Paper} style={{ marginTop: 45 }}>
                        <Table sx={{ minWidth: 550 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#Order ID</TableCell>
                                    <TableCell align="right">Order Date</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Quantity </TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                    <TableCell align="right">Order Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.orders.map((orderdata) => (

                                    <TableRow
                                        key={orderdata.orderId}

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {orderdata.orderId}
                                        </TableCell>
                                        <TableCell align="right">{orderdata.orderDate}</TableCell>
                                        <TableCell align="right">{orderdata.address}</TableCell>
                                        <TableCell align="right">{orderdata.quantity}</TableCell>
                                        <TableCell align="right">{orderdata.totalPrice}</TableCell>
                                        {orderdata.cancel ? (
                                            <TableCell align="right"> <Button variant='text' color="error" disabled>Cancelled</Button> </TableCell>
                                        ) : (
                                            <TableCell align="right"> <Button variant='contained' color="error" onClick={() => this.handleCancelOrder(orderdata.orderId)}>Cancel</Button> </TableCell>
                                        )}
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>
            </div>
        );
    }
}

export default MyOrders;
