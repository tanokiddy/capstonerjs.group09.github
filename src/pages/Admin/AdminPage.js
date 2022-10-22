import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export default function AdminPage() {
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
          ></Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
}
