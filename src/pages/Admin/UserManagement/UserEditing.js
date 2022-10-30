import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import { userServ } from "../../../services/userService";

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
export default function UserEditing({ userEditing, setModal2Open }) {
  //SET FORM
  const [form] = Form.useForm();
  form.setFieldsValue({
    taiKhoan: userEditing.taiKhoan,
    matKhau: userEditing.matKhau,
    email: userEditing.email,
    soDT: userEditing.soDT,
    hoTen: userEditing.hoTen,
    maLoaiNguoiDung: userEditing.maLoaiNguoiDung,
    maNhom: "GP03",
  });
  //SET HANDLE SUBMIT
  const onFinish = (values) => {
    console.log(values);
    userServ
      .userEditinginAdmin(values)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          setModal2Open(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        let errMessage = err.response.data.content;
        Swal.fire({
          position: "center",
          icon: "error",
          title: errMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  //CALL API TO GET USERLIST
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    userServ
      .userList()
      .then((res) => {
        console.log(res);
        setDataUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEditing]);
  return (
    <Form
      className="w-full text-right"
      {...formItemLayout}
      form={form}
      name="updateUser"
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
          disabled
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
        name="maNhom"
        rules={[
          {
            required: true,
            message: "Please select group code!",
          },
        ]}
        className="text-left"
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
      <Form.Item
        name="maLoaiNguoiDung"
        rules={[
          {
            required: true,
            message: "Please select group code!",
          },
        ]}
        className="text-left"
      >
        <Select placeholder="select your group code">
          <Option value="QuanTri">Quản trị</Option>
          <Option value="KhachHang">Khách hàng</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          className="w-full "
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
