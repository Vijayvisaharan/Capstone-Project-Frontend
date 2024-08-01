import React from 'react'
import '../checkout.css'
import { useCart } from '../components/CartProvider';
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Checkout() {
    const { cartItems, totalAmount, quantity } = useCart();
    return (

        <div>
            <Link to='/'>Home</Link>
            <div className="checkout-container">
                <main id="checkout-main" className="checkout-main">
                    <div className="express-checkout">
                        <h2>Express Checkout</h2>
                        <div className="payment-methods">
                            <a >
                                <img style={{ width: " 300.3px", height: "200.192px" }}
                                    alt="Razorpay introduces upgraded version of payment links for businesses"
                                    className="detail__media__img-thumbnail  js-detail-img  js-detail-img-thumb"
                                    src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EqerNM-bM_03MFMZwZ4P2QHaCZ%26pid%3DApi&amp;f=1&amp;ipt=0210b947de3e509265dfeac311947fcaa9778ba1007fefc804d348d889298ea6&amp;ipo=images"
                                />
                            </a>
                            <a > <img style={{ width: " 300.3px", height: "190.192px" }}
                                alt="Indian paytech Razorpay raises $375m, plans international expansion"
                                className="detail__media__img-highres  js-detail-img  js-detail-img-high"
                                src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fintechfutures.com%2Ffiles%2F2021%2F12%2Frazorpay-logo-e1640001671566.png&amp;f=1&amp;nofb=1&amp;ipt=3daa201c3a589f5a163f83209c59832e90729e45a4d67a677f2fcceefa996083&amp;ipo=images"></img>
                            </a>
                        </div>
                    </div>

                    <form id="checkout-form" action="" className='mt-2' method="POST" >
                        <section className="billing-information">
                            <h3>Billing Information</h3>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address1" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">ZIP Code</label>
                                <input type="text" id="zip" name="zip" required />
                            </div>
                        </section>

                        <section className="payment-method">
                            <h3>Payment Method</h3>
                            <div className="form-group">
                                <label htmlFor="card-number">Card Number</label>
                                <input type="text" id="card-number" name="card-number" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry-date">Expiry Date</label>
                                <input type="text" id="expiry-date" name="expiry-date" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" required />
                            </div>
                        </section>

                        <section className="order-summary">
                            <h3>Order Summary</h3>

                            <div className="summary-item">

                            </div>
                            <div className="summary-item">
                                <span>Shipping</span>
                                <span>${totalAmount}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${totalAmount}</span>
                            </div>
                        </section>
                        <section className="checkout-actions">
                            <Button type="submit" className="pay-now-button">Pay Now</Button>
                        </section>
                    </form>
                    {/* <footer className="footer">
                        <Button variant="link">Refund Policy</Button>
                        <Button variant="link">Shipping Policy</Button>
                        <Button variant="link">Privacy Policy</Button>
                        <Button variant="link">Terms of Service</Button>
                        <Button variant="link">Contact Information</Button>
                    </footer> */}
                </main>
            </div>
        </div>
    );
};


export default Checkout
