"use client";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { SavePairPoint } from "@/app/services/pairpoints";
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

export default function PointForm() {
  const { mutate, status } = useMutation(SavePairPoint, {
    onSuccess: (data) => {
      console.log(data);
      const message = data.message;
      toast.success(message, {
       
      }); 
      // if (message === "Point already exists") {
      //   // Handle point already exists
      //   toast.error(message);
      // } else {
      //   // Handle data inserted successfully
      //   toast.success(message);
      // }
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const Submitdata = async (data: any) => {
    try {
      console.log(data);
      await mutate(data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

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
            Point {">"} ADD Start_End Points
          </h2>
        </div>
      </div>

      <MainComponent Submitdata={Submitdata} />
    </MainLayout>
  );
}

const NumberInputComponent = ({ onSubmit }: any) => {
  const [number, setNumber] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };
  const handleChangeS = (event: any) => {
    setStartPoint(event.target.value);
  };
  const handleChangeE = (event: any) => {
    setEndPoint(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(number ,startPoint,endPoint);
  };

  return (
    <div className="flex flex-col space-y-4 h-[90vh] p-4">
      <Label htmlFor="terms">Start Point</Label>
      <Input className="py-3" type="text"  value={startPoint} onChange={handleChangeS} />
      <Label htmlFor="terms">End Point</Label>
      <Input type="text"  value={endPoint} onChange={handleChangeE} />
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

const InputsComponent = ({
  currentNumber,
  onSubmit,
  Numberin,
  // Submitdata,
}: any) => {
  const [name, setName] = useState("");
  const [bs, setBs] = useState("");
  const [hdbs, setHdbs] = useState("");
  const [tbs, setTbs] = useState("");
  const [fs, setFs] = useState("");
  const [hdfs, setHdfs] = useState("");
  const [tfs, setTfs] = useState("");

  const handleSubmit = () => {
    const inputData = {
      [name]: { bs, hdbs, tbs, fs, hdfs, tfs },
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
      <div className="flex flex-col space-y-4 h-[90vh] p-4">
        {currentNumber === Numberin ? (
          <h1>Enter Start Point</h1>
        ) : currentNumber > Numberin / 2 ? (
          <h1>Enter Forward Intermidate points</h1>
        ) : currentNumber === Numberin / 2 ? (
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
        </div>

        {currentNumber === 1 ? (
          <Button
            className=" self-end w-full md:w-auto"
            onClick={handleSubmit}
            type="submit"
          >
            Save Data
          </Button>
        ) : (
          <Button
            className=" self-end w-full md:w-auto"
            onClick={handleSubmit}
            type="submit"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
const MainComponent = ({ Submitdata }: any) => {
  const [showInputComponent, setShowInputComponent] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(-1);
  const [Numberin, setNumber] = useState(0);
  const [inputs, setInputs] = useState<any>([]);

  const handleNumberSubmit = (num: any,statrpoint :any ,endpoint :any) => {
    const pairName = { [statrpoint +'_'+ endpoint]:{ bs: "0", hdbs: "0", tbs: "0", fs: "0", hdfs: "0", tfs: "0"}, };
    setShowInputComponent(false);
    setNumber(parseInt(num) * 2 + 2);
    setCurrentNumber(parseInt(num) * 2 + 2);
    setInputs([...inputs, pairName]);
  };
  const HandleDataSubmit = ():any => {
   
      console.log("Inputs:", inputs);
      Submitdata(inputs);
   
  };
  const handleThreeInputsSubmit = (inputData: any) => {
    setInputs([...inputs, inputData]);
    setCurrentNumber(currentNumber - 1);

    
  };
  useEffect(() => {
    // this will trigger when search will get updated
    if (currentNumber === 0) {
      setShowInputComponent(true);
      console.log("Final Inputs:", inputs);
      Submitdata(inputs);
      // setInputs([])
    }
 }, [inputs]);

  return (
    <div>
      {showInputComponent ? (
        <NumberInputComponent onSubmit={handleNumberSubmit} />
      ) : (
        <InputsComponent
          currentNumber={currentNumber}
          onSubmit={handleThreeInputsSubmit}
          Numberin={Numberin}
          // Submitdata={HandleDataSubmit}
        />
      )}
    </div>
  );
};
