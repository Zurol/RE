// Three JS Template
//----------------------------------------------------------------- BASIC parameters
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

var dispositivo = 0;

function getDeviceType() {
	const width = window.innerWidth;

	if (width < 768) {
		dispositivo = 1;
		//return "Móvil";
	} else if (width < 900) {
		dispositivo = 2;
		return "Móvil";
	} else if (width < 1024) {
		dispositivo = 2;
		//return "Tablet";
	} else {
		dispositivo = 3;
		//return "Desktop";
	}
	
	
	setRenderSize();
}

function setRenderSize() {
	switch (dispositivo) {
		case 1:
			renderer.setSize(window.innerWidth, window.innerHeight);
			break;

		case 2:
			renderer.setSize(window.innerWidth, window.innerHeight);
			break;

		case 3:
			renderer.setSize(window.innerWidth, window.innerHeight);
			break;
	}
}

console.log("Tipo de dispositivo:", getDeviceType());

if (window.innerWidth > 800) {
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.needsUpdate = true;
	//renderer.toneMapping = THREE.ReinhardToneMapping;
}
//---

//document.body.appendChild(renderer.domElement);

const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;

	if (dispositivo == 1) {
		camera.aspect = window.innerWidth / window.innerHeight;
	}

	camera.updateProjectionMatrix();

	if (dispositivo == 1) {
		renderer.setSize(window.innerWidth, window.innerWidth);
	} else {
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	getDeviceType();
}

var camera = new THREE.PerspectiveCamera(
	20,
	window.innerWidth / window.innerHeight,
	1,
	500
);

if (dispositivo == 1) {
	camera.position.set(0, 6, 12);
} else {
	camera.position.set(0, 2, 14);
}

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();
var Cubegeometry = new THREE.BoxGeometry(1, 1, 1);

var createCarPos = true;
var uSpeed = 0.001;

if (dispositivo == 1 || dispositivo == 2) {
	uSpeed = 0.00001;
}

//----------------------------------------------------------------- FOG background

//var setcolor = 0xF02050;
//var setcolor = 0xF2F111;
var setcolor = 0x88df64;
var setcolor = 0x892cdc;

scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 16);
//scene.fog = new THREE.FogExp2(setcolor, 0.05);
//----------------------------------------------------------------- RANDOM Function
function mathRandom(num = 6) {
	var numValue = -Math.random() * num + Math.random() * num;
	return numValue;
}
//----------------------------------------------------------------- CHANGE bluilding colors
var setTintNum = true;

function setTintColor() {
	if (setTintNum) {
		setTintNum = false;
		var setColor = 0x000000;
	} else {
		setTintNum = true;
		var setColor = 0x000000;
	}
	//setColor = 0x222222;
	return setColor;
}

const loader = new THREE.TextureLoader();
const materials = [
	new THREE.MeshBasicMaterial({ map: loader.load("images/makeit.jpg") }), // derecha
	new THREE.MeshBasicMaterial({
		map: loader.load("images/imagotipo_fill.jpg"),
	}), // izquierda
	new THREE.MeshBasicMaterial({ map: loader.load("images/light.jpg") }), // arriba
	new THREE.MeshBasicMaterial({ map: loader.load("images/light.jpg") }), // abajo
	new THREE.MeshBasicMaterial({ map: loader.load("images/makeit.jpg") }), // frente
	new THREE.MeshBasicMaterial({ map: loader.load("images/Logo.png") }), // atrás
];

materials[2].map.center.set(0.5, 0.5);
materials[2].map.rotation = -Math.PI / 2;

//----------------------------------------------------------------- CREATE City

function init() {
	var segments = 1;
	var number = 80;
	if (dispositivo == 1) {
		number = 20;
	}

	for (var i = 1; i < number; i++) {
		var geometry = new THREE.CubeGeometry(
			0.9,
			0,
			0,
			segments,
			segments,
			segments
		);
		var material = new THREE.MeshStandardMaterial({
			color: setTintColor(),
			wireframe: false,
			//opacity:0.9,
			//transparent:true,
			//roughness: 0.3,
			//metalness: 1,
			shading: THREE.SmoothShading,
			//shading:THREE.FlatShading,
			side: THREE.DoubleSide,
		});
		var wmaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			wireframe: true,
			transparent: true,
			opacity: 0.03,
			side: THREE.DoubleSide,
			/*,
                      shading:THREE.FlatShading*/
		});

		var cube = new THREE.Mesh(geometry, material);
		var wire = new THREE.Mesh(geometry, wmaterial);
		var floor = new THREE.Mesh(geometry, material);
		var wfloor = new THREE.Mesh(geometry, wmaterial);

		//cube.add(wfloor);
		//cube.castShadow = true;
		//cube.receiveShadow = true;
		//cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

		//floor.scale.x = floor.scale.z = 1+mathRandom(0.33);
		floor.scale.y = 0.05; //+mathRandom(0.5);
		cube.scale.y = 0.1 + Math.abs(mathRandom(8));
		var cubeWidth = 0.9;

		if (dispositivo == 1) {
			cube.scale.y = 0.5 + Math.abs(mathRandom(8));
			cubeWidth = 1;
		}

		cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
		//cube.position.y = cube.scale.y / 2;
		cube.position.x = Math.round(mathRandom());
		cube.position.z = Math.round(mathRandom());

		if (dispositivo == 1) {
			cube.position.x = Math.round(mathRandom(3));
			cube.position.z = Math.round(mathRandom(3));
		}

		if (cube.position.x > 5) {
			cube.scale.y = 0.1 + Math.abs(mathRandom(3));
		}

		floor.position.set(
			cube.position.x,
			0 /*floor.scale.y / 2*/,
			cube.position.z
		);

		town.add(floor);
		town.add(cube);
	}
	//----------------------------------------------------------------- Particular

	var gmaterial = new THREE.MeshToonMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide,
	});
	var gparticular = new THREE.CircleGeometry(0.01, 3);
	var aparticular = 5;

	for (var h = 1; h < 300; h++) {
		var particular = new THREE.Mesh(gparticular, gmaterial);
		particular.position.set(
			mathRandom(aparticular),
			mathRandom(aparticular),
			mathRandom(aparticular)
		);
		particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
		smoke.add(particular);
	}

	var pmaterial = new THREE.MeshPhongMaterial({
		color: 0x000000,
		side: THREE.DoubleSide,
		roughness: 10,
		metalness: 0.6,
		opacity: 0.9,
		transparent: true,
	});
	var pgeometry = new THREE.PlaneGeometry(60, 60);
	var pelement = new THREE.Mesh(pgeometry, pmaterial);
	pelement.rotation.x = (-90 * Math.PI) / 180;
	pelement.position.y = -0.001;
	pelement.receiveShadow = true;
	//pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);

	city.add(pelement);

	////////////////////

	Cubegeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);

	TextureCube = new THREE.Mesh(Cubegeometry, materials);
	TextureCube.position.y = 1;
	TextureCube.position.z = 6;
	TextureCube.rotation.x = Math.PI / 8;
	TextureCube.rotation.y = Math.PI / 4;

	if (dispositivo == 1) {
		TextureCube.position.y = 2;
		TextureCube.position.z = 4;
	}

	const edges = new THREE.EdgesGeometry(Cubegeometry);
	const line = new THREE.LineSegments(
		edges,
		new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 })
	);

	TextureCube.add(line);

	scene.add(TextureCube);
}
/*
function animate() {
    requestAnimationFrame(animate);
    TextureCube.rotation.x += 0.01;
    TextureCube.rotation.y += 0.01;
    renderer.render(scene, camera);
} */

//----------------------------------------------------------------- MOUSE function
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
	INTERSECTED;
var intersected;

function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentTouchStart(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouse.x = event.touches[0].pageX - window.innerWidth / 2;
		mouse.y = event.touches[0].pageY - window.innerHeight / 2;
	}
}

function onDocumentTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouse.x = event.touches[0].pageX - window.innerWidth / 2;
		mouse.y = event.touches[0].pageY - window.innerHeight / 2;
	}
}
if (dispositivo) {
	window.addEventListener("mousemove", onMouseMove, false);
	window.addEventListener("touchstart", onDocumentTouchStart, false);
	window.addEventListener("touchmove", onDocumentTouchMove, false);
} else {
}

//----------------------------------------------------------------- Lights
var ambientLight = new THREE.AmbientLight(0xffffff, 4);
var lightFront = new THREE.SpotLight(0xffffff, 20, 10);
var lightBack = new THREE.PointLight(0xffffff, 0.5);

var spotLightHelper = new THREE.SpotLightHelper(lightFront);
//scene.add( spotLightHelper );

lightFront.rotation.x = (45 * Math.PI) / 180;
lightFront.rotation.z = (-45 * Math.PI) / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShadow = true;
lightFront.shadow.mapSize.width = 6000;
lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
lightBack.position.set(0, 6, 0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(lightBack);
scene.add(city);
city.add(smoke);
city.add(town);

//----------------------------------------------------------------- GRID Helper
var gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);
city.add(gridHelper);

//----------------------------------------------------------------- CAR world
var generateCar = function () {};
//----------------------------------------------------------------- LINES world

var createCars = function (cScale = 2, cPos = 20, cColor = 0xffff00) {
	var cMat = new THREE.MeshToonMaterial({
		color: cColor,
		side: THREE.DoubleSide,
	});
	var cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
	var cElem = new THREE.Mesh(cGeo, cMat);
	var cAmp = 3;

	if (createCarPos) {
		createCarPos = false;
		cElem.position.x = -cPos;
		cElem.position.z = mathRandom(cAmp);

		TweenMax.to(cElem.position, 3, {
			x: cPos,
			repeat: -1,
			yoyo: true,
			delay: mathRandom(3),
		});
	} else {
		createCarPos = true;
		cElem.position.x = mathRandom(cAmp);
		cElem.position.z = -cPos;
		cElem.rotation.y = (90 * Math.PI) / 180;

		TweenMax.to(cElem.position, 5, {
			z: cPos,
			repeat: -1,
			yoyo: true,
			delay: mathRandom(3),
			ease: Power1.easeInOut,
		});
	}
	cElem.receiveShadow = true;
	cElem.castShadow = true;
	cElem.position.y = Math.abs(mathRandom(5));
	city.add(cElem);
};

var generateLines = function () {
	for (var i = 0; i < 60; i++) {
		createCars(0.1, 20);
	}
};

//----------------------------------------------------------------- CAMERA position

var cameraSet = function () {
	createCars(0.1, 20, 0xffffff);
	//TweenMax.to(camera.position, 1, {y:1+Math.random()*4, ease:Expo.easeInOut})
};

//----------------------------------------------------------------- ANIMATE

var animate = function () {
	var time = Date.now() * 0.00005;
	requestAnimationFrame(animate);

	city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
	city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
	if (city.rotation.x < -0.05) city.rotation.x = -0.05;
	else if (city.rotation.x > 1) city.rotation.x = 1;
	var cityRotation = Math.sin(Date.now() / 5000) * 13;
	//city.rotation.x = cityRotation * Math.PI / 180;

	//console.log(city.rotation.x);
	//camera.position.y -= (-(mouse.y * 20) - camera.rotation.y) * uSpeed;;

	for (let i = 0, l = town.children.length; i < l; i++) {
		var object = town.children[i];
		//object.scale.y = Math.sin(time*50) * object.rotationValue;
		//object.rotation.y = (Math.sin((time/object.rotationValue) * Math.PI / 180) * 180);
		//object.rotation.z = (Math.cos((time/object.rotationValue) * Math.PI / 180) * 180);
	}

	smoke.rotation.y += 0.01;
	smoke.rotation.x += 0.01;

	camera.lookAt(city.position);

	const amplitude = 0.75; // límite de rotación cubo (radianes)
	const speed = 0.02; // velocidad oscilación cubo
	const textureSpeed = 1; // velocidad rotación textura

	// Girar cubo con Math.sin para vaivén suave
	time += speed;
	if (dispositivo == 1) {
		TextureCube.rotation.x = (Math.sin(time) * amplitude) / 2;
	} else {
		TextureCube.rotation.x = Math.sin(time) * amplitude;
	}
	if (TextureCube.INTERSECTED) {
		console.log("Intersected");
	}

	//TextureCube.rotation.x += 0.001;
	//TextureCube.rotation.y += 0.001;

	renderer.render(scene, camera);
};

//----------------------------------------------------------------- START functions
generateLines();
init();
animate();
