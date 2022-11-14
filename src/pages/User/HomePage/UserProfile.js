import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import React, { useEffect } from "react";
import {
  getUserProfileAction,
  updateUserProfileAction,
} from "../../../redux/actions/userAction";

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

export default function UserProfile() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET USERPROFILE-DATA
  let dispatch = useDispatch();
  const [form] = Form.useForm();
  //SET UP FORM AND SUBMIT

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, []);

  let userProfile = useSelector((state) => state.userReducer.userProfile);

  form.setFieldsValue({
    matKhau: userProfile.matKhau,
    email: userProfile.email,
    soDT: userProfile.soDT,
    hoTen: userProfile.hoTen,
  });

  const onFinish = (values) => {
    values = {
      ...values,
      taiKhoan: userProfile.taiKhoan,
      maNhom: userProfile.maNhom,
      maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
    };
    dispatch(updateUserProfileAction(values));
  };

  return (
    <div className="lg:pt-28 pt-14 container flex justify-center">
      <Form
        className="lg:gap-3 lg:w-1/2 w-5/6 gap-2 grid grid-cols-2 text-right"
        {...formItemLayout}
        form={form}
        name=""
        onFinish={onFinish}
        scrollToFirstError
      >
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
          name="soDT"
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
        <Form.Item className="text-left">
          <Button className="" type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
