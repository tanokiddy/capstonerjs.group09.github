import { Button, Form, InputNumber, Select } from "antd";
import {
  FileOutlined,
  VideoCameraAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Space, DatePicker } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { movieServ } from "../../../services/movieService";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import Swal from "sweetalert2";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

export default function AddShowTimes() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let dispatch = useDispatch();
  let { id } = useParams();
  const [theatreSystem, setTheatreSystem] = useState([]);
  const [theatre, setTheatre] = useState();

  useEffect(() => {
    movieServ
      .getTheatreSystem()
      .then((res) => {
        console.log(res);
        setTheatreSystem(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //SETUP FORMIK TO FORM
  //-Set Form
  const [form] = Form.useForm();
  //-Set FieldValue for Datepicker
  const handleChangeDatepicker = (value) => {
    let ngayChieuGioChieu = moment(value).format("DD/MM/YYYY HH:mm:ss");
    formik.setFieldValue("ngayChieuGioChieu", ngayChieuGioChieu);
  };
  //-Set FieldValue for Inputnumber
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //-Set FieldValue for Select
  const handleOnchangeTheatreSystem = (value) => {
    movieServ
      .getTheatre(value)
      .then((res) => {
        console.log(res);
        setTheatre(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnchangeTheatre = (value) => {
    formik.setFieldValue("maRap", value);
  };
  //-Set up Formik and submit
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: parseInt(id),
      maRap: "",
      ngayChieuGioChieu: "",
      giaVe: 0,
    },
    onSubmit: (values) => {
      dispatch(loadingOnAction());
      movieServ
        .addShowtimes(values)
        .then((res) => {
          console.log(res);
          dispatch(loadingOffAction());
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Add Showtimes Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch(loadingOffAction());
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.content,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  });

  //DECLARE FUNCTION TO RENDER TO LAYOUT
  const renderTheatreSystem = () => {
    return theatreSystem.map((theatre, index) => {
      return (
        <Option
          key={index}
          placeholder={theatre.tenHeThongRap}
          value={theatre.maHeThongRap}
        >
          {theatre.tenHeThongRap}
        </Option>
      );
    });
  };
  const renderTheatre = () => {
    return theatre?.map((theatre, index) => {
      return (
        <Option
          key={index}
          placeholder={theatre?.tenCumRap}
          value={theatre?.maCumRap}
        >
          {theatre?.tenCumRap}
        </Option>
      );
    });
  };

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
              <NavLink to="/admin/films/">Add New</NavLink>
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
            <NavLink to="/admin/films/filmManagement">Film Management</NavLink>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div>
              <div className="text-2xl bold mb-4">Add Showtimes</div>
              <Space
                style={{
                  marginBottom: 16,
                }}
              ></Space>

              <Form
                className="sm:w-3/4 w-2/3"
                {...formItemLayout}
                form={form}
                name=""
                onSubmitCapture={formik.handleSubmit}
                labelAlign="left"
              >
                <Form.Item
                  label="Film code:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your film name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <InputNumber
                    disabled
                    onChange={handleChangeInputNumber("maPhim")}
                    prefix={
                      <VideoCameraAddOutlined className="site-form-item-icon" />
                    }
                    value={parseInt(id)}
                  />
                </Form.Item>
                <Form.Item
                  label="Theatre system:"
                  rules={[
                    {
                      required: false,
                      message: "Please select theatre system!",
                    },
                  ]}
                  className="text-left"
                >
                  <Select
                    onChange={handleOnchangeTheatreSystem}
                    placeholder="Select theatre system"
                  >
                    {renderTheatreSystem()}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Theatre:"
                  rules={[
                    {
                      required: false,
                      message: "Please select theatre!",
                    },
                  ]}
                  className="text-left"
                >
                  <Select
                    onChange={handleOnchangeTheatre}
                    placeholder="Select theatre system"
                  >
                    {renderTheatre()}
                  </Select>
                </Form.Item>
                <Form.Item name="ngayChieuGioChieu" label="Showtimes:">
                  <DatePicker
                    showTime
                    format={"DD/MM/YYYY HH:mm:ss"}
                    onChange={handleChangeDatepicker}
                  />
                </Form.Item>
                <Form.Item
                  label="Ticket price:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your ticket price!",
                      whitespace: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="!w-[200px]"
                    // min={75000}
                    // max={200000}
                    onChange={handleChangeInputNumber("giaVe")}
                    prefix={
                      <VideoCameraAddOutlined className="site-form-item-icon" />
                    }
                    placeholder="Ticket price"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    className=""
                    type="primary"
                    htmlType="submit"
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
