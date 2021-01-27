import React from "react";

import { DatePicker } from 'antd';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';



const WinnerNumber=(props)=> {
  console.log("Props",props);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  
  const onFinish = async (values) => {
    console.log('Success:', values);
    let date=values.date._d.toString().split('T ');

    console.log("Spak khwi",date);
    let newDate=date[0].split(':');
    let thirdDate=newDate[0].substring(0, newDate[0].length - 2);
    // thirdDate=thirdDate.replace(/\s/g, '')
    values.date._d=thirdDate;
    values.newDate=thirdDate.replace(/\s/g,'');

    console.log("here is 1",values.number);
    console.log("here is 2",values.date._d);
    console.log("here is 3",values.newDate);
    await axios.post( "http://playwinbackend.herokuapp.com/winner", {
        number:values.number,
        date:values.date._d,
        newDate:values.newDate 
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
    {...layout}
    style={{marginTop:"40px"}}
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

        <Button type="primary" htmlType="submit" className='DefBtn'>
          Submit
        </Button>
  
        <Button onClick={onLogoutClick}  type='primary'  className='DefBtn'>Logout</Button>
        </Form.Item>

    </Form>
     
    </div>
    </div>
  )

    }
    export default withRouter(WinnerNumber);
