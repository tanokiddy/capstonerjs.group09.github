import { Table, Tag, Modal, Input } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { userServ } from "../../services/userService";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import UserEditing from "./UserEditing";

const { Search } = Input;
const { Header, Content, Sider } = Layout;
export default function Users() {
  const [dataUser, setDataUser] = useState([]);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  //SEARCH INPUT
  const onSearch = (value) => {
    navigate(`/admin/userManagement/search/${value}`);
  };
  //CALL API TO GET USERLIST
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
  //HANDLE MODAL USER EDITING
  const [modal2Open, setModal2Open] = useState(false);
  const [userEditing, setUserEditing] = useState({});
  const handleUserEditing = (id) => {
    setModal2Open(true);
    let index = dataUser.findIndex((item) => {
      return item.taiKhoan === id;
    });
    setUserEditing(dataUser[index]);
    console.log("userEditing: ", userEditing);
  };

  //SET DELETE USER FOR USER LIST BENEATH
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
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Cannot delete, this user booked tickets",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const [sortedInfo, setSortedInfo] = useState({});
  //SET PAGINATION OF USERLIST
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  //SET COLUMNS FOR USERLIST
  const columns = [
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortOrder: sortedInfo.columnKey === "taiKhoan" ? sortedInfo.order : null,
      className: "xl:text-base text-[9px]",
    },
    {
      title: "Full name",
      dataIndex: "hoTen",
      key: "hoTen",
      className: "xl:text-base text-[9px]",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "xl:text-base text-[9px] ",
    },

    {
      title: "Phone Number",
      dataIndex: "soDT",
      key: "soDT",
      className: "xl:text-base text-[9px] ",
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      className: "xl:text-base text-[9px] ",
      render: (maLoaiNguoiDung) => {
        var color;
        if (maLoaiNguoiDung.toUpperCase() === "QUANTRI") {
          color = "volcano";
        } else {
          color = "green";
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
      render: (taiKhoan) => {
        return (
          <div className="text-center flex justify-center ">
            <button className="sm:mr-3 mr-1">
              <BiEdit
                onClick={() => handleUserEditing(taiKhoan)}
                className="sm:w-[25px] sm:h-[25px] w-[10px] h-[10px]"
              />
            </button>
            <button>
              <MdDelete
                onClick={() => {
                  handleUserDelete(taiKhoan);
                }}
                className="sm:w-[25px] sm:h-[25px] w-[10px] h-[10px]"
              />
            </button>
          </div>
        );
      },
      key: "hanhDong",
      align: "center",
      className: "w-2/12 xl:text-base text-[9px]",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
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
          className=""
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
                className="overflow-auto"
                rowKey="taiKhoan"
                columns={columns}
                dataSource={dataUser}
                onChange={handleChange}
              />
              <Modal
                title="User Editing"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null}
              >
                <UserEditing userEditing={userEditing} />
              </Modal>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
