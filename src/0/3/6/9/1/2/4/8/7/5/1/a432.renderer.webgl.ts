/**
 * a432.renderer.webgl.ts — minimal public-domain WebGL2 renderer for A432 snapshots.
 * No external dependencies; ~200 SLOC.
 */

import { getRodinSnapshot, TrinityTorusSnapshot } from './a432.adapters';

const VSH = `#version 300 es
in vec3 position;
uniform mat4 mvp;
void main(){ gl_Position = mvp * vec4(position,1.0); }
`;
const FSH = `#version 300 es
precision highp float;
uniform vec3 uColor;
out vec4 outColor;
void main(){ outColor = vec4(uColor,1.0);} 
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh);
  if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh)??'shader err');
  return sh;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader){
  const p = gl.createProgram()!; gl.attachShader(p,vs); gl.attachShader(p,fs); gl.linkProgram(p);
  if(!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)??'link err');
  return p;
}

export function startRenderer(canvas: HTMLCanvasElement){
  const gl = canvas.getContext('webgl2');
  if(!gl) throw new Error('WebGL2 required');
  
  // After null check, gl is guaranteed to be non-null
  const glContext = gl as WebGL2RenderingContext;
  
  const vs=compile(glContext, glContext.VERTEX_SHADER, VSH);
  const fs=compile(glContext, glContext.FRAGMENT_SHADER, FSH);
  const prog=link(glContext,vs,fs);
  const posLoc = glContext.getAttribLocation(prog,'position');
  const mvpLoc = glContext.getUniformLocation(prog,'mvp');
  const colLoc = glContext.getUniformLocation(prog,'uColor');

  const rod = getRodinSnapshot(3);
  const vbo = glContext.createBuffer(); glContext.bindBuffer(glContext.ARRAY_BUFFER,vbo);
  const verts = new Float32Array(rod.vertices.flatMap(v=>[v.x,v.y,v.z]));
  glContext.bufferData(glContext.ARRAY_BUFFER, verts, glContext.STATIC_DRAW);

  glContext.enableVertexAttribArray(posLoc);
  glContext.vertexAttribPointer(posLoc,3,glContext.FLOAT,false,0,0);

  const proj = mat4Perspective(45, canvas.width/canvas.height, 0.1, 100);

  function frame(time:number){
    glContext.clearColor(0,0,0,1); glContext.clear(glContext.COLOR_BUFFER_BIT|glContext.DEPTH_BUFFER_BIT);
    glContext.useProgram(prog);
    const view = mat4LookAt({x:0,y:10,z:20},{x:0,y:5,z:0});
    const mvp = mat4Multiply(proj, view);
    glContext.uniformMatrix4fv(mvpLoc,false,mvp);
    glContext.uniform3f(colLoc,1,1,1);
    glContext.drawArrays(glContext.LINE_STRIP,0,rod.vertices.length);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// minimal 4x4 matrix helpers
function mat4Perspective(fov:number,aspect:number,near:number,far:number){
  const f=1/Math.tan(fov*Math.PI/360); const nf=1/(near-far);
  return new Float32Array([
    f/aspect,0,0,0,
    0,f,0,0,
    0,0,(far+near)*nf,-1,
    0,0,(2*far*near)*nf,0
  ]);
}
interface V3{ x:number;y:number;z:number; }
function mat4LookAt(eye:V3, center:V3){
  const zx=eye.x-center.x, zy=eye.y-center.y, zz=eye.z-center.z; const zl=Math.hypot(zx,zy,zz);
  const zxN=zx/zl, zyN=zy/zl, zzN=zz/zl;
  const ux=0, uy=1, uz=0;
  const sx=uy*zzN-uz*zyN, sy=uz*zxN-ux*zzN, sz=ux*zyN-uy*zxN; const sl=Math.hypot(sx,sy,sz);
  const sxN=sx/sl, syN=sy/sl, szN=sz/sl;
  const ux2=zyN*szN-zzN*syN, uy2=zzN*sxN-zxN*szN, uz2=zxN*syN-zyN*sxN;
  return new Float32Array([
    sxN, uy2, zxN, 0,
    syN, uy2, zyN, 0,
    szN, uz2, zzN, 0,
    -(sxN*eye.x+syN*eye.y+szN*eye.z), -(ux2*eye.x+uy2*eye.y+uz2*eye.z), -(zxN*eye.x+zyN*eye.y+zzN*eye.z), 1
  ]);
}
function mat4Multiply(a:Float32Array,b:Float32Array){
  const out=new Float32Array(16);
  for(let i=0;i<4;i++) for(let j=0;j<4;j++) out[i*4+j]=a[i*4+0]*b[0*4+j]+a[i*4+1]*b[1*4+j]+a[i*4+2]*b[2*4+j]+a[i*4+3]*b[3*4+j];
  return out;
} 