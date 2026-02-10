## របៀបដែល Server Side Rendering

SSR គឺជាការ render នៅ page html ជាមុនហើយទើបផ្ញើរទោកាន់ browser​ ។

តើពេលណាដែលយើងគួរប្រើប្រាស់នៅ Server Side Rendering ?

យើងគួតែប្រើប្រាស់នៅ Server Side Rendering ពេលដែល៖
- Page ត្រូវការនៅ Dynamic data​ វាតែងតែផ្លាស់ប្តូរ
- យើងត្រូវការនៅ SEO
- ត្រូវការនៅ data របស់ user (dashboard, profile, auth, ...)

**នៅពេលដែលយើងប្រើប្រាស់នៅ async + fetch នៅក្នុង component នោះវានឹង auto ជា SSR**

Example : 
```tsx
async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    cache: "no-store", // important → always SSR (fresh data)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.slice(0, 6).map((product: any) => (
        <div key={product.id} className="border rounded-lg p-4 shadow">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="font-bold mt-2">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```


ចំណុចសំខាន់ៗ ដែលយើងគួរដឹង៖
1. async component = SSR
```tsx
export default async function Page() {}
```
2. cache: "no-store" = Always SSR
3. Server console vs Browser console
```tsx
console.log("Hello");
// SSR → log នៅ Terminal / Server will see word server in console
// Client → log នៅ Browser will see only this word
```

របៀបដែល SSR ដំណើរការ
```bash
User → Request /products
        ↓
Next.js Server → Fetch API
        ↓
Render HTML with data
        ↓
Send HTML → Browser
        ↓
Hydration (React attach event)
```

