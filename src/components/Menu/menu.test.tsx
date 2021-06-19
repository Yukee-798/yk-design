import { render, RenderResult, fireEvent, getByText } from '@testing-library/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'


let warpper: RenderResult, menuEle: HTMLElement, activeMenuItemEle: HTMLElement, disabledMenuItemEle: HTMLElement, defaultMenuItemEle: HTMLElement;
const handleClick = jest.fn();
const generateDefaultMenu = () => (
    <Menu
        className='test'
        defaultSelectKey='123'
        data-testid='test-menu'
        onSelect={handleClick}
    >
        <MenuItem
            itemKey='123'
        >
            active
        </MenuItem>
        <MenuItem
            disabled
        >
            disabled
        </MenuItem>
        <MenuItem>
            default
        </MenuItem>
        <SubMenu title='sub'>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
        </SubMenu>
    </Menu>
)

const generateVerticalMenu = () => (
    <Menu
        className='test'
        defaultSelectKey='123'
        data-testid='test-menu-vertical'
        onSelect={handleClick}
        mode='vertical'
    >
        <MenuItem
            itemKey='123'
        >
            active
        </MenuItem>
        <MenuItem
            disabled
        >
            disabled
        </MenuItem>
        <MenuItem>
            default
        </MenuItem>
        <SubMenu title='sub'>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
        </SubMenu>
    </Menu>

)

describe('test Menu component', () => {
    beforeEach(() => {
        warpper = render(generateDefaultMenu());
        menuEle = warpper.getByTestId('test-menu');
        // 下面这个方式可以通过 className、id、tagName 等属性获取元素对象
        // warpper.container.getElementsByClassName()
        activeMenuItemEle = warpper.getByText('active');
        disabledMenuItemEle = warpper.getByText('disabled');
        defaultMenuItemEle = warpper.getByText('default');
    })

    /** 测试默认状态 */
    it('should have correct default classNames', () => {
        // 判断是否在html中
        expect(menuEle).toBeInTheDocument();
        expect(activeMenuItemEle).toBeInTheDocument();
        expect(disabledMenuItemEle).toBeInTheDocument();
        expect(defaultMenuItemEle).toBeInTheDocument();

        // 判断 Menu 的类名
        expect(menuEle).toHaveClass('test', 'yk-menu', 'menu-horizontal')

        // 判断 Menu 的子元素个数
        // 这里 :scope 表示的就是 menuEle 这个元素
        expect(menuEle.querySelectorAll(':scope > li').length).toBe(4);

        // 判断 MenuItem 的类名
        expect(activeMenuItemEle).toHaveClass('selected', 'menu-item')
        expect(disabledMenuItemEle).not.toHaveClass('selected')
        expect(disabledMenuItemEle).toHaveClass('disabled')
        expect(defaultMenuItemEle).not.toHaveClass('disabled', 'selected')
    })


    /** 测试默认状态的点击行为 */
    it('should be selected and call the right callback when MenuItem is clicked', () => {
        // 点击第一个 MenuItem
        fireEvent.click(activeMenuItemEle);
        expect(activeMenuItemEle).toHaveClass('selected');
        expect(handleClick).toBeCalledWith('123')


        // 点击第三个 MenuItem
        fireEvent.click(defaultMenuItemEle);
        expect(defaultMenuItemEle).toHaveClass('selected');
        expect(activeMenuItemEle).not.toHaveClass('selected');
        expect(handleClick).toHaveBeenCalledWith('Menu-Item2')
    })

    /** 测试默认状态被禁用的菜单项 */
    it('should have correct classNames when MenuItem is disable', () => {
        // 点击第二个 MenuItem
        fireEvent.click(disabledMenuItemEle);
        expect(disabledMenuItemEle).not.toHaveClass('selected');
        expect(handleClick).not.toBeCalled()
        expect(activeMenuItemEle).toHaveClass('selected');
    })

    /** 测试vertical状态的类名 */
    it('should have correct classNames when Menu is vertical', () => {
        warpper = render(generateVerticalMenu());
        menuEle = warpper.getByTestId('test-menu-vertical');
        expect(menuEle).toHaveClass('menu-vertical')
    })

    /** 测试 SubMenu */
    
})