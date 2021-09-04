import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';

const Modal = (props) => {

    const dispatch = useDispatch();
    const description = useSelector(state => state.description);
    const heading = useSelector(state => state.heading);
    const modalId = useSelector(state => state.modalId);
    const itemList = useSelector(state => state.itemList);
    const styleModal = {
        backgroundColor: '#fefefe',
        margin: '15% auto',
        padding: '20px',
        border: '1px solid #888',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '600px'
    };

    function saveDescriptionData(e,editor){
        dispatch({
            type : 'description',
            payload : {
                description : editor.data.get()
            }
        });
    }
    function saveChanges(){
        const newDict = {
            'title' : [description, heading],
            'id': modalId,
            'date': 'Updated: ' + new Date().toLocaleString()
        };
        const editedList = itemList.map(item => {
            return (item['id'] === modalId) ? newDict : item;
        });
        dispatch({
            type : 'itemList',
            payload : {
                description : editedList
            }
        });
        props.cache();
    }

    return (  
        <div className = 'modal' style = {styleModal}>
            <input type = 'text' className = 'modal-heading' value = {heading} placeholder = 'Heading'
            onChange = {(e)=>dispatch({
                type : 'heading',
                payload : {
                    description : e.target.value
                }
            })}/>
            <div className = 'modalDescription' style = {{paddingBlock: '20px'}}>
                <CKEditor 
                editor = {ClassicEditor}
                data = {description}
                onChange = {(e,editor) => saveDescriptionData(e,editor)}/>
            </div>
            <button onClick={()=>{
                dispatch({
                    type : 'hideModal',
                    payload : {
                        description : false
                    }
                }); 
                saveChanges()}}>Save</button>
        </div>
    );
}
 
export default Modal;