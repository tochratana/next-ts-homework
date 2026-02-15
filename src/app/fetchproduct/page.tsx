// "use client";

import getProductForLearning from "@/lib/data/getProduct";
import { use } from "react";

export default function Page() {
  const data = use(getProductForLearning());
  console.log("Here :", data);
  return <h1>Hello</h1>;
}
