import React from 'react';
import classNames from 'classnames';

type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: 'large' | 'small' | 'normal';
    href?: string;
    type?: 'primary' | 'default' | 'danger' | 'link'
    children?: React.ReactNode;
}

// 将原生的 type 剔除然后合并上我们自己写的 type
type ButtonProps = Omit<Partial<NativeButtonProps & AnchorButtonProps>, 'type'> & BaseButtonProps

const Button: React.FC<ButtonProps> = (props) => {
    const {
        type,
        disabled,
        size,
        href,
        className,
        children,
        ...other
    } = props;

    const classes = classNames('yk-btn', className ,{
        // 如果传入的 props 中有 type 属性则会返回 'btn btn-primary(传入的 type)'
        [`yk-btn-${type}`]: type,
        [`yk-btn-${size}`]: size,
        'disabled': disabled,
    });

    // btn-link
    if (type === 'link') {
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
    type: 'default',
    size: 'normal',
    children: 'button'
}


export default Button;