import { parse } from 'dotenv'
import * as fs from 'fs'
const filePath = '.env'

export const configData = parse(fs.readFileSync(filePath))

export const firebaseCertificate = {
    projectId: configData.FIREBASE_PROJECTID,
    privateKey: configData.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: configData.FIREBASE_CLIENT_EMAIL,
}