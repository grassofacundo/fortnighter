import { ChangeEvent, FunctionComponent } from "react";

interface thisProps extends inputProp {
    fields: inputNumber;
}

const InputNumber: FunctionComponent<thisProps> = ({
    fields,
    formBody,
    onUpdateAnswer,
}) => {
    const { required, id, placeholder, /*maxLength,*/ label } = fields;
    const isRequired = required != null ? required : true;

    const validInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onHandleAddAnswer(target.id, target.value);
    };

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type="number"
                id={id}
                placeholder={placeholder}
                required={isRequired}
                onChange={(target) => validInput(target)}
            ></input>
        </div>
    );
};

export default InputNumber;
