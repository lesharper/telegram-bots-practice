import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'

import config from 'config'

import { ogg } from './ogg.js'
import { openAiTg } from './openai.js'
import { ChatCompletionMessage } from 'openai/resources/chat/index'

const INITIAL_SESSION = {
    messages: [],
}

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.use(session())

bot.command('new', async ctx => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.session = INITIAL_SESSION
    await ctx.reply('Жду вашего голосового или текстового сообщения')
})

bot.command('start', async ctx => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.session = INITIAL_SESSION
    await ctx.reply('Жду вашего голосового или текстового сообщения')
})

bot.on(message('voice'), async ctx => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.session ??= INITIAL_SESSION
    try {
        await ctx.reply(code('Обработка сообщения сервером...'))
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
        const userId = String(ctx.message.from.id)

        const oggPath = (await ogg.create(link.href, userId)) as string
        const mp3Path = (await ogg.toMp3(oggPath, userId)) as string

        const text = (await openAiTg.transcription(mp3Path)) as string

        await ctx.reply(code(`Ваш запрос ${text}`))

        ctx.session.messages.push({ role: openAiTg.roles.USER, content: text })
        const response = (await openAiTg.chat(messages)) as ChatCompletionMessage
        ctx.session.messages.push({ role: openAiTg.roles.ASSISTANT, content: response.content })
        await ctx.reply(response.content as string)
    } catch (e) {
        const error = e as Error
        console.log('Error while voice message', error.message)
    }
})

bot.on(message('text'), async ctx => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.session ??= INITIAL_SESSION
    try {
        await ctx.reply(code('Обработка сообщения сервером...'))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.session.messages.push({ role: openAiTg.roles.USER, content: ctx.message.text })
        const response = (await openAiTg.chat(ctx.session.messages)) as ChatCompletionMessage
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.session.messages.push({ role: openAiTg.roles.ASSISTANT, content: response.content })
        await ctx.reply(response.content as string)
    } catch (e) {
        const error = e as Error
        console.log('Error while voice message', error.message)
    }
})

await bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
