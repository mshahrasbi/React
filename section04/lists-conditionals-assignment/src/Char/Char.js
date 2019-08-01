
import React from 'react';

// since will not need state in this component there is no need to use class and extend component
// can use function

const Char = (props) => {

    const style = {
        display: 'inline-block',
        padding: '16px',
        margin: '16px',
        border: '1px solid black',
        textAlign: 'center'
    }
    return (
        <div style={style} onClick={props.Clicked}>
            {props.character}
        </div>
    );
}

export default Char;