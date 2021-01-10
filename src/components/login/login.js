import React,{useState} from "react";
import {Form,Button} from "antd";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import {Input, Checkbox,Spin } from 'antd';

const Login=(props)=> {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 14,
    },
    
  };
  const checkLayout = {
    wrapperCol: {
      offset: 6,
      span: 14,
    },
    
  };
  
  

  const onFinish = (values) => {
    setLoading(true);

    axios.post( "http://playwinbackend.herokuapp.com/login", {
        email:values.email,
        password:values.password
    }).then(result=>{
    if(result){
        if(result.data.token){
          localStorage.setItem('accessToken',result.data.token);
            setLoading(false);
          props.history.push('/number');

        
        }else{
          setLoading(false);
          alert("Wrong credentials");
        }
    }else{
      alert("Some internal Error occured")
    }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    const [isLoading,setLoading]=useState(false);
  
    return (
      <div className='container'>
        <div className='MainCont'> 

        <h1 className='title'> Admin Login</h1>
        <hr/>

      {
        !isLoading?
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
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input  />
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
          <Input.Password   />
        </Form.Item>
  
        <Form.Item {...checkLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>:<div className='text-center'> <Spin size="large" className='mtt-20'/> </div>
        }
        </div>
        </div>
    );
  
}

export default withRouter(Login);