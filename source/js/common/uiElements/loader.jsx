import React from 'react'

const SButton = ({className, ...props}) => {
    return (
        <button type="button"
                className={"button second " + className}
            {...props} />
    )
};

export default SButton;

