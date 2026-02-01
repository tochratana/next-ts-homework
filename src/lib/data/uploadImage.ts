import axios from "axios";

async function uploadImage(image: FormData) {
  const response = await axios(
    `${process.env.NEXT_PUBLIC_API_BASE_API}/api/v1/files/upload`,
    {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "multiple/form-data",
      },
      data: image,
    },
  );

  return response.data;
}


async function uploadProduct(product: PorductRequet){
  const prod = await axios(`${process.env.NEXT_PUBLIC_API_BASE_API}/api/v1/products`, {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Content-Type": "multiple/form-data",
    },
    data: product
  }




  )
}
