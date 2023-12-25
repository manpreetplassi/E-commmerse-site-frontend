// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from "react-router-dom";
import { addProductAsync, updateProductAsync } from "../adminSlice";
import { useEffect, useRef, useState } from "react";
import { fetchProductByIdAsync, productDetails } from "../../product-list/productSlice";

export default function AdminProductForm() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters)
  const selectedProduct = useSelector(productDetails)
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const linkRef = useRef(null);
  const params = useParams();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if(params.id){
      dispatch(fetchProductByIdAsync(params.id))
    }
  },[dispatch, params.id ])

  useEffect(() => {
    if(selectedProduct && params.id){
      setValue('title', selectedProduct.title)
      setValue('description', selectedProduct.description)
      setValue('price', selectedProduct.price)
      setValue('discountPercentage', selectedProduct.discountPercentage)
      setValue('stock', selectedProduct.stock)
      setValue('brand', selectedProduct.brand)
      setValue('category', selectedProduct.category)
      setValue('thumbnail', selectedProduct.thumbnail)
      setValue('image1', selectedProduct.images[0])
      setValue('image2', selectedProduct.images[1])
      setValue('image3', selectedProduct.images[2])
      setValue('image4', selectedProduct.images[3])
    }
  },[dispatch, setValue, selectedProduct])

  const onSubmit = (data) => {
    const images = [data.image1, data.image2, data.image3, data.image4]
      delete(data.image1)
      delete(data.image2)
      delete(data.image3)
      delete(data.image4)
      if(params.id){
        const productData = {...data, rating: selectedProduct.rating, images, id: params.id}
        dispatch(updateProductAsync(productData))
        handleRedirect(true);
      }
      else{
      const productData = {...data, price: +data.price, discountPercentage: +data.discountPercentage, rating: 0, stock: +data.stock, images}
      dispatch(addProductAsync(productData));
    }
    reset();
  }
  const hendleDelete =() => {
    const productData = {...selectedProduct, deleted: true}
    dispatch(updateProductAsync(productData));
  }
  const handleRedirect = (e) => {
    setShouldRedirect(e);
  };
  useEffect(() => {
    if (shouldRedirect) {
      if (linkRef.current) {
        linkRef.current.click();
      }
    }
  }, [shouldRedirect]);

  return (
    <>
    {!filters[0].options && !filters.length && <Navigate to="/" replace={true}></Navigate>}
    <div className="lg:col-span-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8 bg-white shadow-xl">
    <form noValidate method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register(
                      "title",
                      { required: "Product name is required" 
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register(
                    "description",
                    { required: "Description is required" 
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write details of your product.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register(
                      "price",
                      { required: "Price is required" 
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register(
                      "stock",
                      { required: "Stock is required" 
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Discount in percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register(
                      "discountPercentage",
                      { required: "DiscountPercentage is required" 
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register(
                      "thumbnail",
                      { required: "thumbnail is required" 
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register(
                      "image1"
                    )}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register(
                      "image2"
                    )}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register(
                      "image3"
                    )}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register(
                      "image4"
                    )}
                    id="image4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1 ">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <select {...register(
                      "brand",
                      { required: "brand is required" 
                    })}>
                      <option value=''>---choose brand---</option>
                    {filters[0].options.map(brand => <option value={brand.value}>{brand.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <select {...register(
                      "category",
                      { required: "category is required" 
                    })}>
                      <option value=''>---choose category---</option>
                    {filters[1].options.map(category => <option value={category.value}>{category.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to='/admin' ref={linkRef}>
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        </Link>
        {params.id && <button
        onClick={hendleDelete}
          className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button>}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
    </>
  )
}
