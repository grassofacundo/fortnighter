import { useContext } from "react";
import { dbContext } from "../App";

type TimetableProps = {
    days: Array<Date>;
};

const Timetable: React.FC<TimetableProps> = ({ days }) => {
    const dbCtx = useContext(dbContext);

    return (
        <div>
            {days.map((day, index) => (
                <button onClick={() => dbCtx.db.createDate(day)} key={index}>
                    work day
                </button>
            ))}
        </div>
    );
};

export default Timetable;
