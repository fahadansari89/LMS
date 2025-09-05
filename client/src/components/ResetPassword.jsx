import { useResetPasswordMutation } from "@/feature/api/authApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const [resetPassword, { data, isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      await resetPassword({ token, password }).unwrap();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Password updated successfully!");
      setPassword("");
      navigate("/login");
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full text-white py-3 rounded-lg transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
