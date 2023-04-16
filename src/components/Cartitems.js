import "./cartitems.css";
import { useState, useMemo, useEffect } from "react";
import Button from "@mui/material/Button";

const Cartitems = ({ cartarray, deleteitem }) => {
  const [total, setTotal] = useState(0);
  const [quantityArray, setQuantityArray] = useState(
    Array(cartarray.length).fill(1)
  );

  // increasing with plus  sign
  const inc_with_add_sign = (idx) => {
    const updatedQuantityArray = [...quantityArray];
    if (cartarray[idx].quantity <= updatedQuantityArray[idx]) return;
    updatedQuantityArray[idx] += 1;
    setQuantityArray(updatedQuantityArray);
  };

  // decreasing with minus sign
  const dec_with_minus_sign = (idx) => {
    const updatedQuantityArray = [...quantityArray];
    if (updatedQuantityArray[idx] === 1) return;
    updatedQuantityArray[idx] -= 1;
    setQuantityArray(updatedQuantityArray);
  };

  // total price
  useEffect(() => {
    let i = 0;
    let j = 0;
    let totalPrice = 0;
    while (i < quantityArray.length && j < cartarray.length) {
      console.log(quantityArray[i]);
      totalPrice += quantityArray[i] * cartarray[j].price;
      i++;
      j++;
    }
    setTotal(totalPrice);
  }, [quantityArray, deleteitem]);

  return (
    <div className="cartcontainer">
      {/* total price */}
      {cartarray ? (
        <div className="total">Total:Rs {total}</div>
      ) : (
        <h1>Cart is empty</h1>
      )}

      {/* rendering data */}
      {cartarray.map((data, idx) => {
        return (
          <div className="cartitems">
            <div className="nested_cartitems1">
              <img className="cart_image" src={data.imageURL} alt="not shown" />
              <div className="nested_cartitems2">
                <div className="items_name">{data.name}</div>
                <div className="items_price">RS:{data.price}</div>
                <div className="items_gender">{data.gender}</div>
                <div className="incdec">
                  <button onClick={() => dec_with_minus_sign(idx)}>➖</button>
                  <div>{quantityArray[idx]}</div>
                  <button onClick={() => inc_with_add_sign(idx)}>➕</button>
                </div>
              </div>
              <div>
                <Button
                  className="delete_inside_cartitems"
                  variant="contained"
                  color="primary"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    background: "#000000",
                    letterSpacing: "2px",
                    marginLeft:"450px",
                    marginTop:"70px"
                  }}
                  // we are passing data.id as a argument
                  onClick={() => deleteitem(data.id)}
                >
                  DELETE
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cartitems;
