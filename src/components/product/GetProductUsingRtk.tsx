"use client";

import { useGetProductsQuery } from "@/store/service/ProductApi";
import { ProductType } from "@/types/product";
import { IconH1 } from "@tabler/icons-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function GetProductUsingRtk() {
  // const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <h1>This is loading...</h1>;
  }

  if (error) {
    return <h1>It is error, pls check code </h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((product: ProductType) => (
        <div key={product.id} className="border p-4 rounded">
          <Image
            alt={product.title}
            src={product.images[0]}
            className="w-full h-40 object-cover"
            width="100"
            height="100"
          />
          <h2 className="font-bold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
