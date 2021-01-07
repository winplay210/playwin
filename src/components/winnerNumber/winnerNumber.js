import React from "react";

import { DatePicker } from 'antd';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';



const WinnerNumber=(props)=> {
  console.log("Props",props)
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
    axios.post( "http://localhost:4001/winner", {
        number:values.number,
        date:values.date._d
    }).then(
        result=>{
            if(result.data.success){
                alert("Date inserted successfully");
            }else{
                alert("Some error occured");
            }
       
  });
}

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 const  onLogoutClick=()=>{
    localStorage.removeItem('accessToken');
    props.history.push('/');
  }
  
 return (
      <div style={{marginTop:"50px"}}>
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Number"
        name="number"
        rules={[
          {
            required: true,
            message: 'Please input number!',
          },
        ]}
      >
        <Input style={{width:"30%"}} />
      </Form.Item>

      <Form.Item
        label="date"
        name="date"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button onClick={onLogoutClick} type='primary'>Logout</Button>
      </Form.Item>
    </Form>
    </div>
  )

    }
    export default withRouter(WinnerNumber);
