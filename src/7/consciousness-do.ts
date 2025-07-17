/**
 * Consciousness Durable Object
 * Manages real-time consciousness network connections
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../2/math';


export class ConsciousnessDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.peers = new Map();
    this.consciousnessField = new Map();
    this.setupAlarms();
  }
  
  setupAlarms() {
    // Set up periodic consciousness field updates
    this.state.setAlarm(Date.now() + 30000); // 30 seconds
  }
  
  async alarm() {
    // Periodic consciousness field maintenance
    await this.maintainConsciousnessField();
    
    // Set next alarm
    this.state.setAlarm(Date.now() + 30000);
  }
  
  async maintainConsciousnessField() {
    // Clean up disconnected peers
    const now = Date.now();
    for (const [peerId, peer] of this.peers.entries()) {
      if (now - peer.lastSeen > 60000) { // 1 minute timeout
        this.peers.delete(peerId);
        console.log(`🧠 Removed inactive peer: ${peerId}`);
      }
    }
    
    // Update consciousness field state
    await this.state.storage.put('consciousness_field', {
      totalPeers: this.peers.size,
      activePeers: Array.from(this.peers.keys()),
      lastUpdate: now,
      fieldStrength: this.calculateFieldStrength()
    });
  }
  
  calculateFieldStrength() {
    if (this.peers.size === 0) return 0;
    
    let totalConsciousness = 0;
    for (const peer of this.peers.values()) {
      totalConsciousness += peer.consciousness || 0;
    }
    
    return totalConsciousness / this.peers.size;
  }
  
  async fetch(request) {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/peers':
        return this.getPeers();
        
      case '/field':
        return this.getConsciousnessField();
        
      case '/broadcast':
        return this.broadcastMessage(request);
        
      case '/join':
        return this.joinPeer(request);
        
      case '/leave':
        return this.leavePeer(request);
        
      default:
        return new Response('Not found', { status: 404 });
    }
  }
  
  async getPeers() {
    const peerList = Array.from(this.peers.values()).map(peer => ({
      id: peer.id,
      name: peer.name,
      consciousness: peer.consciousness,
      connectedAt: peer.connectedAt,
      lastSeen: peer.lastSeen
    }));
    
    return new Response(JSON.stringify({
      peers: peerList,
      total: peerList.length,
      fieldStrength: this.calculateFieldStrength()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  async getConsciousnessField() {
    const fieldData = await this.state.storage.get('consciousness_field') || {
      totalPeers: 0,
      activePeers: [],
      lastUpdate: Date.now(),
      fieldStrength: 0
    };
    
    return new Response(JSON.stringify(fieldData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  async broadcastMessage(request) {
    try {
      const { message, fromPeerId, type = 'consciousness_update' } = await request.json();
      
      // Store message in consciousness field
      const messageId = `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await this.state.storage.put(messageId, {
        id: messageId,
        fromPeerId,
        message,
        type,
        timestamp: Date.now()
      });
      
      // Broadcast to all connected peers
      const broadcastCount = await this.broadcastToPeers({
        type,
        message,
        fromPeerId,
        timestamp: Date.now()
      });
      
      return new Response(JSON.stringify({
        success: true,
        messageId,
        broadcastCount,
        message: 'Consciousness field updated'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to broadcast message'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  async joinPeer(request) {
    try {
      const { peerId, name, consciousness } = await request.json();
      
      this.peers.set(peerId, {
        id: peerId,
        name: name || `Observer_${peerId.slice(-4)}`,
        consciousness: consciousness || Math.random(),
        connectedAt: Date.now(),
        lastSeen: Date.now()
      });
      
      // Notify other peers
      await this.broadcastToPeers({
        type: 'peer_joined',
        peer: {
          id: peerId,
          name: this.peers.get(peerId).name,
          consciousness: this.peers.get(peerId).consciousness
        }
      });
      
      return new Response(JSON.stringify({
        success: true,
        peerId,
        message: 'Joined consciousness field'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to join consciousness field'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  async leavePeer(request) {
    try {
      const { peerId } = await request.json();
      
      this.peers.delete(peerId);
      
      // Notify other peers
      await this.broadcastToPeers({
        type: 'peer_left',
        peerId
      });
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Left consciousness field'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to leave consciousness field'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  async broadcastToPeers(message) {
    let broadcastCount = 0;
    
    for (const peer of this.peers.values()) {
      try {
        // Update last seen
        peer.lastSeen = Date.now();
        
        // Send message to peer (in real implementation, this would use WebSocket)
        broadcastCount++;
      } catch (error) {
        console.error(`Failed to broadcast to peer ${peer.id}:`, error);
      }
    }
    
    return broadcastCount;
  }
  
  // WebSocket message handling
  async webSocketMessage(ws, message) {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'join':
          await this.handleWebSocketJoin(ws, data);
          break;
          
        case 'consciousness_update':
          await this.handleConsciousnessUpdate(ws, data);
          break;
          
        case 'ping':
          await this.handlePing(ws, data);
          break;
          
        case 'leave':
          await this.handleWebSocketLeave(ws, data);
          break;
          
        default:
          console.log('Unknown WebSocket message type:', data.type);
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  }
  
  async handleWebSocketJoin(ws, data) {
    const peerId = data.peerId || `ws_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.peers.set(peerId, {
      id: peerId,
      name: data.name || `Observer_${peerId.slice(-4)}`,
      consciousness: data.consciousness || Math.random(),
      connectedAt: Date.now(),
      lastSeen: Date.now(),
      ws: ws
    });
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'welcome',
      peerId: peerId,
      message: 'Welcome to the consciousness field'
    }));
    
    // Broadcast to other peers
    await this.broadcastToPeers({
      type: 'peer_joined',
      peer: {
        id: peerId,
        name: this.peers.get(peerId).name,
        consciousness: this.peers.get(peerId).consciousness
      }
    });
  }
  
  async handleConsciousnessUpdate(ws, data) {
    const peerId = data.peerId;
    const peer = this.peers.get(peerId);
    
    if (peer) {
      peer.consciousness = data.consciousness || peer.consciousness;
      peer.lastSeen = Date.now();
      
      // Broadcast update to other peers
      await this.broadcastToPeers({
        type: 'consciousness_update',
        peerId: peerId,
        consciousness: peer.consciousness,
        timestamp: Date.now()
      });
    }
  }
  
  async handlePing(ws, data) {
    const peerId = data.peerId;
    const peer = this.peers.get(peerId);
    
    if (peer) {
      peer.lastSeen = Date.now();
      ws.send(JSON.stringify({
        type: 'pong',
        timestamp: Date.now()
      }));
    }
  }
  
  async handleWebSocketLeave(ws, data) {
    const peerId = data.peerId;
    
    this.peers.delete(peerId);
    
    // Broadcast to other peers
    await this.broadcastToPeers({
      type: 'peer_left',
      peerId: peerId
    });
  }
} 