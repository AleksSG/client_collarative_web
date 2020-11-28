import React, { useEffect, useState } from "react";
import * as THREE from "three";

const ThreeSceneContainer = ({ gcodeData }) => {

    useEffect(
        () => {
            if (gcodeData) {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

                const renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);

                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                camera.position.z = 5;


                // gcodeData[0].forEach(layer => {
                //     layer.forEach(line => {
                //         const points = [];
                //         line.forEach(point => {

                //             points.push(new THREE.Vector3(point.x, point.y, point.z));

                //         });
                //         const geometry = new THREE.BufferGeometry().setFromPoints(points);
                //         const drawLine = new THREE.Line(geometry, material);
                //         setScene(scene.add(drawLine));
                //     });
                // });
            }
        }, [gcodeData]);

    return (
        <div />
    );
};

export default ThreeSceneContainer;