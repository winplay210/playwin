import React, { useState,useEffect } from "react";
import axios from 'axios';
const mystyle = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    marginTop:"90px"
  };
const Home=()=>{

    let [number,setNumber]=useState(0),
    [date,setDate]=useState('');

    useEffect(()=>{
        axios.get('http://localhost:4001/history/'+0).then(result=>{
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
        <div>
        <h1 style={{textAlign:"center",marginTop:"40px"}}>Draw Lucky 3</h1>
        <div style={mystyle}>
          
        <h4>Today Winner of Dubai Lucky draw </h4>
            <h1 >{number}</h1>
            <h4>{date}</h4>
        </div>

        </div>
         
    )
}

export default Home;