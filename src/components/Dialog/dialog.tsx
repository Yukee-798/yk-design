import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/button';


interface IPopWindowProps {
    /** 标题 */
    title?: React.ReactNode | string;
    /** 确定按钮文字 */
    confirmText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 对话框宽度 */
    width?: string;
    /** 是否弹出对话框 */
    isPop?: boolean;
    /** 点击确定回调 */
    onConfirm?: () => void;
    /** 点击取消回调 */
    onCancel?: () => void;
}

const Dialog: React.FC<IPopWindowProps> = (props) => {


    const [popPosition, setPopPosition] = useState({x: 0, y: 0});
    // const positionRef = useRef({x: 0, y: 0});

    const {
        cancelText,
        children,
        title,
        confirmText,
        isPop,
        width,
        onCancel,
        onConfirm,
    } = props;



        console.log('更新');

    useEffect(() => {
        // if (isPop) {
        //     setPopPosition({x: positionRef.current.x, y: positionRef.current.y});
        //     console.log(popPosition);
        // }
    }, [isPop])
    const onMouseMove = (e: MouseEvent) => {
        setPopPosition({ x: e.clientX, y: e.clientY });

        console.log(e.clientX, e.clientY);
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <div className='yk-dialog' style={isPop ? {} : { zIndex: -1000 }}>
            <div className='yk-dialog-mask' style={isPop ? {} : { display: 'none' }}></div>
            <div
                className='yk-dialog-window'
                style={{ width, transform: isPop ? 'scale(1)' : 'scale(.1)' }}
            >
                <header>{title}</header>
                <div className='content'>{children}</div>
                <footer>
                    <Button
                        btnType={'default'}
                        onClick={() => {
                            onCancel?.();
                        }}
                    >{cancelText}</Button>
                    <Button
                        btnType='primary'
                        onClick={() => {
                            onConfirm?.();
                        }}
                    >{confirmText}</Button>
                </footer>
            </div>
        </div>
    )
}

Dialog.defaultProps = {
    cancelText: '取消',
    confirmText: '确定',
    isPop: false,
    title: 'title',
    width: '450px'
}

export default Dialog;