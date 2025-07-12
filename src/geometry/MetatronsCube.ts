import { SacredGeometryPattern } from "./SacredGeometryPattern";

export class MetatronsCube extends SacredGeometryPattern {
  name = "Metatron's Cube";
  // Example: 13 points, 78 lines (not all shown for brevity)
  points = [
    [0, 0], [1, 0], [-1, 0], [0.5, Math.sqrt(3)/2], [-0.5, Math.sqrt(3)/2],
    [0.5, -Math.sqrt(3)/2], [-0.5, -Math.sqrt(3)/2], [1, Math.sqrt(3)], [-1, Math.sqrt(3)],
    [1, -Math.sqrt(3)], [-1, -Math.sqrt(3)], [2, 0], [-2, 0]
  ];
  lines = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[1,4],[2,5],[2,6],
    [3,4],[5,6],[7,8],[9,10],[11,12] // ... (add all 78 for full pattern)
  ];
  circles = [
    { center: [0, 0], radius: 1 },
    { center: [0, 0], radius: 2 },
    // ... (add more for full pattern)
  ];
  symmetry = "hexagonal";
  metaphysicalContext = "Metatron's Cube unifies all Platonic solids and represents the structure of creation.";
} 