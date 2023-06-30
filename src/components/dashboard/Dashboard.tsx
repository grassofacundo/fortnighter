import { FunctionComponent, useState, useEffect } from "react";
import Calendar from "../calendar/Calendar";
import FormManager from "../utils/form/FormManager";
import styles from "./Dashboard.module.scss";
import dbService from "../../services/dbService";
import stringService from "../../services/stringService";
import Summary from "../summary/Summary";

type thisProps = unknown;

const Dashboard: FunctionComponent<thisProps> = () => {
    const [jobPositionList, setJobPositionList] = useState<jobPosition[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<string>("");
    const [Loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(answers: formAnswersType[]): Promise<void> {
        const positionNameAnswer = answers
            .filter((answer) => answer.id === "job-position")
            .at(0);
        const positionName = positionNameAnswer?.value as string;

        if (!positionName) {
            setErrorMsg("Error on form answers");
            return;
        }

        setLoading(true);
        const responseDb = await dbService.createJobPosition(positionName);
        console.log(responseDb);
        if (!responseDb.ok) {
            setErrorMsg(responseDb.errorMessage);
            return;
        }
        jobPositionList.forEach((job) => (job.isSelected = false));
        if (responseDb.ok) {
            setJobPositionList([
                ...jobPositionList,
                {
                    id: stringService.parseAsId(positionName),
                    name: positionName,
                    isSelected: true,
                },
            ]);
        }
        setLoading(false);
    }

    /*function getSelectedPosition(): jobPosition | void {
        return jobPositionList.find((job) => job.id === selectedPosition);
    }*/

    useEffect(() => {
        dbService.getJobPositions().then((response) => {
            if (response.ok) {
                const jobPosition = {
                    id: stringService.parseAsId(response.content.positionName),
                    name: response.content.positionName,
                    isSelected: true,
                };
                setJobPositionList([...jobPositionList, jobPosition]);
            }
        });
    }, [jobPositionList]);

    useEffect(() => {
        const selected = jobPositionList.find(
            (position) => position.isSelected
        );
        if (selected?.id) setSelectedPosition(selected.id);
    }, [jobPositionList]);

    return (
        <div className={styles.mainBody}>
            <div>
                <FormManager
                    inputs={[
                        {
                            type: "text",
                            id: "job-position",
                            placeholder: "Add new job position",
                        },
                    ]}
                    submitCallback={handleSubmit}
                    Loading={Loading}
                    serverErrorMsg={errorMsg}
                />
            </div>
            {selectedPosition && (
                <div className={styles.calendarContainer}>
                    <Calendar></Calendar>
                    <Summary></Summary>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
