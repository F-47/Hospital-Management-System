"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { GetPatient, deletePatient, updatePatient } from "@/services/patients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeletePatient, UpdatePatient } from "@/services/actions";
import { GetDoctor } from "@/services/doctors";
import { DoctorsForm } from "./form";

export const columns: ColumnDef<GetDoctor>[] = [
  {
    accessorKey: "ID",
    header: "id",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "Number",
    header: "Number",
  },
  {
    accessorKey: "Specialization",
    header: "Specialization",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DoctorsAction doctor={row.original} />,
  },
];

export function DoctorsAction({ doctor }: { doctor: GetDoctor }) {
  const [isPending, startTransition] = useTransition();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setEditOpen(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => setDeleteOpen(true)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DoctorsForm
              onSubmit={(data) =>
                startTransition(async () => {
                  const res = await UpdatePatient(doctor.ID, data);
                  if (res.success) {
                    toast.success(
                      res?.message ?? "Patient updated successfully!"
                    );
                    setEditOpen(false);
                  }
                })
              }
              isPending={isPending}
              initialValues={doctor}
              setOpen={setEditOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this doctor?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              doctor and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                startTransition(async () => {
                  const res = await DeletePatient(doctor.ID);
                  if (res.success) {
                    toast.success(res.message);
                    setDeleteOpen(false);
                  } else {
                    toast.error(res.message);
                  }
                });
              }}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}
