import axios from 'axios'

const OPENROUTER_KEY = 'your-api-key-here' // Use .env for safety

export async function getBotReply(prompt: string): Promise<{
  intent: string
  data: any
  message: string
}> {
  const res = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: `
You are a billing assistant AI. Only help users with:
- Airtime purchase
- Data purchase
- Cable TV payment
- Electricity bill
- Schedule purchases
- View transaction history
- Help with deposit
- Navigate to pages like dashboard, profile, history

Respond only in this format:
{
  "intent": "purchase_airtime",
  "data": {
    "network": "MTN",
    "amount": 2000,
    "phone": "08023456789"
  },
  "message": "Buying ₦2000 airtime for 08023456789 on MTN."
}
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const result = res.data.choices[0].message.content
  return JSON.parse(result)
}
