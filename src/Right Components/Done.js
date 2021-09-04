import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Done = (props) => {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const strikedList = useSelector(state => state.strikedList);
    const Style = {
        paddingInline: '20px',
        paddingBlock: '10px',
        border: '2px solid',
        overflowY: 'scroll',
        height: '134px'
    };
    const strikedBoxStyle = {
        padding: '10px',
        border: '2px solid gray',
        borderRadius: '5px',
        marginBlockEnd: '10px'
    };
    const descStyle = {
        paddingBlock: '20px',
        paddingInlineStart: '30px'
    };
    const dateStyle = {
        float: 'right',
        margin: '-10px 0px',
        color: 'gray'
    };
    function addStrikedBox(striked){
        return(
            <div className = 'striked-item' id = {striked['id']} key ={striked['id']} style = {strikedBoxStyle}>
                <input type = 'checkbox' className = 'untick' style = {{float : 'left'}} 
                defaultChecked={true} onChange = {()=>undo(striked['id'])}/>
                <div className = 'heading' style = {{display: 'inline-block'}}>
                    {striked['title'][1]}
                </div>  
                <div className = 'remove' style = {{float : 'right'}}>
                    <button className = 'btnRemove' onClick = {()=>remove(striked['id'])}>Remove</button>
                </div>
                <div className = 'description' style = {descStyle}
                dangerouslySetInnerHTML = {{__html: '<strike>' + striked['title'][0] + '</strike>'}}>
                </div>
                <div className = 'date' style = {dateStyle}>
                    {striked['date']}
                </div>
            </div>
        );
    }
    function undo(id){
        const dict = props.getDict(strikedList, id);
        dispatch({
            type : 'itemList',
            payload : {
                description : [dict,...itemList]
            }
        });
        const updatedStrikedList = props.getFilteredArray(strikedList, id);
        dispatch({
            type : 'strikedList',
            payload : {
                description : updatedStrikedList
            }
        });
        props.cache();
    }
    function remove(id){
        const updatedStrikedList = props.getFilteredArray(strikedList, id);
        dispatch({
            type : 'strikedList',
            payload : {
                description : updatedStrikedList
            }
        });
        props.cache();
    }
    return (  
        <div className = 'striked' style = {Style}>
            {strikedList.map(striked => addStrikedBox(striked))}
        </div>
    );
}
 
export default Done;
