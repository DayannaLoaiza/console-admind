import { redirect } from "next/navigation";

export default function Page() {
  redirect("/management");
  return null;
}
