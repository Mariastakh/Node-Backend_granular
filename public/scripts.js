

var container,
  renderer,
  scene,
  camera,
  mesh,
  start = Date.now(),
  fov = 30;

var scene = new THREE.Scene();
scene.background = new THREE.Color("hsl(100, 30%, 50%)" );
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
  // 150 units away, looking towards the center of scene:
  camera.position.z = 150;


material = new THREE.ShaderMaterial( {

		uniforms: 
		{
			time: {
				type: "f",
				value: 0.0
			}
		},
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );


  // create a sphere and assign the material
  mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 4 ), material );
  scene.add( mesh);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );




////



////

var animate = function () {
	//material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

animate();