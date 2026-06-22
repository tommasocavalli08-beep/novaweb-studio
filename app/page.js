import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
    const country =
        headers().get("x-vercel-ip-country") || "IT";

    redirect(country === "BR" ? "/pt" : "/it");
}