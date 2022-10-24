import {
  Button,
  Form,
  Input,
  // message,
  Select,
} from "antd";
import { userServ } from "../../services/userService";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";

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
  let onFail = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Update Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  let onSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update Profile Successful",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    userServ
      .getUserProfile()
      .then((res) => {
        console.log(res);
        setUserProfile(res.data.content);
        form.setFieldsValue({
          matKhau: res.data.content.matKhau,
          email: res.data.content.email,
          soDT: res.data.content.soDT,
          hoTen: res.data.content.hoTen,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onFinish = (values) => {
    values = {
      ...values,
      taiKhoan: userProfile.taiKhoan,
      maNhom: userProfile.maNhom,
      maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
    };
    console.log("values: ", values);
    dispatch(loadingOnAction());
    userServ
      .updateUserProfile(values)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingOffAction());
        onFail();
      });
  };
  return (
    <div className="pt-40 container flex justify-center">
      <Form
        className="gap-3 w-1/2 grid grid-cols-2 text-right"
        {...formItemLayout}
        form={form}
        name=""
        onFinish={onFinish}
        scrollToFirstError
      >
        {/* <Form.Item
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
            placeholder="Username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            disabled
          />
        </Form.Item> */}
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
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
