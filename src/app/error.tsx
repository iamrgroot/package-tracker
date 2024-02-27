"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="tracking-tight">
            <h2 className="text-5xl font-extrabold">Something went wrong!</h2>
            <h4 className="text-xl">{error.message}</h4>
            <Button
                variant="secondary"
                className="mr-4 mt-10"
                onClick={() => reset()}
            >
                Try again
            </Button>
            <Link href="/">
                <Button>Go home</Button>
            </Link>
        </div>
    );
}
