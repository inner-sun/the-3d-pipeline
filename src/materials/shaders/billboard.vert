varying vec2 vUv;
varying vec3 vWorldPosition;

#include <batching_pars_vertex>

void main(){
	vUv = uv;

  // Use a single modelMatrix that gets applied 
  // the batched or instanced matrix transformation if any
  mat4 objectMatrix = modelMatrix;
  #include <batching_vertex>
  #ifdef USE_BATCHING
    objectMatrix = modelMatrix * batchingMatrix;
  #endif
  #ifdef USE_INSTANCING
    objectMatrix = modelMatrix * instanceMatrix;
  #endif

  // Compute our own modelViewMatrix
  // So it takes into account batch/instance mode
	mat4 mvMatrix = viewMatrix * objectMatrix;

  // Apply billboard sprite projection
	mat4 billboardMatrix = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    mvMatrix[3]
  );

  // Compute final modelViewPosition
	vec4 modelViewPosition = billboardMatrix * vec4(position, 1.0);
  // Pass world position to fragment shader
	vWorldPosition = vec3(objectMatrix * vec4(position, 1.0));

	gl_Position = projectionMatrix * modelViewPosition;
}