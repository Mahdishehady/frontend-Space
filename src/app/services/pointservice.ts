import { BASE_URL } from "@/app/constants";
import { PointRequest } from "../heightanomaly/point/addpoint/page";

export const useSavePoint = async (formData: PointRequest) => {
  try {
    // Serialize the formData object into query parameters
    const queryParams = new URLSearchParams(formData).toString();
    const url = `${BASE_URL}?${queryParams}`;

    // Make a GET request using fetch
    const response = await fetch(url);

    // Check if the request was successful
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
