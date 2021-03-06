import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { firebaseCertificate } from '../../configs/configs'
import {
    SendMessageToDevices, SendMessageToTopic, SubscribeTokenToTopic,
    UnsubscribeTokenToTopic,
} from './models/firebase.interface'


@Injectable()
export class FireBaseService {
    constructor() {
        admin.initializeApp({
            databaseURL: 'https://schoolkids-3dd61-default-rtdb.firebaseio.com',
            credential: admin.credential.cert({
                projectId: 'schoolkids-3dd61',
                clientEmail: 'firebase-adminsdk-bwk88@schoolkids-3dd61.iam.gserviceaccount.com',
                privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClPwLZoPx4hYec\nctjdcUcpYBBp7OZexTO9b7wdl5dobM6RdAT2T+jhoQUAX7z54T+CFzc+9w8BKieW\nbKDKJwoX/mqhNIWLF7U0KH6YS1SCqj/BtGZPoto92b+t7aahaBi5h1U0BeASJZy4\nciH4msuEzlgGiEY0beAnlwkuj7H4D6JuFDXDL9e0TIjvKh5qM7v0El7meWFJp08y\nBCZP6JVIJVuWi1++wK8/GLdgaXMT5ZX5ZSrq1JBFggeTRWTD0X+iPcGaAiFyLOve\nYcS/W2G4OeNU7VMIODcg6vJhamQhiUwWF63ghwvURTYwHwtX4vNbRYba3sbC5pEr\no2m1ZETBAgMBAAECggEAAyRTUMwpjhNrNxY3mYrw7DBjfNbFsOQa032CIWWTj1H6\n9yjc+5+cgTEUqAOUqNiiTT4ql/55ESUvdaymPam9MfnC+8KEo9bPzx3SUwwi9M1k\nDcdjvEcPqLuQ6YTvqo57jTLYSSIFIbsy2LlHfD4Ejsd174ExpTIN9XAUUIe9aHFr\nK4Y07IIPFarI7EL4K5acqajl/DbiKIyQVxmJVWmx08LR77vVMHqnu+SD0Qi1Ll+d\nkElkonEFAHrRCFHGtcpRV+2AH7GOTQiirQybZY9v6lq5ILf9vPXSf/Hplk4uqnF5\nmI7/V6qUu2BHzMf0U++CcHBksyKHr++cQywfxlsrUQKBgQDNtpUvkAaBwMwP0er8\n+QSrbadkbdUYYwsQaUWm4m+pUexy8O9SOYZ0/vnA91+eoADkjgLXTQvw4fgzMpnq\nF2RddKQZAhVwEyCkRnyEZ1m+S7AfSfjmFW5Mb80k9Xtviw/mCulRYCJqlXlZJHME\nKYB8/vxPBLT+XFsZDDmIymiw2QKBgQDNpAV/b53n8ORix6IIEziQ7EVrwBPZh6qz\nTj1Jj3esikhhE8ZbFG/A0sp3DzQBHroyPFRJexm7sFfaV3+YAQvYdYDbltfkj0n4\n8F3S2/g6KObNHINNrfhFCD4aE2rcbB+24P6dsj78b9fubVwNxypZvvNUzF/iosgI\nzLqLEEhCKQKBgQC8kMMLyC/OvJXRYpDOtszq/ybTzkHpitBXiMgKA8JrKOdfLS+S\n5Zw0noz9r0P9OZnX57z+8mchtWE4PQgNJsgfSo4pRlm0VDQ1oU7+Z2ZCI0scQ0he\nUAK9GjanzEYLpyM5sYLRzxd9L+r+JYUwqYJYEbviCuSFzM7MlQIgO7nfcQKBgAJ4\nLMS5/2hwoR16jjyQloZPAApqNRLQqUEb+GpwuZwt0O6xgRlI5oqnPV0upo444z2F\nMfHr84QoevWZRWP65zyDNLfuWMta2SWPJWFJ2PJB2XuvEviU1T1m+u/vOcJJ3huh\nGg2kvVLkuPAZChj0QlLvkxZ6mdAr6kEIzFitKmD5AoGBAJNykRwr8rTIhWC0+hmZ\n4H5cW9jfA7IeOvKlC3xYmy/Tp9c0vdVlGApFgnn37l0nRhS4uaMeeG8O4jA76vud\njOJkIvKi/M4DlzW8OpBHEbdCskGCsXB2JYZHIFnCuMIKq97xNjOj85Jeexy0WXtG\nrn8joOlr3YHozCUJ5xuPcx/a\n-----END PRIVATE KEY-----\n'
            })
        });
    }

    // send message to devices by specific tokens
    async sendMessageToDevices({ tokens, notification, message, data }: SendMessageToDevices): Promise<boolean> {
        try {
            if (!notification && !message) {
                throw new Error('Notification or message is missing')
            }

            const payload: any = {}
            if (notification) {
                payload.notification = notification
                payload.data = data || {}
            }

            if (message) {
                payload.data = {
                    ...data,
                    ...message,
                }
            }

            const options = {
                priority: 'normal',
                timeToLive: 86400,
            }

            await admin.messaging().sendToDevice(tokens, payload, options)

            return true
        } catch (error) {
            return Promise.reject(error)
        }
    }

    // send message
    async sendMessageToTopic({ topic, notification, message, data }: SendMessageToTopic): Promise<boolean> {
        try {
            if (!notification && !message) {
                throw new Error('Notification or message is missing')
            }

            const payload: any = {}
            if (notification) {
                payload.notification = notification
                payload.data = data || {}
            }

            if (message) {
                payload.data = {
                    ...data,
                    ...message,
                }
            }

            const options = {
                priority: 'normal',
                timeToLive: 86400,
            }

            await admin.messaging().sendToTopic(topic, payload, options)

            return true
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async subscribeTokenToTopic({ tokens, topic }: SubscribeTokenToTopic): Promise<boolean> {
        try {
            if (!Array.isArray(tokens) || tokens.length === 0) {
                return
            }

            const result = await admin.messaging().subscribeToTopic(tokens, topic)

            return true
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async unsubscribeTokenFromTopic({ tokens, topic }: UnsubscribeTokenToTopic): Promise<boolean> {
        try {
            if (!Array.isArray(tokens) || tokens.length === 0) {
                return
            }

            await admin.messaging().unsubscribeFromTopic(tokens, topic)

            return true
        } catch (error) {
            return Promise.reject(error)
        }
    }
}