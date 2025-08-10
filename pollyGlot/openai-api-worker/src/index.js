import OpenAI from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}

		const client = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/3dfb1a331dc3ffca1719d331edbbb8eb/pollyglot/openai',
		});

		try {
			const { text, language } = await request.json();

			if (!text || !language) {
				return new Response(JSON.stringify({ error: 'Missing text or language field' }), {
					status: 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
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

			return new Response(JSON.stringify({ translation }), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
