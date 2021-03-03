import React from 'react';
import classNames from 'classnames';


export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
    Normal = 'nor'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    href?: string;
    type?: ButtonType;
    children?: React.ReactNode;
}

// interface OtherProps

const Button: React.FC<BaseButtonProps> = (props) => {
    const {
        type,
        disabled,
        size,
        href,
        className,
        children
    } = props;

    const classes = classNames('yk-btn', {
        // 如果传入的 props 中有 btnType 属性则会返回 'btn btn-primary(传入的 type)'
        [`yk-btn-${type}`]: type,
        [`yk-btn-${size}`]: size,
        'disabled': disabled,
        [`${className}`]: className
    });

    // btn-link
    if (type === ButtonType.Link) {
        return (
            <a 
                className={classes} 
                href={href}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                type='button'
            >
                {children}
            </button>
        )
    };

}

Button.defaultProps = {
    disabled: false,
    type: ButtonType.Default,
    size: ButtonSize.Normal,
    children: 'button'
}


export default Button;