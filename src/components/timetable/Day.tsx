import { FunctionComponent, useState } from "react";
import styles from "./Day.module.scss";

type thisProps = {
    day: Date;
};

const Day: FunctionComponent<thisProps> = ({ day }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`${styles.dayBody} ${isExpanded ? styles.expanded : ""}`}
            onClick={() => setIsExpanded((v) => !v)}
        >
            <p>{`${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`}</p>
        </div>
    );
};

export default Day;
