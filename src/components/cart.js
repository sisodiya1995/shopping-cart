import React from "react";
import data from "../data.json";
class Cart extends React.Component {
  constructor() {
    super();
    this.state = { isDisplay: false, increment: false };
  }

  handleClick = () => {
    this.setState({
      isDisplay: true,
    });
  };

  handleRemove = () => {
    this.setState({
      isDisplay: false,
    });
  };
  handleInc = (event) => {
    console.log(event.target.id, "id");
    let id = event.target.id;
    let singleProduct = data.products.filter((p) => p.id == id);
    singleProduct[0].Qty = singleProduct[0].Qty + 1;
    console.log(singleProduct[0].Qty);
    this.setState({
      increment: true,
    });
  };

  handleDec = (event) => {
    console.log(event.target.id, "id");
    let id = event.target.id;
    let singleProduct = data.products.filter((p) => p.id == id);
    if(singleProduct[0].Qty > 1){
      singleProduct[0].Qty = singleProduct[0].Qty - 1;
    }
   
   // console.log(singleProduct[0].Qty);
    this.setState({
      increment: true,
    });
  };
  render() {
    console.log([...new Set(this.props.info)], "info");
    return (
      <div className="carts">
        <>
          {this.state.isDisplay === false ? (
            <div>
              <img
                onClick={this.handleClick}
                style={{ backgroundColor: "black" }}
                src="/static/bag-icon.png"
                alt="cart-img"
                className="cart-logo"
              />

              <span className="items">
                {[...new Set(this.props.info)].length}
              </span>
            </div>
          ) : (
            <div className="cart-products">
              <div className="summary-title">
                <small>Shopping Summary</small>
                <button className="btn-4" onClick={this.handleRemove}>
                  X
                </button>
              </div>

              {[...new Set(this.props.info)].map((p) => {
                return (
                  <>
                    <div className="cartitem">
                      <figure>
                        <img
                          src={`/static/products/` + `${p.sku}` + `_1.jpg`}
                          alt="img"
                          className="cart-img"
                        />
                      </figure>

                      <p>{p.title}</p>
                      <p>{p.availableSizes}</p>
                      <p>
                        {p.currencyFormat} {p.price}
                      </p>
                      {this.state.increment === true ? (
                        <p>Qty:{p.Qty}</p>
                      ) : (
                        <p>Qty:{p.Qty}</p>
                      )}
                      {/* <p>Qty :{p.Qty}</p> */}
                      <button className="qty-btn" id={p.id} onClick={this.handleInc}>
                        {" "}
                        +{" "}
                      </button>
                      <button id={p.id} className="qty-btn" onClick={this.handleDec}>
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </>
                );
              })}

              <p className="total">
                SubTotal :{" "}
                {[...new Set(this.props.info)].reduce((acc, cv) => {
                  acc = acc + cv.price * cv.Qty;
                  return acc;
                }, 0)}
              </p>
            </div>
          )}
        </>
      </div>
    );
  }
}
export default Cart;
