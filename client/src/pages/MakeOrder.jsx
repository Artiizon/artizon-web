import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import axios from "axios";

import state from "../store";

import { useNavigate } from "react-router-dom";

const MakeOrder = () => {
    const navigate = useNavigate();

    const [customerAuth, setCustomerAuth] = useState(false);
    const [email, setEmail] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8080/verifyCustomer').then(res => {
            if(res.data.Status === 'Success_Authentication') {
                setCustomerAuth(true);
                setEmail(res.data.email);
            } else {
                setCustomerAuth(false);
            }
        })
    }, [])

    const snap = useSnapshot(state)

    state.page = 'no-canvas';

    if (sessionStorage.getItem('tcolor') ) {
        const tcolor = sessionStorage.getItem('tcolor');
        state.tcolor = tcolor;
    }
    if (sessionStorage.getItem('file') ) {
        const file = sessionStorage.getItem('file');
        state.logoDecal = file;
    }

    const [material, setMaterial] = useState('');
    const [note, setNote] = useState('');
    const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0]);
    const [sizes, setSizes] = useState([false, false, false, false, false, false]);

    const handleSizes = (e) => {
        const index = e.target.id;
        const value = e.target.checked;
        const newSizes = [...sizes];
        newSizes[index] = value;
        setSizes(newSizes);
    }

    const handleQuantities = (e) => {
        const index = e.target.id;
        const value = e.target.value;
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const color = state.tcolor;
        const logo = state.logoDecal;

        const customerId = sessionStorage.getItem('customer_id');

        axios.post('http://localhost:8080/makeOrder', {material, color, note, logo, customerId, quantities}).then(res => {
            if(res.data.Status === 'Success_Makeorder') {
                navigate('/');
                alert('Order Sent Successful');
            } else {
                alert('Order Sent Failed');
            }
        })
    }

    return (
            <>
                {customerAuth && (
                    <div className="make-order-page">
                        <div className="make-order-page-left">
                            <form onSubmit={handleSubmit}>
                                <h1>Make Your T-Shirt Order</h1>
                                <div>
                                    <label htmlFor="material">T-Shirt Material</label> <br />
                                    <select name="material" className="form-control" onChange={e => setMaterial(e.target.value)}>
                                        <option value="">Select Material</option>
                                        <option value="Cotton">Cotton</option>
                                        <option value="Silk">Silk</option>
                                        <option value="Linen">Linen</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tcolor">T-Shirt Color</label> <br />
                                    <p>
                                        {state.tcolor}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="quantities">Quantities</label> <br />
                                    <div className="quantity-item">
                                        <label htmlFor="XS">XS</label>
                                        <input type="checkbox" id="0" checked={sizes[0]} onChange={handleSizes} />
                                        {sizes[0] && (
                                            <input className="input-text" type="number" name="XS" placeholder="Quantity" id="0" onChange={handleQuantities} />
                                        )}
                                    </div>
                                    <div className="quantity-item">
                                        <label htmlFor="S">S</label>
                                        <input type="checkbox" id="1" checked={sizes[1]} onChange={handleSizes} />
                                        {sizes[1] && (
                                            <input className="input-text" type="number" name="S" placeholder="Quantity" id="1" onChange={handleQuantities} />
                                        )}
                                    </div>
                                    <div className="quantity-item">
                                        <label htmlFor="M">M</label>
                                        <input type="checkbox" id="2" checked={sizes[2]} onChange={handleSizes} />
                                        {sizes[2] && (
                                            <input className="input-text" type="number" name="M" placeholder="Quantity" id="2" onChange={handleQuantities} />
                                        )}
                                    </div>
                                    <div className="quantity-item">
                                        <label htmlFor="L">L</label>
                                        <input type="checkbox" id="3" checked={sizes[3]} onChange={handleSizes} />
                                        {sizes[3] && (
                                            <input className="input-text" type="number" name="L" placeholder="Quantity" id="3" onChange={handleQuantities} />
                                        )}
                                    </div>
                                    <div className="quantity-item">
                                        <label htmlFor="XL">XL</label>
                                        <input type="checkbox" id="4" checked={sizes[4]} onChange={handleSizes} />
                                        {sizes[4] && (
                                            <input className="input-text" type="number" name="XL" placeholder="Quantity" id="4" onChange={handleQuantities} />
                                        )}
                                    </div>
                                    <div className="quantity-item">
                                        <label htmlFor="XXL">XXL</label>
                                        <input type="checkbox" id="5" checked={sizes[5]} onChange={handleSizes} />
                                        {sizes[5] && (
                                            <input className="input-text" type="number" name="XXL" placeholder="Quantity" id="5" onChange={handleQuantities} />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="printing_files">Printing Files</label> <br />
                                    <input type="file" name="printing_files" />
                                </div>
                                <div>
                                    <label htmlFor="additional_note">Additional Note</label> <br />
                                    <input className="text-area" type="text" name="additional_note" onChange={(e) => setNote(e.target.value)} />
                                </div>
                                <button className="">Submit</button>
                            </form>
                        </div>
                        <div className="make-order-page-right">
                            <h2>Our Procedure</h2>
                            <p>1. You make an order</p>
                            <p>2. We make the T-shirts</p>
                            <p>3. We deliver the T-shirts</p>
                        </div>
                    </div>
                )}
            </>
    )
}

export default MakeOrder