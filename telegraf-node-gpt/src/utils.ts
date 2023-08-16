import { unlink } from 'fs/promises'

export async function removeFile(path: string) {
    try {
        await unlink(path)
    } catch (e) {
        const error = e as Error
        console.log(error.message)
    }
}
