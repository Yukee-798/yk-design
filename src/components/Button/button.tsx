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
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;


type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    href?: string;
    type?: 'primary' | 'default' | 'danger' | 'link' | 'submit' | 'reset' | 'button' | undefined;
    children?: React.ReactNode;
}

export type ButtonProps = Partial<BaseButtonProps & NativeButtonProps & AnchorButtonProps>;


// 我自己封装的 Button 的 props 接口里面的 type 属性和原生 button 标签里的 props 接口属性 type 冲突了
// 原生接口中的 type?: 'submit' | 'reset' | 'button
// 我自己封装的接口的 type:? 'primary' | 'default' | 'danger' | 'link'
// 希望的 type:? 'submit' | 'reset' | 'button | 'primary' | 'default' | 'danger' | 'link'
// 实际操作后的 type:? undefined

const Button: React.FC<ButtonProps> = (props) => {
    const {
        type,
        disabled,
        size,
        href,
        className,
        children,
        ...restProps
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
                {...restProps}
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
                {...restProps}
            >
                {children}
            </button>
        )
    };

}

Button.defaultProps = {
    disabled: false,
    type: 'default',
    size: ButtonSize.Normal,
    children: 'button'
}


export default Button;