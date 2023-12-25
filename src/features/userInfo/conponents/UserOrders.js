import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrderByUserIdAsync , removeOrdersAsync} from "../../orders/orderSlice";
import { useNotification } from "../../Alert/useNotification";

export default function UserOrders() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.order.usersOrders);
  const OrderMsg = useSelector((state) => state.order.orderMsg);
  const ordersLoadStatus = useSelector((state) => state.order.status);
  const { displayNotification } = useNotification();
  const params = useParams();
  useEffect(() => {
    dispatch(fetchOrderByUserIdAsync())
}, [dispatch, OrderMsg]);

  const hendleCancelOrders = async(orderId) => {
    await dispatch(removeOrdersAsync(orderId))
    await displayNotification({
      message: "Order removed successfully",
    })
  }
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      case "cencel":
        return "text-red-600";
      default:
        break;
    }
  };
  
  useEffect(() => {
    if(ordersLoadStatus === 'loading'){setLoading(true)}
    else if(ordersLoadStatus === 'idle'){setLoading(false)}
  }, [ordersLoadStatus]);

  return (
    <>
    {!user && <Navigate to='/' ></Navigate>}
    {loading ? (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
      ) : (
        <>
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow-xl "
      >
        {orders && orders.map((order, index) => (
        <div key={index} className="flex h-full lg:p-5 mx-5 sm:p-2 flex-col border-t border-gray-500 ">
          <div className="flex-1 px-4 py-6 sm:px-6">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Order #{order.id}
                  </h1>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  { order.products.map((item) => (
                    <div key={item.product?.id}>{
                      item.product && (<>
                      <p className={`${chooseColor(order.status)} text-xl font-bold tracking-tight`}>
                        Order status: {order.status}
                      </p>
                      <li className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt="cart-product-image"
                            className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/productdetail/${item.product.id}`}>
                                  {item.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">Price: {item.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Stock: {item.product.stock}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <label
                              htmlFor="quantity"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
                          </div>
                        </div>
                      </li>
                      </>)
                  }</div>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Totel Amount</p>
              <p>{order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Totel Products</p>
              <p>{order.totalItems}</p>
            </div>

            <fieldset>
              <div className="mt-3 mb-2 truncate leading-5 text-gray-500">
                Shipping Address:
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                  <li
                    className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAdd.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAdd.email}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          Phone: {order.selectedAdd.phone}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {order.selectedAdd.street}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {order.selectedAdd.state}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-900">
                        Pin-code: {order.selectedAdd.pinCode}
                      </p>
                    </div>
                  </li>
              </ul>
            </fieldset>
            <button onClick={(e) => hendleCancelOrders(order.id)} className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Cancel orders
            </button>
          </div>
        </div>))}
      </div>
      </>
      )}
    </>
  )
}
