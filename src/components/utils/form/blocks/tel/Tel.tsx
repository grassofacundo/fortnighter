import { ChangeEvent, FunctionComponent } from "react";

interface thisProps extends inputProp {
    fields: tel;
}

const Tel: FunctionComponent<thisProps> = ({
    fields,
    formAnswers,
    onUpdateAnswer,
}) => {
    const { required, id, placeholder, maxLength, label } = fields;
    const isRequired = required != null ? required : true;

    const validInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onHandleAddAnswer(target.id, target.value);
    };

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                required={isRequired}
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={(target) => validInput(target)}
            ></input>
        </div>
    );
};

export default Tel;
