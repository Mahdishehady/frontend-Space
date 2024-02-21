"use client";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Tablecalc } from "./component/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "react-query";
import { calcDataTable } from "@/app/services/datatableservice";
import { toast } from "react-toastify";
import {
  extractDecimalDegreesData,
  transformNlevellingData,
  transformNEGM2008Data,
  filteredData,
} from "@/app/helpers";
import { getNLevelling } from "@/app/services/nlevelling";
import { getNEGM2008 } from "@/app/services/getNEGM2008";
import { getmeandeviation } from "@/app/services/meandeviationService";

interface RodTempCorrBaselineItem {
  "Mean Temp": number;
  "Stand Temp": number;
  "Diff in Elev": number;
  "Thermal Expansion coefficient": number;
  "Temp-Error": number;
  "Adj Temp Diff in Elev": number;
}
const levelling_headers = ["Point", "H_levelling_m"];
const meandeviationheaders = ["Point", "ΔN", "V", "V^2"];
const rodTempCorrBaselineheaders = [
  "Mean_Temp",
  "Stand_Temp",
  "Diff_Elev",
  "Thermal_Coef",
  "Temp_error",
  "AdjTemp_Elev",
];

const NLevelling_headers = ["Point", "Geoid Undulation (NLevelling)"];

const NEGM2008headers = ["Point", "Geoid Undulation (NEGM2008)"];

interface misclousreBaseline {
  AdjTempDiffInElev: number;
  Error: number;
  AdjDiffInElev: number;
}
const misclousreBaselineheader = [
  "AdjTempDiffInElev",
  "Error",
  "AdjDiffInElev",
];

const decimaldegreesdataheader = [
  "Point",
  "Latitude",
  "Longitude",
  "Geodetic Height",
];

interface LevellingData {
  [key: string]: { H_levelling_m: number };
}
const profileFormSchema = z.object({
  point1: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  point2: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});
export type PointsRequest = {
  point1: string;
  point2: string;
};

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
const defaultValues: Partial<ProfileFormValues> = {

  point1: "", // Provide default value for point1
  point2: "", // Provide default value for point2
};

export default function Tables() {
  const [levellingData, setLevellingData] = useState<LevellingData[]>([]);
  const [clicked, setclicked] = React.useState<boolean>(false);
  const [showNlevelingTable, setshowNlevelingTable] =
    React.useState<boolean>(false);
  const [showNEGM2008Table, setshowNEGM2008Table] =
    React.useState<boolean>(false);
  const [showmeandeviation, setshowmeandeviation] =
    React.useState<boolean>(false);
  const [rodTempCorrBaseline, setrodTempCorrBaseline] = useState<
    RodTempCorrBaselineItem[]
  >([]);
  const [misclousreBaseline, setrodmisclousreBaseline] = useState<
    misclousreBaseline[]
  >([]);
  const [decimaldegreesdata, setdecimaldegreesdata] = useState<any>([]);

  const [NLevellingData, setNLevellingData] = useState<any>([]);
  const [descriptionData, setdescriptionData] = useState<any>({});
  const [NEGM2008data, setNEGM2008data] = useState<any>([]);
  const [meandeviationdata, setmeandeviationdata] = useState<any>([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const calctabeldata = useMutation(calcDataTable, {
    onSuccess: (data) => {
      if (data) {
        if (data.data.levelling) {
          const levellingData_api = Object.entries(data.data.levelling).map(
            ([point, data]: any) => ({
              Point: point,
              H_levelling_m: data["H_levelling_m"],
            })
          );
          setLevellingData(levellingData_api);

          if (data.data.rod_temp_corr_baseline) {
            const rodTempCorrBaselineData: RodTempCorrBaselineItem[] =
              Object.values(data.data.rod_temp_corr_baseline);
            setrodTempCorrBaseline((prevRodTempCorrBaseline) => [
              ...prevRodTempCorrBaseline,
              ...rodTempCorrBaselineData,
            ]);
          }
          if (data.data.misclosure_baseline) {
            const misclosureBaselineKeys = Object.keys(
              data.data.misclosure_baseline
            );
            const newDataArray: misclousreBaseline[] = [];
            misclosureBaselineKeys.forEach((key) => {
              const misclosureBaselineData = data.data.misclosure_baseline[key];
              newDataArray.push({
                AdjTempDiffInElev:
                  misclosureBaselineData["Adj Temp Diff in Elev"],
                Error: misclosureBaselineData.Error,
                AdjDiffInElev: misclosureBaselineData["Adj Diff in Elev"],
              });
            });
            setrodmisclousreBaseline((prevData) => [
              ...prevData,
              ...newDataArray,
            ]);
          }
          if (true) {
            const {
              headers,
              data: decimalDegreesTableData,
              description,
            } = extractDecimalDegreesData(data.data);
            setdecimaldegreesdata((prevData: any) => [
              ...prevData,
              ...decimalDegreesTableData,
            ]);
          }
          setclicked(true);
          toast.success("calculated successfully!!");
        }
        else {
          toast.error(
            "Oops! Looks like there's a little hiccup 🤔. It seems points haven't been entered yet."
          );
        }
       
      } 
    },

    onError: () => {
      alert("there was an error");
    },
  });

  const CalculateGeoidUndulationNLevel = useMutation(getNLevelling, {
    onSuccess: (data) => {
      if (data) {
        const nlevelingData = transformNlevellingData(data);
        setNLevellingData(nlevelingData);
        toast.success("NLevelling calculated successfully!!");

        setshowNlevelingTable(true);
      }
    },
  });

  const getGeoidUndulationNEGM2008 = useMutation(getNEGM2008, {
    onSuccess: (data) => {
      if (data) {
        const NEGM2008Data = transformNEGM2008Data(data);
        setNEGM2008data(NEGM2008Data);
        toast.success("NLevelling calculated successfully!!");
        setshowNEGM2008Table(true);
      }
    },
  });

  const meandeviation = useMutation(getmeandeviation, {
    onSuccess: (data) => {
      if (data) {
        const description: any = {};
        description["mean"] = data["Mean"];
        description["STD"] = data["STD DEV"];

        setdescriptionData(description);
        const dataafterfilter = filteredData(data);
        const tableData = Object.entries(dataafterfilter).map(
          ([key, value]: [string, any]) => ({
            Point: key,
            ΔN: value["ΔN"],
            V: value["V"],
            "V^2": value["V^2"],
          })
        );
        setmeandeviationdata(tableData);
        toast.success("Meandeviation calculated successfully!!");
        setshowmeandeviation(true);
      }
    },
  });

  async function onSubmit(data: PointsRequest) {
    try {
      const dataForPoints: any = {};
      dataForPoints["levelling"] = levellingData;
      dataForPoints["startPoint"] = data.point1;
      dataForPoints["endPoint"] = data.point2;
      console.log(data);

      calctabeldata.mutateAsync(dataForPoints);

      form.reset();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between space-y-2 py-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-4 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <h2 className="text-lg  tracking-tight">Analysis {">"} Tables</h2>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  md:items-end md:flex-row gap-7 p-4"
        >
          <FormField
            control={form.control}
            name="point1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point1</FormLabel>
                <FormControl>
                  <Input placeholder="point1" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="point2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point2</FormLabel>
                <FormControl>
                  <Input placeholder="point2" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" lg:pb-2">
            <Button className="  w-full md:w-auto" type="submit">
              Calculate & AddMore
            </Button>
          </div>
        </form>
      </Form>

      <div className="py-4 flex-row gap-4  ">
        {clicked && (
          <>
            <div className="col-span-1 grid grid-cols-12 gap-2 py-1">
              <Card className=" col-span-3">
                <CardHeader className="items-center justify-center">
                  <CardTitle className=" text-xl font-bold">
                    Levelling
                  </CardTitle>
                </CardHeader>
                <Tablecalc headers={levelling_headers} data={levellingData} />
              </Card>

              <Card className=" col-span-9">
                <CardHeader className="items-center justify-center">
                  <CardTitle className="  text-xl font-bold">
                    RodTempCorr Baseline
                  </CardTitle>
                </CardHeader>
                <Tablecalc
                  headers={rodTempCorrBaselineheaders}
                  data={rodTempCorrBaseline}
                />
              </Card>
            </div>
            <div className="col-span-1 grid grid-cols-12 gap-2 py-1">
              <Card className=" col-span-3">
                <CardHeader className="items-center justify-center">
                  <CardTitle className="text-xl font-bold">Levelling</CardTitle>
                </CardHeader>
                <Tablecalc headers={levelling_headers} data={levellingData} />
              </Card>

              <Card className=" col-span-9">
                <CardHeader className="items-center justify-center">
                  <CardTitle className=" text-xl font-bold">
                    Misclousre Baseline
                  </CardTitle>
                </CardHeader>
                <Tablecalc
                  headers={misclousreBaselineheader}
                  data={misclousreBaseline}
                />
              </Card>
            </div>
            <div className="col-span-1 grid grid-cols-12 gap-2 py-1">
              <Card className=" col-span-12">
                <CardHeader className="items-center justify-center">
                  <CardTitle className=" text-xl font-bold">
                    Decimal Degrees
                  </CardTitle>
                </CardHeader>
                <Tablecalc
                  headers={decimaldegreesdataheader}
                  data={decimaldegreesdata}
                />
              </Card>
            </div>
          </>
        )}
      </div>

      {clicked && (
        <div className="flex flex-col justify-between  gap-4  sm:flex-row sm:gap-4">
          <div className=" lg:pb-2">
            <Button
              className="  w-full md:w-auto"
              onClick={() => {
                const dataForPoints: any = {};
                dataForPoints["levelling"] = levellingData;
                CalculateGeoidUndulationNLevel.mutateAsync(dataForPoints);
              }}
            >
              Calculate Geoid Undulation(NLevel)
            </Button>
          </div>
          <div className=" lg:pb-2">
            <Button
              className="  w-full md:w-auto"
              onClick={() => {
                const dataForPoints: any = {};
                dataForPoints["levelling"] = levellingData;
                getGeoidUndulationNEGM2008.mutateAsync(dataForPoints);
              }}
            >
              Calculate Geoid Undulation(NEGM2008)
            </Button>
          </div>
          <div className=" lg:pb-2">
            <Button
              className="  w-full  md:w-auto"
              onClick={() => {
                const dataForPoints: any = {};
                dataForPoints["levelling"] = levellingData;
                meandeviation.mutateAsync(dataForPoints);
              }}
            >
              Calculate Standard Deviation
            </Button>
          </div>
        </div>
      )}

      <div className="py-4 flex-row gap-4  ">
        <div className="col-span-1 grid grid-cols-12 gap-2 py-1">
          {showNlevelingTable && (
            <Card className=" col-span-6">
              <CardHeader className="items-center justify-center">
                <CardTitle className=" text-xl font-bold">
                  Geoid Undulation (NLevelling)
                </CardTitle>
              </CardHeader>
              <Tablecalc headers={NLevelling_headers} data={NLevellingData} />
            </Card>
          )}

          {showNEGM2008Table && (
            <Card className=" col-span-6">
              <CardHeader className="items-center justify-center">
                <CardTitle className="  text-xl font-bold">
                  Geoid Undulation (NEGM2008)
                </CardTitle>
              </CardHeader>
              <Tablecalc headers={NEGM2008headers} data={NEGM2008data} />
            </Card>
          )}
        </div>
        <div className="col-span-1 grid grid-cols-12 gap-2 py-1">
          {showmeandeviation && (
            <Card className=" col-span-12">
              <CardHeader className="items-center justify-center">
                <CardTitle className="  text-xl font-bold">
                  Standard Deviation
                </CardTitle>
              </CardHeader>
              <Tablecalc
                headers={meandeviationheaders}
                data={meandeviationdata}
                description={descriptionData}
              />
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
