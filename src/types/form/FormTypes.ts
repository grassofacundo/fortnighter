type inputType =
    | "radio"
    | "text"
    | "password"
    | "number"
    | "mail"
    | "tel"
    | "customDate"
    | "checkbox";

interface inputBase {
    type: inputType;
    id: string;
    isOptional?: boolean;
}

interface input extends inputBase {
    label?: string;
}

type inputField =
    | customDate
    | radio
    | text
    | password
    | inputNumber
    | mail
    | tel
    | checkbox;

type answerValues = string | Date | boolean;
type formAnswersType = { id: string; value: answerValues; error?: string };
type action = {
    type: "added" | "changed" | "deleted";
    id: string;
    value?: answerValues;
    error?: string;
};

type error = {
    message: string;
    field: HTMLElement | null;
};

interface inputProp {
    formAnswers: formAnswersType[];
    onUpdateAnswer: (answer: formAnswersType) => void;
}
