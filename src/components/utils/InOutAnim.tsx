import { useRef, FunctionComponent, ReactNode } from "react";
import { Transition } from "react-transition-group";

type thisProps = {
    inState: boolean;
    children: ReactNode;
    unmountOnExit?: boolean;
    customClass?: CSSModuleClasses[string];
};

const duration = 300;

const InOutAnim: FunctionComponent<thisProps> = ({
    inState,
    children,
    unmountOnExit = true,
    customClass,
}) => {
    const nodeRef = useRef(null);
    return (
        <Transition
            nodeRef={nodeRef}
            in={inState}
            timeout={duration}
            unmountOnExit={unmountOnExit}
        >
            {(state) => (
                <div
                    ref={nodeRef}
                    className={`inOut-${state} inOut ${customClass}`}
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
