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
  }
interface CalcDataTableApi {
  levelling: LevellingData;
  startPoint: string;
  endPoint: string;
}

export const getmeandeviation = async (dataForPoints: CalcDataTableParams) => {
  try {
    
    const levelling :LevellingData = convertArrayToObject(dataForPoints.levelling);

    const response = await fetch(`${BASE_URL}/getmeandeviation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(levelling),
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
