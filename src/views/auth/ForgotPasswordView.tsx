import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordResetEmail } from "@/api/AuthAPI";
import toast from "react-hot-toast";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestPasswordResetEmail,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data!)
      reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5 text-center">
        Forgot your password? Put your email and{''}
        <span className=" text-yellow-400 font-bold"> reset it</span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Register email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Register email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid e-mail",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Send Instructions'
          className="bg-yellow-400 hover:bg-yellow-500 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-300 font-semibold"
        >
          Already have an account? Sign In
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-300 font-semibold"
        >
          Don't have an account? Create One
        </Link>
      </nav>
    </>
  )
}
