import Button from "@mui/material/Button";
import "./data.css";
import { FcSearch } from "react-icons/fc";
import { Input } from "@mantine/core";
import { HiRefresh } from "react-icons/hi";

const Data = ({
  data,
  changeHandler,
  colorfilter,
  genderfilter,
  pricefilter,
  typefilter,
  productAdded,
  refreshsetter,
  disablebutton
}) => {


  // console.log(disablebutton)
  return (
    <div className="main_container">
      {/* left side */}

      <div className="first_container">
        {/* color */}
        <div className="inside_first_container">
          <p>Color</p>
          <span>
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              onChange={() => colorfilter("red")}
            />
            Red
          </span>
          <span>
            <input type="checkbox" onChange={() => colorfilter("blue")} />
            Blue
          </span>
          <span>
            <input type="checkbox" onChange={() => colorfilter("green")} />
            Green
          </span>
        </div>

        {/* gender */}

        <div className="inside_first_container">
          <p>Gender</p>
          <span>
            <input type="checkbox" onChange={() => genderfilter("men")} />
            Male
          </span>
          <span>
            <input type="checkbox" onChange={() => genderfilter("women")} />
            Female
          </span>
        </div>

        {/* price */}

        <div className="inside_first_container">
          <p>Price</p>
          <span>
            <input type="checkbox" onChange={() => pricefilter(250)} />
            <span>0 - Rs. 250</span>
          </span>
          <span>
            <input type="checkbox" onChange={() => pricefilter(450)} />
            <span>Rs. 251 - Rs. 450</span>
          </span>
          <span>
            <input type="checkbox" onChange={() => pricefilter(451)} />
            <span>{`>Rs. 450`}</span>
          </span>
        </div>

        {/* type */}
        <div className="inside_first_container">
          <p>Type</p>
          <span>
            <input type="checkbox" onChange={() => typefilter("polo")} />
            Polo
          </span>
          <span>
            <input type="checkbox" onChange={() => typefilter("hoodie")} />
            Hoodie
          </span>
          <span>
            <input type="checkbox" onChange={() => typefilter("basic")} />
            Basic
          </span>
        </div>
      </div>

      {/* straight line */}
      <hr className="hr_inside_rightside" />

      {/* right side */}
      <div className="second_container">
        <div className="searchbar">
          <Input
            icon={<FcSearch />}
            sx={{ backgroundColor: "red" }}
            className="nested-searchbar"
            type="text"
            placeholder="Search Products"
            onChange={changeHandler}
          />
          <HiRefresh onClick={refreshsetter} className="refresh" />
        </div>

        {data.length > 0 ? (
          <>
            <div className="data">
              {data.map((item, idx) => {
                return (
                  <div className="card" key={idx}>
                    <img
                      className="image"
                      src={item.imageURL}
                      width="250"
                      alt="Not shown"
                    />
                    <div className="item_detail">
                      <p>{item.name}</p>
                      <p style={{ color: "#20b2aa	" }}>{`Rs ${item.price}`}</p>
                    </div>
                    {
                      disablebutton[idx] ? <Button
                        className="button"
                        variant="contained"
                        color="primary"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                          background: "#708090",
                          marginLeft: "23px"
                        }}
                        onClick={() => productAdded(item, idx)}
                      >
                        Add to cart
                      </Button>
                      
                      :
                      
                      <Button
                        className="button"
                        variant="contained"
                        color="primary"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                          background: "#708090",
                          marginLeft: "23px",
                          opacity: ".5"
                        }}
                        onClick={() => productAdded(item, idx)}
                      >
                        Added
                      </Button>
                    }
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1 className="after_rendering">
              Nothing to show,Please refresh the page
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
export default Data;
