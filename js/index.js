import { GLTFLoader } from "./GLTFLoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new GLTFLoader();
var jwst;

function loadGLTF(path) {
    loader.load(
        path,
        function ( gltf ) {
            jwst = gltf.scene
            jwst.rotation.y = -1
            jwst.position.x = 5
            scene.add(jwst)
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}

const renderer = new THREE.WebGLRenderer({ antialiasing: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 0, 50, 50 );
scene.add( light );
loadGLTF("../model/scene.gltf");

camera.position.z = 22;
camera.position.y = 2;
camera.position.x = -6;

window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
});

(function () {

    var bv = new Bideo();
    bv.init({
      videoEl: document.querySelector('#background_video'),
  
      container: document.querySelector('body'),
  
      resize: true,
  
      isMobile: window.matchMedia('(max-width: 768px)').matches,

      src: [
        {
          src: '../media/bg.mp4',
          type: 'video/mp4'
        }
      ],
  
      // What to do once video loads (initial frame)
      onLoad: function () {
        document.querySelector('#video_cover').style.display = 'none';
      }
    });
  }());

function animate() {
	requestAnimationFrame( animate );
    jwst.rotation.y += 0.01
	renderer.render( scene, camera );
}
animate();