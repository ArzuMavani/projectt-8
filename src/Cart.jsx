import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { decrement, increment, removeItem } from "../../components/features/cartSlice"

const Cart = () => {
	const cart = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	return (
		<div>
			<div className=" container">
				<div className="row">
					<div className="col-md-8 cart">
						<div className="title">
							<div className="row">
								<div className="col">
									<h4>
										<b>Shopping Cart</b>
									</h4>
								</div>
								<div className="col align-self-center text-right text-muted">{cart.length} items</div>
							</div>
						</div>
						<div className="row border-top border-bottom">
							{cart &&
								cart.map((item) => (
									<div className="row main align-items-center h-100" key={item.id}>
										<div className="col-3">
											<img className="" style={{height:"100px",width:"125px"}} src={item.img} />
										</div>
										<div className="col">
											<div className="row text-muted">{item.title}</div>
										</div>
										<div className="col">
											<button className="btn btn-primary" disabled={item.quantity == 1 ? true : false} onClick={() => dispatch(decrement(item.id))}>-</button>
											<span className=" mx-3">
												{item.quantity}
											</span>
											<button className="btn btn-primary" onClick={() => dispatch(increment(item.id))}>+</button>
										</div>
										<div className="col">
											₹ {item.price}
											<button className="btn btn-danger btn-sm float-end " onClick={() => dispatch(removeItem(item.id))}>
												Remove
											</button>
										</div>
									</div>
								))}
						</div>

						<div className="back-to-shop">
							<span className="text-muted">
								<Link to={"/productPage"}>
									<button className="btn btn-outline-info mt-5">Back to shop</button>
								</Link>
							</span>
						</div>
					</div>
					<div className="col-md-4 summary">
						<div>
							<h5>
								<b>Summary</b>
							</h5>
						</div>
						<hr />
						<div className="row">
							<div className="col ps-0">ITEMS</div>
							<div className="col text-right">₹ 132.00</div>
						</div>

						<div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
							<div className="col">TOTAL PRICE</div>
							<div className="col text-right">₹ 137.00</div>
						</div>
						<button className="btn btn-success">CHECKOUT</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
