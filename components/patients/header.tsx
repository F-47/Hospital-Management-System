"use client";
import { PatientsForm } from "@/components/patients/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePatient } from "@/services/actions";
import { PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

function PatientsHeader() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Patients</h1>
          <p>A list of all the patients</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusIcon size={20} />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">Add Patient</DialogTitle>
              <PatientsForm
                onSubmit={(data) =>
                  startTransition(async () => {
                    const res = await CreatePatient(data);
                    if (res.success) {
                      toast.success(
                        res?.message ?? "Patient created successfully!"
                      );
                      setOpen(false);
                    }
                  })
                }
                isPending={isPending}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default PatientsHeader;
