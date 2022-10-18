import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Input } from "antd";
import Films from "./Films";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User", "sub1", <UserOutlined />),
  getItem("Films", "9", <FileOutlined />, [
    getItem("Films", "3"),
    getItem("Add new", "4"),
  ]),
];

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo container my-3">
          <img
            // style={{ width: "100%", height: "100%" }}
            src="http://demo1.cybersoft.edu.vn/logo.png"
            alt="logoCybersoft"
            className="object-fit"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
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
            <div>
              <Films />
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
