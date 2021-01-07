import React,{useEffect,useState} from 'react';
import { List, Avatar } from 'antd'
import axios from 'axios';
import { Button,Spin } from 'antd';

const ListWinners=()=>{

  let [data,setData]=useState([]),
  [pageState,setPageState]=useState(0),
  [isLoading,setLoading]=useState(false);
   useEffect(()=>{

    setLoading(true)
    axios.get( "http://localhost:4001/history/"+0).then(result=>{
      if(result){
        setLoading(false);
        setPageState(result.data.data.length);
        for (let i=0;i<result.data.data.length;i++){
          var a = new Date(result.data.data[i].creation_date * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
         
          result.data.data[i].date=time;
        }

        
        setData(result.data.data);
      }else{
        alert("Some error occured");
        setLoading(false);
      }
    })
   },[])

   const seeMore=()=>{
     setLoading(true);
    axios.get( "http://localhost:4001/history/"+pageState).then(result=>{
      console.log(result);
      if(result){

        if(result.data.data.length===0){
          alert("No more data kindly refresh the page");
          setLoading(false);
        }else{
        setPageState(pageState+result.data.data.length)
        for (let i=0;i<result.data.data.length;i++){
          var a = new Date(result.data.data[i].creation_date * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
         
          result.data.data[i].date=time;

           }
      }
         setData(result.data.data);
         setLoading(false);
     
      }
    })
   }
    
      return(
          <div style={{alignContent:"center"}}>
             {  !isLoading?
             <div>
                <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  
                  
                  
                  <List.Item>
                    <List.Item.Meta
                      title={<h4 href="https://ant.design">{item.number}</h4>}
                      description={item.date}
                    />
                  </List.Item>
                
                )}
                
                />
          
                <Button onClick={()=>seeMore("Hey")}style={{marginLeft:"40%",backgroundColor:"blue",color:"white"}}>See More</Button>
                </div>:<Spin style={{marginLeft:"650px",marginTop:"90px"}} size='large'/>
             }
     
      </div>
      )
}

export default ListWinners