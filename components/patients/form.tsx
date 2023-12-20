"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { BasePatient, GetPatient } from "@/services/patients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctors";
import { getNurses } from "@/services/nurses";
import { getRooms } from "@/services/rooms";
import { getTreatments } from "@/services/treatments";
import NurseSelector from "../nurse-selector";

type Props = {
  onSubmit: (data: BasePatient) => void;
  isPending?: boolean;
  initialValues?: GetPatient;
  setOpen?: any;
};

const patientsFormSchema = z.object({
  Name: z.string().nonempty({ message: "Name is required" }),
  BirthDate: z.string().nonempty({ message: "Birth date is required" }),
  Address: z.string().nonempty({ message: "Address is required" }),
  Disease: z.string().nonempty({ message: "Disease is required" }),
  StartDate: z.string().nonempty({ message: "Start date is required" }),
  DoctorID: z.coerce.number().min(1),
  RoomID: z.coerce.number().min(1),
  TreatmentID: z.coerce.number().min(1),
  Numbers: z.object({
    PatientNumber: z.string().nonempty({
      message: "Patient number is required",
    }),
    FamilyNumber: z.string().nonempty({
      message: "Family number is required",
    }),
  }),
  Nurses: z.array(z.coerce.number().min(1)),
});

type PatientsFormValues = z.infer<typeof patientsFormSchema>;

export function PatientsForm({ initialValues, onSubmit, isPending }: Props) {
  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  const { data: treatments } = useQuery({
    queryKey: ["treatments"],
    queryFn: getTreatments,
  });

  const form = useForm<PatientsFormValues>({
    resolver: zodResolver(patientsFormSchema),
    mode: "onChange",
    defaultValues: {
      Name: initialValues?.Name ?? "",
      BirthDate: initialValues?.BirthDate ?? "",
      Address: initialValues?.Address ?? "",
      Disease: initialValues?.Disease ?? "",
      StartDate: initialValues?.StartDate ?? "",
      DoctorID: initialValues?.DoctorID ?? 0,
      RoomID: initialValues?.RoomID ?? 0,
      TreatmentID: initialValues?.TreatmentID ?? 0,
      Numbers: {
        PatientNumber: initialValues?.Numbers?.PatientNumber ?? "",
        FamilyNumber: initialValues?.Numbers?.FamilyNumber ?? "",
      },
      Nurses: initialValues?.Nurses.map((nurse: any) => nurse.ID) ?? [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className={
                    form.control._formState.errors.Name && "ring-1 ring-red-500"
                  }
                  placeholder="Enter Name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-5">
          <FormField
            control={form.control}
            name="BirthDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Birth Date</FormLabel>
                <Input
                  className={
                    form.control._formState.errors.BirthDate &&
                    "ring-1 ring-red-500"
                  }
                  type="date"
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address</FormLabel>
                <Input
                  className={
                    form.control._formState.errors.Address &&
                    "ring-1 ring-red-500"
                  }
                  placeholder="Enter address"
                  {...field}
                />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="StartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <Input
                className={
                  form.control._formState.errors.StartDate &&
                  "ring-1 ring-red-500"
                }
                type="date"
                {...field}
              />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-5">
          <FormField
            control={form.control}
            name="DoctorID"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Doctor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        form.control._formState.errors.DoctorID &&
                        "ring-1 ring-red-500"
                      }
                    >
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors?.map((doctor) => {
                      return (
                        <SelectItem key={doctor.ID} value={String(doctor.ID)}>
                          {doctor.Name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="RoomID"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        form.control._formState.errors.RoomID &&
                        "ring-1 ring-red-500"
                      }
                    >
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rooms?.map((room) => {
                      return (
                        <SelectItem key={room.ID} value={String(room.ID)}>
                          {room.Type}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-x-5">
          <FormField
            control={form.control}
            name="Disease"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Disease</FormLabel>
                <Input
                  className={
                    form.control._formState.errors.Disease &&
                    "ring-1 ring-red-500"
                  }
                  type="text"
                  placeholder="Enter disease"
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TreatmentID"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Treatment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        form.control._formState.errors.TreatmentID &&
                        "ring-1 ring-red-500"
                      }
                    >
                      <SelectValue placeholder="Select Treatment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {treatments?.map((treatment) => {
                      return (
                        <SelectItem
                          key={treatment.ID}
                          value={String(treatment.ID)}
                        >
                          {treatment.Type}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <FormField
            control={form.control}
            name="Numbers.PatientNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Patient Number</FormLabel>
                <Input
                  className={
                    form.control._formState.errors.Numbers?.PatientNumber &&
                    "ring-1 ring-red-500"
                  }
                  type="text"
                  placeholder="Enter patient number"
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Numbers.FamilyNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Family Number</FormLabel>
                <Input
                  className={
                    form.control._formState.errors.Numbers?.FamilyNumber &&
                    "ring-1 ring-red-500"
                  }
                  type="text"
                  placeholder="Enter family number"
                  {...field}
                />
              </FormItem>
            )}
          />
        </div>
        <NurseSelector
          value={form.getValues("Nurses")}
          onChange={(nurses) => form.setValue("Nurses", nurses)}
        />

        <div className="Buttons flex justify-end gap-x-3">
          <Button type="submit">{isPending ? "Submiting..." : "Submit"}</Button>
        </div>
      </form>
    </Form>
  );
}
