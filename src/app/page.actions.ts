"use server"

import { api } from "@/utils/api-client"
import { Doc } from "@/api"
import { revalidatePath } from "next/cache"

export async function getData(): Promise<Doc[]> {
    return api.get('/data')
}

export interface CreateDocState {
    message: string
}

export async function createDoc(_prevState: CreateDocState, formData: FormData) {
    const title = formData.get("title") as string
    await api.post('/data', { title })
    revalidatePath('/data');
    return { message: "Doc created" }
}