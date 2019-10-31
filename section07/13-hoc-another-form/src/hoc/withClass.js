
import React from 'react';

const withClass = (WrappedComponent, className) => {
    console.log(className);
    
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
}


export default withClass;