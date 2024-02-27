"use server";

import { ZodError, z } from "zod";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { sleep } from "../helper";

const packageSchema = z.object({
  name: z.string().min(1).max(255),
  provider: z.string().min(1).max(255),
  url: z.string().min(1).url(),
});

export async function revalidatePackages() {
  revalidateTag("packages");
}

export async function fetchPackages() {
  return db.package.findMany();
}

export type PackageFormState = {
  message: string;
  error?: ReturnType<ZodError["flatten"]>;
};

export async function findPackage(id: number) {
  return db.package.findFirstOrThrow({
    where: {
      id: id,
    },
  });
}

export async function createPackage(
  previousState: PackageFormState,
  formData: FormData,
): Promise<PackageFormState> {
  try {
    const data = packageSchema.parse(Object.fromEntries(formData.entries()));

    await sleep(2000);
    await db.package.create({ data });
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        message: error.name,
        error: error.flatten(),
      };
    }
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "?",
    };
  }

  await revalidatePackages();
  redirect("/");
}
