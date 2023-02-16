import React, { Component } from 'react';
import './Header.css'
import bookLogo from '../assets/book2.png';
import { Link } from '@mui/material';
class Header extends Component {
    render() {
        return (
            <div>
                
                <header  className="header-content header">
                    
                    <div className="logo-content">
                       <Link href='/home'> <img src={bookLogo} alt="" width="60px"/></Link>
                        <div>
                            <span className="address-text">BOOK</span><br />
                            <span className="address-text address-book">STORE</span>
                        </div>
                    </div>
                </header>
               
            </div>
        );
    }
}

export default Header;
