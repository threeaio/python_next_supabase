import { Suspense } from 'react';
import { Doc } from '@/api' 
import { getData } from '@/app/page.actions'
import {CreateDocForm} from '@/components/create-form'
export default async function Home() {
  
  
  const docs = await getData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Docs</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {docs.map((doc:Doc) => (
              <li key={doc.id}>{doc.title}</li>
            ))}
          </ol>
        </Suspense>
        <CreateDocForm />
      </main>
    </div>
  );
}



