var fishes = new THREE.Object3D();
var fishStats = [];

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
        moveFish();
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


    // instantiate a loader
    var loader = new THREE.OBJLoader();
    var fish;

    var numberOfFish = 4;
    for (var x = 0; x < numberOfFish; x++) {
        // load a resource
        loader.load(
            // resource URL
            // 'models/monster.obj',
            '../img/obj/fishu.obj',
            // called when resource is loaded
            function (object) {
                object.position.set(0, 0, -3);
                object.scale.set(0.02, 0.02, 0.02);

                var material = new THREE.MeshStandardMaterial({
                    color: 0x2194ce,
                });
                // fish = new THREE.Mesh(object, material);
                object.traverse(function (child) {

                    if (child instanceof THREE.Mesh) {

                        child.material = material;

                    }

                });
                fish = object;
                var randX = (Math.random(-5) * 5);
                var randY = (Math.random(-5) * 5);
                fish.position.set(randX, randY, -2);
                fishes.add(fish);
                fishStats.push(new Fish(fish.position.x));
                scene.add(fishes);
            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened', error);

            }
        );
    }
    //waves
    var wave;
    {
        var geometry = new THREE.PlaneGeometry(50, 30, 70, 150);
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

    function moveFish() {
        for (var x = 0; x < fishes.children.length; x++) {
            var fish = fishes.children[x];
            var s = fishStats[x];
            // console.log(fishStats[x]);

            var rotInc = 0.2;

            if (s.turn) {
                if (s.set1) {
                    if (s.rot) {
                        fish.rotateY(- rotInc);
                    }
                    if (fish.rotation.y > 0) {
                        s.rot = s.turn = false;
                    }
                }
                if (s.set2) {
                    if (s.rot) {
                        fish.rotateY(- rotInc);
                    }
                    if (fish.rotation.y < 0) {
                        s.rot = s.turn = false;
                    }
                }
            }

            var maxX = s.startPos + 2, minX = s.startPos - 2;
            var inc = 0.1;

            if (!s.turn) {
                // //forward 
                if (!s.rev) {
                    fish.position.set(fish.position.x + inc, fish.position.y, fish.position.z);
                }
                if (fish.position.x > maxX) {
                    s.rot = s.rev = s.turn = s.set1 = true;
                    s.set2 = false;
                }

                //back
                if (s.rev) {
                    fish.position.set(fish.position.x - inc, fish.position.y, fish.position.z);
                }
                if (fish.position.x < minX) {
                    s.rot = s.turn = s.set2 = true;
                    s.set1 = s.rev = false;
                }
            }

        }
    }

    mainloop(); // entry point
}

class Fish{
    
    constructor(startPos){
        this.startPos = startPos;
        this.rev = this.turn = this.change = this.set1 = this.set2 = false;
        this.rot = true;
    }
}