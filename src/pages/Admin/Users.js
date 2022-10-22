import { Space, Table, Tag } from "antd";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Input } from "antd";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const columns = [
  {
    title: "Username",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Fullname",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "soDT",
    key: "soDT",
  },
  {
    title: "User Type",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
    render: (maLoaiNguoiDung) => {
      let color;
      if (maLoaiNguoiDung.toUpperCase() === "KHACHHANG") {
        color = "green";
      }
      if (maLoaiNguoiDung.toUpperCase() === "QUANTRI") {
        color = "volcano";
      }
      return (
        <Tag color={color} key={maLoaiNguoiDung}>
          {maLoaiNguoiDung.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <button>
          <BiEdit style={{ width: "20px", height: "20px" }} />
        </button>
        <button>
          <MdDelete style={{ width: "25px", height: "25px" }} />
        </button>
      </Space>
    ),
  },
];

export default function Users({ data }) {
  return (
    <div>
      <div className="text-2xl bold">Quản lý người dùng</div>
      <button className="border text-blue-500 border-blue-500 p-1 my-1">
        Thêm người dùng
      </button>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        className="my-2"
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
