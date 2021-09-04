import React, { Component } from 'react';
import Pinned from './Right Components/Pinned';
import Done from './Right Components/Done';

class Right extends Component {
    state = {  }
    render() { 
        return (  
            <div className = 'right-box' style = {this.Style}>
                <div className = 'all-pinned'>
                    <h2 style={{textAlign : 'center'}}>Pinned Items</h2>
                    <Pinned getFilteredArray = {this.props.getFilteredArray} getDict = {this.props.getDict} 
                    cache = {this.props.cache}/>
                </div>
                <div className = 'all-striked'>
                    <h2 style={{textAlign : 'center'}}>Done</h2>
                    <Done getFilteredArray = {this.props.getFilteredArray} getDict = {this.props.getDict} 
                    cache = {this.props.cache}/>
                </div>
            </div>
        );
    }
    Style = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '4',
        maxWidth: '400px'
    };
}
 
export default Right;