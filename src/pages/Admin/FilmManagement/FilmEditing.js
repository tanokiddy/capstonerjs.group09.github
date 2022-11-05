import React, { useState } from "react";
import {
  VideoCameraAddOutlined,
  LinkOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Switch, DatePicker } from "antd";
import { Button, Form, Input, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { updateMovieUploadAction } from "../../../redux/actions/movieAction";

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

export default function FilmEditing({ filmEditing, setModal2Open }) {
  //SET UP REACT-HOOK METHOD
  let dispatch = useDispatch();

  //SET UP FORMIK TO FORM
  //-Set up Form
  const [form] = Form.useForm();
  //-Set fieldvalue for Image
  const [imgSrc, setImgSrc] = useState(filmEditing.hinhAnh);
  const handleChangeFileUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };
  //-Set fieldvalue for Datepicker
  const handleChangeDatepicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  //-Set fieldvalue for Switch
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //-Set fieldvalue for Inputnumber
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //-Set up Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: filmEditing?.maPhim,
      tenPhim: filmEditing?.tenPhim,
      trailer: filmEditing?.trailer,
      moTa: filmEditing?.moTa,
      ngayKhoiChieu: filmEditing?.ngayKhoiChieu,
      sapChieu: filmEditing?.sapChieu,
      dangChieu: filmEditing?.dangChieu,
      hot: filmEditing?.hot,
      danhGia: filmEditing?.danhGia,
      hinhAnh: null,
      maNhom: "GP03",
    },
    onSubmit: async (values) => {
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
      await dispatch(updateMovieUploadAction(formData));
      setModal2Open(false);
    },
  });

  return (
    <Form
      className="sm:w-5/6 w-3/4"
      {...formItemLayout}
      form={form}
      name="addNewFilm"
      onSubmitCapture={formik.handleSubmit}
      labelAlign="left"
    >
      <Form.Item
        label="Group code:"
        rules={[
          {
            required: true,
            message: "Please input your film name!",
            whitespace: true,
          },
        ]}
      >
        <Input
          disabled
          name="maNhom"
          onChange={formik.handleChange}
          prefix={<VideoCameraAddOutlined className="site-form-item-icon" />}
          placeholder="GP03"
        />
      </Form.Item>
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
          prefix={<VideoCameraAddOutlined className="site-form-item-icon" />}
          placeholder="Film name"
          value={formik.values.tenPhim}
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
          value={formik.values.trailer}
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
          prefix={<InfoCircleOutlined className="site-form-item-icon" />}
          placeholder="Description"
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item name="ngayKhoiChieu" label="Release date:">
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatepicker}
          defaultValue={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item label="Hot:" className="text-left">
        <Switch
          checked={formik.values.hot}
          onChange={handleChangeSwitch("hot")}
        />
      </Form.Item>
      <Form.Item label="Now Showing:" className="text-left">
        <Switch
          checked={formik.values.dangChieu}
          onChange={handleChangeSwitch("dangChieu")}
        />
      </Form.Item>
      <Form.Item label="Coming soon:" className="text-left">
        <Switch
          checked={formik.values.sapChieu}
          onChange={handleChangeSwitch("sapChieu")}
        />
      </Form.Item>
      <Form.Item label="Rate:">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item name="hinhAnh" label="Poster:">
        <Input type="file" onChange={handleChangeFileUpload} />
        <img className="mt-4 w-[150px] h-[250px]" src={imgSrc} alt="..." />
      </Form.Item>
      <Form.Item>
        <Button size="large" className="" type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
