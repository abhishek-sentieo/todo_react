import { combineReducers } from "redux";

const description = (state = '',action)=>{
    if(action.type === 'description')
        return action.payload.description;
    return state;
}
const heading = (state = '',action)=>{
    if(action.type === 'heading')
        return action.payload.description;
    return state;
}
const modal = (state = false, action)=>{
    if(action.type === 'showModal')
        return true;
    if(action.type === 'hideModal')
        return false;
    return state;
}
const modalId = (state = null, action)=>{
    if(action.type === 'modalId')
        return action.payload.description;
    return state;
}
const pageNum = (state = 1, action)=>{
    if(action.type === 'pageNum')
        return action.payload.description;
    return state;
}
const itemList = (state = (JSON.parse(sessionStorage.getItem('todo')) === null) ? [] 
: JSON.parse(sessionStorage.getItem('todo')),action) => {
    if(action.type === 'itemList')
        return action.payload.description;
    return state;
}
const strikedList = (state = (JSON.parse(sessionStorage.getItem('striked')) === null) ? [] 
: JSON.parse(sessionStorage.getItem('striked')),action) => {
    if(action.type === 'strikedList')
        return action.payload.description;
    return state;
}
const pinnedList = (state = (JSON.parse(sessionStorage.getItem('pinned')) === null) ? [] 
: JSON.parse(sessionStorage.getItem('pinned')),action) => {
    if(action.type === 'pinnedList')
        return action.payload.description;
    return state;
}
const idNum = (state = (JSON.parse(sessionStorage.getItem('idNum')) === null) ? [] 
: JSON.parse(sessionStorage.getItem('idNum')),action) => {
    if(action.type === 'idNum')
        return action.payload.description;
    return state;
}
const allReducers = combineReducers({
    description,
    modal,
    modalId,
    heading,
    pageNum,
    itemList,
    strikedList,
    pinnedList,
    idNum
});

export default allReducers;