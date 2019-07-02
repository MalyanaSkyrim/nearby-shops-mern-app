import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import './signup.css';
import 'antd/dist/antd.css';
import { signup } from '../../state_management/actions/accountAction';
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    globalErr: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const errors = await this.props.signup(values);
        const globalErr = errors
          ? errors.filter(err => err.param == undefined)
          : [];
        this.setState({ globalErr });

        setTimeout(() => {
          this.setState({ globalErr: [] });
        }, 3000);

        if (errors && errors.length !== 0) {
          this.props.form.setFields({
            email: {
              value: values.email,
              errors: errors
                .filter(error => error.param === 'email')
                .map((err, index, array) => {
                  if (index === array.length - 1 && array.length > 1)
                    return new Error(', ' + err.msg);
                  else return new Error(err.msg);
                })
            },
            username: {
              value: values.username,
              errors: errors
                .filter(error => error.param === 'username')
                .map((err, index, array) => {
                  if (index === array.length - 1 && array.length > 1)
                    return new Error(', ' + err.msg);
                  else return new Error(err.msg);
                })
            },
            password: {
              value: values.password,
              errors: errors
                .filter(error => error.param === 'password')
                .map((err, index, array) => {
                  if (index === array.length - 1 && array.length > 1)
                    return new Error(', ' + err.msg);
                  else return new Error(err.msg);
                })
            },
            confirmPassword: {
              value: values.confirmPassword,
              errors: errors
                .filter(error => error.param === 'confirmPassword')
                .map((err, index, array) => {
                  if (index === array.length - 1 && array.length > 1)
                    return new Error(', ' + err.msg);
                  else return new Error(err.msg);
                })
            }
          });
          return;
        }

        this.props.history.push('/signin');
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const { globalErr } = this.state;
    return (
      <div className='container__login-form'>
        <Form
          labelAlign='left'
          className='signup-form'
          {...formItemLayout}
          onSubmit={this.handleSubmit}
        >
          <h1 className='title_form'>Sign up</h1>
          {globalErr.length !== 0 ? (
            <p className='msg-err-global'> {globalErr[0].msg} </p>
          ) : (
            <></>
          )}
          <Form.Item className='form-label' label='E-mail'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item className='form-label' label='Password' hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item
            className='form-label'
            label='Confirm Password'
            hasFeedback
          >
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please confirmPassword your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            className='form-label'
            label={
              <span>
                Username&nbsp;
                <Tooltip title='What do you want others to call you?'>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item className='form-label' {...tailFormItemLayout}>
            <Button
              type='primary'
              className='login-form-button'
              htmlType='submit'
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Signup = Form.create({ name: 'register' })(RegistrationForm);

export default connect(
  null,
  { signup }
)(Signup);
