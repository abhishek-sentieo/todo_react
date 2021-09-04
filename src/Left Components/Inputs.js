import React, {useEffect, useState} from 'react';
import './Inputs-style.css';
import { useDispatch, useSelector } from 'react-redux';

const Inputs = (props) => {
    useEffect(()=>{
        props.cache();
    });
    const dispatch = useDispatch();
    const idNum = useSelector(state => state.idNum);
    const itemList = useSelector(state => state.itemList);
    const strikedList = useSelector(state => state.strikedList);
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [copyItemList,setCopyItemList] = useState([]);
    
    const storingTitle = ()=>{
        const dict = props.createDict(['<p>' + inputText + '</p>',''], 'added' + idNum, 
        'Created: ' + new Date().toLocaleString());
        dispatch({
            type : 'itemList',
            payload : {
                description : [dict,...itemList]
            }
        });
        dispatch({
            type : 'idNum',
            payload : {
                description : idNum + 1
            }
        });
        setInputText('');
    }
    
    function debounce(func,delay){
        let timerId;
        return function () {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            func.apply();
            timerId = null;
          }, delay);
        }
    }
    function search(){
        let searchResults = [];
        setCopyItemList(itemList);
        for(let i = 0; i < itemList.length; i++){
            if(itemList[i]['title'][0].includes(searchText))
                searchResults.push(itemList[i]);
        }
        dispatch({
            type : 'itemList',
            payload : {
                description : searchResults
            }
        });
        setSearchText('');
    }
    function removeAll(){
        dispatch({
            type : 'strikedList',
            payload : {
                description : [...itemList,...strikedList]
            }
        });
        dispatch({
            type : 'itemList',
            payload : {
                description : []
            }
        });
        dispatch({
            type : 'pageNum',
            payload : {
                description : 1
            }
        });
    }
    return (  
        <div className = 'Left-Inputs'>
            <div className = 'add'>
                <input type = 'text' placeholder = 'Add item' className = 'add-box' value = {inputText}
                onChange = {(val)=>setInputText(val.target.value)}></input>
                <button className = 'btnAdd' onClick = {debounce(storingTitle,300)}> Add </button>
            </div>
            <div className = 'search'>
                <input placeholder = 'Search' className = 'search-box' value = {searchText}
                onChange = {(val)=> setSearchText(val.target.value)}></input>
                <button className = 'btnSearch' onClick = {()=>search()}> Search </button>
                <button className = 'btnSearch' onClick = {()=>props.editItemList(copyItemList)}> Reset </button>
            </div>
            <button className = 'mark' onClick = {()=>removeAll()}> Mark all as done </button>
            <hr/>
        </div>
    );
}
 
export default Inputs;