import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export interface IconProps extends FontAwesomeIconProps {
    type?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
}

const Icon: React.FC<IconProps> = (props) => {
    const {
        type,
        className,
        ...restProps
    } = props;

    const classes = classNames('yk-icon', className, {
        [`icon-${type}`]: type
    })
    return (
        <FontAwesomeIcon 
            className={classes}
            {...restProps}
        />
    )
}

export default Icon;