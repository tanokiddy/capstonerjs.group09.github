import {
  Space,
  Table,
  Tag,
  Input,
  Breadcrumb,
  Layout,
  Menu,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  userDeleteAdmin,
  userEditingAction,
  userSearchAction,
} from "../../../redux/actions/userAction";
import UserEditing from "./EditUser";

const { Search } = Input;
const { Header, Content, Sider } = Layout;

export default function SearchingUser() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(userSearchAction(id));
  }, [id]);

  let userSearching = useSelector((state) => state.userReducer.userSearching);
  //-Setup search in put
  const onSearch = (value) => {
    navigate(`/admin/userManagement/search/${value}`);
  };
  //-Set up pagination
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  //SET UP FORM COLUMNS
  //-Declare handle function in COLUMNS
  const handleUserDelete = (taiKhoan) => {
    dispatch(userDeleteAdmin(taiKhoan));
  };
  //-Set up userEditing in COLUMNS
  const [modal2Open, setModal2Open] = useState(false);
  const handleUserEditing = (taiKhoan) => {
    setModal2Open(true);
    let index = userSearching.findIndex((item) => {
      return item.taiKhoan === taiKhoan;
    });
    dispatch(userEditingAction(userSearching[index]));
  };
  //-COLUMNS
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
            <BiEdit
              onClick={() => {
                handleUserEditing(taiKhoan);
              }}
              style={{ width: "20px", height: "20px" }}
            />
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
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
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
            <Menu.Item key="addFilm">
              <NavLink to="/admin/films/addNewFilm">Add New</NavLink>
            </Menu.Item>
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
              <div className="text-2xl bold">Searching User</div>
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
                dataSource={userSearching}
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
                <UserEditing setModal2Open={setModal2Open} />
              </Modal>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
