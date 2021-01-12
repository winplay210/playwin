import React, { useState,useEffect } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Calendar, Alert} from 'antd';
import moment from 'moment';
import style from './assets/css/home.module.css';
import mainImg from './assets/img/lucky.gif';



const Home=()=>{

    let history = useHistory();     
    let [number,setNumber]=useState(0),
    [date,setDate]=useState(''),

     [value,selectedValue]=useState(moment);

    const onSelect =(value) => {
        selectedValue(value);
        history.push('/winner');
      
      };
    
      const onPanelChange = (moment) => {
        selectedValue(moment)
     
      };
      
  
    useEffect(()=>{
        axios.get('http://playwinbackend.herokuapp.com/history/'+0).then(result=>{
                if(result){
                    setNumber(result.data.data[0].number);
                    var a = new Date(result.data.data[0].creation_date * 1000);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                   
                    setDate(time);
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
              <h1 className={style.Number}>{number?number:'Loading..'}</h1>
              <h4 className={style.DateLabel}>{date? date: '08 January,2021'}  </h4>
          </div>
       </div>

       <div className='col-md-4'>
       <div className={style.calendarDiv}>       
           <Alert
         message={`Select Date To See The Winner ${value && value.format('YYYY-MM-DD')}`}
            />
            <br/>
     <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false} />
          
           </div>
       </div>




      </div>
    
        </div>
        </div>
         
    )
}

export default Home;