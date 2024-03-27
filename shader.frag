#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform vec2 u_resolution;

uniform vec2 u_offset;
uniform float u_zoom;
uniform vec3 u_col;
uniform float u_dist;
uniform float u_iter;

float cosh(float val)
{
    float tmp = exp(val);
    float cosH = (tmp + 1.0 / tmp) / 2.0;
    return cosH;
}

float sinh(float val)
{
    float tmp = exp(val);
    float sinH = (tmp - 1.0 / tmp) / 2.0;
    return sinH;
} 

vec2 complex_sin(vec2 num){
  float real = sin(num.x)*cosh(num.y);
  float imag = cos(num.x)*sinh(num.y);
  
  return vec2(real, imag);
}

vec2 mult(vec2 num1, vec2 num2){
  float real = num1.x*num2.x - num1.y*num2.y;
  float imag = num1.x*num2.y + num1.y*num2.x;
  
  return vec2(real, imag);
}

vec3 neon(vec3 orig){
  float brightness = (orig.x + orig.y + orig.z) / 3.0;
  vec3 blurred = orig.xyz;
  blurred *= (1.0 + brightness);
  
  return mix(orig, blurred, 0.5);
}

void main(){
  
  vec2 uv = gl_FragCoord.xy/u_resolution.xy * 0.5;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  uv *= 2.0;
  
  vec2 c = uv*u_zoom*3.0;
  c += u_offset;
  vec2 z = vec2(0.0);
  float iter = 0.0;
  
  const float maxiter = 100.;

  c *= 10.0;
  
  for(float i = 0.0; i < maxiter; i++){
    z = mult(z, complex_sin(z)) + c;
    if(length(z) > u_dist) break;
    
    iter++;
  }
  
  float f = iter / maxiter;
  vec3 col = vec3(f);

  col *= neon(u_col);
  col = neon(col);
  gl_FragColor = vec4(col, 1.0);
}