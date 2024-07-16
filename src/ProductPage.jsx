import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../components/features/cartSlice"
import { useNavigate } from "react-router-dom"

const ProductPage = () => {
	const items = useSelector((state) => state.items)
	const cart = useSelector((state) => state.cart)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleCart = () => {
		navigate("/cart")
	}
	return (
		<div>
			<nav className="navbar bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand">Navbar</a>
					<button className="btn btn-warning" onClick={handleCart}>
						Cart
						<span className=" text-dark fw-bolder">({cart.length})</span>
					</button>
				</div>
			</nav>

			<div className=" container">
				<div className="row mt-5">
					{items &&
						items.map((item) => (
							<div className="col-3" key={item.id}>
								<div className="card border-0 shadow-lg ">
									<img src={item.img} className="card-img-top" style={{ height: "250px" }} alt={item.img} />
									<div className="card-body">
										<h5 className="card-title">{item.title} </h5>
										<p className="card-text">₹{item.price}</p>
										<a className="btn btn-primary" onClick={() => dispatch(addToCart(item))}>
											Add To cart
										</a>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
