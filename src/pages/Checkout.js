import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  cartItems,
  deleteCartProductAsync,
  updateCartProductQuantityAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync } from "../features/orders/orderSlice";
import { updateUserAsync } from "../features/userInfo/userSlice";
import { useNotification } from "../features/Alert/useNotification";


export default function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector(cartItems); 
  const user = useSelector((state) => state.user.userInfo);
  const [selectedAdd, setSelectedAdd] = useState();
  // const [selectedAdd, setSelectedAdd] = useState(user?.addresses[0][0]);
  // also set alert comp
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const { displayNotification } = useNotification();
  useEffect(()=>{
    if(user?.addresses && user?.addresses[0] && user?.addresses[0][0]){setSelectedAdd(user?.addresses[0][0])}
  },[])

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (user.addresses) {
      const updateUser = { ...user, addresses: [...user.addresses, data] };
      dispatch(updateUserAsync(updateUser));
    } else {
      const updateUser = { ...user, addresses: [data] };
      dispatch(updateUserAsync(updateUser));
    }
    displayNotification({message: "User address updated successfully" })
    reset();
  };

  const totalAmount = products.reduce(
    (amount, item) => Math.round(
      item.product.price *
        (1 - item.product.discountPercentage / 100)
    ) * item.quantity + amount,
    0
  );
  const totalItems = products?.length;
  const hendleDelete = (e, itemId) => {
    dispatch(deleteCartProductAsync(itemId));
    displayNotification({message: "Cart product deleted successfully" })
  };

  const handleChange = (e, productId) => {
    dispatch(
      updateCartProductQuantityAsync({ productId, quantity: +e.target.value })
    );
    displayNotification({message: "Update Cart Product Quantity successfully" })
  };
  const hendlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const hendleAddressSelection = (e, address) => {
    setSelectedAdd(address);
  };

  const hendleOrder = () => {
    let productId = [];
    let quantity = [];
    let orderProducts = [];
    for (let i in products) {
      productId[i] = products[i].product.id;
      quantity[i] = products[i].quantity;
      orderProducts.push({product: productId[i], quantity: quantity[i]});
    }
    if (paymentMethod) {
      if (paymentMethod && selectedAdd) {
      const order = {
        products : orderProducts,
        selectedAdd,
        paymentMethod,
        userId: user.id,
        totalAmount,
        totalItems,
        status: "pending",
      };
        dispatch(createOrderAsync(order));
    displayNotification({message: "Order created successfully" })
  } else {
      alert("Please select payment method & address");
    }
  }
  };

  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod==='Card' && (<Navigate to={`/StripeCheckoutPage`} replace={true}></Navigate>)}
      {currentOrder && currentOrder.paymentMethod==='Cash' && (
        <Navigate
          to={`/orderSuccess/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8 bg-white shadow-xl">
            <form noValidate method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="border-b border-gray-900/10 pb-12 mt-5">
                <h2 className=" text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\.\w{2,4}))$/gm,
                            message: "Please enter a valid email address",
                          },
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="countryName"
                        {...register("countryName", {
                          required: "Country is required",
                        })}
                        autoComplete="India"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street")}
                        id="street"
                        autoComplete="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", { required: "city is required" })}
                        id="city"
                        autoComplete="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "state is required",
                        })}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pin-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Pin code
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register("pinCode", {
                          required: "Pin code is required",
                        })}
                        id="pinCode"
                        autoComplete="pin-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        id="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Alternative phone number
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        {...register("phone2")}
                        id="phone2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add address
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                {user && user.addresses.length && (
                  <>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses
                    </p>
                    <fieldset>
                      <ul role="list" className="divide-y divide-gray-100">
                        {user.addresses.map((addArray, outerIndex) => (
                          <div key={outerIndex}>
                            {addArray.map((address, index) => (
                              <li
                                key={index}
                                className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                              >
                                <div className="flex gap-x-4">
                                  <input
                                    id={address.email}
                                    checked={address===selectedAdd}
                                    name="address"
                                    type="radio"
                                    onChange={(e) => {
                                      hendleAddressSelection(e, address);
                                    }}
                                    className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                      {address.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      {address.email}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      Phone: {address.phone}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address.street}
                                  </p>
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address.state}
                                  </p>
                                  <p className="mt-1 text-xs leading-5 text-gray-900">
                                    Pin-code: {address.pinCode}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </div>
                        ))}
                      </ul>
                    </fieldset>
                  </>
                )}

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose one
                    </p>
                    <div className="mt-6 space-y-6 ">
                      <div className="flex items-center gap-x-3 ">
                        <input
                          id="cash-payment"
                          name="payment"
                          value="Cash"
                          type="radio"
                          onChange={hendlePayment}
                          checked={paymentMethod === "Cash"}
                          className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="payment"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3 ">
                        <input
                          id="Card-payment"
                          name="payment"
                          value="Card"
                          onChange={hendlePayment}
                          checked={paymentMethod === "Card"}
                          type="radio"
                          className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow-xl ">
              <div className="flex-1 px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products.map((items) => (
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
                                  Price: {Math.round(
                                items.product.price *
                                  (1 - items.product.discountPercentage / 100)
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
                  <p>{totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Products</p>
                  <p>{products.length}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={hendleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </button>
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
        </div>
      </div>
    </>
  );
}
