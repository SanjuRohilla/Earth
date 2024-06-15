import * as THREE from "three" ;
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./getStarfield.js"
import { getFresnelMat } from "./getFresnelMat.js";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75 , w / h , 0.1 , 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w , h);
document.body.appendChild(renderer.domElement);
 
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4*Math.PI / 180 ;
scene.add(earthGroup)
new OrbitControls(camera , renderer.domElement);
const loader =  new THREE.TextureLoader();
const detail = 16;
const geo = new THREE.IcosahedronGeometry(1, detail);
const mat = new THREE.MeshStandardMaterial({
   map: loader.load("./earthmap1k.jpg")
});
const earthMesh = new THREE.Mesh( geo , mat );
earthGroup.add(earthMesh);
const lightMat = new THREE.MeshBasicMaterial({
    //color : 0x00ff00,
    //transparent: true ,
    //opacity: 0.6,

    map: loader .load("./earthlights1k.jpg"),
    blending: THREE.AdditiveBlending
})
const lightMesh = new THREE.Mesh(geo , lightMat);
earthGroup.add(lightMesh)

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./earthcloudmap.jpg"),
    transparent: true ,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
})
const cloudMesh = new THREE.Mesh(geo , cloudsMat);
cloudMesh.scale.setScalar(1.003)
earthGroup.add(cloudMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geo , fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);


 const stars = getStarfield({numstars: 2000})
 scene.add(stars)

 //const light = new THREE.HemisphereLight(0x39fff , 0xff235);
 //scene.add(light);

const sunLight = new THREE.DirectionalLight(0xffffff )
sunLight.position.set(-2 , -0.5 ,1.5)
scene.add(sunLight)
function animate (){
    requestAnimationFrame(animate);
    // earthMesh.rotation.x += 0.01;
    earthMesh.rotation.y += 0.02;
    lightMesh.rotation.y += 0.02;
    cloudMesh.rotation.y += 0.029;
    glowMesh.rotation.y += 0.02 ;
    renderer.render(scene , camera);
}
animate();
















