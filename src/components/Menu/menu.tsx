import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem';

export interface MenuProps {
    /** 初始默认被选中的菜单项 */
    defaultSelectKey?: string
    /** 菜单纵向、横向 */
    mode?: 'vertical' | 'horizontal'
    /** 菜单项被选中时的回调 */
    onSelect?: (key: string) => void;

    className?: string;
    style?: React.CSSProperties
}

interface IMenuContext {
    selectKey: string;
    mode: 'vertical' | 'horizontal'
    onSelect?: (key: string) => void;
}

export const MenuContext = createContext<IMenuContext>({ selectKey: '0', mode: 'horizontal' })

const Menu: React.FC<MenuProps> = (props) => {
    const {
        children,
        mode,
        defaultSelectKey,
        className,
        onSelect,
        ...restProps
    } = props;

    const [selectKey, setSelectKey] = useState(defaultSelectKey as string);

    const classes = classNames('yk-menu', className, {
        ['menu-vertical']: mode === 'vertical',
        ['menu-horizontal']: mode === 'horizontal',
    })

    /** 传递给menuItem，只要其被点击则执行该函数 */
    const handleItemClick = (key: string) => {
        console.log(key);
        setSelectKey(key);
        onSelect?.(key);
    }

    /** 传递给子组件的context */
    const contextValue: IMenuContext = {
        selectKey,
        mode: mode as ('vertical' | 'horizontal'),
        onSelect: handleItemClick
    }

    /** 验证子 children 必须为 MenuItem */
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            // 获取组件实例
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // 判断其实例的 displayName
            if (childElement?.type?.displayName === 'MenuItem' || childElement?.type?.displayName === 'SubMenu') {
                // 克隆MenuItem，如果没有添加 itemKey 则默认为 index              
                return React.cloneElement(childElement, { itemKey: childElement.props.itemKey || 'Menu-Item' + i });
            } else {
                console.error('Menu has a child which is not a MenuItem or SubMenu component.')
            }
        })
    }

    return (
        <ul
            className={classes}
            {...restProps}
        >
            <MenuContext.Provider value={contextValue}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultSelectKey: '0',
    mode: 'horizontal',
}

export default Menu;