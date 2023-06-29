type dateElem = {
    id: string;
    placeholder: string;
    name: string;
    min: number;
    max: number;
    minLength: number;
    maxLength: number;
};

type dateFormat = [string, string, string];

type dateState = { [key: string]: number };

interface customDate extends inputBase {
    dateFormat: dateFormat;
    title: string;
    dateElem: dateElem[];
}
