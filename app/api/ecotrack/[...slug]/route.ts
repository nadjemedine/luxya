import { NextResponse } from 'next/server';
import { ECOTRACK_CONFIG } from '@/lib/ecotrack';

export async function GET(request: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params;
  return handleRequest(request, slug, 'GET');
}

export async function POST(request: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params;
  return handleRequest(request, slug, 'POST');
}

async function handleRequest(request: Request, slugArr: string[], method: string) {
  const slug = slugArr.join('/');
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  
  const token = process.env.ECOTRACK_API_TOKEN || '';
  
  if (!searchParams.has('api_token') && token) {
    searchParams.append('api_token', token);
  }
  
  const targetUrl = `${ECOTRACK_CONFIG.baseUrl}/${slug}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  try {
    console.log(`Proxying ${method} to: ${targetUrl}`);
    
    const requestOptions: any = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      // Cache GET requests for 1 hour
      ...(method === 'GET' ? { next: { revalidate: 3600 } } : {})
    };

    if (method === 'POST') {
      try {
        const body = await request.text();
        console.log(`[Proxy] POST body length: ${body.length}`);
        requestOptions.body = body;
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/json',
        };
      } catch (bodyErr) {
        console.error('[Proxy] Failed to read request body:', bodyErr);
      }
    }

    const response = await fetch(targetUrl, requestOptions);
    console.log(`[Proxy] EcoTrack Response Status: ${response.status}`);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || '60';
      return NextResponse.json({ 
        error: 'Too Many Requests', 
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter 
      }, { status: 429 });
    }
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`[Proxy] EcoTrack API Error (${response.status}) on ${slug}:`, text);
      
      // Try to parse as JSON to see if it's a structured error
      try {
        const errorJson = JSON.parse(text);
        return NextResponse.json({ 
          error: 'EcoTrack API reported an error', 
          message: errorJson.message || errorJson.error || `Error ${response.status}`,
          details: text,
          status: response.status 
        }, { status: response.status });
      } catch (e) {
        return NextResponse.json({ 
          error: 'EcoTrack API reported an error', 
          status: response.status, 
          details: text 
        }, { status: response.status });
      }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`[Proxy] Ecotrack Proxy ${method} Error (${slug}):`, error.message);
    return NextResponse.json({ error: 'Failed to fetch from EcoTrack', message: error.message, stack: error.stack }, { status: 500 });
  }
}
