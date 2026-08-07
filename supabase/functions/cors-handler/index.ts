import { corsHeaders } from 'npm:@supabase/supabase-js@^2/cors'

console.log('CORS Handler function ready!')

export default {
  async fetch(req: Request) {
    // Handle CORS preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          ...corsHeaders,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      })
    }

    // Handle actual requests
    try {
      const url = new URL(req.url)
      const supabaseUrl = 'https://wfwbkwjujlvirxjytihw.supabase.co'
      
      // Remove the function path from the URL
      const path = url.pathname.replace('/functions/v1/cors-handler', '')
      
      const response = await fetch(`${supabaseUrl}${path}`, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      })

      const responseHeaders = new Headers(response.headers)
      responseHeaders.set('Access-Control-Allow-Origin', '*')
      responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      
      return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          'Access-Control-Allow-Origin': '*',
        },
      })
    }
  },
}
