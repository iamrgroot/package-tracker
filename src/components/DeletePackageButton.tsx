"use client";

import type { Package } from "@prisma/client";
import { Button } from "./ui/button";
import { deletePackage } from "~/server/actions/packages";

export function DeletePackageButton(props: { packageData: Package }) {
    return (
        <Button
            className="mt-12"
            variant="destructive"
            onClick={() => deletePackage(props.packageData.id)}
        >
            Delete
        </Button>
    );
}
