import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { userServ } from "../../../services/userService";
import { localServ } from "../../../services/localService";
import { userLoginAction } from "../../../redux/actions/userAction";
import bg_login from "../../../assets/bg.login.json";

export default function LoginPage() {
  //SET UP REACT HOOK - METHOD
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //SET UP SUBMIT FORM
  const onFinish = (values) => {
    userServ
      .userLogin(values)
      .then((res) => {
        console.log(res);
        localServ.user.setDataUser(res.data.content);
        dispatch(userLoginAction(res.data.content));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data.content,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="flex justify-center container items-center pt-32">
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
        <Form.Item className="flex justify-end ">
          <NavLink className="login-form-forgot text-red-500" href="">
            Forgot password?
          </NavLink>
        </Form.Item>

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
