import React from "react";

function ItemList(props){
    const items = props.items;
    return (
        <div className="item-list">
            <h2>Item List</h2>
            {items.map((item , index)=> (
                <div className="item" key={index}>

                    <div>{item.item}</div>
                    
                    <div>Quantity : {item.quantity}</div>

                    <div>Price : {item.price}</div>

                    <button className="btn btn-danger" onClick={()=> props.onDeleteItem(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ItemList;