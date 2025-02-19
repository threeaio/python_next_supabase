"use client"

import { createDoc } from "@/app/page.actions";
import { useActionState } from "react";

const initialState = {
    message: '',
  }
  
  export function CreateDocForm() {
  
    const [state, formAction, pending] = useActionState(createDoc, initialState)
  
    return (
      <form action={formAction} className="flex flex-col gap-2">
        <input 
          type="text" 
          name="title" 
            className="w-full px-3 placeholder:text-white/30 py-2 bg-black border border-white/20 rounded-md text-white font-[family-name:var(--font-geist-sans)] focus:outline-none focus:border-white"
        />
        <button 
          type="submit" 
            className="w-full py-2 px-4 bg-black text-white border border-white/20 font-[family-name:var(--font-geist-sans)] rounded-md hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
        >{pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    );
  }
  