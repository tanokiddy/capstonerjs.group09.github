import { Button, Form, Input } from "antd";
import React from "react";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import bg_login from "../../../assets/bg.login.json";
import { userRegisterAction } from "../../../redux/actions/userAction";

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

  //SET UP FORM AND SUBMIT
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values = { ...values, maNhom: "GP03" };
    dispatch(userRegisterAction(values));
  };

  return (
    <div className="flex items-center container pt-32">
      <Lottie className="sm:w-2/3 w-1/2 h-96" animationData={bg_login} />
      <Form
        className="sm:w-1/3 w-1/2 text-right"
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
