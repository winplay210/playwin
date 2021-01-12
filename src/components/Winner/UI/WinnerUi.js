import React, { useState,useEffect } from 'react';
import axios from 'axios';
import mainImg from '../../home/assets/img/lucky.gif';
import style from '../Assets/Winner.module.css';
import moment from 'moment';
const WinnerUi=(props)=>{
    
    let [number,setNumber]=useState(0),
    [date,setDate]=useState('');

      
  
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
        <h1 className={style.title}>Winner of {date? date: '08 January,2021'}</h1>
        <hr/>
       <div className={style.Imgdiv}>
            <img className={style.ImgStyle} src={mainImg} alt='LuckyDraw'/>
        </div>
        <div className={style.divStyles}>
          
          <h4 className={style.SubTitle}>India ni Pakistan Khailo</h4>
              <h1 className={style.Number}>{number?number:'Loading..'}</h1>
         
              <h4 className={style.DateLabel}>{date? date: '08 January,2021'} </h4>
          </div>
       </div>
        </div>
    )
}

export default WinnerUi