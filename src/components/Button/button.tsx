import React from 'react';
import classNames from 'classnames';


// export enum ButtonTypes {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

// export enum ButtonSizes {
//     Large = 'lg',
//     Small = 'sm',
//     Normal = 'nor'
// }
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;


type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: 'large' | 'small' | 'normal';
    href?: string;
    btnType?: 'primary' | 'default' | 'danger' | 'link'
    children?: React.ReactNode;
}

export type ButtonProps = Partial<BaseButtonProps & NativeButtonProps & AnchorButtonProps>;



const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        disabled,
        size,
        href,
        className,
        children,
        ...other
    } = props;

    const classes = classNames('yk-btn', {
        // 如果传入的 props 中有 btnType 属性则会返回 'btn btn-primary(传入的 type)'
        [`yk-btn-${btnType}`]: btnType,
        [`yk-btn-${size}`]: size,
        'disabled': disabled,
        [`${className}`]: className
    });

    // btn-link
    if (btnType === 'link') {
        return (
            <a 
                className={classes} 
                href={href}
                {...other}
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
                {...other}
            >
                {children}
            </button>
        )
    }

}

Button.defaultProps = {
    disabled: false,
    btnType: 'default',
    size: 'normal',
    children: 'button'
}


export default Button;