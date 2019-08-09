import { Form, Icon, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { signin } from "../../state_management/actions/accountAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import "./signin.css";
import "antd/dist/antd.css";

const NormalLoginForm = props => {
  const [globalErr, setGlobalErr] = useState([]);
  const dispatch = useDispatch();

  const signIn = data => dispatch(signin(data));
  console.log(props.location);
  const handleSubmit = e => {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (!err) {
        const errors = await signIn(values);

        const globalErr = errors
          ? errors.filter(err => err.param == undefined)
          : [];
        setGlobalErr(globalErr);

        setTimeout(() => {
          setGlobalErr([]);
        }, 3000);
        if (errors && errors.length !== 0) {
          props.form.setFields({
            username: {
              value: values.username,
              errors: errors
                .filter(error => error.param === "username")
                .map(err => new Error(err.msg))
            },
            password: {
              value: values.password,
              errors: errors
                .filter(error => error.param === "password")
                .map((err, index, array) => {
                  if (index === array.length - 1 && array.length > 1)
                    return new Error(", " + err.msg);
                  else return new Error(err.msg);
                })
            }
          });
          return;
        }
        if (props.location.lastPath) {
          props.history.push(props.location.lastPath);
        } else {
          props.history.push("/");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="container__login-form">
      <Form onSubmit={handleSubmit} className="login-form">
        <h1 className="title_form">Sign in</h1>
        {globalErr.length !== 0 ? (
          <p className="msg-err-global"> {globalErr[0].msg} </p>
        ) : (
          <></>
        )}
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to="/forgotpassword" className="login-form-forgot" href="">
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const Signin = Form.create({ name: "normal_login" })(NormalLoginForm);

export default withRouter(Signin);
