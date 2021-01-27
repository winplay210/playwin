import React, { useState,useEffect } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Calendar, Alert,Button} from 'antd';
import moment from 'moment';
import style from './assets/css/home.module.css';
import mainImg from './assets/img/lucky.gif';



const Home=()=>{

    let history = useHistory();     
    let [number,setNumber]=useState(0),
    [date,setDate]=useState(''),

     [value,selectedValue]=useState(moment);
  let [dateVal,setDateVal]=useState('');
    const onSelect =(value) => {
        
        let date=new Date(value.format("DD MMM YYYY"));
        let newDate=date.toString().split(':');
        let thirdDate=newDate[0].substring(0, newDate[0].length - 2);
        selectedValue(value);
        setDateVal(thirdDate);
      };
    
      const onPanelChange = (moment) => {
        selectedValue(moment)
      };
      
      const onBtnClick=(moment)=>{
        console.log("moment",moment);
       let val= dateVal.replace(/\s/g,'');
        history.push(({pathname:"/winner",state:val}));
      }
  
    useEffect(()=>{
        axios.get('http://playwinbackend.herokuapp.com/history/'+0).then(result=>{
                if(result){
                    setNumber(result.data.data[0].number);
                    // var a = new Date(result.data.data[0].creation_date * 1000);
                    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    // var year = a.getFullYear();
                    // var month = months[a.getMonth()];
                    // var date = a.getDate();
                    // var hour = a.getHours();
                    // var min = a.getMinutes();
                    // var sec = a.getSeconds();
                    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                   
                    setDate(result.data.data[0].date);
                }
        })
    },[])


   

    return(
       
        <div className='container'>
              <div className={style.MainCont}>
        <h1 className={style.title}>Lucky Draw 3</h1>
        <hr/>

      <div className='row'>
       <div className={`col-md-8 ${style.brRight}`}>
       <div className={style.Imgdiv}>
            <img className={style.ImgStyle} src={mainImg} alt='LuckyDraw'/>
        </div>
        <div className={style.divStyles}>
          
          <h4 className={style.SubTitle}>Khailo India Khailo </h4>
          <h6 className={style.SubTitle}>The Result is announced at 9:00 PM</h6>

              <h1 className={style.Number}>{number?number:'Loading..'}</h1>
              <h4 className={style.DateLabel}>{date? date: 'Loading..'}  </h4>
          </div>
       </div>

       <div className='col-md-4'>
       <div className={style.calendarDiv}>       
           <Alert
         message={`The Winners of: ${value && value.format('YYYY-MM-DD')}`}
            />
            <br/>
     <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false}  />
          
           </div>

           <div className='WinBtn'>
             <Button type='primary' onClick={onBtnClick}> See Winners </Button>

           </div>
       </div>




      </div>
    
        </div>
        </div>
         
    )
}

export default Home;