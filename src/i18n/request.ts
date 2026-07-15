import { getRequestConfig } from 'next-intl/server'
import enMessages from '@/locales/en.json'

export default getRequestConfig(async () => ({
	locale: 'en',
	messages: enMessages,
}))
