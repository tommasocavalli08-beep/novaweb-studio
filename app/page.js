import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
    const country =
        headers().get("x-vercel-ip-country") || "IT";

    if (country === "BR") {
        redirect("/pt");
    }

    redirect("/it");
}