import React from "react";
import data from "../data.json";
import Cart from "./cart";
class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      allProduct: data.products,
    };
  }

  handleSize = (event) => {
    let size = event.target.innerText;
    let filterProduct = data.products.filter((p) =>
      p.availableSizes.includes(size)
    );
    console.log(filterProduct);
    this.setState({
      allProduct: filterProduct,
    });
  };

  handlecart = (event) => {
    let productId = event.target.id;
    console.log(productId);
    let singleProduct = data.products.filter((p) => p.title === productId);
   

   // console.log(singleProduct[0].Qty =1,singleProduct, "product");
     singleProduct[0].Qty = 1
    // let filterP = singleProduct.filter((p,i) =>singleProduct.includes(p) === i)
    // console.log(filterP ,"filerp")
    this.setState({
      cart: this.state.cart.concat(singleProduct),
    });
    //console.log(this.state.cart, "cart");
  };
  orderChange = (event) => {
    console.log(event.target.value);
    let order = event.target.value;

    if (order === "High to low") {
      this.setState({
        allProduct: data.products.sort((p, q) => q.price - p.price),
      });
    }

    if (order === "Low to high") {
      this.setState({
        allProduct: data.products.sort((p, q) => p.price - q.price),
      });
    }
  };

  render() {
    return (
      <>
        <div className="parent-div">
          <span className="sizes">Sizes :</span>

          <div className="buttons">
            {["S", "XS", "M", "XL", "X", "L", "XXL"].map((size) => {
              return (
                <button
                  className="btn"
                  onClick={(event) => {
                    this.handleSize(event);
                  }}
                >
                  {size}
                </button>
              );
            })}

            <div className="order">
              Order By
              <select
                onChange={(event) => {
                  this.orderChange(event);
                }}
              >
                <option value="High to low">High to low</option>
                <option value="Low to high">Low to high</option>
              </select>
            </div>
          </div>

          <p className="lenth">
            {this.state.allProduct.length} of found products
          </p>
          <div className="products">
            {" "}
            {this.state.allProduct.map((product) => {
              return (
                <div className="product">
                  {/* <Product key={product.id} {...product} /> */}
                  <figure>
                    <img
                      src={`/static/products/` + `${product.sku}` + `_1.jpg`}
                      alt="img"
                    />
                  </figure>

                  <p className="product-title">{product.title}</p>
                  <p className="price">
                    {" "}
                    price :{product.currencyFormat} {product.price}
                  </p>
                  <button
                    className="btn-1"
                    id={product.title}
                    onClick={(event) => {
                      this.handlecart(event);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-items">
          <Cart info={this.state.cart} />
        </div>
      </>
    );
  }
}


export default Products;
