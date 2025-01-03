import { BASE_URL } from "../constants";
import { convertArrayToObject } from "../helpers";

interface LevellingData {
  [key: string]: { "H_levelling_m": number };
}
interface LevellingItem {
    Point: string;
    "H_levelling_m": number;
  }

interface CalcDataTableParams {
  levelling: LevellingItem[];
  startPoint: string;
  endPoint: string;
}
interface CalcDataTableApi {
  levelling: LevellingData;
  startPoint: string;
  endPoint: string;
}

export const calcDataTable = async (dataForPoints: CalcDataTableParams) => {
  try {
    
    const levelling = convertArrayToObject(dataForPoints.levelling);

    const requestData: CalcDataTableApi = {
      levelling: levelling,
      startPoint: dataForPoints.startPoint,
      endPoint: dataForPoints.endPoint,
    };
    const response = await fetch(`${BASE_URL}/get-data-table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
};
