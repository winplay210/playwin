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
          span: 10,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 11,
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
  <div className='container'>
  <div className='MainCont'> 

  <h1 className='title'> Winner Number</h1>
  <hr/>
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
        label="Number"
        name="number"
        rules={[
          {
            required: true,
            message: 'Please input number!',
          },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <DatePicker style={{width:"100%"}}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={onLogoutClick} className='mll-20'  type='primary'>Logout</Button>
      </Form.Item>

    </Form>
    </div>
    </div>
  )

    }
    export default withRouter(WinnerNumber);
