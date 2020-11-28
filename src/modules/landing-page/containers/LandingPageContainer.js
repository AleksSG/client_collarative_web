import React, { } from 'react';

import GCodeLoader from 'three-gcode-loader';
//import { GCodeLoader } from '../../three/GCodeLoader';
//import { OrbitControls } from '../../three/OrbitControls';
import * as THREE from "three";

import UploadButtonComponent from '../components/UploadButtonComponent';


const LandingPageContainer = () => {

    var loader = new GCodeLoader()

    // On file select (from the pop up)
    const onFileChange = event => {
        const file = event.target.files[0];
        getBase64(file).then(
            data => localStorage.setItem("fileGcode", data)
        ).catch(e => console.log(e));
    };

    // On file load
    const onFileLoad = () => {
        let camera, scene, renderer;
        const container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 0, 70);

        scene = new THREE.Scene();


        loader.load(localStorage.getItem("fileGcode"), object => {
            console.log(object[0]);
        });

        // ############ START THREE JS LOADER

        // loader.load(localStorage.getItem("fileGcode"), object => {
        //     object.position.set(0, 0, 0);
        //     scene.add(object);
        //     renderer.render(scene, camera);
        // });

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.addEventListener('change', renderer.render(scene, camera)); // use if there is no animation loop
        // controls.minDistance = 10;
        // controls.maxDistance = 100;

        renderer.render(scene, camera);
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