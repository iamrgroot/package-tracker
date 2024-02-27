import Link from "next/link";
import { findPackage } from "~/server/actions/packages";

export default async function PackagePage({
  params,
}: {
  params: { packageId: string };
}) {
  const packageData = await findPackage(Number(params.packageId));

  return (
    <>
      <Link href="/">Home</Link>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Package: {packageData.name}
      </h1>
      <h4 className="mt-12">
        <Link href={packageData.url} target="_blank">{packageData.url}</Link>
      </h4>
    </>
  );
}
