"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { BaseDoctor } from "@/services/doctors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  onSubmit: (data: BaseDoctor) => void;
  isPending?: boolean;
  initialValues?: any;
  setOpen?: any;
};

const doctorsFormSchema = z.object({
  Name: z.string().nonempty({ message: "Name is required" }),
  Number: z.string().nonempty({ message: "Number is required" }),
  Email: z.string().nonempty({ message: "Email is required" }),
  Specialization: z
    .string()
    .nonempty({ message: "Specialization is required" }),
});

type DoctorsFormValues = z.infer<typeof doctorsFormSchema>;

export function DoctorsForm({ initialValues, onSubmit, isPending }: Props) {
  const form = useForm<DoctorsFormValues>({
    resolver: zodResolver(doctorsFormSchema),
    mode: "onChange",
    defaultValues: {
      Name: initialValues?.Name ?? "",
      Number: initialValues?.Number ?? "",
      Email: initialValues?.Email ?? "",
      Specialization: initialValues?.Specialization ?? "",
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
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className={
                    form.control._formState.errors.Email &&
                    "ring-1 ring-red-500"
                  }
                  type="email"
                  placeholder="Enter Email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number</FormLabel>
              <FormControl>
                <Input
                  className={
                    form.control._formState.errors.Number &&
                    "ring-1 ring-red-500"
                  }
                  placeholder="Enter Number"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input
                  className={
                    form.control._formState.errors.Specialization &&
                    "ring-1 ring-red-500"
                  }
                  placeholder="Enter Specialization"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="Buttons flex justify-end gap-x-3">
          <Button type="submit">{isPending ? "Submiting..." : "Submit"}</Button>
        </div>
      </form>
    </Form>
  );
}
