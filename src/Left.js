import React from 'react';
import Inputs from './Left Components/Inputs';
import List from './Left Components/List';
import {useSelector} from 'react-redux';
const Left = (props) => {
    const itemList = useSelector(state => state.itemList);
    const leftStyle = {
        maxWidth : '720px',
        paddingInline : '20px',
        flexGrow: '2'
    }
    const scrollStyle = {
        overflowY: (itemList.length > 2) ? 'scroll' : 'hidden',
        height: '280px',
        paddingInlineEnd: '5px'
    };
    return (
        <div className = 'left' style = {leftStyle}>

            <Inputs createDict = {props.createDict} cache = {props.cache}/>

            <div className = 'all-items' style = {scrollStyle}>
                <List getFilteredArray = {props.getFilteredArray} getDict = {props.getDict} cache = {props.cache}/>
            </div>

        </div>
    );
}
 
export default Left;