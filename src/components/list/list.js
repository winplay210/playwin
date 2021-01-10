import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Button,Spin,List } from 'antd';

const dataList = [
  {
    title: '0003456',
  },
  {
    title: '0003456',
  },
  {
    title: '0003456',
  },
  {
    title: '0003456',
  },
  
];

const ListWinners=()=>{

  let [data,setData]=useState([]),
  [pageState,setPageState]=useState(0),
  [isLoading,setLoading]=useState(false);
   useEffect(()=>{

    setLoading(true)
    axios.get( "http://playwinbackend.herokuapp.com/history/"+0).then(result=>{
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
    axios.get( "http://playwinbackend.herokuapp.com/history/"+pageState).then(result=>{
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
          <div className='container'>
             <div className='MainCont'>
             <h1 className='title'> Winner List </h1>
              <hr/>
             {  !isLoading?
             <div >
                <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  
                  
                  
                  <List.Item>
                    <List.Item.Meta
                      title={<h4 href="https://ant.design">{item.number?item.number:'0003456'}</h4>}
                      description={item.date?item.date:'09 January, 2020 | 4:49 PM' }
                    />
                  </List.Item>
                
                )}
                
                />
          <div className='text-center'>
                <Button onClick={()=>seeMore("Hey")} type='primary'>See More</Button>
                </div>
                </div>: <div className='text-center'> 
                <Spin className='mtt-20' size='large'/> 
                </div>
             }
     </div>
      </div>
      )
}

export default ListWinners