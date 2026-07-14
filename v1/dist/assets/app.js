import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MODEL_ROOT = "./assets/models/";
const PREVIEW_ROOT = "./assets/previews/";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const avatars = [
  { id: "fox", name: "狐狸", model: "animal-fox.glb", preview: "animal-fox.png", blurb: "喜歡沿著林邊的小路走。" },
  { id: "deer", name: "鹿", model: "animal-deer.glb", preview: "animal-deer.png", blurb: "耳朵總比腳步早發現風。" },
  { id: "bunny", name: "兔子", model: "animal-bunny.glb", preview: "animal-bunny.png", blurb: "擅長找到最柔軟的草地。" },
  { id: "cat", name: "貓咪", model: "animal-cat.glb", preview: "animal-cat.png", blurb: "走累了就找一塊陽光坐下。" },
  { id: "panda", name: "熊貓", model: "animal-panda.glb", preview: "animal-panda.png", blurb: "今天只安排一件事：慢慢走。" }
];

const wildlife = [
  { id: "beaver", name: "河狸", model: "animal-beaver.glb", position: { x: 10, z: 4 }, radius: 4, discoveryText: "牠正在溪邊整理一根小樹枝，水面也跟著輕輕晃。" },
  { id: "bee", name: "蜜蜂", model: "animal-bee.glb", position: { x: -11, z: -8 }, radius: 3, discoveryText: "一點黃色的忙碌在花叢間來回，像一顆有翅膀的太陽。" },
  { id: "dog", name: "小狗", model: "animal-dog.glb", position: { x: 5, z: -11 }, radius: 4, discoveryText: "牠把森林裡的每一個聲音，都當成值得認識的新朋友。" },
  { id: "koala", name: "無尾熊", model: "animal-koala.glb", position: { x: -13, z: 7 }, radius: 3, discoveryText: "高高的樹影裡有一雙慢吞吞的眼睛，正看著你經過。" },
  { id: "monkey", name: "猴子", model: "animal-monkey.glb", position: { x: -3, z: -12 }, radius: 4, discoveryText: "樹梢傳來一聲短短的笑，牠好像比你更熟悉這條路。" },
  { id: "parrot", name: "鸚鵡", model: "animal-parrot.glb", position: { x: 13, z: -7 }, radius: 3, discoveryText: "牠把剛聽見的風聲學得很像，森林因此多了一段回音。" }
];

const npcs = [
  {
    id: "fox-traveler", name: "栗子", role: "森林路人 · 動物旅人", kind: "animal", modelId: "fox", position: { x: -7, z: 9 }, color: "#d96a4a", dialogue: {
      start: { text: "早安。你也沒有特別要去哪裡嗎？我覺得這樣很好，路才會有機會自己出現。", choices: [
        { label: "我想沿著溪邊走走。", next: "creek" },
        { label: "我還沒決定，先看看。", next: "slow" }
      ] },
      creek: { text: "那就記得留意水邊的腳印。今天的河狸好像比平常早起。", choices: [{ label: "收下這個提醒", next: "end" }] },
      slow: { text: "很好。森林最喜歡那些沒有急著離開的人。", choices: [{ label: "和栗子道別", next: "end" }] },
      end: { text: "待會兒見，旅人。希望下一個轉彎有一點小驚喜。", choices: [] }
    }
  },
  {
    id: "panda-traveler", name: "竹影", role: "森林路人 · 動物旅人", kind: "animal", modelId: "panda", position: { x: 12, z: 8 }, color: "#6f8e57", dialogue: {
      start: { text: "我正在數今天看見的葉子。數到第七片的時候，突然忘了前面數過幾片。", choices: [
        { label: "那就重新開始吧。", next: "restart" },
        { label: "葉子不用數也可以。", next: "release" }
      ] },
      restart: { text: "你說得對。從這一片開始，第一片就是第一片。", choices: [{ label: "一起笑一笑", next: "end" }] },
      release: { text: "嗯，這樣我可以把時間拿來看雲。雲今天很像一隻睡著的貓。", choices: [{ label: "抬頭看看", next: "end" }] },
      end: { text: "祝你今天也找到一件不必計算的事。", choices: [] }
    }
  },
  {
    id: "ranger", name: "阿木", role: "森林路人 · 巡林員", kind: "human", position: { x: -12, z: -2 }, color: "#c8794b", appearance: "ranger", dialogue: {
      start: { text: "這條路剛下過一點露水，走慢一點，鞋底會聽見草的聲音。", choices: [
        { label: "我會放慢腳步。", next: "care" },
        { label: "謝謝你的提醒。", next: "thanks" }
      ] },
      care: { text: "很好。森林不是要被走完的，是要被記住幾個片刻。", choices: [{ label: "記進手札", next: "end" }] },
      thanks: { text: "不客氣。今天的陽光正好，別忘了看看頭頂。", choices: [{ label: "抬頭看看", next: "end" }] },
      end: { text: "祝你散步愉快。需要方向的話，就找有苔蘚的石頭。", choices: [] }
    }
  },
  {
    id: "backpacker", name: "小滿", role: "森林路人 · 背包客", kind: "human", position: { x: 2, z: 14 }, color: "#557f92", appearance: "backpacker", dialogue: {
      start: { text: "我剛才在空地看到一束很圓的光。你要不要也去找找看？", choices: [
        { label: "好啊，聽起來很特別。", next: "yes" },
        { label: "我想先留在這附近。", next: "stay" }
      ] },
      yes: { text: "那我們各走一邊。找到的人，晚點把故事說給另一個人聽。", choices: [{ label: "約好了", next: "end" }] },
      stay: { text: "也好。每個人都有自己的舒服距離，森林不會催你。", choices: [{ label: "坐一下", next: "end" }] },
      end: { text: "再見，祝你在自己的方向上遇見好事。", choices: [] }
    }
  }
];

const state = {
  phase: "select",
  avatarId: avatars[0].id,
  discoveredIds: new Set(),
  metNpcIds: new Set(),
  dialogue: null,
  nearby: null
};

const dom = {
  startScreen: document.querySelector("#start-screen"),
  gameScreen: document.querySelector("#game-screen"),
  avatarPicker: document.querySelector("#avatar-picker"),
  startButton: document.querySelector("#start-button"),
  canvas: document.querySelector("#world-canvas"),
  journalStamps: document.querySelector("#journal-stamps"),
  discoveryCount: document.querySelector("#discovery-count"),
  prompt: document.querySelector("#interaction-prompt"),
  promptLabel: document.querySelector("#interaction-label"),
  discoveryPanel: document.querySelector("#discovery-panel"),
  discoveryClose: document.querySelector("#discovery-close"),
  discoveryNumber: document.querySelector("#discovery-number"),
  discoveryVisual: document.querySelector("#discovery-visual"),
  discoverySpecies: document.querySelector("#discovery-species"),
  discoveryTitle: document.querySelector("#discovery-title"),
  discoveryCopy: document.querySelector("#discovery-copy"),
  dialoguePanel: document.querySelector("#dialogue-panel"),
  dialogueClose: document.querySelector("#dialogue-close"),
  dialogueAvatar: document.querySelector("#dialogue-avatar"),
  dialogueRole: document.querySelector("#dialogue-role"),
  dialogueSpeaker: document.querySelector("#dialogue-speaker"),
  dialogueText: document.querySelector("#dialogue-text"),
  dialogueActions: document.querySelector("#dialogue-actions"),
  toast: document.querySelector("#toast"),
  loadingOverlay: document.querySelector("#loading-overlay"),
  loadingTitle: document.querySelector("#loading-title"),
  loadingStatus: document.querySelector("#loading-status"),
  loadingBarFill: document.querySelector("#loading-bar-fill"),
  errorOverlay: document.querySelector("#error-overlay"),
  errorMessage: document.querySelector("#error-message"),
  retryButton: document.querySelector("#retry-button")
};

let renderer;
let scene;
let camera;
let clock;
let animationFrame;
let modelLoader;
let modelCache = new Map();
let player;
let playerMixer;
let playerActions = {};
let animals = [];
let npcActors = [];
let obstacles = [];
let worldInitialized = false;
let cameraYaw = 0;
let cameraPitch = 0.54;
let cameraDistance = 7.2;
let isDragging = false;
let previousPointer = { x: 0, y: 0 };
let toastTimer;
const keys = new Set();

function renderAvatarPicker() {
  dom.avatarPicker.innerHTML = avatars.map((avatar) => `
    <button class="avatar-card" type="button" role="listitem" aria-selected="${avatar.id === state.avatarId}" data-avatar-id="${avatar.id}" aria-label="選擇${avatar.name}：${avatar.blurb}">
      <span class="avatar-card__tick" aria-hidden="true">${avatar.id === state.avatarId ? "✦" : ""}</span>
      <img src="${PREVIEW_ROOT}${avatar.preview}" alt="" />
      <span>${avatar.name}</span>
    </button>
  `).join("");
}

function selectAvatar(id) {
  if (!avatars.some((avatar) => avatar.id === id)) return;
  state.avatarId = id;
  renderAvatarPicker();
  dom.avatarPicker.querySelector(`[data-avatar-id="${id}"]`)?.focus();
}

function setPhase(phase) {
  state.phase = phase;
  const isPlay = ["explore", "dialogue", "discovery"].includes(phase);
  dom.startScreen.hidden = isPlay || phase === "loading" || phase === "error";
  dom.gameScreen.hidden = !isPlay && phase !== "loading" && phase !== "error";
  dom.loadingOverlay.hidden = phase !== "loading";
  dom.errorOverlay.hidden = phase !== "error";
}

function updateJournal() {
  dom.discoveryCount.textContent = state.discoveredIds.size;
  dom.journalStamps.innerHTML = wildlife.filter((animal) => state.discoveredIds.has(animal.id)).map((animal) => `
    <span class="journal-stamp" title="${animal.name}"><img src="${PREVIEW_ROOT}${animal.model.replace(".glb", ".png")}" alt="${animal.name}" /></span>
  `).join("");
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { dom.toast.hidden = true; }, 2600);
}

function setLoading(progress, status) {
  dom.loadingBarFill.style.width = `${Math.round(progress * 100)}%`;
  dom.loadingStatus.textContent = status;
}

function getModelUrl(modelId) {
  const avatar = avatars.find((item) => item.id === modelId);
  return `${MODEL_ROOT}${avatar?.model || `animal-${modelId}.glb`}`;
}

async function loadModel(modelId, progressIndex, total) {
  if (modelCache.has(modelId)) return modelCache.get(modelId);
  const url = getModelUrl(modelId);
  setLoading(progressIndex / total, `正在邀請 ${modelId === "bee" ? "蜜蜂" : "森林朋友"} 加入今天的散步。`);
  const gltf = await modelLoader.loadAsync(url);
  const asset = { scene: gltf.scene, animations: gltf.animations || [] };
  asset.scene.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    if (object.material) object.material.flatShading = true;
  });
  modelCache.set(modelId, asset);
  setLoading((progressIndex + 1) / total, `${progressIndex + 1} / ${total} 份森林素材已準備好。`);
  return asset;
}

function cloneModel(modelId, scale = 1.35) {
  const cached = modelCache.get(modelId);
  if (!cached) throw new Error(`Missing model: ${modelId}`);
  const object = cached.scene.clone(true);
  object.scale.setScalar(scale);
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return { object, animations: cached.animations };
}

function chooseClip(animations, preferred, fallbackIndex = 0) {
  if (!animations?.length) return null;
  const wanted = animations.find((clip) => preferred.some((keyword) => clip.name.toLowerCase().includes(keyword)));
  return wanted || animations[Math.min(fallbackIndex, animations.length - 1)];
}

function createAnimatedActor(modelId, scale = 1.35) {
  const { object, animations } = cloneModel(modelId, scale);
  const mixer = animations.length ? new THREE.AnimationMixer(object) : null;
  const actions = {};
  if (mixer) {
    const idleClip = chooseClip(animations, ["idle", "stand", "breathe"], 0);
    const walkClip = chooseClip(animations, ["walk", "run", "move"], 1);
    if (idleClip) actions.idle = mixer.clipAction(idleClip);
    if (walkClip) actions.walk = mixer.clipAction(walkClip);
    actions.idle?.play();
  }
  return { object, mixer, actions };
}

function playActorAction(actor, actionName) {
  if (!actor?.actions?.[actionName] || actor.currentAction === actionName) return;
  actor.currentAction = actionName;
  Object.entries(actor.actions).forEach(([name, action]) => {
    if (name === actionName) action.reset().fadeIn(.2).play();
    else action.fadeOut(.2);
  });
}

function addBox(parent, size, position, color, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshStandardMaterial({ color, roughness: .95, flatShading: true }));
  mesh.position.set(...position);
  mesh.castShadow = options.castShadow !== false;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addTree(x, z, scale = 1, variant = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);
  const trunkColor = variant % 2 ? 0x7c5036 : 0x65452f;
  const leafColor = variant % 3 ? 0x3e7650 : 0x557f4c;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.25, .38, 2.2, 6), new THREE.MeshStandardMaterial({ color: trunkColor, flatShading: true }));
  trunk.position.y = 1.1;
  trunk.castShadow = true;
  group.add(trunk);
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.55, 2.7, 7), new THREE.MeshStandardMaterial({ color: leafColor, flatShading: true }));
  canopy.position.y = 2.7;
  canopy.rotation.y = variant * .4;
  canopy.castShadow = true;
  group.add(canopy);
  if (variant % 2 === 0) {
    const canopyTwo = canopy.clone();
    canopyTwo.scale.set(.7, .62, .7);
    canopyTwo.position.y = 3.75;
    canopyTwo.position.x = .22;
    canopyTwo.material = canopy.material.clone();
    canopyTwo.material.color.offsetHSL(.02, .02, .04);
    group.add(canopyTwo);
  }
  scene.add(group);
  obstacles.push({ x, z, radius: 1.05 * scale });
}

function addRock(x, z, scale = 1) {
  const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(.65 * scale, 0), new THREE.MeshStandardMaterial({ color: 0x68776c, roughness: 1, flatShading: true }));
  rock.position.set(x, .42 * scale, z);
  rock.rotation.set(.12, x * .18, z * .11);
  rock.scale.y = .65;
  rock.castShadow = true;
  rock.receiveShadow = true;
  scene.add(rock);
  obstacles.push({ x, z, radius: .8 * scale });
}

function addMushroom(x, z, color = 0xd96a4a) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(.06, .09, .28, 6), new THREE.MeshStandardMaterial({ color: 0xf4e9c8, flatShading: true }));
  stem.position.y = .14;
  const cap = new THREE.Mesh(new THREE.ConeGeometry(.2, .16, 7), new THREE.MeshStandardMaterial({ color, flatShading: true }));
  cap.position.y = .3;
  cap.rotation.x = Math.PI;
  group.add(stem, cap);
  scene.add(group);
}

function createEnvironment() {
  scene.background = new THREE.Color(0x173a30);
  scene.fog = new THREE.Fog(0x173a30, 20, 48);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(48, 48), new THREE.MeshStandardMaterial({ color: 0x52744f, roughness: 1, flatShading: true }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const path = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 42), new THREE.MeshStandardMaterial({ color: 0xc4a56d, roughness: 1, flatShading: true }));
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, .012, -1);
  path.rotation.z = -.15;
  path.receiveShadow = true;
  scene.add(path);

  const clearing = new THREE.Mesh(new THREE.CircleGeometry(7.4, 9), new THREE.MeshStandardMaterial({ color: 0x78935d, roughness: 1, flatShading: true }));
  clearing.rotation.x = -Math.PI / 2;
  clearing.position.set(-9, .02, -9);
  scene.add(clearing);

  const stream = new THREE.Mesh(new THREE.BoxGeometry(4.8, .05, 33), new THREE.MeshStandardMaterial({ color: 0x78b4aa, transparent: true, opacity: .78, roughness: .25, flatShading: true }));
  stream.position.set(9.2, .04, 1);
  stream.receiveShadow = true;
  scene.add(stream);
  for (let i = -13; i <= 13; i += 2.4) addRock(6.8 + Math.sin(i) * .45, i, .5);

  const treePositions = [
    [-19, -18, 1.25], [-13, -19, .9], [-5, -19, 1.1], [6, -18, 1.05], [16, -17, 1.2], [20, -10, .9],
    [20, 2, 1.12], [19, 13, 1.2], [12, 19, .95], [1, 19, 1.15], [-11, 18, .95], [-19, 16, 1.18],
    [-19, 7, .95], [-18, -3, 1.15], [-15, -11, .82], [-5, -14, .78], [4, -13, .9], [16, -8, .8],
    [15, 12, .84], [-9, 12, .84], [-14, 1, .88], [5, 14, .88]
  ];
  treePositions.forEach(([x, z, scale], index) => addTree(x, z, scale, index % 5));
  [[-10, -4], [-8, -5], [-6, -6], [-12, -12], [-1, 9], [4, 11], [14, 15], [15, -13], [3, -17], [-16, 11]].forEach(([x, z], index) => addMushroom(x, z, index % 2 ? 0xf4b644 : 0xd96a4a));
  [[-3, 5, .8], [2, 8, .7], [-11, 6, .8], [12, -4, .8], [4, -5, .55], [-15, -7, .7]].forEach(([x, z, scale]) => addRock(x, z, scale));

  const sign = new THREE.Group();
  sign.position.set(-2.6, 1.2, 15.7);
  sign.rotation.y = .2;
  addBox(sign, [1.9, .85, .12], [0, 0, 0], 0xd9b670);
  addBox(sign, [.12, 1.4, .12], [-.55, -.85, 0], 0x65452f);
  addBox(sign, [.12, 1.4, .12], [.55, -.85, 0], 0x65452f);
  scene.add(sign);
};

function createLights() {
  scene.add(new THREE.HemisphereLight(0xa6c89b, 0x173a30, 2.3));
  const sun = new THREE.DirectionalLight(0xffe0a1, 3.2);
  sun.position.set(-12, 20, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -25;
  sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25;
  sun.shadow.camera.bottom = -25;
  scene.add(sun);
}

function createHumanActor(npc) {
  const group = new THREE.Group();
  const bodyColor = new THREE.Color(npc.color);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(.32, .42, .85, 6), new THREE.MeshStandardMaterial({ color: bodyColor, flatShading: true }));
  body.position.y = .67;
  body.castShadow = true;
  const head = new THREE.Mesh(new THREE.SphereGeometry(.32, 8, 6), new THREE.MeshStandardMaterial({ color: 0xf0b078, flatShading: true }));
  head.position.y = 1.34;
  head.castShadow = true;
  const hat = new THREE.Mesh(new THREE.ConeGeometry(.39, .2, 6), new THREE.MeshStandardMaterial({ color: npc.appearance === "ranger" ? 0x557f4c : 0x385c78, flatShading: true }));
  hat.position.y = 1.68;
  hat.castShadow = true;
  group.add(body, head, hat);
  if (npc.appearance === "backpacker") {
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(.56, .58, .22), new THREE.MeshStandardMaterial({ color: 0xd96a4a, flatShading: true }));
    backpack.position.set(0, .8, -.29);
    backpack.castShadow = true;
    group.add(backpack);
  } else {
    const badge = new THREE.Mesh(new THREE.BoxGeometry(.13, .13, .03), new THREE.MeshStandardMaterial({ color: 0xf4b644, flatShading: true }));
    badge.position.set(0, .75, .37);
    group.add(badge);
  }
  return { object: group, mixer: null, actions: {} };
}

function addFloatingMarker(actor, color = 0xf4b644) {
  const marker = new THREE.Mesh(new THREE.RingGeometry(.16, .23, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .78, side: THREE.DoubleSide }));
  marker.rotation.x = -Math.PI / 2;
  marker.position.y = .04;
  actor.object.add(marker);
  actor.marker = marker;
}

function createActors() {
  const avatar = createAnimatedActor(state.avatarId, 1.4);
  player = { ...avatar, position: new THREE.Vector3(0, 0, 16), velocity: new THREE.Vector3() };
  player.object.position.copy(player.position);
  scene.add(player.object);
  playerMixer = player.mixer;
  playerActions = player.actions;

  animals = wildlife.map((definition, index) => {
    const actor = createAnimatedActor(definition.model.replace("animal-", "").replace(".glb", ""), definition.id === "bee" ? .85 : 1.25);
    actor.object.position.set(definition.position.x, definition.id === "bee" ? 1.45 : 0, definition.position.z);
    actor.home = new THREE.Vector3(definition.position.x, definition.id === "bee" ? 1.45 : 0, definition.position.z);
    actor.target = actor.home.clone();
    actor.definition = definition;
    actor.wanderTimer = index * .8;
    actor.isBee = definition.id === "bee";
    addFloatingMarker(actor, 0xf4b644);
    scene.add(actor.object);
    return actor;
  });

  npcActors = npcs.map((definition) => {
    const actor = definition.kind === "animal" ? createAnimatedActor(definition.modelId, 1.33) : createHumanActor(definition);
    actor.object.position.set(definition.position.x, 0, definition.position.z);
    actor.definition = definition;
    addFloatingMarker(actor, definition.color);
    scene.add(actor.object);
    return actor;
  });
}

function initializeRenderer() {
  renderer = new THREE.WebGLRenderer({ canvas: dom.canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, .1, 100);
  clock = new THREE.Clock();
  modelLoader = new GLTFLoader();
  worldInitialized = true;
}

function resetScene() {
  if (!worldInitialized) initializeRenderer();
  scene.clear();
  obstacles = [];
  animals = [];
  npcActors = [];
  player = null;
  playerMixer = null;
  playerActions = {};
  createEnvironment();
  createLights();
  createActors();
  cameraYaw = 0;
  cameraPitch = .54;
  cameraDistance = 7.2;
  updateCamera(1, true);
  if (!animationFrame) animate();
}

function isBlocked(position) {
  if (Math.abs(position.x) > 21 || Math.abs(position.z) > 21) return true;
  return obstacles.some((obstacle) => Math.hypot(position.x - obstacle.x, position.z - obstacle.z) < obstacle.radius + .48);
}

function updatePlayer(delta) {
  if (!player || state.phase !== "explore") return;
  const horizontal = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  const vertical = (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) - (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0);
  const input = new THREE.Vector3(horizontal, 0, vertical);
  const moving = input.lengthSq() > 0;
  if (moving) {
    input.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraYaw);
    const next = player.object.position.clone().addScaledVector(input, delta * 4.2);
    if (!isBlocked(next)) player.object.position.copy(next);
    player.object.rotation.y = Math.atan2(input.x, input.z);
    playActorAction(player, "walk");
  } else {
    playActorAction(player, "idle");
  }
  player.position.copy(player.object.position);
  if (playerMixer) playerMixer.update(delta);
}

function updateAnimals(delta, elapsed) {
  animals.forEach((actor, index) => {
    actor.wanderTimer -= delta;
    if (actor.wanderTimer <= 0 || actor.object.position.distanceTo(actor.target) < .45) {
      const angle = elapsed * (.22 + index * .03) + index * 2.7;
      const distance = .8 + ((index * 1.7) % 2.8);
      actor.target.copy(actor.home).add(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
      actor.wanderTimer = 2.5 + (index % 3) * 1.4;
    }
    const direction = actor.target.clone().sub(actor.object.position);
    direction.y = 0;
    const walking = direction.lengthSq() > .08;
    if (walking) {
      direction.normalize();
      actor.object.position.addScaledVector(direction, delta * (actor.isBee ? .42 : .6));
      actor.object.rotation.y = Math.atan2(direction.x, direction.z);
      playActorAction(actor, "walk");
    } else playActorAction(actor, "idle");
    actor.object.position.y = actor.isBee ? 1.35 + Math.sin(elapsed * 2.6 + index) * .18 : 0;
    if (actor.mixer) actor.mixer.update(delta);
    if (actor.marker) actor.marker.rotation.z += delta * .5;
  });
  npcActors.forEach((actor, index) => {
    if (actor.mixer) actor.mixer.update(delta);
    if (actor.marker) actor.marker.rotation.z = Math.sin(elapsed * 1.4 + index) * .14;
  });
}

function updateCamera(delta, instant = false) {
  if (!player || !camera) return;
  const target = player.object.position.clone().add(new THREE.Vector3(0, 1.1, 0));
  const offset = new THREE.Vector3(0, Math.sin(cameraPitch) * cameraDistance, Math.cos(cameraPitch) * cameraDistance);
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraYaw);
  const destination = target.clone().add(offset);
  if (instant || reducedMotion) camera.position.copy(destination);
  else camera.position.lerp(destination, Math.min(1, delta * 7));
  camera.lookAt(target);
}

function getNearby() {
  if (!player) return null;
  const candidates = [
    ...npcActors.map((actor) => ({ type: "npc", actor, distance: actor.object.position.distanceTo(player.object.position) })),
    ...animals.map((actor) => ({ type: "wildlife", actor, distance: actor.object.position.distanceTo(player.object.position) }))
  ].filter((item) => item.distance < (item.type === "npc" ? 3.1 : 2.8)).sort((a, b) => a.distance - b.distance);
  return candidates[0] || null;
}

function updateInteractionPrompt() {
  if (["dialogue", "discovery", "loading", "error"].includes(state.phase)) {
    dom.prompt.hidden = true;
    state.nearby = null;
    return;
  }
  const nearby = getNearby();
  state.nearby = nearby;
  if (!nearby) {
    dom.prompt.hidden = true;
    return;
  }
  const name = nearby.actor.definition.name;
  dom.promptLabel.textContent = nearby.type === "npc" ? `和${name}聊聊` : `看看${name}`;
  dom.prompt.hidden = false;
}

function openDiscovery(actor) {
  const item = actor.definition;
  const wasNew = !state.discoveredIds.has(item.id);
  state.discoveredIds.add(item.id);
  updateJournal();
  state.phase = "discovery";
  dom.discoveryNumber.textContent = String([...state.discoveredIds].indexOf(item.id) + 1).padStart(2, "0");
  dom.discoveryVisual.innerHTML = `<img src="${PREVIEW_ROOT}${item.model.replace(".glb", ".png")}" alt="" />`;
  dom.discoverySpecies.textContent = wasNew ? "NEW WILDLIFE" : "WILDLIFE NOTE";
  dom.discoveryTitle.textContent = item.name;
  dom.discoveryCopy.textContent = item.discoveryText;
  dom.discoveryPanel.hidden = false;
  dom.discoveryClose.focus();
  if (wasNew) showToast(`手札新增：${item.name}`);
}

function closeDiscovery() {
  dom.discoveryPanel.hidden = true;
  state.phase = "explore";
  dom.canvas.focus();
}

function openDialogue(actor) {
  const npc = actor.definition;
  state.dialogue = { npcId: npc.id, nodeId: "start" };
  state.phase = "dialogue";
  dom.dialoguePanel.hidden = false;
  renderDialogue();
  dom.dialogueClose.focus();
}

function renderDialogue() {
  const npc = npcs.find((item) => item.id === state.dialogue?.npcId);
  const node = npc?.dialogue[state.dialogue?.nodeId];
  if (!npc || !node) return;
  dom.dialogueRole.textContent = npc.role;
  dom.dialogueSpeaker.textContent = npc.name;
  dom.dialogueText.textContent = node.text;
  dom.dialogueAvatar.classList.toggle("dialogue-card__avatar--human", npc.kind === "human");
  dom.dialogueAvatar.innerHTML = npc.kind === "animal" ? `<img src="${PREVIEW_ROOT}animal-${npc.modelId}.png" alt="" />` : "";
  dom.dialogueActions.innerHTML = node.choices.length ? node.choices.map((choice) => `<button class="dialogue-choice" type="button" data-next="${choice.next}">${choice.label}</button>`).join("") : `<button class="dialogue-close" type="button">收起手札</button>`;
  if (!node.choices.length) state.metNpcIds.add(npc.id);
}

function closeDialogue() {
  if (state.dialogue?.npcId) state.metNpcIds.add(state.dialogue.npcId);
  state.dialogue = null;
  state.phase = "explore";
  dom.dialoguePanel.hidden = true;
  dom.canvas.focus();
}

function interact() {
  if (state.phase === "discovery") return closeDiscovery();
  if (state.phase === "dialogue") return closeDialogue();
  if (!state.nearby) return;
  if (state.nearby.type === "npc") openDialogue(state.nearby.actor);
  else openDiscovery(state.nearby.actor);
}

function showError(error) {
  console.error(error);
  state.phase = "error";
  dom.errorMessage.textContent = "有一份森林素材沒有成功抵達。請確認網站是透過 HTTP server 開啟，再重新試一次。";
  setPhase("error");
}

async function startGame() {
  state.discoveredIds.clear();
  state.metNpcIds.clear();
  updateJournal();
  setPhase("loading");
  dom.loadingTitle.textContent = "正在整理森林";
  dom.loadingStatus.textContent = "準備一點陽光和樹影。";
  dom.loadingBarFill.style.width = "0%";
  try {
    if (!worldInitialized) initializeRenderer();
    const ids = [...new Set([state.avatarId, ...wildlife.map((item) => item.id), "fox", "panda"])];
    for (let index = 0; index < ids.length; index += 1) await loadModel(ids[index], index, ids.length);
    resetScene();
    setPhase("explore");
    dom.canvas.focus();
    showToast("沿著小路走走吧，森林不趕時間。\n");
  } catch (error) {
    showError(error);
  }
}

function returnToSelection() {
  state.phase = "select";
  state.dialogue = null;
  state.discoveredIds.clear();
  state.metNpcIds.clear();
  dom.discoveryPanel.hidden = true;
  dom.dialoguePanel.hidden = true;
  dom.prompt.hidden = true;
  dom.errorOverlay.hidden = true;
  dom.gameScreen.hidden = true;
  dom.startScreen.hidden = false;
  renderAvatarPicker();
}

function animate() {
  animationFrame = requestAnimationFrame(animate);
  const delta = Math.min(clock?.getDelta() || .016, .05);
  const elapsed = clock?.elapsedTime || 0;
  if (state.phase === "explore") updatePlayer(delta);
  updateAnimals(delta, elapsed);
  updateCamera(delta);
  updateInteractionPrompt();
  if (renderer && scene && camera) renderer.render(scene, camera);
}

function resize() {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

function bindEvents() {
  dom.avatarPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-avatar-id]");
    if (button) selectAvatar(button.dataset.avatarId);
  });
  dom.startButton.addEventListener("click", startGame);
  dom.retryButton.addEventListener("click", returnToSelection);
  dom.discoveryClose.addEventListener("click", closeDiscovery);
  dom.dialogueClose.addEventListener("click", closeDialogue);
  dom.dialogueActions.addEventListener("click", (event) => {
    if (event.target.closest(".dialogue-close")) {
      closeDialogue();
      return;
    }
    const choice = event.target.closest("[data-next]");
    if (!choice || !state.dialogue) return;
    state.dialogue.nodeId = choice.dataset.next;
    renderDialogue();
    if (state.dialogue && dom.dialogueActions.querySelector("[data-next]")) dom.dialogueActions.querySelector("[data-next]").focus();
  });
  dom.prompt.addEventListener("click", interact);
  window.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
    if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
      keys.add(event.code);
    }
    if (event.code === "KeyE" && !event.repeat) interact();
    if (event.code === "Escape") {
      if (state.phase === "discovery") closeDiscovery();
      else if (state.phase === "dialogue") closeDialogue();
    }
  });
  window.addEventListener("keyup", (event) => keys.delete(event.code));
  dom.canvas.addEventListener("pointerdown", (event) => {
    if (state.phase !== "explore") return;
    isDragging = true;
    previousPointer = { x: event.clientX, y: event.clientY };
    dom.canvas.setPointerCapture?.(event.pointerId);
  });
  dom.canvas.addEventListener("pointermove", (event) => {
    if (!isDragging || state.phase !== "explore") return;
    const dx = event.clientX - previousPointer.x;
    const dy = event.clientY - previousPointer.y;
    previousPointer = { x: event.clientX, y: event.clientY };
    cameraYaw -= dx * .006;
    cameraPitch = THREE.MathUtils.clamp(cameraPitch + dy * .004, .25, 1.08);
  });
  dom.canvas.addEventListener("pointerup", () => { isDragging = false; });
  dom.canvas.addEventListener("pointercancel", () => { isDragging = false; });
  dom.canvas.addEventListener("wheel", (event) => {
    if (state.phase !== "explore") return;
    event.preventDefault();
    cameraDistance = THREE.MathUtils.clamp(cameraDistance + event.deltaY * .008, 4.8, 10.5);
  }, { passive: false });
  window.addEventListener("resize", resize);
}

renderAvatarPicker();
updateJournal();
bindEvents();
