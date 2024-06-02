import React, { useState } from "react";

function Details(props){

    const [user, setUser]=useState("");
    const [item, setItem]=useState("");
    const [quantity, setQuantity]=useState(1);
    const [price, setPrice]=useState(0);

    const [errorMessage,setErrorMessage]=useState("");

    function handleCart(){
        if(user.trim() === ""){
            setErrorMessage("Please fill Username section.");
            return;
        }

        if(item.trim() === ""){
            setErrorMessage("Please fill Item section.");
            return;
        }

        // Check if the item contains only alphabetical characters
        if(!/^[a-zA-Z]+$/.test(item)){
            setErrorMessage("Item should only contain Alphabets.");
            return;
        }

        const newItem ={user,item,quantity,price};
        props.onAddItem(newItem);
        setUser("");
        setItem("");
        setQuantity(1);
        setPrice(0);
        setErrorMessage("");
    }

    return (
        <div>
            <label>Username</label>
            <input type="text" value={user} onChange={(event)=>setUser(event.target.value)}></input>

            <label>Item :</label>
            <input type="text" value={item} onChange={(event)=>setItem(event.target.value)}></input>

            <label>Quantity :</label>
            <input type="number" value={quantity} onChange={(event)=>setQuantity(event.target.value)}></input>

            <label>Price :</label>
            <input type="number" value={price} onChange={(event)=>setPrice(event.target.value)}></input>

            <button className="btn btn-success" onClick={handleCart}>Add to Cart</button>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
    )
}
export default Details;