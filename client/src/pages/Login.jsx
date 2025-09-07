import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useFormik } from "formik";
import { useLoginUserMutation, useRegisterUserMutation } from "@/feature/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ForgotPassword from "@/components/ForgetPassword";

const signUpSchema = Yup.object({
  name: Yup.string().min(3).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});
const logInSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const signUpInitialValues = { name: "", email: "", password: "" };
  const logInInitialValues = { email: "", password: "" };

  const signUpFormik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      signUpFormik.resetForm();
      registerUser(values);
    },
  });

  const logInFormik = useFormik({
    initialValues: logInInitialValues,
    validationSchema: logInSchema,
    onSubmit: (values) => {
      logInFormik.resetForm();
      loginUser(values);
    },
  });

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "Signup successfully");
      navigate('/login')
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successfully");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerData?.data?.message || "Signup Failed");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError]);

  return (
    <div className="flex items-center justify-center w-full mt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-md flex-col gap-6"
      >
        <Tabs defaultValue="login" className="shadow-xl rounded-2xl bg-white dark:bg-gray-900 p-4">
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-200 dark:bg-gray-800 rounded-xl p-1 ml-6">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all dark:data-[state=active]:bg-blue-600"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all  dark:data-[state=active]:bg-blue-600"
            >
              Signup
            </TabsTrigger>
            <TabsTrigger
              value="forgetPassword"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all dark:data-[state=active]:bg-blue-600"
            >
              Forget Password
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={logInFormik.handleSubmit}
            >
              <Card className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Welcome Back 👋
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Please login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      placeholder="abc@gmail.com"
                      required
                      value={logInFormik.values.email}
                      onChange={logInFormik.handleChange}
                      onBlur={logInFormik.handleBlur}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    {logInFormik.errors.email && logInFormik.touched.email && (
                      <p className="text-red-600 text-sm">{logInFormik.errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      placeholder="Enter your password"
                      required
                      type="password"
                      name="password"
                      value={logInFormik.values.password}
                      onChange={logInFormik.handleChange}
                      onBlur={logInFormik.handleBlur}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    {logInFormik.errors.password && logInFormik.touched.password && (
                      <p className="text-red-600 text-sm">{logInFormik.errors.password}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    disabled={loginIsLoading}
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.form>
          </TabsContent>

          {/* forgetPassword */}
          <TabsContent value="forgetPassword">
            <ForgotPassword/>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={signUpFormik.handleSubmit}
            >
              <Card className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Create Account ✨
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Fill the details to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* Name */}
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      required
                      name="name"
                      value={signUpFormik.values.name}
                      onChange={signUpFormik.handleChange}
                      onBlur={signUpFormik.handleBlur}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    {signUpFormik.errors.name && signUpFormik.touched.name && (
                      <p className="text-red-600 text-sm">{signUpFormik.errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      required
                      name="email"
                      value={signUpFormik.values.email}
                      onChange={signUpFormik.handleChange}
                      onBlur={signUpFormik.handleBlur}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    {signUpFormik.errors.email && signUpFormik.touched.email && (
                      <p className="text-red-600 text-sm">{signUpFormik.errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      required
                      name="password"
                      value={signUpFormik.values.password}
                      onChange={signUpFormik.handleChange}
                      onBlur={signUpFormik.handleBlur}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    {signUpFormik.errors.password && signUpFormik.touched.password && (
                      <p className="text-red-600 text-sm">{signUpFormik.errors.password}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    disabled={registerIsLoading}
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                      </>
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Login;
