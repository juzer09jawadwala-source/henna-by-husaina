/**
 * WebGL Shaders & Helpers for Real-Time White Background Removal on Video
 */

// Vertex shader with aspect-ratio cover mapping
export const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  uniform vec2 u_scale;
  varying vec2 v_uv;

  void main() {
    vec2 uv = (a_position + 1.0) * 0.5;
    uv.y = 1.0 - uv.y;
    v_uv = (uv - 0.5) * u_scale + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader that keys out white background while preserving rich red/gold velvet
export const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform sampler2D u_texture;
  varying vec2 v_uv;

  void main() {
    if (v_uv.x < 0.0 || v_uv.x > 1.0 || v_uv.y < 0.0 || v_uv.y > 1.0) {
      discard;
    }

    vec4 color = texture2D(u_texture, v_uv);

    // Calculate luminance
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Calculate saturation (curtain has high color saturation; white background has near 0)
    float maxC = max(color.r, max(color.g, color.b));
    float minC = min(color.r, min(color.g, color.b));
    float sat = maxC - minC;

    // Detect white background: high luminance and low color saturation
    float bright = smoothstep(0.85, 0.94, luma);
    float neutral = 1.0 - smoothstep(0.04, 0.16, sat);
    float isWhite = bright * neutral;

    float alpha = clamp(1.0 - isWhite, 0.0, 1.0);

    if (alpha < 0.02) {
      discard;
    }

    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

/**
 * Creates and compiles a WebGL shader.
 */
export function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
