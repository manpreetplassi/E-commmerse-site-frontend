import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../app/constants.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilterDataAsync,
  fetchProductsByFilterAsync,
} from "../../product-list/productSlice.js";


const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price low to high", sort: "price", order: "asc", current: true },
  { name: "Price high to low", sort: "price", order: "desc", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const totalItems = useSelector((state) => state.products.totalItems);
  const totalPages = Math.ceil(totalItems / 6);
  const filters = useSelector((state) => state.products.filters);

  const hendleFilter = (e, sectionId, value) => {
    let newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[sectionId]) {
        newFilter[sectionId].push(value);
      } else {
        newFilter[sectionId] = [value];
      }
    } else {
      let index = newFilter[sectionId].findIndex((el) => el === value);
      newFilter[sectionId].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const hendleSort = (option) => {
    let newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };

  function hendlePage(checkStr, value) {
    if (value > 0) {
      if (checkStr === "next" && value < totalPages) {
        setPage(value + 1);
      } else if (checkStr === "previous" && value > 1 && value < totalPages) {
        setPage(value - 1);
      } else if (checkStr === "setPage") {
        setPage(value);
      }
    } else {
      setPage(1);
    }
  }

  useEffect(() => {
    let pagination = { _page: page, _limit: ITEMS_PER_PAGE };

    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
    dispatch(fetchFilterDataAsync());
  }, [dispatch, sort, filter, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return (
    <>
      <div className="bg-white">
        <div>
          <Mobilefilter
            filters={filters}
            hendleFilter={hendleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          ></Mobilefilter>
          <DesktopMain
            filters={filters}
            hendleFilter={hendleFilter}
            hendleSort={hendleSort}
            setMobileFiltersOpen={setMobileFiltersOpen}
          ></DesktopMain>
          <Pagination
            hendlePage={hendlePage}
            page={page}
            totalItems={totalItems}
          ></Pagination>
        </div>
      </div>
    </>
  );
}

function Mobilefilter({
  filters,
  hendleFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={(e) => {
                                    hendleFilter(e, section.id, option.value);
                                  }}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopMain({
  filters,
  hendleFilter,
  hendleSort,
  setMobileFiltersOpen,
}) {
  const products = useSelector((state) => state.products.products);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item
                      key={option.name}
                      onClick={(e) => {
                        hendleSort(option);
                      }}
                    >
                      {({ active }) => (
                        <p
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            type="button"
            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span className="sr-only">View grid</span>
            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <form className="hidden lg:block">
            {filters.map((section) => (
              <Disclosure
                as="div"
                key={section.id}
                className="border-b border-gray-200 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              onChange={(e) => {
                                hendleFilter(e, section.id, option.value);
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>

          {/* Product grid */}

          <div className="lg:col-span-3">
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
              <Link to='/admin/adminProductForm'><button className='mb-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>Add product</button></Link>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8">
                  {products.map((product) => (
                    <div>
                      <Link
                        to={`/productdetail/${product.id}`}
                        key={product.id}
                      >
                        <div className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.thumbnail}
                              alt={"product-img"}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-3 flex justify-between">
                            <div>
                              <h3 className="font-serif text-gray-900">
                                {product.title}
                              </h3>
                              <p className="text-sm font-medium text-gray-900">
                                $
                                {Math.round(
                                  product.price *
                                    (1 - product.discountPercentage / 100)
                                )}
                              </p>
                              <p className="text-sm font-medium text-gray-500 line line-through">
                                ${product.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-900 w-14">
                                <StarIcon className="w-5 h-5 inline mx-1"></StarIcon>
                                <span className="relative top-0.5">
                                  {product.rating}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to={`/admin/adminProductForm/edit/${product.id}`}>
                      <button className="my-3 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Edit product
                      </button>
                      </Link>
                      {product.deleted && <div>
                      <p className="text-red-500">Deleted product</p>
                      </div>}
                      {product.stock <= 0 && <p className="text-red-500">out of stock</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Pagination({ page, hendlePage, totalItems = 10 }) {
  return (
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
            to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
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
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </p>
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
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
              )
            )}

            <p
              onClick={() => {
                hendlePage("next", page);
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </p>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
          </nav>
        </div>
      </div>
    </div>
  );
}
