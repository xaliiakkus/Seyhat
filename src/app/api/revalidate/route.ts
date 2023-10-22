import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path');

    if (path) {
        revalidatePath(path);
        return new Response('True')
    }

    return new Response('false')
}