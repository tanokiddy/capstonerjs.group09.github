import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import bg_login from "../../assets/bg.login.json";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";

export default function LoginPage() {
  const [userLogin, setUserLogin] = useState({ taiKhoan: "", matKhau: "" });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex justify-center container items-center">
      <Lottie className="w-2/3 h-96" animationData={bg_login} />
      <Form
        name="normal_login"
        className="login-form w-1/3"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
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
            name="taiKhoan"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="password"
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
            name="matKhau"
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <NavLink className="login-form-forgot" href="">
            Forgot password?
          </NavLink>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
