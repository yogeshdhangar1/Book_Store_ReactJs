import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/user/RegistrationForm';
import LoginForm from './components/user/LoginForm';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Header from './components/Header';
import Home from './components/home/Home';
//import Cart from './components/cart/Cart';
import OrderSuccess from './components/order/OrderSuccess';
import MyOrders from './components/order/MyOrders';
import AddCart from './components/cart/AddCart';

function App() {
  return (
    <div >
      <Header />
      <Router>
        <Switch>
          <Route exact path='/resetpass' component={ResetPassword}></Route>
          <Route exact path='/forgotpass' component={ForgotPassword}></Route>
          <Route exact path='/registration' component={RegistrationForm}></Route>
          <Route exact path='/login' component={LoginForm}></Route>
          <Route path='/ordersuccess' component={OrderSuccess} />
          <Route path='/myorders' component={MyOrders} />
          {/* <Route exact path='/cart' component={Cart}></Route>
          <Route path='/cart' component={Cart} />  */}
          <Route exact path='/mycart' component={AddCart}></Route>
          <Route path='/mycart' component={AddCart} />           
          <Route path='/' component={Home}></Route>
          <Route path='/login' component={LoginForm} ></Route>
          <Route path='/registration' component={RegistrationForm}></Route>
          <Route path='/forgotpass' component={ForgotPassword}></Route>
          <Route path='/resetpass' component={ResetPassword}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
