import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import bg_login from "../../assets/bg.login.json";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { userServ } from "../../services/userService";
import { localServ } from "../../services/localService";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../../redux/actions/userAction";
import Swal from "sweetalert2";
export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    let onSuccess = () => {
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
    };
    let onFail = () => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    };
    // console.log("Received values of form: ", values);
    userServ
      .userLogin(values)
      .then((res) => {
        console.log(res);
        localServ.user.setDataUser(res.data.content);
        dispatch(userLoginAction(res.data.content));
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFail();
      });
  };
  return (
    <div className="flex justify-center container items-center pt-20">
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
