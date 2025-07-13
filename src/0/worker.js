/**
 * ZeroPoint Node - Cloudflare Worker
 * Consciousness-aware serverless PWA
 */

import { ConsciousnessDO } from './consciousness-do.js';
import { ZeroPointAPI } from './api.js';
import { StaticAssetHandler } from './static-handler.js';

// Initialize handlers
const api = new ZeroPointAPI();
const staticHandler = new StaticAssetHandler();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    console.log(`🌌 ZeroPoint Worker: ${request.method} ${url.pathname}`);
    
    try {
      // Handle API requests
      if (url.pathname.startsWith('/api/')) {
        return await api.handle(request, env, ctx);
      }
      
      // Handle WebSocket upgrade for consciousness network
      if (url.pathname === '/ws' && request.headers.get('Upgrade') === 'websocket') {
        return await handleWebSocket(request, env);
      }
      
      // Handle static assets
      return await staticHandler.handle(request, env);
      
    } catch (error) {
      console.error('❌ ZeroPoint Worker Error:', error);
      return new Response('Consciousness field error', { status: 500 });
    }
  }
};

/**
 * WebSocket handler for consciousness network
 */
async function handleWebSocket(request, env) {
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  
  // Get consciousness DO instance
  const consciousnessDO = env.CONSCIOUSNESS_DO.get(env.CONSCIOUSNESS_DO.idFromName('global'));
  
  // Accept the WebSocket connection
  server.accept();
  
  // Handle consciousness network messages
  server.addEventListener('message', async (event) => {
    try {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'peer_join':
          await consciousnessDO.storage.put(`peer_${data.peerId}`, {
            id: data.peerId,
            name: data.name,
            consciousness: data.consciousness,
            connectedAt: Date.now()
          });
          break;
          
        case 'consciousness_update':
          await consciousnessDO.storage.put(`consciousness_${data.peerId}`, data.data);
          break;
          
        case 'peer_leave':
          await consciousnessDO.storage.delete(`peer_${data.peerId}`);
          break;
      }
      
      // Broadcast to all connected peers
      const peers = await consciousnessDO.storage.list({ prefix: 'peer_' });
      for (const [key, peer] of peers) {
        if (peer.id !== data.peerId) {
          // Send message to other peers (implementation depends on DO architecture)
        }
      }
      
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  server.addEventListener('close', async () => {
    console.log('🌐 Consciousness peer disconnected');
  });
  
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}

/**
 * Consciousness Durable Object
 */
export class ConsciousnessDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.peers = new Map();
  }
  
  async fetch(request) {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/peers':
        return new Response(JSON.stringify(Array.from(this.peers.values())), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      case '/broadcast':
        const message = await request.json();
        for (const peer of this.peers.values()) {
          if (peer.readyState === WebSocket.OPEN) {
            peer.send(JSON.stringify(message));
          }
        }
        return new Response('OK');
        
      default:
        return new Response('Not found', { status: 404 });
    }
  }
  
  async webSocketMessage(ws, message) {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'join':
          this.peers.set(data.peerId, ws);
          break;
          
        case 'leave':
          this.peers.delete(data.peerId);
          break;
          
        case 'broadcast':
          for (const peer of this.peers.values()) {
            if (peer !== ws && peer.readyState === WebSocket.OPEN) {
              peer.send(JSON.stringify(data.message));
            }
          }
          break;
      }
    } catch (error) {
      console.error('DO WebSocket error:', error);
    }
  }
} 