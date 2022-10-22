import { Space, Table } from "antd";
import { Input } from "antd";
import React, { useState } from "react";

const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function Films({ dataFilm }) {
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (t, r) => <img alt="" src={`${r.hinhAnh}`} />,
      key: "Hình ảnh",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "Mô tả",
    },
    {
      title: "Hành động",
      dataIndex: "",
      render: () => {
        return (
          <div>
            <button className="mr-2 ">Edit</button>
            <button>Delete</button>
          </div>
        );
      },
      key: "Hành động",
    },
  ];
  return (
    <div>
      {" "}
      <div className="text-2xl bold">Quản lý phim</div>
      <button className="border text-blue-500 border-blue-500 p-1 my-1">
        Thêm phim
      </button>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        className="my-2"
      />
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Table columns={columns} dataSource={dataFilm} onChange={handleChange} />
    </div>
  );
}
