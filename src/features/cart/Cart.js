import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  fetchCartProductsByUserIdAsync,
  deleteCartProductAsync,
  updateCartProductQuantityAsync,
} from "./cartSlice";
import { useEffect, useState } from "react";
import { useNotification } from "../Alert/useNotification";
import CartProductRemovalAlert from "./CartProductRemovalAlert";

export default function Cart() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const StatusQty = useSelector((state) => state.cart.statusQty);
  const userInfo = useSelector((state) => state.user.userInfo);
  const CartItems = useSelector((state) => state.cart.items);
  const cartProductsLoadStatus = useSelector((state) => state.cart.status);
  const { displayNotification } = useNotification();
  const [removalAlertOpen, setRemovalAlertOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [navigateCode, setNavigateCode] = useState(null);

  const totelAmount = CartItems.reduce(
    (amount, item) =>
      Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      ) *
        item.quantity +
      amount,
    0
  );

  const hendleDelete = (e, itemId) => {
    // Set the selected item ID and open the removal alert modal
    setSelectedItemId(itemId);
    setRemovalAlertOpen(true);
  };

  const handleChange = async (e, productId) => {
    await dispatch(
      updateCartProductQuantityAsync({ productId, quantity: +e.target.value })
    );
    await displayNotification({
      message: "Quantity updated successfully",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCartProductsByUserIdAsync(userInfo.id));
    };

    fetchData();
  }, [dispatch, StatusQty, userInfo.id]);

  useEffect(() => {
    if (CartItems) {
      const updatedCartItemsLength = CartItems.length;
      setNavigateCode(updatedCartItemsLength === 0 ? <Navigate to="/" replace={true} /> : null);
    }
  }, [CartItems]);


  useEffect(() => {
    if (cartProductsLoadStatus === "loading") {
      setLoading(true);
    } else if (cartProductsLoadStatus === "idle") {
      setLoading(false);
    }
  }, [cartProductsLoadStatus]);

  return (
        <>
          {navigateCode}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow-xl ">
            <div className="flex h-full lg:p-5 mx-5 sm:p-2 flex-col">
              <div className="flex-1 px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {CartItems.map((items) => (
                        <li key={items.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                            <img
                              src={
                                items.product.images
                                  ? items.product.images[0]
                                  : null
                              }
                              alt="cart-product-image"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link
                                    to={`/productdetail/${items.product.id}`}
                                  >
                                    {items.product.title}
                                  </Link>
                                </h3>
                                <p className="ml-4">
                                  Price:{" "}
                                  {Math.round(
                                    items.product.price *
                                      (1 -
                                        items.product.discountPercentage / 100)
                                  )}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                Stock: {items.product.stock}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <label
                                htmlFor="quantity"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                                <select
                                  className="mx-3"
                                  onChange={(e) =>
                                    handleChange(e, items.product.id)
                                  }
                                  value={items.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                              </label>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    hendleDelete(e, items.id);
                                  }}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Amount</p>
                  <p>{totelAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Products</p>
                  <p>{CartItems.length}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Render the removal alert modal */}
          <CartProductRemovalAlert
            isOpen={removalAlertOpen}
            onClose={() => setRemovalAlertOpen(false)}
            onConfirm={() => {
              // Handle the removal logic here
              dispatch(deleteCartProductAsync(selectedItemId));
            }}
          />
        </>
  );
}
