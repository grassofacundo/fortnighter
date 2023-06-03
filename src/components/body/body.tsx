import { FunctionComponent, useState } from "react";
import TimetableWrapper from "../timetable/timetableWrapper";
import InOutAnim from "../utils/InOutAnim";

type thisProps = {};

const Body: FunctionComponent<thisProps> = () => {
    const [showTimetable, setShowTimetable] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setShowTimetable((prev) => !prev)}>
                {`${showTimetable ? "Hide" : "Show"} timetable`}
            </button>
            <InOutAnim inState={showTimetable}>
                <div>
                    <TimetableWrapper></TimetableWrapper>
                </div>
            </InOutAnim>
        </div>
    );
};

export default Body;
