import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import bg_login from "../../../assets/bg.login.json";
import { userLoginAction } from "../../../redux/actions/userAction";

export default function LoginPage() {
  //SET UP REACT HOOK - METHOD
  let dispatch = useDispatch();

  //SET UP SUBMIT FORM
  const onFinish = (values) => {
    dispatch(userLoginAction(values));
  };

  return (
    <div className="flex justify-center container items-center pt-32">
      <Lottie className="sm:w-2/3 w-1/2 h-96" animationData={bg_login} />
      <Form
        name="normal_login"
        className="login-form sm:w-1/3 w-1/2"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
      >
        <Form.Item
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item className="!mb-3 text-left">
            <NavLink className="text-blue-500" to="/register">
              Register Now!
            </NavLink>
          </Form.Item>
          <Form.Item className="!mb-3 text-right">
            <NavLink className="text-red-500 hover:text-red-400" to="">
              Forgot password?
            </NavLink>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            danger
            htmlType="submit"
            className="login-form-button w-full text-white font-bold text-3xl"
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
