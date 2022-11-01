import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";
import { userServ } from "../../../services/userService";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";

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
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    dispatch(loadingOnAction());
    userServ
      .getUserProfile()
      .then((res) => {
        console.log(res);
        setUserProfile(res.data.content);
        dispatch(loadingOffAction());
        form.setFieldsValue({
          matKhau: res.data.content.matKhau,
          email: res.data.content.email,
          soDT: res.data.content.soDT,
          hoTen: res.data.content.hoTen,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingOffAction());
      });
  }, []);

  //SET UP FORM AND SUBMIT
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(loadingOnAction());
    values = {
      ...values,
      taiKhoan: userProfile.taiKhoan,
      maNhom: userProfile.maNhom,
      maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
    };
    userServ
      .updateUserProfile(values)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
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
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingOffAction());
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
