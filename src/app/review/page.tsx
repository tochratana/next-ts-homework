// import { Suspense } from "react";

// async function getProductApi() {
//   const response = await fetch("https://api.escuelajs.co/api/v1/products");
//   const data = await response.json();
//   return data;
// }

// export default async function PageTesting() {
//   const products = await getProductApi();

//   return (
//     <div>
//       <Suspense fallback="This is laoding">
//         <h1>This is a page that I just testing</h1>

//         {products.slice(0, 5).map((p) => (
//           <p key={p.id}>{p.title}</p>
//         ))}
//       </Suspense>
//     </div>
//   );
// }

import { Suspense } from "react";

export default function PageTesting() {
  return (
    <div>
      <h1>This is a page that I just testing</h1>

      <Suspense fallback={<p>This is loading...</p>}>
        {/* <ProductList /> */}
      </Suspense>
    </div>
  );
}
