import OpenAI from 'openai';

export default {
	async fetch(request, env, ctx) {
		const client = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});

		try {
			const { text, language } = await request.json();

			if (!text || !language) {
				return new Response('Missing text or language field');
			}

			const messages = [
				{
					role: 'system',
					content: `You are a translation assistant. Translate the following text into ${language}. Only return the translated text.`,
				},
				{
					role: 'user',
					content: text,
				},
			];

			const response = await client.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: messages,
			});

			const translation = response.choices?.[0]?.message?.content;

			return new Response(JSON.stringify({ translation }));
		} catch (error) {
			return new Response(error);
		}
	},
};
