/*import { useState, FunctionComponent, ChangeEvent } from "react";

interface thisProps extends inputProp {
    fields: customDate;
}

const DateInput: FunctionComponent<thisProps> = ({
    fields,
    onUpdateAnswer,
    formAnswers
}) => {
    const [stateDate, setStateDate] = useState<dateState>({});
    const [error, setError] = useState<string>("");
    const { isOptional, id, dateFormat, dateElem } = fields;

    function handleChange(
        date: dateElem,
        { target }: ChangeEvent<HTMLInputElement>
    ) {
        let error = "";
        const intValue = parseInt(target.value);
        const stateDate = formAnswers.find(answer => answer.id === id) ?? { id: "", value: new Date, error: ""};

        if (typeof intValue !== "number") error = "Must be only numbers";
        if (!error && date.minLength && target.value.length < date.minLength)
            error = `${date.name} should be at least ${date.minLength} characters`;
        if (!error && date.maxLength && target.value.length > date.maxLength)
            error = `${date.name} cannot be longer than ${date.maxLength} characters`;
        if (!error && target.min && intValue < parseInt(target.min))
            error = `Minimum is ${target.min}`;
        if (!error && target.max && intValue > parseInt(target.max)) {
            error = `Maximum is ${target.max}`;
        }

        if (
            Object.keys(stateDate.value).length === 3 ||
            (stateDate.value[date.id] == null &&
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
                        onChange={(target) => handleChange(date, target)}
                    ></input>
                ))}
            </div>
            {error.length > 0 && <p>{error}</p>}
        </div>
    );
};

export default DateInput;
*/
