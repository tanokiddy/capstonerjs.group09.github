import { Button, Form, Input } from "antd";
import React from "react";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { userServ } from "../../../services/userService";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import bg_login from "../../../assets/bg.login.json";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

export default function RegisterPage() {
  //SET UP REACT HOOK - METHOD
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //SET UP FORM AND SUBMIT
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(loadingOnAction());
    userServ
      .userRegister(values)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/login");
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
        dispatch(loadingOffAction());
      });
  };

  return (
    <div className="flex items-center container pt-32">
      <Lottie className="w-2/3 h-96" animationData={bg_login} />
      <Form
        className="w-1/3 text-right"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="taiKhoan"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="soDt"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
          />
        </Form.Item>
        <Form.Item
          name="hoTen"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<IdcardOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
          />
        </Form.Item>
        {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item> */}
        <Form.Item>
          <Button
            size="large"
            className="w-full "
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
