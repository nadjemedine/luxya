export interface Wilaya {
  wilaya_id: number;
  wilaya_name: string;
}

export interface Commune {
  nom: string;
  wilaya_id: number;
  code_postal: string;
  has_stop_desk: number;
}

export interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const ECOTRACK_CONFIG = {
  baseUrl: process.env.ECOTRACK_BASE_URL || 'https://navexdelivery.ecotrack.dz/api/v1',
};

export const ecotrack = {
  async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    // If on client, use the proxy
    const isClient = typeof window !== 'undefined';
    const url = isClient 
      ? `/api/ecotrack${endpoint}`
      : `${ECOTRACK_CONFIG.baseUrl}${endpoint}`;
    
    const headers: any = {
      'Accept': 'application/json',
      ...options.headers,
    };

    // Only add token if server-side. Proxy handles it for client-side.
    if (!isClient) {
      headers['Authorization'] = `Bearer ${process.env.ECOTRACK_API_TOKEN || ''}`;
    }
    
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          if (text) errorMessage = `${errorMessage} - ${text.slice(0, 200)}`;
        }
      } catch { /* could not read body */ }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  async getWilayas(): Promise<Wilaya[]> {
    return this.fetchWithAuth('/get/wilayas');
  },

  async getCommunes(wilayaId?: number): Promise<Commune[]> {
    const endpoint = wilayaId ? `/get/communes?wilaya_id=${wilayaId}` : '/get/communes';
    const data = await this.fetchWithAuth(endpoint);
    // Communes are returned as an object with numeric keys in the example
    return Object.values(data);
  },

  async getCenters(wilayaId: number): Promise<Center[]> {
    try {
      const data = await this.fetchWithAuth(`/get/centers?wilaya_id=${wilayaId}`);
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        return Object.values(data);
      }
      throw new Error('Empty centers list');
    } catch (e) {
      console.warn('Could not fetch centers, using fallback from communes:', e);
      // Fallback is handled in the UI by filtering communes with has_stop_desk: 1
      return [];
    }
  },

  async getFees(wilayaId: number): Promise<any> {
    try {
      // Trying common ecotrack endpoint for fees
      return await this.fetchWithAuth(`/get/fees?wilaya_id=${wilayaId}`);
    } catch (e) {
      console.warn('Could not fetch fees:', e);
      return null;
    }
  },

  async createOrder(orderData: any) {
    return this.fetchWithAuth('/create/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  },

  async validateToken(): Promise<{ success: boolean; message: string }> {
    return this.fetchWithAuth('/validate/token');
  }
};
