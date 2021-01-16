import React, { useState,useEffect } from 'react';
import axios from 'axios';
import mainImg from '../../home/assets/img/lucky.gif';
import style from '../Assets/Winner.module.css';
import {Divider} from 'antd';
const WinnerUi=(props)=>{
    console.log(props,"Courtesy")
    let [number,setNumber]=useState(0),
    [date,setDate]=useState('');
    let [winner,setWinner]=useState([]);

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
        });
      

      
    },[])

    useEffect(()=>{

        axios.get("http://playwinbackend.herokuapp.com/winnerPage/"+props.props.location.state).then(result=>{

         if(result){
             console.log(result.data,"Result.data")
             setWinner(result.data.data);
         }
      })
    },[])

    return(
        <div className='container'>
         <div className={style.MainCont}>
        <h1 className={style.title}>Winner of {winner.length>0&&winner[0].date? winner[0].date: 'Loading'}</h1>
        <hr/>
       <div className={style.Imgdiv}>
            <img className={style.ImgStyle} src={mainImg} alt='LuckyDraw'/>
        </div>
        <Divider/>
        <div className={style.divStyles}>
        <span>
          <h6 className={style.SubTitle}>khailo india Khailo</h6>
              <label className={style.Number}>{winner.length>0&&winner[0].number?winner[0].number:'Loading..'}</label>
              <h6 className={style.DateLabel}>{winner.length>0&&winner[0].date? winner[0].date: 'Loading'} </h6>
</span>
              <Divider/>

        
          </div>
       </div>
        </div>
    )
}

export default WinnerUi