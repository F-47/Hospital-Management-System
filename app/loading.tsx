import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen md:py-0 md:-mt-20 ">
      <Loader2 className="w-10 h-10 animate-spin m-auto" />
    </div>
  );
};

export default loading;
