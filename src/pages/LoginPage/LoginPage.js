import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import bg_login from "../../assets/bg.login.json";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { userServ } from "../../services/userService";
import { localServ } from "../../services/localService";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/constants/constants";
export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    let onSuccess = () => {
      message.success("Login successful");
    };
    let onFail = () => {
      message.error("Login failed");
    };
    setTimeout(() => {
      navigate("/");
    }, 1000);
    // console.log("Received values of form: ", values);
    userServ
      .userLogin(values)
      .then((res) => {
        console.log(res);
        localServ.user.setDataUser(res.data.content);
        onSuccess();
        dispatch({
          type: SET_USER,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
        onFail();
      });
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
