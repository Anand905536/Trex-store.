import Cartitems from "./Cartitems";
import "./cart.css";

const Cart = ({ cartarray, deleteitem }) => {
  return (
    <div>
      <Cartitems cartarray={cartarray} deleteitem={deleteitem} />
    </div>
  );
};
export default Cart;
