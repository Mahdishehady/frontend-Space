    import { BASE_URL } from "../constants";


    interface DataPoint {
        bs: string;
        hdbs: string;
        tbs: string;
        fs: string;
        hdfs: string;
        tfs: string;
    }
    
    interface Data {
        [key: string]: DataPoint;
    }
    interface RequestBody {
        points: Data;
    }


    export const SavePairPoint = async (dataArray : Data[]) => {
    try{
        const dictionary: Data = {};

        dataArray.forEach((dataItem) => {
            const key = Object.keys(dataItem)[0];
            dictionary[key] = dataItem[key];
        });
        const requestBody: RequestBody = {
            points: dictionary
        };

        const response = await fetch(`${BASE_URL}/savepairpoint`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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