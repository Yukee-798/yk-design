import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export type TransitionProps = CSSTransitionProps & {
    animation?: 'zoom-from-top' | 'zoom-from-left' | 'zoom-from-right' | 'zoom-from-bottom'
}

const Transition: React.FC<TransitionProps> = (props) => {

    const {
        children,
        animation,
        ...restProps
    } = props;

    return (
        <CSSTransition
            classNames={animation}
            appear
            unmountOnExit
            {...restProps}
        >
            {children}
        </CSSTransition>
    )
}


export default Transition;