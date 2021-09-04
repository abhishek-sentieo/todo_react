import {useEffect, useState} from 'react';

export default function usePagination(pageNum, itemList){
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [index, setIndex] = useState(0);
    useEffect(()=>{
      let temp = [];
      for(let i = 0 ;i < 3 * pageNum ; i++){
        if(itemList[i] !== undefined)
          temp.push(itemList[i]);
      }
      setItems([...temp]);
      setIndex(Math.floor(temp.length / (3)));
      setHasMore(index === pageNum);
    },[pageNum,itemList,index]);

    return { hasMore, items}; 
}
