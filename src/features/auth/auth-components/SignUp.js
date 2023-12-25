import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../authSlice";
import { useNotification } from "../../Alert/useNotification";

export default function SignUp() {
  const dispatch = useDispatch();
  const UserInfo = useSelector(state => state.user.userInfo)
  const status = useSelector(state => state.auth.status)
  const error = useSelector(state => state.auth.error)
  const { displayNotification } = useNotification();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    const newUser = await {...data, addresses:[], role: 'user'};
    await dispatch(createUserAsync({userData: newUser}))
  };

  useEffect(()=>{
    if(status==="loggedIn"){ 
      displayNotification({ message: "You Signed Up" }) 
    }
    else if(status==="rejected"){
        displayNotification({ message: error }) 
        setValue(null)
      }
  }, [status])

  useEffect(() => {
  if(UserInfo){displayNotification({message: "User SignUp successfully" })}
  }, [UserInfo])

  return (
    <div>
      {UserInfo && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  autoComplete="email"
                  {...register(
                    "name",
                    { required: "name is required"})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register(
                    "email",
                    { required: "Email is required" ,
                    pattern:
                    { value: /^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\.\w{2,4}))$/gm ,
                      message: "Please enter a valid email address" }
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="red-text-500">{errors.email && errors.email.message} </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    // pattern:{ 
                    //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm ,
                    //   message: `at least 8 characters \n
                    //   - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                    //   - Can contain special characters`
                    // }
                  },
                  )}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="red-text-500">{errors.password && errors.password.message} </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  confirmPassword
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm-password is required",
                    validate: (value, formValues) => value === formValues.password || 'password does not match'
                  }
                )}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="red-text-500">{errors.confirmPassword && errors.confirmPassword.message} </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Already have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
