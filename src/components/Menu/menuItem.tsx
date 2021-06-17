import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { BaseProps } from '..';

export interface MenuItemProps extends BaseProps {
    /** item的唯一标识 */
    itemKey?: string;
    /** 图标 */
    icon?: React.ReactNode
    /** 是否禁用 */
    disabled?: boolean;

}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        disabled,
        icon,
        itemKey,
        className,
        children,
        ...restProps
    } = props;


    /** 接收来自父组件传来的context */
    const contextValue = useContext(MenuContext);

    const classes = classNames('menu-item', className, {
        'disabled': disabled,
        // 如果Menu组件中的 selectKey 等于当前 itemKey 则改变类名
        'selected': itemKey === contextValue.selectKey
    })

    const handleClick = () => {
        if (!disabled) {
            contextValue.onSelect?.(itemKey as string)
            // console.log(itemKey);
        }
    }
    return (
        <li
            key={itemKey}
            className={classes}
            onClick={handleClick}
            {...restProps}
        >
            {icon && <span className='menu-item-icon'>{icon}</span>}
            <span className='menu-item-title'>{children}</span>
        </li>
    )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;


