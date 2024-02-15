import { BASE_URL } from "../constants";


interface LevellingData {
    [key: string]: { 'H (Levelling) m': number };
}

 interface CalcDataTableParams {
    levelling: LevellingData;
    startPoint: string;
    endPoint: string;
}

export const calcDataTable = async (dataForPoints :CalcDataTableParams) => {
try{
//    const dataForPoints :any ={}
//    dataForPoints["levelling"]=levelling
//    dataForPoints["startPoint"]=startPoint
//    dataForPoints["endPoint"]=endPoint


    const response = await fetch(`${BASE_URL}/get-data-table`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForPoints),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the response data
    return data;
    } catch (error: any) {
    console.error("ERROR FROM TRY/CATCH", error.message);
    return error.message;
    }
}