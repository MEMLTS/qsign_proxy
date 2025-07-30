import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import "./index.css";

interface SignCount {
  [key: string]: string;
}

interface CmdList {
  code: number;
  msg: string;
  data: {
    list: string[];
  };
}

export function App() {
  const [runTime, setRunTime] = useState<number>(0);
  const [signCounts, setSignCounts] = useState<SignCount>({});
  const [selectedUin, setSelectedUin] = useState<string>("");
  const [uinCmdCount, setUinCmdCount] = useState<SignCount>({});
  const [whiteList, setWhiteList] = useState<string[]>([]);
  const [blackList, setBlackList] = useState<string[]>([]);


  return (
    <div className="container mx-auto p-8 relative z-10">
      <div className="grid gap-8">
      </div>
    </div>
  );
}

export default App;
