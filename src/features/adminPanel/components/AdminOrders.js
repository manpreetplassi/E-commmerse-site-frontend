import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderAsync, updateOrderAsync } from "../../orders/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../../app/constants.js";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const totalItems = useSelector((state) => state.order.totalOrders);
  const totalPages = Math.ceil(totalItems / 6);
  const [editableOrderId, setEditableOrderId] = useState(null);

  const hendleSort = (option) => {
    let newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };
  useEffect(() => {
    let pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ sort, pagination }));
  }, [dispatch, sort, page]);
  function hendlePage(checkStr, value) {
    if (value > 0) {
      if (checkStr === "next" && value < totalPages) {
        setPage(value + 1);
      } else if (checkStr === "previous" && value > 1 && value <= totalPages) {
        setPage(value - 1);
      } else if (checkStr === "setPage") {
        setPage(value);
      }
    } else {
      setPage(1);
    }
  }
  const hendleEdit = (orderId) => {
    setEditableOrderId(orderId);
  };
  const hendleUpdate = (e, order) => {
    let productId = [];
    let quantity = [];
    let orderProducts = [];
    for (let i=0; i < order.products.length; i++) {
      productId[i] = order.products[i].product.id;
      quantity[i] = order.products[i].quantity;
      orderProducts.push({product: productId[i], quantity: quantity[i]});
    }
    const updatedOrder = { ...order, products : orderProducts, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(null);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cencel":
        return "bg-red-200 text-red-600";
      default:
        break;
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left flex cursor-pointer">
                    #ORDER
                  </th>
                  <th className="py-3 px-6 text-left">ITEMS</th>
                  <th
                    className="py-3 px-6 text-center flex cursor-pointer"
                    onClick={(e) => {
                      hendleSort({
                        sort: "totalAmount",
                        order: sort._order === "asc" ? "desc" : "asc",
                      });
                    }}
                  >
                    TOTAL AMOUNT
                    {sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4"></ArrowDownIcon>
                    )}
                  </th>
                  <th className="py-3 px-6 text-center">SHIPPING ADDRESS</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 font-normal">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.products.map((item, index) => (
                        <div key={index} className="flex items-center">
                          {item.product && (<>
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>{item.product.title}</span>
                          </>)}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.totalAmount}
                    </td>
                    <td className="py-3 px-6 flex items-center justify-center">
                      <div className="">
                        <div>Name: {order.selectedAdd.name}</div>
                        <div>Email: {order.selectedAdd.email}</div>
                        <div>Country: {order.selectedAdd.countryName}</div>
                        <div>Street: {order.selectedAdd.street}</div>
                        <div>City: {order.selectedAdd.city}</div>
                        <div>State: {order.selectedAdd.state}</div>
                        <div>PinCode: {order.selectedAdd.pinCode}</div>
                        <div>Phone No.: {order.selectedAdd.phone}</div>
                        {order.selectedAdd.phone2 && (
                          <div>
                            Alternative phone no.: {order.selectedAdd.phone2}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`${chooseColor(
                          order.status
                        )} py-1 px-3 rounded-full text-xs`}
                      >
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => {
                              hendleUpdate(e, order);
                            }}
                          >
                            <option value="NAN">--choose one--</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            <option value="cencel">Cencel</option>
                          </select>
                        ) : (
                          order.status
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="cursor-pointer w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <Link to={`/admin/adminOrders/usersOrders/${order.userId}`}>
                            <EyeIcon className="w-6"></EyeIcon>
                          </Link>
                        </div>
                        <div
                          onClick={() => {
                            hendleEdit(order.id);
                          }}
                          className="cursor-pointer w-4 mr-2 mx-3 transform hover:text-purple-500 hover:scale-110"
                        >
                          <PencilIcon className="w-6 "></PencilIcon>
                        </div>
                        <div className="cursor-pointer w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <p
                    onClick={(e) => {
                      hendlePage("previous", page);
                    }}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </p>
                  <p
                    onClick={(e) => {
                      hendlePage("next", page);
                    }}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </p>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(page - 1) * ITEMS_PER_PAGE + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {page * ITEMS_PER_PAGE}
                      </span>{" "}
                      of <span className="font-medium">{totalItems}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <p
                        onClick={() => {
                          hendlePage("previous", page);
                        }}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </p>
                      {Array.from({
                        length: Math.ceil(totalItems / ITEMS_PER_PAGE),
                      }).map((el, index) => (
                        <p
                          onClick={() => {
                            hendlePage("setPage", index + 1);
                          }}
                          aria-current="page"
                          className={`relative cursor-pointer z-10 inline-flex items-center ${
                            index + 1 === page
                              ? "bg-indigo-600 text-white"
                              : "bg-white-600 text-gray-400"
                          } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                          {index + 1}
                        </p>
                      ))}

                      <p
                        onClick={() => {
                          hendlePage("next", page);
                        }}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </p>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    </nav>
                  </div>
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
