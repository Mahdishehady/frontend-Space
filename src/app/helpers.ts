
interface LevellingData {
    [key: string]: { "H_levelling_m": number };
  }
  interface LevellingItem {
    Point: string;
    "H_levelling_m": number;
  }

export const convertArrayToObject = (dataArray: LevellingItem[]): LevellingData => {
    if(dataArray){
    const result: LevellingData = {};
    for (const item of dataArray) {
      result[item.Point] = { "H_levelling_m": item["H_levelling_m"] };
    }
    return result;}
    return {};
  };


  export const extractDecimalDegreesData = (data :any) => {
    const decimalDegreesData = data?.decimal_degrees_data;
    const headers = ["Point", "Latitude", "Longitude", "Geodetic Height"];
    const tableData = Object.entries(decimalDegreesData || {}).map(([point, values] :any) => ({
      Point: point,
      "Latitude Decimal Degrees": values["Latitude Decimal Degrees"],
      "Longitude Decimal Degrees": values["Longitude Decimal Degrees"],
      "Geodetic Height (h)": values["Geodetic Height (h)"],
    }));
    return { headers, data: tableData, description: "Decimal Degrees Data" };
  };



  export const transformNlevellingData = (data: any) => {
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      Point: key,
      "Geoid Undulation (NLevelling)": value["Geoid Undulation (NLevelling)"],
    }));
  }

  export const transformNEGM2008Data = (data: any) => {
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      Point: key,
      "Geoid Undulation (NEGM2008)": value["Geoid Undulation (NEGM2008)"],
    }));
  }


 export const filteredData =(data :any)=> Object.fromEntries(
    Object.entries(data).filter(([key]) => key !== 'Mean' && key !== 'STD DEV')
  );