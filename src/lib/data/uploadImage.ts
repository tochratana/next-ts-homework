import axios from "axios";
import { PorductRequet } from "../types/productRequest";

export async function uploadImageToServer(image: FormData) {
  const base = process.env.NEXT_PUBLIC_API_BASE_API;
  const url = `${base}/api/v1/files/upload`;

  const response = await axios.post(url, image, {
    method: "POST",
    headers: {
      Accept: "*/*",
    },
  });

  // return response data directly to simplify callers
  return response.data;
}

export async function createProduct(productPayload: PorductRequet) {
  const base = process.env.NEXT_PUBLIC_API_BASE_API;
  const url = `${base}/api/v1/products`;

  const response = await axios.post(url, productPayload);
  console.log("Product created:", response.data);
  return response.data;
}