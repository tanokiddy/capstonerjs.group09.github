import React, { useState, useEffect } from "react";
import { Space, Table, Tooltip, Modal } from "antd";
import { BiEdit, BiAlarm } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { movieServ } from "../../../services/movieService";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import FilmEditing from "./FilmEditing";
const { Header, Content, Sider } = Layout;

export default function ListFilmAdmin() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [dataFilm, setDataFilm] = useState([]);

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

  //DECLARE HANDLE FUNCTION
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: err.response.data.content,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleAddShowTimes = (maPhim) => {
    navigate(`/admin/films/filmManagement/addShowTimes/${maPhim}`);
  };

  //SET UP MODAL
  const [modal2Open, setModal2Open] = useState(false);
  const [filmEditing, setFilmEditing] = useState({});
  const handleFilmEditing = (id) => {
    setModal2Open(true);
    let index = dataFilm.findIndex((item) => {
      return item.maPhim === id;
    });
    setFilmEditing(dataFilm[index]);
  };

  //SET UP FORM COLUMNS
  //-Set up pagination
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  //-COLUMNS
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      className: "sm:w-[110px] w-[62px] sm:text-base text-[9px]",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (t, r) => <img alt="" src={`${r.hinhAnh}`} />,
      key: "hinhAnh",
      align: "center",
      className: "sm:table-cell hidden",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      align: "center",
      className: "sm:w-2/12 w-[80px] sm:text-base text-[9px]",
    },

    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      align: "justify",
      ellipsis: {
        showTitle: false,
      },
      className: "w-4/12 sm:text-base text-[9px] ",
      render: (moTa) => (
        <Tooltip placement="topLeft" title={moTa}>
          {moTa}
        </Tooltip>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (maPhim) => {
        return (
          <div className="text-center flex justify-center ">
            <button className="">
              <BiEdit
                onClick={() => {
                  handleFilmEditing(maPhim);
                }}
                className="sm:w-[25px] sm:h-[25px] w-[10px] h-[10px]"
              />
            </button>
            <button className="sm:mx-1 mx-2">
              <BiAlarm
                onClick={() => {
                  handleAddShowTimes(maPhim);
                }}
                className="sm:w-[25px] sm:h-[25px] w-[10px] h-[10px]"
              />
            </button>
            <button>
              <MdDelete
                onClick={() => {
                  handleDeleteMovie(maPhim);
                }}
                className="sm:w-[25px] sm:h-[25px] w-[10px] h-[10px]"
              />
            </button>
          </div>
        );
      },
      key: "hanhDong",
      align: "center",
      className: "sm:w-2/12 w-[60px] sm:text-base text-[9px]",
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
          ></Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div>
              <div className="text-2xl bold mb-4">Film Management</div>
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
              <Modal
                title="Film Editing"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null}
              >
                <FilmEditing
                  filmEditing={filmEditing}
                  setModal2Open={setModal2Open}
                />
              </Modal>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
