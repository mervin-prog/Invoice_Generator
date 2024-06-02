import React from "react";

function Total(props){
    return (
        <div className="total">
            <h3>Total Amount : {props.total.toFixed(2)}</h3>
        </div>
    );
}

export default Total;