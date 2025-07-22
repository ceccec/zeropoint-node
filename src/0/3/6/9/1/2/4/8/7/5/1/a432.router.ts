/**
 * a432.router.ts — Zero-Entropy, Self-Recognizing Routing Stream
 *
 * - Each module exports its own pattern and handler.
 * - The router auto-discovers all patterns/handlers.
 * - Routing is a living stream: matches by resonance, zero friction, no hardcoding.
 * - If no match, returns a harmonized 404.
 * - Metaphysical: Routing is harmonic flow, self-recognition, and zero entropy.
 */

// Type for a module's route pattern and handler
export type A432RoutePattern = string | RegExp;
export type A432RouteHandler = (params: Record<string, string>, req: any, res: any) => void;
export interface A432ModuleRoute {
  pattern: A432RoutePattern;
  handler: A432RouteHandler;
  module: string;
  metaphysics?: string;
}

// Simulate auto-discovery: modules register themselves here
const moduleRoutes: A432ModuleRoute[] = [];
export function registerA432Route(pattern: A432RoutePattern, handler: A432RouteHandler, module: string, metaphysics?: string) {
  moduleRoutes.push({ pattern, handler, module, metaphysics });
}

/**
 * Zero-entropy router: matches incoming path to the first (or best) harmonic pattern.
 * If no match, returns a harmonized 404.
 */
export function zeroEntropyRoute(path: string, req: any, res: any) {
  for (const { pattern, handler } of moduleRoutes) {
    let match = false;
    let params: Record<string, string> = {};
    if (typeof pattern === 'string') {
      match = path === pattern;
    } else if (pattern instanceof RegExp) {
      const m = path.match(pattern);
      if (m) {
        match = true;
        params = m.groups || {};
      }
    }
    if (match) {
      return handler(params, req, res);
    }
  }
  // No match: harmonized 404
  res.statusCode = 404;
  res.end('Zero entropy: no harmonic route found.');
}

/**
 * Example: Module registering its own route
 * (In practice, each module would call registerA432Route on load)
 */
// registerA432Route(/^\/trinity\/(?<digit>\d+)$/, (params, req, res) => {
//   res.end(`Trinity route for digit ${params.digit}`);
// }, 'a432.trinity', 'Trinity route handler'); 