import "./App.css";
import Data from "./components/Data";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [timeoutId, settimeoutId] = useState(null);
  const [cartarray, setCartarray] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const[disablebutton,setDisablebutton]=useState(Array(30).fill(true))


  const apidata = () => {
    fetch(
      `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      // .then((res)=>console.log(res))
      .then((err) => console.error(err));
  };
  useEffect(() => {
    apidata();
  }, [refresh]);


  // refresh
  const refreshsetter = () => {
    setRefresh((refresh) => refresh + 1);
  };

  // filter on search after limiting the rate of callig by 400ms
  const changeHandler = (e) => {
    if (timeoutId) clearTimeout(timeoutId);
    const newtimeoutId = setTimeout(() => {
      console.log("running");
      const query = e.target.value;
      let updatedList = [...data];
      updatedList = updatedList.filter((ele) => {
        return ele.name.toLowerCase().includes(query.toLowerCase());
      });
      console.log(updatedList);
      setData(updatedList);
    }, 400);
    settimeoutId(newtimeoutId);
  };

  // filter on basis of color
  const colorfilter = (e) => {
    if (timeoutId) clearTimeout(timeoutId);
    const newtimeoutId = setTimeout(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((ele) => {
        return ele.color.toLowerCase().includes(e.toLowerCase());
      });
      setData(filteredArray);
    }, 400);
    settimeoutId(newtimeoutId);
  };

  // filter on the basis of gender
  const genderfilter = (e) => {
    if (timeoutId) clearInterval(timeoutId);
    const newtimeoutId = setTimeout(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((ele) => {
        return ele.gender.toLowerCase() === e.toLowerCase();
      });
      setData(filteredArray);
    }, 400);
    settimeoutId(newtimeoutId);
  };

  // filter on the basis of price range
  const pricefilter = (e) => {
    if (timeoutId) clearInterval(timeoutId);
    const newtimeoutId = setInterval(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((ele) => {
        if (e === 250) {
          return ele.price > 0 && ele.price <= 250;
        } else if (e === 450) {
          return ele.price > 250 && ele.price <= 450;
        } else {
          return ele.price > 450;
        }
      });
      setData(filteredArray);
    }, 400);
    settimeoutId(newtimeoutId);
  };

  // filter on the basis of type
  const typefilter = (e) => {
    if (timeoutId) clearInterval(timeoutId);
    const newtimeoutId = setTimeout(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((ele) => {
        return ele.type.toLowerCase().includes(e.toLowerCase());
      });
      setData(filteredArray);
    }, 400);
    settimeoutId(newtimeoutId);
  };



  // button handler on click
  const productAdded = (cartitem,idx) => {
// if true then only button will active
    if(disablebutton[idx]){
      // using spread operator for storing previous values
      setCartarray((prevData) => [...prevData, cartitem]);
      disablebutton[idx]=false;
    }
  };


  // quantity decrease
  const deleteitem = (idx) => {
    // again false to true when deleting that item from cart
    disablebutton[idx-1]=true;
    setDisablebutton(disablebutton)
    setCartarray(cartarray.filter((item) => item.id !== idx));
  };

  

  return (
    <div className="App">
      <Navbar length={cartarray.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Data
              data={data}
              changeHandler={changeHandler}
              colorfilter={colorfilter}
              genderfilter={genderfilter}
              pricefilter={pricefilter}
              typefilter={typefilter}
              productAdded={productAdded}
              refreshsetter={refreshsetter}
              disablebutton={disablebutton}
            />
          }
        />
        <Route
          path="/Cart"
          element={<Cart 
            cartarray={cartarray} 
            deleteitem={deleteitem} 
            disablebutton={disablebutton}
            />
          }
        />
      </Routes>
    </div>
  );
}
