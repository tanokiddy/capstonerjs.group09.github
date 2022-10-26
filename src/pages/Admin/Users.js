import { Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Input } from "antd";
import { userServ } from "../../services/userService";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
const { Search } = Input;
const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: "Username",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
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
    dataIndex: "taiKhoan",
    key: "action",
    render: (taiKhoan) => (
      <Space size="middle">
        <button>
          <BiEdit style={{ width: "20px", height: "20px" }} />
        </button>
        <button
          onClick={() => {
            handleUserDelete(taiKhoan);
          }}
        >
          <MdDelete style={{ width: "25px", height: "25px" }} />
        </button>
      </Space>
    ),
  },
];
const handleUserDelete = (taiKhoan) => {
  userServ
    .userDelete(taiKhoan)
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

export default function Users() {
  const [dataUser, setDataUser] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const onSearch = (value) => {
    navigate(`/admin/userManagement/search/${value}`);
  };

  useEffect(() => {
    dispatch(loadingOnAction());
    userServ
      .userList()
      .then((res) => {
        console.log(res);
        setDataUser(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Menu theme="dark" defaultSelectedKeys="userList" mode="inline">
          <Menu.Item key="userList" icon={<UserOutlined />}>
            <NavLink to="/admin/userManagement">User</NavLink>
          </Menu.Item>
          <Menu.SubMenu key="films" title="Films" icon={<FileOutlined />}>
            <Menu.Item key="filmsItem">
              <NavLink to="/admin/films/filmManagement">
                Film Management
              </NavLink>
            </Menu.Item>
            <Menu.Item key="addFilm">Add New</Menu.Item>
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
            <Breadcrumb.Item>
              <NavLink to="/admin/userManagement">User Management</NavLink>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div>
              <div className="text-2xl bold">Quản lý người dùng</div>
              <NavLink to="/admin/userManagement/addUser">
                <button className="border text-white font-bold bg-blue-500 rounded p-2 my-1">
                  + Thêm người dùng
                </button>
              </NavLink>
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                className="my-2"
              />
              <Table
                rowKey="taiKhoan"
                columns={columns}
                dataSource={dataUser}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
