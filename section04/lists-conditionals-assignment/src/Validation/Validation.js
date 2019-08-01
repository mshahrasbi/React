
import React from 'react';

// since will not need state in this component there is no need to use class and extend component
// can use function

const Validation = (props) => {

    let ValidationMessage = 'Text long enough';

    if (props.inputLength <= 5) {
        ValidationMessage = 'Text too short!'
    }

    return (
        <div>
            {/* {
                props.inputLength > 5 ? <p>Text leng enough</p> : <p>Text too short!</p>
            } */}
            <p>{ValidationMessage}</p>
        </div>
    );
}

export default Validation;