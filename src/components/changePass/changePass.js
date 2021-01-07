import React from "react";
import {Form,Button} from "antd";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import {Input, Checkbox } from 'antd';

const ChangePass=(props)=> {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  

  const onFinish = (values) => {
    console.log('Success:', values);
        if(values.password==values.confirm){
            axios.post( "http://localhost:4001/update", {
                email:'admin',
                old:values.old,
                password:values.password,
                confirm:values.confirm
            }).then(result=>{
            if(result){
               if(result.data.success){
                   alert("Password Updated");
               }else{
                   alert("Old password does not match with old password");
               }
                }else{
              alert("Some internal Error occured")
            }
            })
        }else{
            alert("Password and Confirm Password does not match");
            return
        }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  
    return (
      <Form
      style={{marginTop:"40px"}}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Old Password"
          name="old"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input.Password style={{width:"40%"}} />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password  style={{width:"40%"}} />
        </Form.Item>
  
        <Form.Item
          label="Confirm Password"
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password  style={{width:"40%"}} />
        </Form.Item>
  
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Change
          </Button>
        </Form.Item>
      </Form>
    );
  
}

export default withRouter(ChangePass);