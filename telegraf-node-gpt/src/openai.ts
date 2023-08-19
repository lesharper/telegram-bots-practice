import OpenAI from 'openai'
import config from 'config'
import { createReadStream } from 'fs'
import { CreateChatCompletionRequestMessage } from 'openai/resources/chat/index'
class OpenAITg {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }
    openai
    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey,
        })
    }

    async chat(messages: Array<CreateChatCompletionRequestMessage>) {
        try {
            const response = await this.openai.chat.completions.create({ model: 'gpt-4', messages })
            return response.choices[0].message
        } catch (e) {
            const error = e as Error
            console.log('Error while chat', error.message)
        }
    }

    async transcription(filePath: string) {
        try {
            const response = await this.openai.audio.transcriptions.create({
                file: createReadStream(filePath),
                model: 'whisper-1',
            })
            return response.text
        } catch (e) {
            const error = e as Error
            console.log('Error while transcription', error.message)
        }
    }
}
export const openAiTg = new OpenAITg(config.get('OPENAI_TOKEN'))
