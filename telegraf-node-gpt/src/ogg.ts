import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import installer from '@ffmpeg-installer/ffmpeg'

import { createWriteStream } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { removeFile } from './utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
class OggConverter {
    constructor() {
        ffmpeg.setFfmpegPath(installer.path)
    }

    toMp3(input: string, output: string) {
        try {
            const outputPath = resolve(dirname(input), `${output}.mp3`)
            return new Promise((resolve, reject) => {
                ffmpeg(input)
                    .inputOption('-t 30')
                    .output(outputPath)
                    .on('end', () => {
                        removeFile(input)
                        resolve(outputPath)
                    })
                    .on('error', e => {
                        const error = e as Error
                        reject(error.message)
                    })
                    .run()
            })
        } catch (e) {
            const error = e as Error
            console.log('Errpr while toMp3', error.message)
        }
    }

    async create(url: string, filename: string) {
        try {
            const oggPath = resolve(__dirname, '../voices', `${filename}.ogg`)
            const response = await axios({
                method: 'get',
                url,
                responseType: 'stream',
            })
            return new Promise(resolve => {
                const stream = createWriteStream(oggPath)
                response.data.pipe(stream)
                stream.on('finish', () => resolve(oggPath))
            })
        } catch (e) {
            const error = e as Error
            console.log('Error while create oggConverter', error.message)
        }
    }
}

export const ogg = new OggConverter()
