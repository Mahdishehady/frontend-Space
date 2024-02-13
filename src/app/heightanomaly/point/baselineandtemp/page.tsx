"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useSavePoint } from "@/app/services/pointservice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { truncate } from "fs/promises";
export type BsFsRequest = {
  point1: string;
  point2: string;
  bs: string;
  hdbs: string;
  tbs: string;
  fs: string;
  hdfs: string;
  tfs: string;
};

// const profileFormSchema = z.object({
//   point1: z
//     .string()
//     .min(2, {
//       message: "Name must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Name must not be longer than 30 characters.",
//     }),
//   point2: z
//     .string()
//     .min(2, {
//       message: "Name must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Name must not be longer than 30 characters.",
//     }),

//   bs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),

//   hdbs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),

//   tbs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),

//   fs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),

//   hdfs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),

//   tfs: z.string().min(1, {
//     message: "latdegree must be at least 1 digit.",
//   }),
// });

// export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {};

export default function PointForm() {
  // const form = useForm<ProfileFormValues>({
  //   resolver: zodResolver(profileFormSchema),
  //   defaultValues,
  //   mode: "onChange",
  // });

  const { mutate, status } = useMutation(useSavePoint, {
    onSuccess: (data) => {
      console.log(data);
      const message = data.message;

      if (message === "Point already exists") {
        // Handle point already exists
        toast.error(message);
      } else {
        // Handle data inserted successfully
        toast.success(message);
      }
    },
    onError: () => {
      alert("there was an error");
    },
  });

  async function onSubmit(data: BsFsRequest) {
    try {
      console.log(data);
      // mutate(data);

      // form.reset();
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
            className="w-6 h-6  ml-4 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          <h2 className="text-lg  tracking-tight">
            Point {">"} BaselineAndTemp
          </h2>
        </div>
      </div>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 h-[90vh] p-4"
        >
          <FormField
            control={form.control}
            name="point1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>StartPoint</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
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
                <FormLabel>EndPoint</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="intermediatepoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number Of Intermediate Point</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="w-full col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader className=" justify-center items-center">
                <CardTitle className="font-medium text-md">BS</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="bs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BS(m)</FormLabel>
                      <FormControl>
                        <Input placeholder="...." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hdbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HD(m)</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>T</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="w-full col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader className=" justify-center items-center">
                <CardTitle className="font-medium text-md">FS</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="fs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FS(m)</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hdfs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HD(m)</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tfs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>T</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>


          <Button className=" self-end w-full md:w-auto" type="submit">
            Add Point
          </Button>
        </form>
      </Form> */}

      <MainComponent />
    </MainLayout>
  );
}

const NumberInputComponent = ({ onSubmit }: any) => {
  const [number, setNumber] = useState("");

  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(number);
  };

  return (
    <div className="flex flex-col space-y-4 h-[90vh] p-4">
      <Label htmlFor="terms">Start Point</Label>
      <Input className="py-3" type="text" onChange={handleChange} />
      <Label htmlFor="terms">End Point</Label>
      <Input type="text" onChange={handleChange} />
      <Label htmlFor="terms">Number of Intermidate Points</Label>
      <Input type="number" value={number} onChange={handleChange} />

      <Button
        className=" self-end w-full md:w-auto"
        onClick={handleSubmit}
        type="submit"
      >
        Start Adding
      </Button>
    </div>
  );
};

const InputsComponent = ({ currentNumber, onSubmit ,Number}: any) => {
  const [name, setName] = useState("");
  const [bs, setBs] = useState("");
  const [hdbs, setHdbs] = useState("");
  const [tbs, setTbs] = useState("");
  const [fs, setFs] = useState("");
  const [hdfs, setHdfs] = useState("");
  const [tfs, setTfs] = useState("");

  const handleSubmit = () => {
    const inputData = {
      [name]: { bs, hdbs, tbs, fs, hdfs, tfs }
    };
    onSubmit(inputData);
    setName("");
    setBs("");
    setHdbs("");
    setTbs("");
    setFs("");
    setHdfs("");
    setTfs("");
  };

  return (
    
<div className="flex flex-col space-y-4 h-[90vh] p-4">
{currentNumber === Number ? (
        <h1>Enter Start Point</h1>
      ) : currentNumber > Number / 2 ? (
        <h1>Enter Forward Intermidate points</h1>
      ) : currentNumber === Number / 2 ? (
        <h1>Enter End Point</h1>
      ) : (
        <h1>Enter Backword Intermidate points</h1>
      )}
<Label htmlFor="terms">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3"
            type="text"
          />


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
      <Card className="w-full col-span-1 md:col-span-2 lg:col-span-2 ">
        <CardHeader className=" justify-center items-center">
          <CardTitle className="font-medium text-md">BS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
         
          <Label htmlFor="terms">bs(m)</Label>
          <Input
            value={bs}
            onChange={(e) => setBs(e.target.value)}
            className="py-3"
            type="text"
          />

          <Label htmlFor="terms">hdbs</Label>
          <Input
            value={hdbs}
            onChange={(e) => setHdbs(e.target.value)}
            className="py-3"
            type="text"
          />

          <Label htmlFor="terms">tbs</Label>
          <Input
            value={tbs}
            onChange={(e) => setTbs(e.target.value)}
            className="py-3"
            type="text"
          />
          
        </CardContent>
      </Card>

      <Card className="w-full col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader className=" justify-center items-center">
          <CardTitle className="font-medium text-md">FS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
        <Label htmlFor="terms">FS</Label>
          <Input
            value={fs}
            onChange={(e) => setFs(e.target.value)}
            className="py-3"
            type="text"
          />
          <Label htmlFor="terms">hdfs</Label>
          <Input
            value={hdfs}
            onChange={(e) => setHdfs(e.target.value)}
            className="py-3"
            type="text"
          />
          <Label htmlFor="terms">tfs</Label>
          <Input
            value={tfs}
            onChange={(e) => setTfs(e.target.value)}
            className="py-3"
            type="text"
          />
          


          
        </CardContent>
      </Card>
      <Button
        className=" self-end w-full md:w-auto"
        onClick={handleSubmit}
        type="submit"
      >
        Next
      </Button>
    </div>
    </div>
  );
};
const MainComponent = () => {
  const [showInputComponent, setShowInputComponent] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [Number, setNumber] = useState(0);
  const [inputs, setInputs] = useState<any>([]);

  const handleNumberSubmit = (num :any) => {
    setShowInputComponent(false);
    setNumber(((parseInt(num))* 2) +2)
    setCurrentNumber(((parseInt(num))* 2) +2);
  };

  const handleThreeInputsSubmit = (inputData :any) => {
    setInputs([...inputs, inputData]);
    setCurrentNumber(currentNumber - 1);
    if (currentNumber === 0) {
      setShowInputComponent(true);
      console.log('Final Inputs:', inputs);
    }
  };

  return (
    <div>
      {showInputComponent ? (
        <NumberInputComponent onSubmit={handleNumberSubmit} />
      ) : (
        <InputsComponent
          currentNumber={currentNumber}
          onSubmit={handleThreeInputsSubmit}
          Number={Number}
        />
      )}
    </div>
  );
};