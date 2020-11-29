import React from 'react';

import GCodeLoader from 'three-gcode-loader';

//import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import UploadButtonComponent from '../components/UploadButtonComponent';


const LandingPageContainer = () => {

    var loader = new GCodeLoader();
    const [currentChild, setCurrentChild] = React.useState(null)

    // On file select (from the pop up)
    const onFileChange = event => {
        const file = event.target.files[0];
        getBase64(file).then(
            data => localStorage.setItem("fileGcode", data)
        ).catch(e => console.log(e));
    };

    // On file load
    const onFileLoad = () => {

        const renderer = new THREE.WebGLRenderer();
        // renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        if(currentChild != null){
            document.body.removeChild(currentChild);
        }
        document.body.appendChild(renderer.domElement);
        setCurrentChild(renderer.domElement)

        const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(90, 100, 70);
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x61ff00 );
        const material = new THREE.LineBasicMaterial({ color: 0x61ff00 });
        const geometry = new THREE.BufferGeometry();

        loader.load(localStorage.getItem("fileGcode"), object => {
            console.log(object[0][20][13]);

            const positions = [];
            object[0].forEach(layer => {
                layer.forEach(linee => {
                    linee.forEach(point => {
                        if (point) {
                            positions.push(new THREE.Vector3(point.x, point.y, point.z));
                        }
                    });
                });
            });
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
            

            const line = new THREE.Line(geometry, material);
            scene.add(line);

            renderer.render(scene, camera);
        });

        // ############ START THREE JS LOADER

        // loader.load(localStorage.getItem("fileGcode"), object => {
        //     object.position.set( - 100, - 20, 100 );
        //     console.log(object)
        //     scene.add(object);
        //     renderer.render(scene, camera);
        // });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener( 'change', () => renderer.render(scene, camera) ); // use if there is no animation loop
        controls.minDistance = 10;
        controls.maxDistance = 100;

    };

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div>
            <UploadButtonComponent onChange={onFileChange} onClick={onFileLoad} />
        </div>

    );
};

export default LandingPageContainer;