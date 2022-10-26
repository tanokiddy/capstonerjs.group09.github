import { Space, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { movieServ } from "../../services/movieService";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import Swal from "sweetalert2";
const { Header, Content, Sider } = Layout;

export default function Films() {
  const [collapsed, setCollapsed] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };
  const [dataFilm, setDataFilm] = useState([]);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setDataFilm(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteMovie = (movieId) => {
    movieServ
      .deleteMovie(movieId)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
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
      key: "hinhAnh",
      align: "center",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },

    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (maPhim) => {
        return (
          <div className="text-center">
            <button className="mr-3">
              <BiEdit style={{ width: "25px", height: "25px" }} />
            </button>
            <button>
              <MdDelete
                onClick={() => {
                  handleDeleteMovie(maPhim);
                }}
                style={{ width: "25px", height: "25px" }}
              />
            </button>
          </div>
        );
      },
      key: "hanhDong",
      align: "center",
    },
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="pt-20"
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div className="logo container my-3">
        <img
          // style={{ width: "100%", height: "100%" }}
          src="http://demo1.cybersoft.edu.vn/logo.png"
          alt="logoCybersoft"
          className="object-fit"
        />
      </div> */}
        <Menu
          theme="dark"
          defaultOpenKeys="films"
          defaultSelectedKeys="filmsItem"
          mode="inline"
        >
          <Menu.Item key="userList" icon={<UserOutlined />}>
            <NavLink to="/admin/userManagement">User</NavLink>
          </Menu.Item>
          <Menu.SubMenu key="films" title="Films" icon={<FileOutlined />}>
            <Menu.Item key="filmsItem">
              <NavLink to="/admin/films/filmManagement">
                Film Management
              </NavLink>
            </Menu.Item>
            <Menu.Item key="addFilm">Add new</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Films</Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/admin/films/filmManagement">
                Films Management
              </NavLink>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>
              <NavLink to="/admin/films/addFilm"> Add New Film</NavLink>
            </Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div>
              <div className="text-2xl bold mb-4">Quản lý phim</div>
              <Space
                style={{
                  marginBottom: 16,
                }}
              ></Space>
              <Table
                rowKey="maPhim"
                columns={columns}
                dataSource={dataFilm}
                onChange={handleChange}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
