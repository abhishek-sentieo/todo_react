import React, {useState} from 'react';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import './App.css';
import Modal from './Left Components/Modal';
import {useSelector} from 'react-redux';

function App() {
  const modal = useSelector(state => state.modal);
  const idNum = useSelector(state => state.idNum);
  const itemList = useSelector(state => state.itemList);
  const strikedList = useSelector(state => state.strikedList);
  const pinnedList = useSelector(state => state.pinnedList);

  function cache(){
    sessionStorage.setItem('num', JSON.stringify(idNum));
    sessionStorage.setItem('striked', JSON.stringify(strikedList));
    sessionStorage.setItem('todo', JSON.stringify(itemList));
    sessionStorage.setItem('pinned', JSON.stringify(pinnedList));
  }
  function createDict(title,id,date){
    return({
      'title' : title,
      'id' : id,
      'date' : date
    });
  }
  function getDict(array, id){
    for (let index = 0; index < array.length; index++) {
      if(array[index]['id'] === id){
        return array[index];
      }
    }
  }
  function getFilteredArray(array, id){
    const targetDict = getDict(array, id);
    return array.filter((newArray) =>{
      return newArray !== targetDict;
    });
  }
  return (
    <>
      <Header />
      <div className = 'complete'>
          <Left createDict = {createDict} getFilteredArray = {getFilteredArray} getDict = {getDict} cache = {cache} />

          <Right getFilteredArray = {getFilteredArray} getDict = {getDict} cache = {cache} />
      </div>

      {modal ? <div className = 'modal-popup'><Modal cache = {cache}/></div> : <></>}
    </>
  );
}

export default App;
