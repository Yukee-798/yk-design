import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { MenuContext } from './menu'
import { BaseProps } from '..';
import { MenuItemProps } from './menuItem';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';

export interface SubMenuProps extends BaseProps {
    /** 标题 */
    title: string;
    /** 唯一标识 */
    itemKey?: string;
    /** 图标 */
    icon?: React.ReactNode
    /** 是否禁用 */
    disabled?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        title,
        icon,
        itemKey,
        disabled,
        className,
        style,
        children,
        ...restProps
    } = props;

    const [isUnfold, setIsUnfold] = useState(false);

    const contextValue = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        'selected': contextValue.selectKey === itemKey,
        'disabled': disabled,
        'unfold': isUnfold
    })

    /** 点击后展开或关闭subMenu */
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsUnfold(!isUnfold)
    }

    /** 鼠标移入展开subMenu，移出则关闭subMenu */
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        setTimeout(() => {
            setIsUnfold(toggle)
        }, 300)
    }

    const clickEvents = contextValue.mode === 'horizontal' ? {} : { onClick: handleClick };

    const mouseEvents = contextValue.mode === 'horizontal' ? {
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true)
    } : {}

    /** 验证 children 必须为 MenuItem */
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childEle = child as React.FunctionComponentElement<MenuItemProps>;
            if (childEle?.type?.displayName === 'MenuItem') return React.cloneElement(childEle, {
                itemKey: childEle.props.itemKey || 'SubMenu-Item' + i,
            });
            else console.error('SubMenu has a child which is not a MenuItem component.')
        })
    }

    return (
        <li
            key={itemKey}
            className={classes}
            {...mouseEvents}
            {...restProps}
        >
            <div
                className='submenu-title'
                {...clickEvents}
            >
                <span className='submenu-title-text'>{title}</span>
                {
                    contextValue.mode === 'vertical' &&
                    <span className='submenu-title-arrow'>
                        <Icon icon={faAngleDown} />
                    </span>
                }
            </div>

            {/* 添加从上方缩放的动画 */}
            <Transition
                in={isUnfold}
                timeout={200}
                animation='zoom-from-top'
                appear
                unmountOnExit
            >
                <div className='submenu-warp'>
                    <ul className='yk-submenu'>
                        {renderChildren()}
                    </ul>
                </div>
            </Transition>
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;
