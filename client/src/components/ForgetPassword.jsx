import { useForgetPasswordMutation } from "@/feature/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import API from "../api/axios";
// import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const[forgetPassword,{data, isSuccess, error, isLoading}]=useForgetPasswordMutation()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    forgetPassword({email})
   
    

    // try {
    //   setLoading(true);
    //   const { data } = await API.post("/forgot-password", { email });
    //   toast.success(data.message);
    //   setEmail("");
    // } catch (error) {
    //   toast.error(error.response?.data?.message || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };
 useEffect(() => {
      if (isSuccess) {
        toast.success(data.message)
      }
      if (error) {
        toast.success(error.response?.data?.message || "Something went wrong")
      }
    }, [isSuccess, error])
  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your registered email and we will send you a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white py-3 rounded-lg transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
