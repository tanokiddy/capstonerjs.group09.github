import { Button, Checkbox, Form, Input, message, Select } from "antd";
import React from "react";
import bg_login from "../../assets/bg.login.json";
import Lottie from "lottie-react";
import { userServ } from "../../services/userService";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HddOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
const { Option } = Select;
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
  let onSuccess = () => {
    message.success("Register successful");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    dispatch(loadingOnAction());
    userServ
      .userRegister(values)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center container">
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
        {/* <Form.Item
            name="maNhom"
            rules={[
              {
                required: true,
                message: "Please select group code!",
              },
            ]}
          >
            <Select placeholder="select your group code">
              <Option value="GP00">GP00</Option>
              <Option value="GP01">GP01</Option>
              <Option value="GP02">GP02</Option>
              <Option value="GP03">GP03</Option>
              <Option value="GP04">GP04</Option>
              <Option value="GP05">GP05</Option>
              <Option value="GP06">GP06</Option>
              <Option value="GP07">GP07</Option>
            </Select>
          </Form.Item> */}
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
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
