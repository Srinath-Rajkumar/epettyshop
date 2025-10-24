import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";
import { ClientError } from "graphql-request";

interface ForgotPasswordFormValue {
  emailAddress: string;
}

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (value: ForgotPasswordFormValue) => {
    setLoading(true);
    setUserEmail(value.emailAddress);
    try {
      const [data] = await Promise.all([
        forgotPassword(value.emailAddress),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      console.log("data", data);
      setEmailSent(true);
    } catch (error: any) {
      let errorMsg = "Request Failed";
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
        message: "Request Failed",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const maskEmail = (email: string) => {
    if (!email) return "********@*****";

    const [username, domain] = email.split("@");

    if (!username || !domain) return "********@*****";

    const visibleChars = Math.min(2, username.length);
    const maskCount = Math.max(3, username.length - visibleChars);

    return (
      username.slice(0, visibleChars) + "*".repeat(maskCount) + "@" + domain
    );
  };

  const forgotPasswordSuccessLayout = (
    <div className="md:min-h-screen flex justify-center items-center rounded-t-3xl md:rounded-none md:w-10/12 lg:w-8/12 ">
      <div className="flex flex-col md:m-auto w-md px-3 mt-2 md:p-0 md:w-10/12 lg:w-8/12">
        <div className="hidden md:block">
          <img
            src="/epettyshop_image.png"
            alt="epettyshop logo"
            className="w-56"
          ></img>
        </div>
        <div className="md:mt-10 mx-6 mb-6 md:mx-0 md:mb-0">
          <p className="text-xl font-normal inter-normal flex justify-center lg:justify-start md:justify-start">
            The password reset link sent.
          </p>
          <p className="text-sm font-light inter-normal py-2.5 text-black/80">
            An email has been sent to your email address {maskEmail(userEmail)}
          </p>
          <p className="text-black/80">
            Follow the direction in the email to reset your password.
          </p>
        </div>
        <div className="mt-1.5 md:mt-3 flex justify-center md:justify-start">
          <Link to="/login">
            <Button type="primary" className="">
              <p className="text-sm font-sans inter-normal ">
                Return to Login Page
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
  const forgotPasswordLayout = (
    <div className="md:min-h-screen flex justify-center items-center rounded-t-3xl md:rounded-none md:w-10/12 lg:w-8/12 ">
      <div className="flex flex-col md:m-auto w-md px-3 mt-2 md:p-0 md:w-10/12 lg:w-8/12">
        <div className="hidden md:block">
          <img
            src="/epettyshop_image.png"
            alt="epettyshop logo"
            className="w-56"
          ></img>
        </div>
        <div className="md:mt-10 mx-6 mb-6 md:mx-0 md:mb-0">
          <p className="text-xl font-normal inter-normal flex justify-center lg:justify-start md:justify-start">
            Forgotten your password?
          </p>
          <p className="text-xs font-light inter-normal py-2.5 text-black/80">
            We'll send you a Reset Password Link to your registered email
            address to reset the password.
          </p>
        </div>
        <div className="md:mt-5">
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleForgotPassword}
          >
            <Form.Item
              name="emailAddress"
              label={
                <span className="inter-normal text-sm text-gray-700">
                  Email address
                </span>
              }
              className=""
              rules={[
                { required: true, message: "Required" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input size="large" placeholder="Enter email address"></Input>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="!bg-[#3F72AF] !rounded-sm"
              loading={loading}
            >
              <p className="text-base font-medium inter-normal">
                Reset Password
              </p>
            </Button>
          </Form>
        </div>
        <div className="mt-1.5 md:mt-3 flex justify-center md:justify-start">
          <Link to="/login">
            <Button type="link" className="!p-0">
              <p className="text-[#3F72AF] text-sm font-sans inter-normal ">
                Return to Login
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
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
                Forgot password?
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

        {emailSent ? forgotPasswordSuccessLayout : forgotPasswordLayout}
      </div>
    </>
  );
}
export default ForgotPassword;
