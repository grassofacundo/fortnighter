import { useRef, FunctionComponent, ReactNode } from "react";
import { Transition } from "react-transition-group";

type thisProps = {
    inState: boolean;
    children: ReactNode;
};

const duration = 300;

/*const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};*/

/*const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};*/

const InOutAnim: FunctionComponent<thisProps> = ({ inState, children }) => {
    const nodeRef = useRef(null);
    return (
        <Transition
            nodeRef={nodeRef}
            in={inState}
            timeout={duration}
            unmountOnExit={true}
        >
            {(state) => (
                <div
                    ref={nodeRef}
                    className={`inOut-${state} inOut`}
                    style={{
                        transitionDuration: `${duration}ms`,
                    }}
                >
                    {children}
                </div>
            )}
        </Transition>
    );
};

export default InOutAnim;
