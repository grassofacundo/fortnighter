import { useState, FunctionComponent, ChangeEvent } from "react";

interface thisProps extends inputProp {
    fields: customDate;
}

const DateInput: FunctionComponent<thisProps> = ({
    fields,
    formAnswers,
    onUpdateAnswer,
}) => {
    const [stateDate, setStateDate] = useState<dateState>({});
    const [error, setError] = useState<string>("");
    const { isOptional, id, dateFormat, dateElem } = fields;

    const isRequired = required != null ? required : true;

    const validInput = (
        date: dateElem,
        { target }: ChangeEvent<HTMLInputElement>
    ) => {
        const intValue = parseInt(target.value);

        if (target.value.length === 0) {
            handleError(target, "", date, intValue);
        } else if (typeof intValue !== "number") {
            let message = "Deben ser sólo números";
            handleError(target, message, date, intValue);
        } else if (date.minLength && target.value.length < date.minLength) {
            let message = `${date.name} debe ser de al menos ${date.minLength} caracteres`;
            handleError(target, message, date, intValue);
        } else if (date.maxLength && target.value.length > date.maxLength) {
            let message = `${date.name} no puede ser más de ${date.maxLength} caracteres`;
            handleError(target, message, date, intValue);
        } else if (target.min && intValue < parseInt(target.min)) {
            handleError(target, `El mínimo es ${target.min}`, date, intValue);
        } else if (target.max && intValue > parseInt(target.max)) {
            handleError(target, `El máximo es ${target.max}`, date, intValue);
        } else {
            if (
                Object.keys(stateDate).length === 3 ||
                (stateDate[date.id] == null &&
                    Object.keys(stateDate).length + 1 === dateFormat.length)
            ) {
                let copiedStateDate: dateState = JSON.parse(
                    JSON.stringify(stateDate)
                );
                //Adjust month value since 0 is january.
                copiedStateDate[Object.keys(copiedStateDate)[1]] =
                    copiedStateDate[Object.keys(copiedStateDate)[1]] - 1;
                copiedStateDate[date.id] = intValue;
                setStateDate({ ...stateDate, [date.id]: intValue });
                const unjoinedDate: any = dateFormat.map(
                    (date) => copiedStateDate[date]
                );
                const joinedDate: string = unjoinedDate.join();
                const finalDate: Date = new Date(joinedDate);

                setError("");
                onHandleAddAnswer(id, finalDate);
            } else {
                setError("");
                setStateDate({ ...stateDate, [date.id]: intValue });
            }
        }
    };

    const handleError = (
        target: EventTarget & HTMLInputElement,
        message: string,
        date: dateElem,
        intValue: number
    ) => {
        setStateDate({ ...stateDate, [date.id]: intValue });
        setError(message);
        onHandleDeleteAnswer(target.id);
    };

    return (
        <div>
            <label htmlFor={id}>"Label"</label>
            <div>
                {dateElem.map((date) => (
                    <input
                        key={date.id}
                        type="number"
                        id={date.id}
                        placeholder={date.placeholder}
                        min={date.min}
                        max={date.max}
                        required={!isOptional}
                        onChange={(target) => validInput(date, target)}
                    ></input>
                ))}
            </div>
            {error.length > 0 && <p>{error}</p>}
        </div>
    );
};

export default DateInput;
