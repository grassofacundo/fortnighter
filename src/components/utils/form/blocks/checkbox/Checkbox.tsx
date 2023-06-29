import { ChangeEvent, FunctionComponent, useEffect } from "react";
import styles from "./Checkbox.module.scss";

interface thisProps extends inputProp {
    fields: checkbox;
}

const Checkbox: FunctionComponent<thisProps> = ({ fields, onUpdateAnswer }) => {
    const { id, label } = fields;

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        onUpdateAnswer({ id: target.id, value: target.checked });
    }

    //Default value to false to avoid having unanswered questions
    useEffect(() => {
        onUpdateAnswer({ id: id, value: false });
    }, []);

    return (
        <div className={styles.checkboxContainer}>
            <label htmlFor={id}>{label}</label>
            <label htmlFor="trust-device" className="checkbox-label">
                <input
                    type="checkbox"
                    id={id}
                    name="trust-device"
                    onChange={handleChange}
                />
                Trust this device
            </label>
        </div>
    );
};

export default Checkbox;
