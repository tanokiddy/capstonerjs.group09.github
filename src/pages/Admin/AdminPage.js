import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import Films from "./Films";
import { movieServ } from "../../services/movieService";
import { userServ } from "../../services/userService";
import Users from "./Users";

const { Header, Content, Sider } = Layout;

export default function AdminPage() {
  const [resDataFilm, setResDataFilm] = useState([]);
  const [resDataUser, setResDataUser] = useState([]);
  const [dataFilm, setDataFilm] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const handleShowUserList = () => {
    setDataUser(resDataUser);
    if (dataFilm) {
      setDataFilm([]);
    }
  };

  const handleShowFilm = () => {
    setDataFilm(resDataFilm);
    if (dataUser) {
      setDataUser([]);
    }
  };
  //get data film from api
  useEffect(() => {
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setResDataFilm(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //get data user from api
  useEffect(() => {
    userServ
      .userList()
      .then((res) => {
        console.log(res);
        setResDataUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [collapsed, setCollapsed] = useState(false);
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
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="userList"
            onClick={handleShowUserList}
            icon={<UserOutlined />}
          >
            User
          </Menu.Item>
          <Menu.SubMenu key="films" title="Films" icon={<FileOutlined />}>
            <Menu.Item onClick={handleShowFilm}>Films</Menu.Item>
            <Menu.Item>Add new</Menu.Item>
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
              {dataFilm[0]?.maPhim ? <Films dataFilm={dataFilm} /> : <></>}
              {dataUser[0]?.taiKhoan ? <Users data={dataUser} /> : <></>}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
