"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "@/services/doctors";
import { getDoctors } from "@/services/doctors";
import { columns } from "@/components/doctors/columns";
import { DoctorsForm } from "@/components/doctors/form";
import { toast } from "sonner";

type Props = {};

function Doctors({}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor Created Successfully!");
      setOpen(false);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p>A list of all the doctors</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusIcon size={20} />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">Add Doctor</DialogTitle>
              <DoctorsForm
                onSubmit={(data) => mutate(data)}
                isPending={isPending}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {doctors && <DataTable data={doctors} columns={columns} />}
    </div>
  );
}

export default Doctors;
