import { Button, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spin } from "antd";
import NotFoundPage from "./NotFoundPage";
import { verifyToken, resetPassword } from "../api/authApi";

function PasswordResetPage() {
  const { token: tokenParam } = useParams<{ token?: string }>();
  const [pageLoading, setPageLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [token, setToken] = useState<string | null>(null);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!tokenParam) {
        setTokenValid(false);
        return;
      }
      setPageLoading(true);
      try {
        setToken(tokenParam);
        const data = await verifyToken(tokenParam);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTokenValid(data.status);
      } catch (error) {
        setTokenValid(false);
      } finally {
        setPageLoading(false);
      }
    };

    checkToken();
  }, [tokenParam]);

  const validatePassword = (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters")
      );
    }
    if (!hasUpperCase) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter")
      );
    }
    if (!hasSymbol) {
      return Promise.reject(
        new Error("Password must contain at least one symbol")
      );
    }

    return Promise.resolve();
  };

  const performResetPassword = async (password: string) => {
    if (!token) return;

    try {
      setSubmitting(true);
      const res = await resetPassword(token, password);

      if (res.status) {
        setIsResetSuccess(true);
      } else {
        api.error({
          message: "Password Reset Failed",
          description: "Something went wrong. Please try again.",
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      let errorMsg = "Something went wrong. Please try again.";
      setIsResetSuccess(false);
      if (error.response?.errors?.[0]?.message) {
        errorMsg = error.response.errors[0].message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      api.error({
        message: "Reset Failed",
        description: errorMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      api.error({
        message: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }
    setSubmitting(true);
    await performResetPassword(values.password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
  };

  if (!token) {
    return <NotFoundPage />;
  }

  const passwordResetLayout = (
    <div className="md:min-h-screen flex justify-center items-center rounded-t-3xl md:rounded-none md:w-10/12 lg:w-8/12 ">
      <div className="flex flex-col md:m-auto w-md px-3 mt-2 md:p-0 md:w-10/12 lg:w-8/12">
        <div className="hidden md:flex md:justify-center">
          <img
            src="/epettyshop_image.png"
            alt="epettyshop logo"
            className="w-56"
          ></img>
        </div>
        <div className="md:mt-10 mx-6 mb-6 md:mx-0 md:mb-0">
          <p className="text-xl font-normal inter-normal flex justify-center ">
            The password reset Success.
          </p>
          <p className="text-black/80 font-light text-sm text-center">
            Password rest is success
          </p>
        </div>
        <div className="mt-1.5 md:mt-3 flex justify-center">
          <Link to="/login">
            <Button type="primary" className="">
              <p className="text-sm font-sans inter-normal ">
                Continue to Login
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
  const passwordRestForm = (
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
            Reset password
          </p>
        </div>
        <div className="md:mt-5">
          <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
            <Form.Item
              name="password"
              label={
                <span className="inter-normal text-sm text-gray-700">
                  New password
                </span>
              }
              rules={[
                { required: true, message: "Required" },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={
                <span className="inter-normal text-sm text-gray-700">
                  Confirm password
                </span>
              }
              // label="Password"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input.Password
                size="large"
                placeholder="Enter confirm password"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="!bg-[#3F72AF] !rounded-sm"
              loading={submitting}
            >
              <p className="text-base font-medium inter-normal">
                Reset password
              </p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {contextHolder}
      <Spin spinning={pageLoading} size="large" className="!max-h-lvh">
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
                  Reset password
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

          {tokenValid === false ? (
            <div className="md:min-h-screen flex justify-center items-center rounded-t-3xl md:rounded-none md:w-10/12 lg:w-8/12 ">
              <div className="flex flex-col md:m-auto w-md px-3 mt-2 md:p-0 md:w-10/12 lg:w-8/12">
                <div className="hidden md:flex md:justify-center">
                  <img
                    src="/epettyshop_image.png"
                    alt="epettyshop logo"
                    className="w-56"
                  ></img>
                </div>
                <div className="md:mt-10 mx-6 mb-6 md:mx-0 md:mb-0">
                  <p className="text-xl font-normal inter-normal flex justify-center ">
                    The password reset link is invalid.
                  </p>
                  <p className="text-black/80 text-center">
                    Please generate a new forgot password link to reset the
                    password and try to sign in again.
                  </p>
                </div>
                <div className="mt-1.5 md:mt-3 flex justify-center">
                  <Link to="/forgotPassword">
                    <Button type="primary" className="">
                      <p className="text-sm font-sans inter-normal ">
                        Resend Link
                      </p>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : isResetSuccess ? (
            passwordResetLayout
          ) : (
            passwordRestForm
          )}
        </div>
      </Spin>
    </>
  );
}

export default PasswordResetPage;
