"use client";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import React from "react";
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

const levelling_headers = ["Point", "H(Levelling)"];

const levelling = [
  {
    Point: "PT4",
    "H(Levelling)": 242.08,
  },
  {
    Point: "CP",
    "H(Levelling)": 241.3424,
  },
  {
    Point: "PT1",
    "H(Levelling)": 325.0174,
  },
];

const rodTempCorrBaselineheaders = [
  "Mean_Temp",
  "Stand_Temp",
  "Diff_Elev",
  "Thermal_Coef",
  "Temp_error",
  "AdjTemp_Elev",
];
const rodTempCorrBaseline = [
  {
    Mean_Temp: 22.0892857,
    Stand_Temp: 20.0,
    Diff_Elev: 0.73754968,
    Thermal_Coef: 0.0000238,
    Temp_error: 0.0000366747,
    AdjTemp_Elev: 0.73758635,
  },
  {
    Mean_Temp: 18.97,
    Stand_Temp: 20.0,
    Diff_Elev: -82.93838944,
    Thermal_Coef: 0.0000238,
    Temp_error: 0.0020331517,
    AdjTemp_Elev: -82.93635629,
  },
  {
    Mean_Temp: 18.97,
    Stand_Temp: 20.0,
    Diff_Elev: -82.93838944,
    Thermal_Coef: 0.0000238,
    Temp_error: 0.0020331517,
    AdjTemp_Elev: -82.93635629,
  },
];

const misclousreBaselineheader = [
  "AdjTempDiffInElev",
  "Error",
  "AdjDiffInElev",
];
const misclousreBaseline = [
  {
    AdjTempDiffInElev: -82.93635629,
    Error: 0.001,
    AdjDiffInElev: -82.93735629,
  },
  {
    AdjTempDiffInElev: 0.73758635,
    Error: -7.1054273576e-15,
    AdjDiffInElev: 0.73758635,
  },
  {
    AdjTempDiffInElev: -82.93635629,
    Error: 0.001,
    AdjDiffInElev: -82.93735629,
  },
];

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
const defaultValues: Partial<ProfileFormValues> = {};
export default function Tables() {
  const [clicked, setclicked] = React.useState<boolean>(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  async function onSubmit(data: PointsRequest) {
    try {
      console.log(data);

      setclicked(true);
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
          className="flex flex-col  items-end md:flex-row gap-7 p-4"
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
              Calculate
            </Button>
          </div>
          {clicked && (
            <>
              <div className=" lg:pb-2">
                <Button className="  w-full md:w-auto" type="submit">
                  Calculate Geoid Undulation(NLevel)
                </Button>
              </div>
              <div className=" lg:pb-2">
                <Button className="  w-full md:w-auto" type="submit">
                  Calculate Geoid Undulation(NEGM2008)
                </Button>
              </div>
              <div className=" lg:pb-2">
                <Button className="  w-full  md:w-auto" type="submit">
                  Calculate Standard Deviation
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>

      <div className="py-4 flex-row gap-4  ">
        {clicked && (
          <>
            <div className="col-span-1 grid grid-cols-12 gap-2 py-2">
              <Card className=" col-span-3">
                <CardHeader className="items-center justify-center">
                  <CardTitle className=" text-xl font-bold">
                    Levelling
                  </CardTitle>
                </CardHeader>
                <Tablecalc headers={levelling_headers} data={levelling} />
              </Card>

              <Card className=" col-span-9">
                <CardHeader className="items-center justify-center">
                  <CardTitle className="  text-xl font-bold">
                    RodTempCorrBaseline
                  </CardTitle>
                </CardHeader>
                <Tablecalc
                  headers={rodTempCorrBaselineheaders}
                  data={rodTempCorrBaseline}
                />
              </Card>
            </div>
            <div className="col-span-1 grid grid-cols-12 gap-2 py-2">
              <Card className=" col-span-3">
                <CardHeader className="items-center justify-center">
                  <CardTitle className="text-xl font-bold">Levelling</CardTitle>
                </CardHeader>
                <Tablecalc headers={levelling_headers} data={levelling} />
              </Card>

              <Card className=" col-span-9">
                <CardHeader className="items-center justify-center">
                  <CardTitle className=" text-xl font-bold">
                    MisclousreBaseline
                  </CardTitle>
                </CardHeader>
                <Tablecalc
                  headers={misclousreBaselineheader}
                  data={misclousreBaseline}
                />
              </Card>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
