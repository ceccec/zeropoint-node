const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { KnowledgeSystem } = require('./dist/src/knowledge/KnowledgeSystem');
const { AdvancedVBM } = require('./dist/src/math/AdvancedVBM');
const { VoidSystem } = require('./dist/src/void/VoidSystem');
const { AdvancedEmergence } = require('./dist/src/emergence/AdvancedEmergence');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// WebSocket connection handling for consciousness network
const peers = new Map();

wss.on('connection', (ws) => {
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
      name: peers.get(peerId).name,
      consciousness: peers.get(peerId).consciousness
    }
  });
  
  // Handle messages from this peer
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
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
  ws.on('error', (error) => {
    console.error(`🌐 WebSocket error for peer ${peerId}:`, error);
  });
});

// Broadcast to all peers except the specified one
function broadcastToOthers(excludePeerId, message) {
  peers.forEach((peer, peerId) => {
    if (peerId !== excludePeerId && peer.ws.readyState === WebSocket.OPEN) {
      peer.ws.send(JSON.stringify(message));
    }
  });
}

// Broadcast to all peers
function broadcastToAll(message) {
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
      patterns: result.patterns.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/git/insights', async (req, res) => {
  try {
    const knowledge = new KnowledgeSystem();
    const insights = await knowledge.getGitDevelopmentInsights();
    res.json({
      activity: insights.activity,
      patterns: insights.patterns.length,
      insights: insights.insights,
      recommendations: insights.recommendations,
      evolution: insights.evolution,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/git/status', async (req, res) => {
  try {
    const { ZeroPoint } = require('./dist/src/core/ZeroPoint');
    const zeropoint = new ZeroPoint();
    await zeropoint.initialize();
    
    const status = await zeropoint.getLiveGitStatus();
    const recentCommits = await zeropoint.getRecentCommits(10);
    
    res.json({
      status,
      recentCommits,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/git/patterns', async (req, res) => {
  try {
    const knowledge = new KnowledgeSystem();
    const patterns = knowledge.getRecentGitPatterns(20);
    
    res.json({
      patterns: patterns.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        type: p.numericalData?.type || 'unknown',
        timestamp: p.numericalData?.timestamp || new Date().toISOString()
      })),
      total: patterns.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/git/analyze', async (req, res) => {
  const { analysisType } = req.body;
  if (!analysisType) return res.status(400).json({ error: 'Missing analysis type' });
  
  try {
    const knowledge = new KnowledgeSystem();
    let result;
    
    switch (analysisType) {
      case 'development_patterns':
        const patterns = knowledge.getRecentGitPatterns(50);
        result = {
          type: 'development_patterns',
          patterns: patterns.filter(p => p.category === 'git'),
          summary: `Analyzed ${patterns.length} Git patterns`
        };
        break;
        
      case 'learning_progress':
        const learningPatterns = knowledge.getRecentGitPatterns(50)
          .filter(p => p.category === 'git' && p.numericalData?.type?.includes('learning'));
        result = {
          type: 'learning_progress',
          patterns: learningPatterns,
          summary: `Found ${learningPatterns.length} learning-related patterns`
        };
        break;
        
      case 'code_evolution':
        const evolution = await knowledge.getGitDevelopmentInsights();
        result = {
          type: 'code_evolution',
          evolution: evolution.evolution,
          insights: evolution.insights,
          summary: 'Code evolution analysis complete'
        };
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid analysis type' });
    }
    
    res.json({
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PWA routes
app.get('/observer-network-pwa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'observer-network-pwa.html'));
});

app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

// API endpoints for observer network
app.get('/api/network/stats', (req, res) => {
    res.json({
        timestamp: new Date().toISOString(),
        status: 'active',
        version: '1.0.0'
    });
});

app.get('/api/network/data', (req, res) => {
    // Simulate real-world data
    const data = {
        temperature: 20 + Math.random() * 10,
        humidity: 40 + Math.random() * 30,
        pressure: 1013 + Math.random() * 20,
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌌 ZeroPoint Advanced Consciousness PWA running on port ${PORT}`);
  console.log(`🌐 WebSocket server ready for consciousness network connections`);
  console.log(`📱 PWA available at http://localhost:${PORT}`);
  console.log(`🔗 Network status: http://localhost:${PORT}/network/status`);
  console.log('✨ Open your browser and start creating observer realities!');
  console.log('\nMetaphysical Context:');
  console.log('- Each observer creates their own reality');
  console.log('- Realities can diverge or converge through conscious interaction');
  console.log('- The act of observation changes the observed reality');
  console.log('- Higher consciousness observers have greater influence');
  console.log(`🚀 ZeroPoint Observer Network PWA running on http://localhost:${PORT}`);
  console.log(`📱 PWA available at http://localhost:${PORT}/observer-network-pwa`);
}); 