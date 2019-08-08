import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Select, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../state_management/actions/accountAction";
import moment from "moment";
import "antd/dist/antd.css";
import "./editProfile.css";
import UploadCropPhoto from "../EditProfilePhoto/UploadCropPhoto";

const { Option } = Select;

const EditProfileForm = props => {
  const dispatch = useDispatch();
  const updateUser = data => dispatch(updateProfile(data));
  const user = useSelector(state => state.account.user);

  const [globalErr, setGlobalErr] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [originalPhoto, setOriginalPhoto] = useState(undefined);
  const [croppedPhoto, setCroppedPhoto] = useState(undefined);
  const [crop, setCrop] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      const { username, email, phoneNumber, prefix, birthday } = values;
      const formatBirthday = birthday.format("YYYY-MM-DD");
      if (!err) {
        const errors = await updateUser({
          ...user,
          username,
          email,
          phoneNumber,
          birthday: formatBirthday,
          prefix
        });
        if (errors) {
          return setGlobalErr(errors);
        }

        return setSubmitDisabled(true);
      }
    });
  };

  const handleChange = e => {
    const isDatePicker = new Date(e).toString() !== "Invalid Date";
<<<<<<< HEAD
    const user = this.props.user;
<<<<<<< HEAD
    user.birthday = user.birthday.substring(0, 10);
=======
=======
>>>>>>> 8f19607... replace App and Account components by functional

    if (user.birthday) user.birthday = user.birthday.substring(0, 10);
>>>>>>> c390b41... bug fix, datepicker and update profile
    let {
      username,
      email,
      phoneNumber,
      prefix,
      birthday
<<<<<<< HEAD
    } = this.props.form.getFieldsValue();
<<<<<<< HEAD
    birthday = isDatePicker
      ? new Date(e).toISOString().substring(10)
      : new Date(birthday.format("MM-DD-YYYY")).toISOString().substring(0, 10);
=======
=======
    } = props.form.getFieldsValue();
>>>>>>> 8f19607... replace App and Account components by functional

<<<<<<< HEAD
    if (birthday != null)
      birthday = isDatePicker
        ? new Date(e)
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-")
            .substring(0, 10)
        : new Date(birthday.format("MM-DD-YYYY"))
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-")
            .substring(0, 10);
>>>>>>> 8fc1b84... fix date format

=======
    if (isDatePicker) birthday = e;
    console.log({ e });
>>>>>>> c390b41... bug fix, datepicker and update profile
    const updatedUser = {
      ...user,
      username,
      email,
      phoneNumber,
      prefix,
      birthday: birthday ? birthday.format("YYYY-MM-DD") : ""
    };
    console.log({ updated: updatedUser.birthday, origin: user.birthday });
    if (JSON.stringify(updatedUser) === JSON.stringify(user))
      setSubmitDisabled(true);
    else setSubmitDisabled(false);
  };

  const handleOk = async e => {
    const errors = await updateUser({
      ...user,
      photo: {
        ...user.photo,
        croppedPhoto,
        originalPhoto,
        crop
      }
    });

    if (errors) {
      return setGlobalErr(errors);
    }

    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
    setCroppedPhoto(undefined);
    setCrop({});
  };

  const editPhoto = () => {
    setVisible(true);
  };

  const handleCrop = (croppedImageData, crop) => {
    setCroppedPhoto(croppedImageData);
    setCrop(crop);
  };
  const toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  const updateOriginalImage = newOriginalPhoto => {
    setOriginalPhoto(newOriginalPhoto);
  };

  useEffect(async () => {
    const { photo } = user;
    if (!photo) {
      return;
    }
    const originalPhoto = await toDataURL(photo.originalPhoto);

    console.log("RESULT:", originalPhoto);
    setOriginalPhoto(originalPhoto);
  }, []);

<<<<<<< HEAD
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      globalErr,
      submitDisabled,
      croppedPhoto,
      originalPhoto
    } = this.state;
    const { username, phoneNumber, email, birthday, photo } = this.props.user;
    console.log(birthday);
    const config = {
<<<<<<< HEAD
      initialValue: birthday ? moment(new Date(birthday), "MM-DD-YYYY") : null,
=======
      initialValue: birthday ? moment(birthday, "YYYY-MM-DD") : null,
>>>>>>> c390b41... bug fix, datepicker and update profile
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
=======
  const { getFieldDecorator } = props.form;
  const { username, phoneNumber, email, birthday, photo } = user;
  console.log(birthday);
  const config = {
    initialValue: birthday ? moment(birthday, "YYYY-MM-DD") : null,
    rules: [{ type: "object", required: true, message: "Please select time!" }]
  };
>>>>>>> 8f19607... replace App and Account components by functional

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "212"
  })(
    <Select style={{ width: 80 }}>
      <Option value="212">+212</Option>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );
  return (
    <>
      <h2 className="title-edit-profile">Edit your profile</h2>
      <div className="edit-profile-content">
        <div className="form-container">
          <Form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="edit-profile-form"
          >
            {globalErr.length !== 0 ? (
              <p className="msg-err-global"> {globalErr[0].msg} </p>
            ) : (
              <></>
            )}
            <Form.Item className="form-label" label="Username" key="username">
              {getFieldDecorator("username", {
                initialValue: username,
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item className="form-label" label="E-mail">
              {getFieldDecorator("email", {
                initialValue: email,
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Phone Number">
              {getFieldDecorator("phoneNumber", {
                initialValue: phoneNumber,
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </Form.Item>
            <Form.Item label="birthday">
              {getFieldDecorator("birthday", config)(
                <DatePicker onChange={handleChange} />
              )}
            </Form.Item>

            <Form.Item className="form-label">
              <Button
                type="primary"
                className="login-form-button"
                htmlType="submit"
                disabled={submitDisabled}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
<<<<<<< HEAD

        <Modal
          className="edit-photo-modal"
          title="Edit Profile Photo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Save"
          width="800px"
        >
          <UploadCropPhoto
            photo={{ originalPhoto, crop: photo ? photo.crop : {} }}
            handleCrop={this.handleCrop}
            updateOriginalImage={this.updateOriginalImage}
          />
        </Modal>%
      </>
    );
  }
}
=======
        <div className="edit-profile-img">
          <img
            className="profile-img"
            src={
              croppedPhoto ||
              (photo ? photo.croppedPhoto : undefined) ||
              "/defaultAvatar.jpeg"
            }
          />
          <span className="edit-img" onClick={editPhoto}>
            {" "}
            Edit Profile Photo
          </span>
        </div>
      </div>
      <Modal
        className="edit-photo-modal"
        title="Edit Profile Photo"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        width="800px"
      >
        <UploadCropPhoto
          photo={{ originalPhoto, crop: photo ? photo.crop : {} }}
          handleCrop={handleCrop}
          updateOriginalImage={updateOriginalImage}
        />
      </Modal>
      %
    </>
  );
};
>>>>>>> 8f19607... replace App and Account components by functional

const EditProfile = Form.create({ name: "normal_login" })(EditProfileForm);

export default EditProfile;
