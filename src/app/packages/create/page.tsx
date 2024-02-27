"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type PackageFormState, createPackage } from "~/server/actions/packages";


function Submit() {
    const {pending} = useFormStatus();

    return <Button
        disabled={pending}
        type="submit"
    >
        {pending ? "Saving..." : "Submit"}
    </Button>
  }

function getMessage(formState: PackageFormState, field: string): string|undefined {
    return formState.error?.fieldErrors?.[field]?.join(', ');
}

export default function CreatePage() {
  const [formState, action] = useFormState(createPackage, {
    message: "",
  });

  return (
    <form action={action} className="grid gap-4">
      <Input name="name" placeholder="Name" />
      <Label htmlFor="name">{getMessage(formState, 'name')}</Label>

      <Input name="provider" placeholder="Provider" />
      <Label htmlFor="name">{getMessage(formState, 'provider')}</Label>

      <Input name="url" placeholder="Url" />
      <Label htmlFor="name">{getMessage(formState, 'url')}</Label>

      <Submit />

      <Label>{formState.message}</Label>
    </form>
  );
}
