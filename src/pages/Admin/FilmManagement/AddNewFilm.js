import { Button, Form, Input, InputNumber, Select } from "antd";
import {
  FileOutlined,
  VideoCameraAddOutlined,
  LinkOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Space, Switch, DatePicker } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
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

export default function AddNewFilm() {
  //SET UP STATE, REACT-HOOK METHOD
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //SETUP FORMIK TO FORM
  //-Set Form
  const [form] = Form.useForm();
  //-Set FieldValue for Image
  const [imgSrc, setImgSrc] = useState("");
  console.log("imgSrc: ", imgSrc);
  const handleChangeFileUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };
  //-Set FieldValue for Datepicker
  const handleChangeDatepicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  //-Set FieldValue for Switch
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //-Set FieldValue for Inputnumber
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //-Set up Formik and submit
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP03",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(loadingOnAction());
      movieServ
        .uploadMovie(formData)
        .then((res) => {
          console.log(res);
          dispatch(loadingOffAction());
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Add New Film Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate(`/admin/films/filmManagement`);
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response.data.content);
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.content,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(loadingOffAction());
        });
    },
  });

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
          defaultSelectedKeys="addFilm"
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
              <div className="text-2xl bold mb-4">Add New Films</div>
              <Space
                style={{
                  marginBottom: 16,
                }}
              ></Space>

              <Form
                className="sm:w-1/3 w-2/3"
                {...formItemLayout}
                form={form}
                name="addNewFilm"
                onSubmitCapture={formik.handleSubmit}
                labelAlign="left"
              >
                <Form.Item
                  label="Film name:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your film name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="tenPhim"
                    onChange={formik.handleChange}
                    prefix={
                      <VideoCameraAddOutlined className="site-form-item-icon" />
                    }
                    placeholder="Film name"
                  />
                </Form.Item>
                <Form.Item
                  label="Trailer:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your trailer!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="trailer"
                    onChange={formik.handleChange}
                    prefix={<LinkOutlined className="site-form-item-icon" />}
                    placeholder="Trailer"
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="moTa"
                    onChange={formik.handleChange}
                    prefix={
                      <InfoCircleOutlined className="site-form-item-icon" />
                    }
                    placeholder="Description"
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Group code:"
                  name="maNhom"
                  rules={[
                    {
                      required: false,
                      message: "Please select group code!",
                    },
                  ]}
                  className="text-left"
                >
                  <Select placeholder="select your group code">
                    {/* <Option value="GP00">GP00</Option>
                    <Option value="GP01">GP01</Option>
                    <Option value="GP02">GP02</Option> */}
                    <Option value="GP03">GP03</Option>
                    {/* <Option value="GP04">GP04</Option>
                    <Option value="GP05">GP05</Option>
                    <Option value="GP06">GP06</Option>
                    <Option value="GP07">GP07</Option> */}
                  </Select>
                </Form.Item>
                <Form.Item name="ngayChieu" label="Release date:">
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    onChange={handleChangeDatepicker}
                  />
                </Form.Item>
                <Form.Item label="Hot:" className="text-left">
                  <Switch onChange={handleChangeSwitch("hot")} />
                </Form.Item>
                <Form.Item label="Now Showing:" className="text-left">
                  <Switch onChange={handleChangeSwitch("dangChieu")} />
                </Form.Item>
                <Form.Item label="Coming soon:" className="text-left">
                  <Switch onChange={handleChangeSwitch("sapChieu")} />
                </Form.Item>
                <Form.Item label="Rate:">
                  <InputNumber
                    onChange={handleChangeInputNumber("danhGia")}
                    min={1}
                    max={10}
                  />
                </Form.Item>
                <Form.Item name="hinhAnh" label="Poster:">
                  <Input type="file" onChange={handleChangeFileUpload} />
                  {imgSrc !== "" ? (
                    <img
                      className="mt-4 w-[150px] h-[250px]"
                      src={imgSrc}
                      alt="..."
                    />
                  ) : (
                    <img className="mt-4" src={imgSrc} alt="..." />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    className=""
                    type="primary"
                    htmlType="submit"
                  >
                    Update
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
