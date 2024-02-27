"use client";

import { type Package } from "@prisma/client";
import { Button } from "./ui/button";
import Link from "next/link";
import { revalidatePackages } from "~/server/actions/packages";

export default function PackageList(props: { packages: Package[] }) {
    return (
        <>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                Packages: {props.packages.length}
            </h1>

            <Button className="mt-10" onClick={() => revalidatePackages()}>
                Refresh
            </Button>

            <div className="my-10">
                {props.packages.map((packageItem) => (
                    <p key={packageItem.id}>
                        <Link
                            className="underline"
                            href={`/packages/${packageItem.id}`}
                        >
                            {packageItem.id}: {packageItem.name}
                        </Link>
                    </p>
                ))}
            </div>

            <Link href="/packages/create" className="my-4">
                <Button>Create</Button>
            </Link>
        </>
    );
}
