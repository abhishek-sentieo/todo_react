import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Pinned = (props) => {
    const dispatch = useDispatch();
    const pinnedList = useSelector(state => state.pinnedList);
    const descStyle = {
        paddingBlock: '20px',
        paddingInlineStart: '30px'
    };
    const dateStyle = {
        float: 'right',
        margin: '-10px 0px',
        color: 'gray'
    };
    const Style = {
        paddingInline: '20px',
        paddingBlock: '10px',
        border: '2px solid',
        overflowY: 'scroll',
        height: '134px'
    }
    const pinnedBoxStyle = {
        padding: '10px',
        border: '2px solid gray',
        borderRadius: '5px',
        marginBlockEnd: '10px',
    }
    function addPinnedBox(pinned){
        return(
            <div className = 'pinned-item' id = {'pin' + pinned['id']} key ={'pin' + pinned['id']} 
            style = {pinnedBoxStyle}>
                <div className = 'heading' style = {{display: 'inline-block'}}>
                    {pinned['title'][1]}
                </div>  
                <div className = 'unpin' style = {{float : 'right'}}>
                    <button className = 'btnUnpin' onClick = {()=>unpin(pinned['id'])}>Unpin</button>
                </div>
                <div className = 'description' style = {descStyle}
                dangerouslySetInnerHTML = {{__html : pinned['title'][0]}}>
                </div>
                <div className = 'date' style = {dateStyle}>
                    {pinned['date']}
                </div>
            </div>
        );
    }
    function unpin(id){
        const updatedPinnedList = props.getFilteredArray(pinnedList, id);
        dispatch({
            type : 'pinnedList',
            payload : {
                description : updatedPinnedList
            }
        });
        props.cache();
    }
    return (  
        <div className = 'pinned' style = {Style}>
            {pinnedList.map(pinned => addPinnedBox(pinned))}
        </div>
    );
}
 
export default Pinned;
