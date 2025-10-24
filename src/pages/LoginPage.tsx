import { Button, Divider, Form, Input, notification } from "antd";
import { useState } from "react";
import { login } from "../api/authApi";
import { ClientError } from "graphql-request";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      //const data = await login(values.emailAddress, values.password);
      const [data] = await Promise.all([
        login(values.emailAddress, values.password),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      console.log("data", data);
      api.success({
        message: "Login success",
        description: (
          <div>
            <div>Welcome !</div>
            <div>User: {data.user.name} </div>
            <div>Role: {data.user.role.role_name}</div>
          </div>
        ),
      });
    } catch (error: any) {
      // message.error(error.message || "Login failed");
      let errorMsg = "Login failed";

      if (error.response?.errors?.[0]?.message) {
        errorMsg = error.response.errors[0].message;
      } else if (error instanceof ClientError) {
        if (error.response.status === 404) {
          errorMsg = "Server not found (404)";
        } else {
          errorMsg = `Network Error: ${error.response.status}`;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      api.error({
        message: "Login Error",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const loginSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      ),
  });

  const yupValidator = (field: "emailAddress" | "password") => {
    return async (_: any, value: string) => {
      try {
        // Use the current form values
        const values = {
          emailAddress:
            field === "emailAddress"
              ? value
              : form.getFieldValue("emailAddress"),
          password:
            field === "password" ? value : form.getFieldValue("password"),
        };
        await loginSchema.validateAt(field, values);
        return Promise.resolve();
      } catch (err: any) {
        return Promise.reject(new Error(err.message));
      }
    };
  };
  return (
    <>
      {contextHolder}
      <div className="visible w-full min-h-14 md:hidden flex place-content-center sticky top-0  bg-white shadow-md z-40">
        <img
          src="/epettyshop_image.png"
          alt="epettyshop logo"
          className="w-40 h-10 m-auto"
        ></img>
      </div>

      {/* welcome images */}

      <div className="md:flex block">
        <div className="h-60  md:w-10/12 lg:w-8/12  md:h-svh bg-[linear-gradient(180deg,#F5F7FA_0%,#C3CFE2_100%)] md:flex md:flex-col justify-center relative ">
          <div className="absolute md:top-0 z-0 pointer-events-none ">
            <img
              src="/loginIllustration-db-removed.png"
              className=" pointer-events-none md:h-full h-56 brightness-75 contrast-150"
            ></img>
          </div>
          <div className="flex justify-center z-10 relative">
            <div className="text-center md:w-md md:h-auto w-[298px] h-16 mt-2 md:mt-0">
              <p className="md:text-4xl text-2xl inter-normal font-medium text-[#3f72af] px-2 tracking-normal whitespace-normal">
                Welcome to the world of e-Commerce
              </p>
            </div>
          </div>
          <div className="md:mt-16 flex justify-center z-20 relative">
            <img
              src="/loginWelcome.png"
              className="md:w-xl lg:h-96 md:h-80 object-contain h-[150px]"
              alt="Login welcome Image"
            />
          </div>
          <div className=" bg-white min-h-6 w-full rounded-t-2xl -bottom-2 md:hidden"></div>
        </div>

        {/* login form */}

        <div className="md:min-h-screen flex justify-center items-center rounded-t-3xl md:rounded-none md:w-10/12 lg:w-8/12 ">
          <div className="flex flex-col md:m-auto w-md px-3 mt-2 md:p-0 md:w-10/12 lg:w-8/12">
            <div id="logo" className="hidden md:block">
              <img
                src="/epettyshop_image.png"
                alt="epettyshop logo"
                className="w-56"
              ></img>
            </div>
            <div className="md:mt-10 mx-6 mb-6 md:mx-0 md:mb-0">
              <p className="text-xl font-normal inter-normal flex justify-center lg:justify-start md:justify-start">
                Sign in to your account
              </p>
            </div>
            <div className="md:mt-5">
              <Form
                layout="vertical"
                requiredMark={false}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="emailAddress"
                  label={
                    <span className="inter-normal text-sm text-gray-700">
                      Email address
                    </span>
                  }
                  // label="Email address"
                  className=""
                  //  rules={[
                  //   { required: true, message: "Required" },
                  //   {
                  //     type: "email",
                  //     message: "Please enter a valid email address",
                  //   },
                  // ]}
                 rules={[{ validator: yupValidator("emailAddress") }]}
                >
                  <Input size="large" placeholder="Enter email address"></Input>
                </Form.Item>
                <Form.Item
                  name="password"
                  label={
                    <span className="inter-normal text-sm text-gray-700">
                      Password
                    </span>
                  }
                  // label="Password"
                  rules={[{ validator: yupValidator("password") }]}
                >
                  <Input.Password size="large" placeholder="Enter password" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="!bg-[#3F72AF] !rounded-sm"
                  loading={loading}
                >
                  <p className="text-base font-medium inter-normal">Login</p>
                </Button>
              </Form>
            </div>
            <div className="mt-1.5 md:mt-3 flex justify-center md:justify-start">
              <Link to="/forgotPassword">
                <Button type="link" className="!p-0">
                  <p className="text-[#3F72AF] text-sm font-sans inter-normal ">
                    Forgot Password?
                  </p>
                </Button>
              </Link>
            </div>
            <Divider className="!my-6">
              <p className="text-sm font-normal">OR</p>
            </Divider>
            <div className="flex justify-center gap-1 mb-10 md:mb-0">
              <p className="text-sm text-[#262626] font-normal inter-normal">
                Create a new account?
              </p>
              <a
                href=""
                className="text-sm text-[#3F72AF] font-normal inter-normal "
              >
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
