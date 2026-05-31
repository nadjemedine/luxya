import { NextResponse } from 'next/server';
import { ECOTRACK_CONFIG } from '@/lib/ecotrack';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const trackingCode = url.searchParams.get('tracking');

  if (!trackingCode) {
    return NextResponse.json({ success: false, message: 'Tracking code is required' }, { status: 400 });
  }

  const token = process.env.ECOTRACK_API_TOKEN;
  
  if (!token) {
    return NextResponse.json({ success: false, message: 'API validation token missing' }, { status: 500 });
  }

  try {
    // Note: The specific EcoTrack endpoint for reading tracking status varies.
    // The user provided the precise tracking endpoint for EcoTrack.
    const targetUrl = `${ECOTRACK_CONFIG.baseUrl}/get/maj?tracking=${trackingCode}`;

    const response = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // cache temporarily
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ success: false, message: 'Tracking number not found or invalid.' }, { status: 404 });
      }
      const text = await response.text();
      throw new Error(`Failed to fetch from Ecotrack: ${response.status} ${text}`);
    }

    const data = await response.json();
    
    // Normalize data if necessary so frontend components consistently receive { status, updated_at, location, history: [] }
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Tracking API Error:', error);
    // As a demonstration/fallback when endpoint is missing:
    // return NextResponse.json({ status: 'En cours de traitement', updated_at: new Date().toISOString(), location: 'Centre de tri' });
    
    return NextResponse.json({ 
      success: false, 
      message: 'Service is currently unavailable, or the endpoint needs to be configured correctly in the backend.' 
    }, { status: 500 });
  }
}
