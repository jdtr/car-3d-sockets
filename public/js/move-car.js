// Imports

import * as THREE from './build/three.module.js';
import { MTLLoader } from "./jsm/MTLLoader.js";
import { OBJLoader } from "./jsm/OBJLoader.js";
import { MtlObjBridge } from "./jsm/MtlObjBridge.js";
import { DDSLoader } from './jsm/DDSLoader.js';
import { OrbitControls } from './jsm/OrbitControls.js';

// Variables
const socket = io();

let camera, scene, renderer, controls;
let container;
let mouseX = 30, mouseY = -5;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
    
// Functions
function init() {
    let object;

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    // Camera
    camera = new THREE.PerspectiveCamera( 40, 1000 / 600, 1, 2000 );
    //camera.position.z = 30;

    // Scene
    scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
    scene.add( camera );
    
    // manager

    let onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

        }

    };

    let onError = function () { };

    let manager = new THREE.LoadingManager();

    manager.addHandler( /\.dds$/i, new DDSLoader() );



    new MTLLoader( manager )
					.setPath( '../assets/' )
					.load( 'camaro.mtl', function ( materials ) {

						materials.preload();

						new OBJLoader( manager )
							.setMaterials( materials )
							.setPath( '../assets/' )
							.load( 'camaro.obj', function ( object ) {

								// object.position.y = - 95;
								scene.add( object );

							}, onProgress, onError );

					} );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 1000, 800 );
    container.appendChild( renderer.domElement );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 30;
	controls.maxDistance = 30;

	controls.maxPolarAngle = Math.PI / 2;
    //camera.position.set( 0, 5, 30 );
    // controls.update();
    
    //document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//window.addEventListener( 'resize', onWindowResize, false );
}
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}
function render() {

    socket.on('moveCar', function ( resp, callback) {
        console.log(resp.data.x)
        // camera.position.x += ( resp.data.x - camera.position.x ) * .05;
        // camera.position.y += ( - resp.data.y - camera.position.y ) * .05;
        camera.position.x = resp.data.x * .05;
        camera.position.y = resp.data.y * .05;
     });

    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}
function socketsServer () {
    console.log("Sockets")
    socket.on('moveCar', function ( resp, callback) {
       console.log(resp)
    });
    // socket.emit('coord', { x: e.clientX, y: e.clientY }, function (data) {
    //     console.log(data)
    // });
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {
 
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

}

init();
animate();
//socketsServer ()


