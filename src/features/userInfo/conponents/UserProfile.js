import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../userSlice";
import { Navigate } from "react-router-dom";
import { useNotification } from "../../Alert/useNotification";
import maleavtar from "../../../icons/male_avtar.png";

export default function UserProfile() {
  const user = useSelector((state) => state.user.userInfo);
  
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [visible, setVisibility] = useState(false);
  const formStyle = {
    display: visible ? "block" : "none",
  };
  const profileStyle = {
    display: visible ? "none" : "block",
  };
  const [addressIndex, setaddressIndex] = useState(null);
  const [formState, setFormState] = useState("updateAdd");

  useEffect(() => {
    // Check if user information is not yet available, then navigate to home page
    if (!user) {
      displayNotification({
        message: "User information not available. Redirecting to home page.",
      });
      // You can replace '/' with the actual path you want to redirect to
      window.location.href = "/";
    }
  }, [user, displayNotification]);

  const onSubmit = (data) => {
    if (formState === "updateAdd") {
      const newUser = { ...user, addresses: [...user.addresses] };
      newUser.addresses.splice(addressIndex, 1, data);
      dispatch(updateUserAsync(newUser));
    } else if (formState === "addAddress") {
      if (user.addresses) {
        const updateUser = { ...user, addresses: [...user.addresses, data] };
        dispatch(updateUserAsync(updateUser));
      } else {
        const updateUser = { ...user, addresses: [data] };
        dispatch(updateUserAsync(updateUser));
      }
    }
    displayNotification({ message: "User address updated successfully" });
    setVisibility(false);
    reset();
  };

  const handleEdit = (index) => {
    setFormState("updateAdd");
    setaddressIndex(index);
    setVisibility(true);
    const [indexOne] = user.addresses[index];
    const selectedAddress = indexOne;
    setValue("name", selectedAddress.name);
    setValue("email", selectedAddress.email);
    setValue("countryName", selectedAddress.countryName);
    setValue("street", selectedAddress.street);
    setValue("city", selectedAddress.city);
    setValue("state", selectedAddress.state);
    setValue("pinCode", selectedAddress.pinCode);
    setValue("phone", selectedAddress.phone);
    setValue("phone2", selectedAddress.phone2);
  };
  const handleAddAddress = () => {
    setFormState("addAddress");
    setValue("street", null);
    setValue("city", null);
    setValue("state", null);
    setValue("pinCode", null);
    setValue("phone", null);
    setValue("email", null);
    setVisibility(true);
  };

  const handleRemove = () => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(addressIndex, 1);
    dispatch(updateUserAsync(newUser));
    displayNotification({ message: "User address deleted successfully" });
  };
  const handleLogout = () => {};

  const hendleCencel = () => {
    setVisibility(false);
  };
  const myStyle = {
    justifyContent: "center",
  };
  return (
    <>
      {!user && <Navigate to="/" replace={true}></Navigate>}
      <form
        style={formStyle}
        noValidate
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border-b border-gray-900/10 pb-12 mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8">
          <h2 className=" text-base font-semibold leading-7 text-gray-900">
            Edit Address
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use address where you can receive mail.
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
                      value: /^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\.\w{2,4}))$/gm,
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
                  {...register("state", { required: "state is required" })}
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
                  {...register("pinCode", { required: "Pin code is required" })}
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
              onClick={hendleCencel}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cencel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {formState === "updateAdd" ? "Update address" : "Add address"}
            </button>
          </div>
        </div>
      </form>
      {/* <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
              {user.role === "admin" && <div className="text-3xl font-bold">
        role: {user.role}
      </div>}
              </h3> */}

      <section className="pt-4 bg-blueGray-50">
        <div className="w-full px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-1">
            <div className="px-6">
              <div className="w-full flex justify-center">
                {" "}
                {/* Center the image */}
                <div>
                  <img
                    src={maleavtar}
                    alt="avatar"
                    className="rounded-full lg:w-4/12 w-full object-cover mx-auto"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
                  {user && user.name ? user.name : "New User"}
                </h3>
                {user && user.role === "admin" && (
                  <div className="text-3xl font-bold">role: {user.role}</div>
                )}
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  {user && user.email}
                </div>
              </div>

              <footer className="m-5">
                <div
                  style={{ display: visible ? "none" : "block" }}
                  className="p-5 py-16"
                >
                  <div
                    onClick={handleAddAddress}
                    className="cursor-pointer max-w-sm text-center rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New Address
                  </div>
                  <div>
                    <fieldset className="">
                      <div className="mt-3 text-gray-500 text-xl">
                        Your Address:
                      </div>
                      <ul role="list" className="mx-6 divide-y divide-gray-100">
                        {user.addresses &&
                          user.addresses.map((item, outerIndex) => (
                            <div key={outerIndex}>
                              {item.map((address, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                                >
                                  <div className="flex gap-x-4">
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
                                      <p
                                        onClick={() => handleEdit(outerIndex)}
                                        className="text-blue-700 mt-1 text-xl cursor-pointer leading-5"
                                      >
                                        Edit
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
                                    <p
                                      onClick={() => handleRemove(outerIndex)}
                                      className="text-blue-700 mt-1 text-xl cursor-pointer leading-5"
                                    >
                                      Remove
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </div>
                          ))}
                      </ul>
                    </fieldset>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
