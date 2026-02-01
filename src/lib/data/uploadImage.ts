import axios from "axios";

export async function uploadImageToServer(image: FormData) {
  const base = process.env.NEXT_PUBLIC_API_BASE_API ?? "";
  const url = `${base}/api/v1/files/upload`;

  try {
    const response = await axios.post(url, image, {
      headers: {
        Accept: "*/*",
      },
    });

    // return response data directly to simplify callers
    return response.data;
  } catch (err: any) {
    // If server responded, include status and body for easier debugging
    if (err?.response) {
      console.error("Upload failed:", {
        status: err.response.status,
        data: err.response.data,
        url,
      });
      // Re-throw with attached info
      throw new Error(`Upload failed with status ${err.response.status}: ${JSON.stringify(err.response.data)}`);
    }
    console.error("Upload error:", err);
    throw err;
  }
}


// async function uploadProduct(product: PorductRequet){
//   const prod = await axios(`${process.env.NEXT_PUBLIC_API_BASE_API}/api/v1/products`, {
//     method: "POST",
//     headers: {
//       "Accept": "*/*",
//       "Content-Type": "multiple/form-data",
//     },
//     data: product
//   }




//   )
// }
