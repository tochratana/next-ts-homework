## Route in Next.ts

ក្នុងបរិបទ Next.js Routing គឺជាយន្តការផ្អែកលើ file-system បង្កើតមកស្រាប់ ដែលតភ្ជាប់ files និង folders ក្នុង project ទៅកាន់ URL ដោយស្វ័យប្រវត្តិ។Next.js អាចដំណើរការ routing ដោយខ្លួនឯង ទាំង Static, Dynamic, Nested និង API routes មិនដូច React ដែលតម្រូវឱ្យដំឡើង Library React Routing បន្ថែមដើម្បីអាចដំណើរការបាននោះទេ។

Route សំខាន់៖
1. File-System Based Routing (Page route នៅក្នុង file `page/` និង App route នៅក្នុង `app/`)
2. Route Segments: ទីតាំង folder នីមួយៗតំណាងឱ្យ route segment ដែលអនុញ្ញាតឱ្យយើង access ទៅកាន់ file ក្នុង folder បាន។

ប្រភេទរបស់ route៖
- static route
- dynamic route
- nested route
- api route
- Catch-All Routes
- Parallel Routes
- Intercepting Routes
- Route Groups
- Middleware (Proxy)

**Navigation** ក្នុង Next.js គឺជាដំណើរការនៃការផ្លាស់ប្ដូរ (moving) រវាង pages ដោយមិន reload browser ឡើងវិញ

`Parallel Routes`: Parallel routes គឺជាវិធីមួយដើម្បីបង្ហាញ page ច្រើននៅក្នុង view ដូចគ្នា ។ ពួក វាត្រូវបានកំណត់ដោយប្រើប្រាស់រន្ធ (slots) ដែលជា folders ពិសេសដែល prefixed ដោយនិមិត្តសញ្ញា the @ symbol (ឧទាហរណ៍៖ @analytics, @team) ។
[dmeo](../src/app/parallel/readme.md)

`Intercepting Routes`: Intercepting routes អនុញ្ញាត្តិឲ្យអ្នកផ្លាស់ប្ដូរ the route ដើម្បីបង្ហាញ content នៅក្នុងបរិបទនៃ the current layout ទោះបីជាគោលដៅដែលបានបម្រុងទុកគឺជា a URL ផ្សេងក៏ដោយ ។