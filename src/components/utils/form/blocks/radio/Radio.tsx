import { ChangeEvent, Fragment, FunctionComponent } from "react";

interface thisProps extends inputProp {
    fields: radio;
}

const Radio: FunctionComponent<thisProps> = ({
    fields,
    formBody,
    setFormBody,
}) => {
    const { required, radioElem, title, id, label } = fields;

    const validInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setFormBody({ ...formBody, [id]: target.value });
    };

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <p>{title}</p>
            {radioElem.map((elem) => (
                <Fragment key={elem.id}>
                    <label htmlFor={elem.id}>{elem.label}</label>
                    <input
                        type="radio"
                        id={elem.id}
                        name={elem.name}
                        value={elem.value}
                        required={required != null ? required : true}
                        onChange={(target) => validInput(target)}
                    />
                </Fragment>
            ))}
        </div>
    );
};

export default Radio;
