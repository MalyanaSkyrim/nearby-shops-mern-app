import React, { Component } from "react";
import { Form, Icon, Input, Button, Select, DatePicker, Modal } from "antd";
import { connect } from "react-redux";
import { updateProfile } from "../../state_management/actions/accountAction";
import moment from "moment";
import "antd/dist/antd.css";
import "./editProfile.css";
import UploadCropPhoto from "../EditProfilePhoto/UploadCropPhoto";

const { Option } = Select;

class EditProfileForm extends Component {
  state = {
    globalErr: [],
    submitDisabled: true,
    visible: false,
    originalPhoto: undefined,
    croppedPhoto: undefined,
    crop: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const user = this.props.user;
      const { username, email, phoneNumber, prefix, birthday } = values;
      const formatBirthday = birthday.format("YYYY-MM-DD");
      if (!err) {
        const errors = await this.props.updateProfile({
          ...user,
          username,
          email,
          phoneNumber,
          birthday: formatBirthday,
          prefix
        });
        if (errors) {
          return this.setState({ globalErr: errors });
        }

        return this.setState({ submitDisabled: true });
      }
    });
  };

  handleChange = e => {
    const isDatePicker = new Date(e).toString() !== "Invalid Date";
    const user = this.props.user;
<<<<<<< HEAD
    user.birthday = user.birthday.substring(0, 10);
=======

    if (user.birthday) user.birthday = user.birthday.substring(0, 10);
>>>>>>> c390b41... bug fix, datepicker and update profile
    let {
      username,
      email,
      phoneNumber,
      prefix,
      birthday
    } = this.props.form.getFieldsValue();
<<<<<<< HEAD
    birthday = isDatePicker
      ? new Date(e).toISOString().substring(10)
      : new Date(birthday.format("MM-DD-YYYY")).toISOString().substring(0, 10);
=======

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
      this.setState({ submitDisabled: true });
    else this.setState({ submitDisabled: false });
  };

  handleOk = async e => {
    const { croppedPhoto, originalPhoto, crop } = this.state;
    const user = this.props.user;

    const errors = await this.props.updateProfile({
      ...user,
      photo: {
        ...user.photo,
        croppedPhoto,
        originalPhoto,
        crop
      }
    });

    if (errors) {
      return this.setState({ globalErr: errors });
    }

    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      croppedPhoto: undefined,
      crop: {}
    });
  };

  editPhoto = () => {
    this.setState({
      visible: true
    });
  };

  handleCrop = (croppedImageData, crop) => {
    this.setState({
      croppedPhoto: croppedImageData,
      crop: crop
    });
  };
  toDataURL = url =>
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

  updateOriginalImage = newOriginalPhoto => {
    this.setState({ originalPhoto: newOriginalPhoto });
  };

  componentWillMount = async () => {
    const { photo } = this.props.user;
    if (!photo) {
      return;
    }
    const originalPhoto = await this.toDataURL(photo.originalPhoto);

    console.log("RESULT:", originalPhoto);
    this.setState({ originalPhoto });
  };

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
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
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
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
              <Form.Item label="birthday">
                {getFieldDecorator("birthday", config)(
                  <DatePicker onChange={this.handleChange} />
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
          <div className="edit-profile-img">
            <img
              className="profile-img"
              src={
                croppedPhoto ||
                (photo ? photo.croppedPhoto : undefined) ||
                "/defaultAvatar.jpeg"
              }
            />
            <span className="edit-img" onClick={this.editPhoto}>
              {" "}
              Edit Profile Photo
            </span>
          </div>
        </div>

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

const EditProfile = Form.create({ name: "normal_login" })(EditProfileForm);

const mapStateToProps = state => ({
  user: state.account.user
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(EditProfile);
