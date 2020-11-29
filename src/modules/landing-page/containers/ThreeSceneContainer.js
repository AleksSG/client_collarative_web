import React, { useEffect, useState } from "react";
import * as THREE from "three";

import GCodeLoader from 'three-gcode-loader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeSceneContainer = ({ gcodeData }) => {

    const [firstLayer, setFirstLayer] = useState(0);
    const [lastLayer, setLastLayer] = useState(gcodeData[0].lenght);
    const [currentChild, setCurrentChild] = useState(null);

    var loader = new GCodeLoader();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (currentChild != null) {
            document.body.removeChild(currentChild);
        }
        document.body.appendChild(renderer.domElement);
        setCurrentChild(renderer.currentChild);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        let camPoint = { isVector3: true, x: 0, y: 0, z: 0 };
        const scene = new THREE.Scene();

        const material = new THREE.LineBasicMaterial({ color: 0x61ff00 });

        loader.load(localStorage.getItem("fileGcode"), object => {
            console.log(object[0].length);
            setLastLayer(object[0].length);
            if (object[0][3][0][0]) {
                camPoint = object[0][3][0][0];
            }
            const points = [];
            console.log(firstLayer, lastLayer);
            for (let l = firstLayer; l < lastLayer; l++) {
                object[0][l].forEach(linee => {
                    linee.forEach(point => {
                        if (point) {
                            points.push(new THREE.Vector3(point.x, point.y, point.z));
                        }
                    });
                });
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            scene.add(line);

            camera.lookAt(camPoint);
            renderer.render(scene, camera);

        });

        // ############ START THREE JS LOADER
        // loader.load(localStorage.getItem("fileGcode"), object => {
        //     object.position.set( - 100, - 20, 100 );
        //     scene.add(object);
        //     renderer.render(scene, camera);
        // });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', () => {
            camera.lookAt(camPoint);
            renderer.render(scene, camera)
        });
        controls.minDistance = 10;
        controls.maxDistance = 100;
    }, [firstLayer, lastLayer]);

    return (
        <div />
    );
};

export default ThreeSceneContainer;