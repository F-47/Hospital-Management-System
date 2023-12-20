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
import { PatientsForm } from "./form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { GetPatient, deletePatient, updatePatient } from "@/services/patients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeletePatient, UpdatePatient } from "@/services/actions";

export const columns: ColumnDef<GetPatient>[] = [
  {
    accessorKey: "ID",
    header: "id",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "BirthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Disease",
    header: "Disease",
  },
  {
    accessorKey: "StartDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {new Date(row.original.StartDate).toDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <PatientActions patient={row.original} />,
  },
];

export function PatientActions({ patient }: { patient: GetPatient }) {
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
            <PatientsForm
              onSubmit={(data) =>
                startTransition(async () => {
                  const res = await UpdatePatient(patient.ID, data);
                  if (res.success) {
                    toast.success(
                      res?.message ?? "Patient updated successfully!"
                    );
                    setEditOpen(false);
                  }
                })
              }
              isPending={isPending}
              initialValues={patient}
              setOpen={setEditOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this patient?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              patient and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                startTransition(async () => {
                  const res = await DeletePatient(patient.ID);
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
