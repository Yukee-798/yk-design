import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'

const handleClick = jest.fn();

// 测试按钮组件
describe('test Button component', () => {

    // 测试按钮的默认样式
    it('should render the correct default button', () => {

        // 获取默认按钮对象，并将其渲染到页面中
        const warpper = render(<Button onClick={handleClick}>Nice</Button>);
        const element = warpper.queryByText('Nice');

        // 判断页面中是否有这个元素对象
        expect(element).toBeInTheDocument();

        // 元素的 tagName 为 BUTTON
        expect(element.tagName).toBe('BUTTON')

        // 元素具有的类名
        expect(element).toHaveClass('yk-btn yk-btn-default yk-btn-normal')

        // 模拟按钮点击
        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalled();
    })

    // 测试按钮的不同 props
    it('should render the correct component based on different props', () => {
        const warpper = render(<Button className='123' type='primary'>Nice</Button>)
        const element = warpper.queryByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('yk-btn yk-btn-primary yk-btn-normal 123')

    })

    it('should render a link when btnType equals link and href is provided', () => {
        const warpper = render(<Button type='link' href='https://www.baidu.com'>Link</Button>)
        const element = warpper.queryByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('A')
        expect(element).toHaveClass('yk-btn yk-btn-link yk-btn-normal')
    })

    it('should render disabled button when disabled set to true', () => {
        const warpper = render(<Button disabled onClick={handleClick}>Nice</Button>)
        const element = warpper.queryByText('Nice');

        // 检测是否含有 disabled 类名
        expect(element).toHaveClass('disabled')

        // 点击后是否没有被调用
        fireEvent.click(element);
        expect(handleClick).not.toBeCalled();
    })
})