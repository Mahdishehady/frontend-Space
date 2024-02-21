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
export type PointRequest = {
  Name: string;
  latdegree: string;
  latminute: string;
  latsecond: string;
  longdegree: string;
  longminute: string;
  longsecond: string;
  geodeticheight: string;
  h: string;
};

const profileFormSchema = z.object({
  Name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),

  latdegree: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
  latminute: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
  latsecond: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),

  longdegree: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
  longminute: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
  longsecond: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),

  geodeticheight: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
  h: z.string().min(1, {
    message: "latdegree must be at least 1 digit.",
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  Name: "", // Provide default value for Name
  latdegree: "", // Provide default value for latdegree
  latminute: "", // Provide default value for latminute
  latsecond: "", // Provide default value for latsecond
  longdegree: "", // Provide default value for longdegree
  longminute: "", // Provide default value for longminute
  longsecond: "", // Provide default value for longsecond
  geodeticheight: "", // Provide default value for geodeticheight
  h: "", // Provide default value for h
};

export default function PointForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

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

  async function onSubmit(data: PointRequest) {
    try {
      console.log(data);
      mutate(data);

      form.reset
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
          <h2 className="text-lg  tracking-tight">Point {">"} AddPoint</h2>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 h-[90vh] p-4"
        >
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PName</FormLabel>
                <FormControl>
                  <Input placeholder="point1" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="w-full col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader className=" justify-center items-center">
                <CardTitle className="font-medium text-md">
                  Latitude-Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="latdegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="degree" type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latminute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minute</FormLabel>
                      <FormControl>
                        <Input placeholder="min" type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latsecond"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Second</FormLabel>
                      <FormControl>
                        <Input placeholder="sec" type="number" {...field} />
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
                <CardTitle className="font-medium text-md">
                  longitude-Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="longdegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="degree" type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longminute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minute</FormLabel>
                      <FormControl>
                        <Input placeholder="min" type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longsecond"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Second</FormLabel>
                      <FormControl>
                        <Input placeholder="sec" type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <FormField
            control={form.control}
            name="geodeticheight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geodetic height</FormLabel>
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
            name="h"
            render={({ field }) => (
              <FormItem>
                <FormLabel>H</FormLabel>
                <FormControl>
                  <Input placeholder="...." type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" self-end w-full md:w-auto" type="submit">
            Add Point
          </Button>
        </form>
      </Form>
    </MainLayout>
  );
}
