import React from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../../redux/actions/userAction";

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

export default function UserEditing({ setModal2Open }) {
  let dispatch = useDispatch();
  let userEdit = useSelector((state) => state.userReducer.userAdmin);
  //SET UP FORM AND SUBMIT FORM
  const [form] = Form.useForm();
  form.setFieldsValue({
    taiKhoan: userEdit.taiKhoan,
    matKhau: userEdit.matKhau,
    email: userEdit.email,
    soDT: userEdit.soDT,
    hoTen: userEdit.hoTen,
    maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
    maNhom: "GP00",
  });
  //-Setup submit form

  const onFinish = async (values) => {
    await dispatch(userUpdate(values));
    setModal2Open(false);
  };

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
