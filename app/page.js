import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function Page() {
    const country = headers().get("x-vercel-ip-country") || "IT";

    redirect(country === "BR" ? "/pt" : "/it");
}