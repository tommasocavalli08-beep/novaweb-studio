import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function Home() {
    const headersList = headers();

    const country =
        headersList.get("x-vercel-ip-country") || "IT";

    if (country === "BR") {
        redirect("/pt");
    }

    redirect("/it");
}