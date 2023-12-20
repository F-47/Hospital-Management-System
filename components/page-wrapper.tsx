import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col px-16 py-5 space-y-2 bg-zinc-100 flex-grow">
      {children}
    </div>
  );
}
