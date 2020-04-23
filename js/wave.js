

window.onload = function () {

    var W = window.innerWidth, H = window.innerHeight;

    // initializing three core components
    var renderer = new THREE.WebGLRenderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    // document.body.appendChild(renderer.domElement);
    $("#waves").append(renderer.domElement);

    //camera
    var camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.set(0, 0, 14);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var scene = new THREE.Scene;

    // called each frame
    function mainloop() {
        window.requestAnimationFrame(mainloop);

        updateWave();
        renderer.render(scene, camera);
    }

    //load textures
    var water = new THREE.TextureLoader().load("../img/textures/water.png");
    var bg = new THREE.TextureLoader().load("../img/textures/background.jpg");

    //bg
    var plane;
    {
        var geometry = new THREE.PlaneGeometry(50, 50, 50);
        var material = new THREE.MeshStandardMaterial({ map: bg });
        plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, -5);
        scene.add(plane);
    }

    //waves
    var wave;
    {
        var geometry = new THREE.PlaneGeometry(50, 30, 70, 150);
        // geometry = new THREE.WireframeGeometry(geometry);
        var material = new THREE.MeshPhongMaterial({
            color: 0x03a9fc,
            emissive: 0x3446a5,
            specular: 0x212121,
            shininess: 20,
            map: water,
            transparent: true,
            opacity: 0.5,
        });
        wave = new THREE.Mesh(geometry, material);
        scene.add(wave);
    }

    //lighting
    var light1 = new THREE.PointLight(0x368aeb, 1.3); //blue
    light1.position.set(-50, -50, 50);
    scene.add(light1);
    var light2 = new THREE.PointLight(0xde34eb, 1.3); //purple
    light2.position.set(50, 50, 50);
    scene.add(light2);

    // update func
    function updateWave() {
        var t = Date.now() * 0.004;
        try {
            for (var v of wave.geometry.vertices) {
                var x = (v.x + 15), y = (v.y + 15), z = v.z
                d = Math.hypot(x, y),
                    cos = a => Math.cos(a),
                    sqrt = a => Math.sqrt(a),
                    log = a => Math.log(a);

                z = 1 / log(2 + sqrt(d)) * cos(d - t);
                v.z = z;
            }
        } catch (e) { console.log("oops") }

        wave.geometry.verticesNeedUpdate = true;
        wave.geometry.computeVertexNormals();
    }

    mainloop(); // entry point
}