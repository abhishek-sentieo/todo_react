import React, {useRef, useCallback} from 'react';
import usePagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';

const List = (props) => {
    const dispatch = useDispatch();
    const pageNum = useSelector(state => state.pageNum);
    const itemList = useSelector(state => state.itemList);
    const strikedList = useSelector(state => state.strikedList);
    const pinnedList = useSelector(state => state.pinnedList);
    const descStyle ={
        paddingBlock: '20px',
        paddingInlineStart: '30px'
    };
    const dateStyle = {
        float: 'right',
        margin: '-10px 0px',
        color: 'gray'
    };
    const boxStyle = {
        padding: '10px',
        border: '2px solid gray',
        borderRadius: '5px',
        marginBlockEnd: '10px'
    };
    const {hasMore, items} = usePagination(pageNum, itemList);
    const observer = useRef();
    const lastPaginationItem = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(enteries => {
            if(enteries[0].isIntersecting && hasMore)
                setTimeout(()=>{
                    dispatch({
                        type : 'pageNum',
                        payload : {
                            description : pageNum + 1
                        }
                    });
                },1000);
        });
        if(node) observer.current.observe(node);
    }, [hasMore]);

    function mark(id){
        dispatch({
            type : 'strikedList',
            payload : {
                description : [props.getDict(itemList, id),...strikedList]
            }
        });
        const updatedItemList = props.getFilteredArray(itemList, id);
        dispatch({
            type : 'itemList',
            payload : {
                description : updatedItemList
            }
        });
        if(itemList.length % 3 === 0)
            dispatch({
                type : 'pageNum',
                payload : {
                    description : pageNum - 1
                }
            });
        props.cache();
    }
    function pin(id){
        dispatch({
            type : 'pinnedList',
            payload : {
                description : [props.getDict(itemList, id),...pinnedList]
            }
        });
        props.cache();
    }
    function changeValue(id){
        for (let index = 0; index < itemList.length; index++) {
            if(itemList[index]['id'] === id){
                dispatch({
                    type : 'description',
                    payload : {
                        description : itemList[index]['title'][0]
                    }
                });
                dispatch({
                    type : 'heading',
                    payload : {
                        description : itemList[index]['title'][1]
                    }
                });
            }
        }
    }
    function addItem(item, index){
        return(
            <>
                <div className = 'serial' style = {{float: 'left'}}>
                    {index + 1}
                </div>
                <input type = 'checkbox' className = 'tick' style = {{float: 'left'}} onClick = {()=>mark(item['id'])}/>
                <div className = 'heading' style = {{display: 'inline-block'}}>
                    {item['title'][1]}
                </div>  
                <div className = 'pin' style = {{float: 'right'}}>
                    <button className = 'btnPin' onClick = {()=>pin(item['id'])}>Pin</button>
                </div>
                <div className = 'edit' style = {{float: 'right'}}>
                    <button className = 'btnEdit' onClick = {()=>{changeValue(item['id']);
                    dispatch({
                        type : 'showModal',
                        payload : {
                            description : true
                        }
                    });
                    dispatch({
                        type : 'modalId',
                        payload : {
                            description : item['id']
                        }
                    });
                    }}>Edit</button>
                </div>
                <div className = 'description' dangerouslySetInnerHTML = {{__html : item['title'][0]}} style = {descStyle}>
                </div>
                <div className = 'date' style = {dateStyle}>
                    {item['date']}
                </div>
            </>
        );
    }
    
    return (
        <>
        {   
            items.map((item,index) => {
                    if(items.length === index + 1)
                        return <div className = 'list-item' id = {item['id']} key = {item['id']} style = {boxStyle} 
                        ref = {lastPaginationItem}>{addItem(item,index)}</div>
                    else
                        return <div className = 'list-item' id = {item['id']} key = {item['id']} style = {boxStyle} >
                            {addItem(item,index)}</div>
            })
        }
        </>
    );
}
 
export default List;