import { Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import { movieServ } from "../../services/movieService";

export default function Films() {
  const [dataFilm, setDataFilm] = useState([]);
  useEffect(() => {
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setDataFilm(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Table columns={columns} dataSource={dataFilm} onChange={handleChange} />
    </div>
  );
}
