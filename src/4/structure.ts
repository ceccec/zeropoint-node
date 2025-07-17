/**
 * Static Asset Handler for Cloudflare Workers
 * Serves PWA files and handles caching
 */

export class StaticAssetHandler {
  constructor() {
    this.cache = new Map();
    this.setupRoutes();
  }
  
  setupRoutes() {
    // Define static file routes
    this.routes = {
      '/': 'index.html',
      '/index.html': 'index.html',
      '/manifest.json': 'manifest.json',
      '/sw.js': 'sw.js',
      '/tree-of-life.html': 'tree-of-life.html',
      '/consciousness-ui.html': 'consciousness-ui.html',
      '/3d-integer-tree.html': '3d-integer-tree.html',
      '/integer-tree-as-coil.html': 'integer-tree-as-coil.html'
    };
  }
  
  async handle(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Check if it's a known route
    const filePath = this.routes[path];
    if (filePath) {
      return await this.serveFile(filePath, env);
    }
    
    // Check for static assets (icons, CSS, JS)
    if (path.startsWith('/icons/') || 
        path.startsWith('/stimulus/') || 
        path.startsWith('/css/') || 
        path.startsWith('/js/')) {
      return await this.serveAsset(path, env);
    }
    
    // Default to index.html for SPA routing
    return await this.serveFile('index.html', env);
  }
  
  async serveFile(filePath, env) {
    try {
      // Try to get from R2 bucket first
      const r2Object = await env.ZEROPOINT_ASSETS.get(filePath);
      if (r2Object) {
        const headers = new Headers();
        headers.set('Content-Type', this.getContentType(filePath));
        headers.set('Cache-Control', 'public, max-age=3600');
        
        return new Response(r2Object.body, {
          headers: headers
        });
      }
      
      // Fallback to KV storage
      const kvData = await env.ZEROPOINT_KV.get(`static_${filePath}`);
      if (kvData) {
        const headers = new Headers();
        headers.set('Content-Type', this.getContentType(filePath));
        headers.set('Cache-Control', 'public, max-age=3600');
        
        return new Response(kvData, {
          headers: headers
        });
      }
      
      // Return 404 if not found
      return new Response('File not found', { status: 404 });
      
    } catch (error) {
      console.error('Error serving file:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
  
  async serveAsset(path, env) {
    try {
      // Remove leading slash for R2 lookup
      const assetPath = path.substring(1);
      
      // Try R2 bucket
      const r2Object = await env.ZEROPOINT_ASSETS.get(assetPath);
      if (r2Object) {
        const headers = new Headers();
        headers.set('Content-Type', this.getContentType(path));
        headers.set('Cache-Control', 'public, max-age=86400'); // 24 hours for assets
        
        return new Response(r2Object.body, {
          headers: headers
        });
      }
      
      // Try KV storage
      const kvData = await env.ZEROPOINT_KV.get(`asset_${assetPath}`);
      if (kvData) {
        const headers = new Headers();
        headers.set('Content-Type', this.getContentType(path));
        headers.set('Cache-Control', 'public, max-age=86400');
        
        return new Response(kvData, {
          headers: headers
        });
      }
      
      return new Response('Asset not found', { status: 404 });
      
    } catch (error) {
      console.error('Error serving asset:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
  
  getContentType(path) {
    const ext = path.split('.').pop().toLowerCase();
    
    const contentTypes = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'json': 'application/json',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
      'woff': 'font/woff',
      'woff2': 'font/woff2',
      'ttf': 'font/ttf',
      'eot': 'application/vnd.ms-fontobject'
    };
    
    return contentTypes[ext] || 'text/plain';
  }
  
  async uploadAssets(env) {
    // This method would be used to upload static assets to R2/KV
    // Called during deployment
    console.log('Uploading static assets to Cloudflare...');
    
    const assets = [
      'index.html',
      'manifest.json',
      'sw.js',
      'tree-of-life.html',
      'consciousness-ui.html',
      '3d-integer-tree.html',
      'integer-tree-as-coil.html'
    ];
    
    for (const asset of assets) {
      try {
        // Upload to R2 bucket
        const assetData = await this.getAssetData(asset);
        if (assetData) {
          await env.ZEROPOINT_ASSETS.put(asset, assetData, {
            httpMetadata: {
              contentType: this.getContentType(asset)
            }
          });
          console.log(`✅ Uploaded ${asset} to R2`);
        }
        
        // Also store in KV for fallback
        await env.ZEROPOINT_KV.put(`static_${asset}`, assetData);
        console.log(`✅ Stored ${asset} in KV`);
        
      } catch (error) {
        console.error(`❌ Failed to upload ${asset}:`, error);
      }
    }
  }
  
  async getAssetData(assetPath) {
    // This would read the actual asset files
    // For now, return placeholder data
    return `<!-- ${assetPath} placeholder -->`;
  }
} 