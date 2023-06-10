import { FunctionComponent } from "react";
import Calendar from "../timetable/Calendar";
import styles from "./body.module.scss";

type thisProps = {};

const Body: FunctionComponent<thisProps> = () => {
    return (
        <div className={styles.mainBody}>
            <Calendar></Calendar>
        </div>
    );
};

export default Body;
