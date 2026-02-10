## RTK Query

RTK Query use for data fetching inside RTK(Redux Toolkit)

វាជួយយើងនៅក្នុងការ :
- Fetch API automatically
- Cache data
- Auto re-fetch
- Loading & error state
- No manual useEffect + fetch
- Generate React hooks automatically

```ts
// Instead of
useEffect(() => {
  fetch(...)
}, [])

// You do
const { data, isLoading, error } = useGetProductsQuery();
```

1. Install
```bash
npm install @reduxjs/toolkit react-redux
```
2. Create API Slice
> store/services/productApi.ts
```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/",
  }),

  endpoints: (builder) => ({
    // GET /products
    getProducts: builder.query<any, void>({
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
```

3. Add API to Store
```ts
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
};

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
```


4. Use in Component
```tsx
"use client";

import { useGetProductsQuery } from "@/store/services/productApi";

export default function Products() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((product: any) => (
        <div key={product.id} className="border p-4 rounded">
          <img src={product.images[0]} className="w-full h-40 object-cover" />
          <h2 className="font-bold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```
```ts
const { refetch } = useGetProductsQuery();

<button onClick={refetch}>Reload</button>
```