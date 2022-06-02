import { useState } from "react";
import ColumnsDefinitions from "../reducers/ColumnsDefinitions";

export default function useColumnMapper(dataType: string) {
    const [columns, setColumns] = useState<any>(ColumnsDefinitions.definition[dataType].columnMapper);
    const [savedValues, setSavedValues] = useState<any>(ColumnsDefinitions.definition[dataType].savedValues);

    function modifyColumnAtt(column: string, atribute: string, value: any) {
        var temporaryColumns = columns;
        temporaryColumns[column][atribute] = value;
        setColumns({ ...temporaryColumns });
    }

    function modifySavedFilters(filters: any) {
        ColumnsDefinitions.definition[dataType].savedValues = filters;
        setSavedValues({ ...filters });
    }

    return [columns, modifyColumnAtt, savedValues, modifySavedFilters];
}
