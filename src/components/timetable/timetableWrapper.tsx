import { useState } from "react";
import Timetable from "./Timetable";

type TimetableProps = {};

const TimetableWrapper: React.FC<TimetableProps> = () => {
    const [isFortnight, setIsFortnight] = useState<boolean>(false);

    function createDays(isFortnight: boolean): Array<Date> {
        const days = [] as Date[];
        const daysCount: number = isFortnight ? 14 : 7;

        for (let i = 0; i < daysCount; i++) {
            days.push(new Date());
        }
        return days;
    }

    return (
        <div>
            <button
                onClick={() => setIsFortnight((isFortnight) => !isFortnight)}
            >
                {isFortnight ? "Is fortnight" : "Is weekly"}
            </button>
            <Timetable days={createDays(isFortnight)} />
        </div>
    );
};

export default TimetableWrapper;
