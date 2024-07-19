This is a [Next.js](https://nextjs.org/) single page application (SPA) proof of concept, that uses server-side rendering (SSR) and client-side rendering (CSR) of components to display a list of notes fetched from the Pocketbase database server.

Pocketbase is a lightweight server (using SQLite) to create/manage datamodels from which data can be fetched through their API.

<img width="555" alt="_react-next-pocketbase-poc-screenshot-1" src="https://github.com/user-attachments/assets/49139ab3-f4e9-4569-9dc9-2503d412d1df">


## Getting Started

First in the terminal run to install package:
```bash
npm i
```

Run the pocketbase db server:
```bash
./pocketbase serve
```

Now open another terminal tab and run the development server to start the SPA:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
