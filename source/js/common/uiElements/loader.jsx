import React from 'react'

const SButton = ({className, ...props}) => {
    return (
        <button type="button"
                class={"button second " + className}
            {...props} />
    )
};

export default SButton;

