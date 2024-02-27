import PackageList from "~/components/PackageList";
import { fetchPackages, revalidatePackages } from "~/server/actions/packages";

export default async function HomePage() {
    await revalidatePackages();
    const packages = await fetchPackages();

    return <PackageList packages={packages} />;
}
