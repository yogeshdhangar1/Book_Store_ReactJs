import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import CartService from '../../services/CartService';
import { TextareaAutosize, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OrderService from '../../services/OrderService';
import "./Cart.css";

class AddCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            cartItems: [],
            firstName: '',
            lastName: '',
            city: '',
            address: '',
            zip: '',
            contactNo: '',
            landmark: '',
            addressType: '',
                    
        }
    }

    fetchCartItems = () => {

        CartService.getCartItemsByUserId(localStorage.getItem("userId")).then(response => {
            console.log(response.data.data)
            this.setState({
                cartItems: response.data.data,
            }) 
             if(response.data.data){
                this.setState({
                    firstName:response.data.data[0].user.firstName,
                    lastName:response.data.data[0].user.lastName,    
                    contactNo:response.data.data[0].user.phoneNumber,
                    zip:response.data.data[0].user.zip
                })
            }

        })
    }

    onValueChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        
        })
    }

    checkValues = () => {
        console.log(this.state)
    }


    componentDidMount() {
        this.fetchCartItems();
    }

    handleNext = () => {

        if (this.state.activeStep < 3) {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1
            }))
        }
    };

    handleBack = () => {

        if (this.state.activeStep > 0) {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep - 1
            }))
        }
    };

    updateQuantity = (e, cartId) => {
        let quantity = e.target.value;
        CartService.updateCartQuantity(cartId, quantity).then((response) => {
          //  alert("cart updated successfully!!")
            window.location.reload();
        });
    };

    removeItemFromCart = (cartId) => {
        CartService.deleteCartItem(cartId).then((response) => {
            alert("cart item removed successfully!!")
            window.location.reload();
        });
    };


    order = () => {
        let object = {
            
            address: this.state.address
        }
        console.log();
       
        OrderService.placeOrder(localStorage.getItem('userId'), object).then((response) => {
            console.log(response);
            alert("OrderPlaced Successfully")
            this.props.history.push("/ordersuccess");
        
        }).catch(() => {
            alert("order failed! cart is empty");
        });
    }
    


    render() {
        return (

            <div>
                {this.state.cartItems == null ? (
                    <Container>
                        <Typography variant='h6'>
                            Cart is empty!!!
                        </Typography>
                    </Container>
                ) : (

                    <Container>
                        <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                            <Step>
                                <StepLabel> Cart Items ({this.state.cartItems.length}) </StepLabel>

                                <StepContent>

                                    {this.state.cartItems.map((item) => (
                                        <>
                                            <Box
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '50ch', },
                                                    paddingLeft: '10px',
                                                    marginBottom: '10px'
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                display='flex'
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="left">

                                                <CancelIcon sx={{ marginRight: '20px' }} onClick={() => this.removeItemFromCart(item.cartId)} />

                                                <img height='100px' width='65px'
                                                    src={item.book.bookImg}>
                                                </img>

                                                <Box
                                                    sx={{ marginLeft: '15px' }}
                                                    display='flex'
                                                    flexDirection="column"
                                                >
                                                    <Typography variant='body1'>
                                                        {item.book.bookName}
                                                    </Typography>
                                                    <Typography variant='caption'>
                                                        by {item.book.authorName}
                                                    </Typography>
                                                    <Typography variant='body1'>
                                                        Total Rs. {item.totalPrice}
                                                    </Typography>

                                                    <div className="cart_quantity">

                                                        <label htmlFor="#"> QTY: </label>
                                                        <input
                                                            className="quantity_text"
                                                            type="text"
                                                            defaultValue={item.quantity}
                                                            onChange={(e) => this.updateQuantity(e, item.cartId)}
                                                        />
                                                    </div>

                                                </Box>
                                            </Box>
                                        </>
                                    ))}


                                    <Button variant='contained' onClick={this.handleNext} sx={{ marginLeft: '35%' }}>Continue</Button>

                                </StepContent>

                            </Step>
                            <Step>
                                <StepLabel> Customer Details </StepLabel>
                                <StepContent>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '30ch', },
                                        }}

                                        display='flex'
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="left"
                                    >
                                        <form className='registerBox'>
                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                            >

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    type={'text'}
                                                    name="firstName"
                                                    onChange={this.onValueChange}
                                                    value={this.state.firstName}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Last Name"
                                                    type="text"
                                                    required
                                                    name="lastName"
                                                    onChange={this.onValueChange}
                                                    value={this.state.lastName}
                                                />

                                            </Box>

                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                                whiteSpace={2}>

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Phone Number"
                                                    type='tel'
                                                    name="contactNo"
                                                    onChange={this.onValueChange}
                                                    value={this.state.contactNo}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Pincode"
                                                    type="number"
                                                    required
                                                    name="zip"
                                                    onChange={this.onValueChange}
                                                    value={this.state.zip}
                                                />

                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'

                                            >
                                                <TextareaAutosize
                                                    required
                                                    aria-label="Address"
                                                    lable="Address"
                                                    minRows={3}
                                                    placeholder="Address"
                                                    name='address'
                                                    style={{ width: '100%' }}
                                                    onChange={this.onValueChange}
                                                />
                                            </Box>

                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                            >

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="City/Town"
                                                    type='text'
                                                    name="city"
                                                    onChange={this.onValueChange}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Landmark"
                                                    type="text"
                                                    required
                                                    name="landmark"
                                                    onChange={this.onValueChange}
                                                />

                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'
                                            >
                                                <FormControl>
                                                    <FormLabel id="addressType">Address Type</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="addressType"
                                                        name="addressType"
                                                        onChange={this.onValueChange}
                                                    >
                                                        <FormControlLabel value="home" control={<Radio />} label="Home" />
                                                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />

                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'
                                                justifyContent='right'
                                            >
                                                <Button variant='contained' onClick={this.handleNext} size='small'>Continue</Button>
                                                <Button variant='text' onClick={this.handleBack}>Back</Button>
                                            </Box>


                                        </form>
                                    </Box>




                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel> Order Summary </StepLabel>
                                <StepContent>
                                    {this.state.cartItems.map(item => (
                                        <>
                                            <Box
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '50ch', },
                                                    paddingLeft: '10px',
                                                    margin: '5px'
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                display='flex'
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <img height='100px' width='65px'
                                                    src={item.book.bookImg}
                                                ></img>
                                                {/* className="card-image"
                                                style={{ height: '140px', width: '200px' }}
                                                src={item.book.bookImg}
                                                alt="bookImg" */}
                                                <Box
                                                    sx={{ marginLeft: '15px' }}
                                                    display='flex'
                                                    flexDirection="column"
                                                >
                                                    <Typography variant='body1'>
                                                        {item.book.bookName}
                                                    </Typography>
                                                    <Typography variant='caption'>
                                                        by {item.book.authorName}
                                                    </Typography>
                                                    <Typography variant='body1'>
                                                        Total Price Rs. {item.totalPrice}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ))}


                                    <Button variant='contained' sx={{ marginLeft: '35%' }} onClick={this.order} size='small'>Place Order</Button>
                                    <Button variant='text' onClick={this.handleBack}>Back</Button>
                                </StepContent>
                            </Step>
                        </Stepper>

                    </Container>

                )}

            </div>
        );
    }
}

export default AddCart;