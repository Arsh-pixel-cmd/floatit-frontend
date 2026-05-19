/**
 * Computes a smooth Cubic Bezier (C) curve between two coordinates.
 * Supports source (sPort) and target (tPort) exit directions and parallel wire bundling offsets.
 */
export const computeEdgePath = (
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number },
  routeConfig: {
    sPort?: 'top' | 'bottom' | 'left' | 'right';
    tPort?: 'top' | 'bottom' | 'left' | 'right';
    offsetIndex?: number;
  } = {}
) => {
  const offsetIndex = routeConfig.offsetIndex || 0;
  const bundleOffset = offsetIndex * 6; // 6px spacer step per parallel/bundled edge

  let x1 = fromPos.x;
  let y1 = fromPos.y;
  let x2 = toPos.x;
  let y2 = toPos.y;

  // Infer default ports if not specified (pipeline left-to-right flow fallback)
  let sPort = routeConfig.sPort;
  let tPort = routeConfig.tPort;

  if (!sPort) {
    sPort = x1 < x2 ? 'right' : 'left';
  }
  if (!tPort) {
    tPort = x1 < x2 ? 'left' : 'right';
  }

  // Adjust wire offsets for parallel flows to prevent overlaps
  if (sPort === 'right' || sPort === 'left') {
    y1 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  } else {
    x1 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  }
  if (tPort === 'right' || tPort === 'left') {
    y2 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  } else {
    x2 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  }

  // Compute dynamic control point distance based on coordinates
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const controlDist = Math.max(5, Math.min(150, Math.max(dx, dy) * 0.5));

  // Calculate control points based on port directions
  let cp1x = x1;
  let cp1y = y1;
  if (sPort === 'right') {
    cp1x += controlDist;
  } else if (sPort === 'left') {
    cp1x -= controlDist;
  } else if (sPort === 'bottom') {
    cp1y += controlDist;
  } else if (sPort === 'top') {
    cp1y -= controlDist;
  }

  let cp2x = x2;
  let cp2y = y2;
  if (tPort === 'right') {
    cp2x += controlDist;
  } else if (tPort === 'left') {
    cp2x -= controlDist;
  } else if (tPort === 'bottom') {
    cp2y += controlDist;
  } else if (tPort === 'top') {
    cp2y -= controlDist;
  }

  // Cubic Bezier curve path definition
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
};

/**
 * Pre-processes schema EDGES to assign offsetIndexes to parallel/bundled wires.
 */
export const bundleEdges = (edges: any) => {
  const bundles: Record<string, number> = {};

  const processedEdges = edges.map((edge: any) => {
    const fromPhase = edge.from.split('::')[0];
    const toPhase = edge.to.split('::')[0];
    const bundleId = `${fromPhase}->${toPhase}`;

    if (bundles[bundleId] === undefined) {
      bundles[bundleId] = 0;
    }

    const offsetIndex = bundles[bundleId]++;

    return {
      ...edge,
      routeConfig: {
        type: 'curved',
        offsetIndex
      }
    };
  });

  return processedEdges;
};
