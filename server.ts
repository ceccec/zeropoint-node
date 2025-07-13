import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import { KnowledgeSystem } from './dist/src/knowledge/KnowledgeSystem';
import { AdvancedVBM } from './dist/src/math/AdvancedVBM';
import { VoidSystem } from './dist/src/void/VoidSystem';
import { AdvancedEmergence } from './dist/src/emergence/AdvancedEmergence';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// WebSocket connection handling for consciousness network
const peers = new Map<string, {
  id: string;
  ws: WebSocket;
  name: string;
  consciousness: number;
  connectedAt: number;
}>();

wss.on('connection', (ws: WebSocket) => {
  const peerId = `peer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log(`🌐 New consciousness peer connected: ${peerId}`);
  
  // Add peer to registry
  peers.set(peerId, {
    id: peerId,
    ws: ws,
    name: `Observer ${peerId.slice(-4)}`,
    consciousness: Math.random(),
    connectedAt: Date.now()
  });
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    peerId: peerId,
    message: 'Welcome to the consciousness network'
  }));
  
  // Broadcast peer joined to all other peers
  broadcastToOthers(peerId, {
    type: 'peer_joined',
    peer: {
      id: peerId,
      name: peers.get(peerId)!.name,
      consciousness: peers.get(peerId)!.consciousness
    }
  });
  
  // Handle messages from this peer
  ws.on('message', (message: WebSocket.Data) => {
    try {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'state_update':
          // Broadcast state update to all other peers
          broadcastToOthers(peerId, {
            type: 'state_update',
            data: data.data,
            fromPeer: peerId
          });
          break;
          
        case 'peer_info':
          // Update peer information
          const peer = peers.get(peerId);
          if (peer) {
            peer.name = data.name || peer.name;
            peer.consciousness = data.consciousness || peer.consciousness;
          }
          break;
      }
      
    } catch (error) {
      console.error('🌐 Error parsing message:', error);
    }
  });
  
  // Handle peer disconnection
  ws.on('close', () => {
    console.log(`🌐 Consciousness peer disconnected: ${peerId}`);
    
    // Remove from registry
    peers.delete(peerId);
    
    // Broadcast peer left to remaining peers
    broadcastToAll({
      type: 'peer_left',
      peerId: peerId
    });
  });
  
  // Handle errors
  ws.on('error', (error: Error) => {
    console.error(`🌐 WebSocket error for peer ${peerId}:`, error);
  });
});

// Broadcast to all peers except the specified one
function broadcastToOthers(excludePeerId: string, message: any): void {
  peers.forEach((peer, peerId) => {
    if (peerId !== excludePeerId && peer.ws.readyState === WebSocket.OPEN) {
      peer.ws.send(JSON.stringify(message));
    }
  });
}

// Broadcast to all peers
function broadcastToAll(message: any): void {
  peers.forEach((peer) => {
    if (peer.ws.readyState === WebSocket.OPEN) {
      peer.ws.send(JSON.stringify(message));
    }
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    peers: peers.size,
    uptime: process.uptime()
  });
});

// Consciousness network status
app.get('/network/status', (req, res) => {
  const peerList = Array.from(peers.values()).map(peer => ({
    id: peer.id,
    name: peer.name,
    consciousness: peer.consciousness,
    connectedAt: peer.connectedAt
  }));
  
  res.json({
    totalPeers: peers.size,
    peers: peerList
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Basic API endpoints for blockchain functionality
app.get('/api/observers', (req, res) => {
  // This would connect to the actual TypeScript ObserverAwareLedger
  res.json({ message: 'Observer API endpoint - use the in-memory bridge for now' });
});

app.post('/api/observers', (req, res) => {
  // This would create a new observer in the blockchain
  res.json({ message: 'Observer creation endpoint - use the in-memory bridge for now' });
});

app.post('/api/events', (req, res) => {
  // This would create a new event in the blockchain
  res.json({ message: 'Event creation endpoint - use the in-memory bridge for now' });
});

app.post('/api/knowledge/ask', (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });
  const knowledge = new KnowledgeSystem();
  const vbm = new AdvancedVBM();
  const voidSys = new VoidSystem();
  const emergence = new AdvancedEmergence();
  const k = knowledge.searchKnowledge({ query: question });
  const v = vbm.searchQA(question);
  const vs = voidSys.solveUnsolvable(question);
  const eApp = emergence.createApp('api_app', { consciousnessLevel: 0.7, vortexStrength: 0.6 });
  const e = emergence.getAppInsights(eApp);
  res.json({
    knowledge: k,
    vbm: v,
    void: vs,
    emergence: { app: eApp, insights: e }
  });
});

// === GIT-AWARE Q&A ENDPOINTS ===
// New endpoints for live Git integration and code evolution insights

app.post('/api/git/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing Git question' });
  
  try {
    const knowledge = new KnowledgeSystem();
    const result = await knowledge.askGitQuestion(question);
    res.json({
      question,
      answer: result.answer,
      insights: result.insights,
      recommendations: result.recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process Git question' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 ZeroPoint Node server running on port ${PORT}`);
  console.log(`🌐 WebSocket server ready for consciousness network`);
}); 