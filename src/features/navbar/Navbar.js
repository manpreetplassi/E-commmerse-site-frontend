import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import maleavtar from "../../icons/male_avtar.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsLength = cartItems ? cartItems.length : null;
  const location = useLocation();
  
  const user = {
    name: `${userInfo?.name ? userInfo.name : "New User"}`,
    email: `${userInfo?.email}`,
  };
const userNavigation = [
  { name: "My Profile", link: "/userProfile", loggedIn: true },
  // { name: "Settings", link: "#" },
  { name: userInfo?.id ? "Sign out" : "Sign In", link: userInfo?.id ? "/logOut" : "/login" },
];
  const navigation = [
    { name: "Home", href: "/", current: true, user: true, loggedIn: false },
    { name: "Orders", href: `/usersOrders`, current: false, user: true , loggedIn: true},
    { name: "About Us", href: "/aboutUs", current: false , user: true, loggedIn: false},
    { name: "Admin", href: "/admin", current: false, admin: true, loggedIn: true },
    {
      name: "AdminOrders",
      href: "/admin/adminOrders",
      current: false,
      admin: true,
      loggedIn: true,
    },
  ];
  const updatedNavigation = navigation.map((item) => {
    const isCurrent = item[userInfo?.role] && location.pathname === item.href;
    return {
      ...item,
      current: isCurrent,
    };
  });


  return (
      <>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {updatedNavigation.map((item) =>
                            item[userInfo?.role] ? (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : (
                              (item.loggedIn === false) && <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {cartItems && cartItemsLength > 0 ? (
                          <Link to="/cart">
                            <button
                              type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <ShoppingCartIcon
                                className="h-6 w-6 relative top-5"
                                aria-hidden="true"
                              />
                              <span className="inline-flex items-center rounded-md bg-gray-50 px-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 m-2 relative left-2 bottom-4">
                                {cartItemsLength}
                              </span>
                            </button>
                          </Link>
                        ) : (
                          <Link to="/">
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <ShoppingCartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </Link>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={maleavtar}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                ( userInfo?.id ) ? (<Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                                ) : (
                                  !(item.loggedIn === true) ? (<Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.link}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>) : null
                                )
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {updatedNavigation.map((item) =>
                      item[userInfo?.role] ? (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        (item.loggedIn === false) ? (<Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>) : null
                      )
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      {cartItems && cartItemsLength > 0 ? (
                        <Link to="/cart">
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <ShoppingCartIcon
                              className="h-6 w-6 relative top-5"
                              aria-hidden="true"
                            />
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 m-2 relative left-2 bottom-4">
                              {cartItemsLength}
                            </span>
                          </button>
                        </Link>
                      ) : (
                        <Link to="/">
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        userInfo?.id ? ( <Link
                          to={item.link}
                          className={classNames(
                            "block rounded-md px-4 py-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                        ) : (                        
                        !(item.loggedIn) && <Link
                          to={item.link}
                          className={classNames(
                            "block rounded-md px-4 py-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                        )
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                E-Commerse Site
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </>
  );
}
