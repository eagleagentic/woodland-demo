import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const $ = (selector) => document.querySelector(selector);
const mobile = matchMedia("(pointer: coarse)").matches || innerWidth < 720;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const MODEL_ROOT = "./assets/models/";
const SAVE_KEY = "wanderworld-terra-progress-v1";

const FILES = {
  player: "characters/people/blocky-characters/character-a.glb",
  personC: "characters/people/blocky-characters/character-c.glb",
  personH: "characters/people/blocky-characters/character-h.glb",
  personM: "characters/people/blocky-characters/character-m.glb",
  personQ: "characters/people/blocky-characters/character-q.glb",
  oobi: "characters/fantasy/platformer/character-oobi.glb",
  oodi: "characters/fantasy/platformer/character-oodi.glb",
  oozi: "characters/fantasy/platformer/character-oozi.glb",
  keeper: "characters/fantasy/graveyard/character-keeper.glb",
  skeleton: "characters/fantasy/graveyard/character-skeleton.glb",
  ghost: "characters/fantasy/graveyard/character-ghost.glb",
  vampire: "characters/fantasy/graveyard/character-vampire.glb",
  zombie: "characters/fantasy/graveyard/character-zombie.glb",
  cat: "characters/animals/cube-pets/animal-cat.glb",
  dog: "characters/animals/cube-pets/animal-dog.glb",
  bee: "characters/animals/cube-pets/animal-bee.glb",
  parrot: "characters/animals/cube-pets/animal-parrot.glb",
  deer: "characters/animals/cube-pets/animal-deer.glb",
  fox: "characters/animals/cube-pets/animal-fox.glb",
  bunny: "characters/animals/cube-pets/animal-bunny.glb",
  panda: "characters/animals/cube-pets/animal-panda.glb",
  beaver: "characters/animals/cube-pets/animal-beaver.glb",
  penguin: "characters/animals/cube-pets/animal-penguin.glb",
  koala: "characters/animals/cube-pets/animal-koala.glb",
  polar: "characters/animals/cube-pets/animal-polar.glb",
  taxi: "vehicles/road/car/taxi.glb",
  firetruck: "vehicles/road/car/firetruck.glb",
  delivery: "vehicles/road/car/delivery.glb",
  police: "vehicles/road/car/police.glb",
  homeA: "structures/suburban/city-suburban/building-type-a.glb",
  homeE: "structures/suburban/city-suburban/building-type-e.glb",
  homeL: "structures/suburban/city-suburban/building-type-l.glb",
  homeR: "structures/suburban/city-suburban/building-type-r.glb",
  townWall: "structures/fantasy/fantasy-town/wall-wood-window-shutters.glb",
  townWood: "structures/fantasy/fantasy-town/wall-wood.glb",
  roof: "structures/fantasy/fantasy-town/roof-gable.glb",
  highRoof: "structures/fantasy/fantasy-town/roof-high.glb",
  crypt: "structures/graveyard/graveyard/crypt.glb",
  graveWall: "structures/graveyard/graveyard/stone-wall.glb",
  fountain: "landmarks/fantasy-town/fountain-round.glb",
  windmill: "landmarks/fantasy-town/windmill.glb",
  watermill: "landmarks/fantasy-town/watermill.glb",
  stone: "landmarks/graveyard/gravestone-round.glb",
  crossStone: "landmarks/graveyard/gravestone-cross.glb",
  stallRed: "props/market/fantasy-town/stall-red.glb",
  stallGreen: "props/market/fantasy-town/stall-green.glb",
  cart: "props/market/fantasy-town/cart.glb",
  stallBench: "props/market/fantasy-town/stall-bench.glb",
  bannerRed: "props/decorations/fantasy-town/banner-red.glb",
  bannerGreen: "props/decorations/fantasy-town/banner-green.glb",
  lantern: "props/lighting/fantasy-town/lantern.glb",
  bench: "props/furniture/graveyard/bench.glb",
  shovel: "props/tools/graveyard/shovel.glb",
  pumpkin: "props/decorations/graveyard/pumpkin-carved.glb",
  hay: "props/decorations/graveyard/hay-bale.glb",
  lightpost: "props/lighting/graveyard/lightpost-single.glb",
  candles: "props/lighting/graveyard/candle-multiple.glb",
  cityTree: "environment/nature/city-suburban/tree-large.glb",
  cityTreeSmall: "environment/nature/city-suburban/tree-small.glb",
  planter: "environment/nature/city-suburban/planter.glb",
  townTree: "environment/nature/fantasy-town/tree.glb",
  rock: "environment/nature/fantasy-town/rock-large.glb",
  gravePine: "environment/nature/graveyard/pine-crooked.glb",
  pine: "environment/nature/graveyard/pine.glb",
  forestTree: "environment/nature/platformer/tree.glb",
  forestPine: "environment/nature/platformer/tree-pine.glb",
  flowers: "environment/nature/platformer/flowers.glb",
  mushrooms: "environment/nature/platformer/mushrooms.glb",
  grass: "environment/nature/platformer/grass.glb",
  grassBlock: "environment/terrain/platformer/block-grass-large.glb",
  lowGrassBlock: "environment/terrain/platformer/block-grass-low.glb",
  platform: "environment/terrain/platformer/platform.glb",
  cityPath: "environment/paths/city-suburban/path-long.glb",
  driveway: "environment/paths/city-suburban/driveway-long.glb",
  townRoad: "environment/paths/fantasy-town/road.glb",
  graveRoad: "environment/paths/graveyard/road.glb",
  key: "gameplay/interactables/platformer/key.glb",
  lever: "gameplay/interactables/platformer/lever.glb",
  button: "gameplay/interactables/platformer/button-round.glb",
  gate: "gameplay/interactables/platformer/door-rotate.glb",
  ladder: "gameplay/interactables/platformer/ladder-long.glb",
  jewel: "gameplay/collectibles/platformer/jewel.glb",
  star: "gameplay/collectibles/platformer/star.glb",
  coin: "gameplay/collectibles/platformer/coin-gold.glb"
};

const ZONES = {
  suburb: { name: "晨光郊區", x: -32, z: -32, ground: 0xaed78f, sky: 0x88cdd1 },
  market: { name: "奇幻市集", x: -32, z: 32, ground: 0xe8bb72, sky: 0xa0d1c4 },
  forest: { name: "林間高地", x: 32, z: 32, ground: 0x78bc80, sky: 0x91c9bd },
  graveyard: { name: "暮色墓園", x: 32, z: -32, ground: 0x797a9e, sky: 0x8894ba }
};

const NPCS = [
  { id: "post", name: "郵差阿信", role: "迷路郵差", zone: "suburb", x: -45, z: -31, model: "personC", intro: "我手上有三封信、四個門牌，還有一點點方向感。你知道風車街七號在哪嗎？", choices: ["我替你看看。", "不如先照門牌順序走？"], replies: ["太好了！如果找到八號也別告訴我，我怕工作突然變多。", "很有道理。但我的信已經決定自己排隊了。"] },
  { id: "kid", name: "小晴", role: "找狗的小孩", zone: "suburb", x: -23, z: -44, model: "personH", intro: "我的小狗叫豆豆。牠會追尾巴，但通常追不到很遠。你看見牠嗎？", choices: ["屋邊好像有腳印。", "牠可能正在聞花。"], replies: ["那一定是牠！也可能是貓，但我先保持樂觀。", "對，豆豆把聞花當成很嚴肅的工作。"] },
  { id: "taxi", name: "林叔", role: "候客的士司機", zone: "suburb", x: -49, z: -45, model: "personM", intro: "我在等一位說「兩分鐘到」的乘客。那是二十分鐘前的事。", choices: ["要不要先喝杯茶？", "這裡風景不錯。"], replies: ["好主意。計程錶不走，茶可以走。", "是啊，至少路邊的樹很守時。"] },
  { id: "fire", name: "阿焰", role: "消防員", zone: "suburb", x: -15, z: -25, model: "personQ", intro: "放心，沒有火警。我只是來確認這個消防設施是不是仍然很紅。", choices: ["結論如何？", "它紅得很有精神。"], replies: ["非常紅。今天的檢查圓滿完成。", "同意，這份精神值得寫進報告。"] },
  { id: "mira", name: "米拉", role: "寶石商人", zone: "market", x: -45, z: 22, model: "oodi", intro: "這顆寶石在月光下會發亮，在陽光下也會——其實它一直都很努力。", choices: ["它有甚麼用途？", "它看起來很開心。"], replies: ["提醒你：漂亮本身偶爾也算一種用途。", "你看得很準。它最擅長鼓勵路過的人。"] },
  { id: "baker", name: "麥叔", role: "風車麵包師", zone: "market", x: -20, z: 43, model: "personC", intro: "我把風車鑰匙放在「最安全的地方」，現在連我也找不到。", choices: ["我沿路留意。", "安全的地方通常太安全。"], replies: ["謝謝。聞到麵包香時往左，聞不到時也可以往左。", "對，安全到連我也進不去。"] },
  { id: "lulu", name: "露露", role: "噴泉旅人", zone: "market", x: -42, z: 39, model: "oobi", intro: "大家圍著噴泉交換故事。我的故事很短：我走錯路，然後來到好地方。", choices: ["這故事不錯。", "我也喜歡走錯路。"], replies: ["謝謝！錯路通常比對的路更會說故事。", "那我們是同一種旅人：容易抵達意外。"] },
  { id: "rocky", name: "洛奇", role: "水車觀察員", zone: "market", x: -12, z: 18, model: "personH", intro: "可以替我看看水車還有沒有轉嗎？我盯太久，現在連山也像在轉。", choices: ["我去看看。", "先看看自己的腳。"], replies: ["慢慢走。水車不會逃跑，至少今天不會。", "好提醒。我的鞋帶也開始有意見了。"] },
  { id: "ranger", name: "青木", role: "高地巡林員", zone: "forest", x: 22, z: 18, model: "personM", intro: "這裡的動物很多。請小聲一點，企鵝正在假裝自己很合群。", choices: ["我會放輕腳步。", "我會跟牠打招呼。"], replies: ["謝謝。狐狸會記住有禮貌的鞋子。", "可以，但牠可能只會很正式地點頭。"] },
  { id: "toto", name: "圖圖", role: "橋邊旅人", zone: "forest", x: 42, z: 38, model: "oozi", intro: "我在數橋上的木板。每次數到十，河狸就把我逗笑。", choices: ["你數到哪裡？", "河狸很懂得打斷人。"], replies: ["今天是第三次從一開始，但我不急。", "牠說這叫做更有趣的統計方式。"] },
  { id: "keeper", name: "守墓人阿柏", role: "守墓人", zone: "graveyard", x: 19, z: -43, model: "keeper", intro: "你有看到一把鏟子嗎？它原本靠著長椅。至少我記得那是鏟子，不是很安靜的骷髏。", choices: ["我替你留意。", "那邊的骷髏好像拿著甚麼。"], replies: ["感謝。它如果自己走回來，請先問它去了哪裡。", "那就解釋了：它連鏟子都坐得很端正。"] },
  { id: "bones", name: "骨哥", role: "忘事骷髏", zone: "graveyard", x: 30, z: -25, model: "skeleton", intro: "我忘了原本坐哪張長椅。好消息是，我坐哪張都不會腰酸。", choices: ["這張看來不錯。", "你可以自己挑一張。"], replies: ["有眼光。雖然我沒有。", "太自由了！我需要先坐一下冷靜。"] },
  { id: "boo", name: "小飄", role: "市集迷幽靈", zone: "graveyard", x: 23, z: -14, model: "ghost", intro: "市集今天熱鬧嗎？我一去，大家就說氣氛突然涼快了。", choices: ["噴泉旁很熱鬧。", "風車麵包很香。"], replies: ["太好了！我會帶一點陰風當伴手禮。", "香味我聞得到，只是大家聞到我會先跑一步。"] },
  { id: "vlad", name: "維拉德", role: "怕亮吸血鬼", zone: "graveyard", x: 48, z: -32, model: "vampire", intro: "墓園的燈是不是太亮？我連自己的神秘輪廓都看得一清二楚。", choices: ["戴頂帽子呢？", "那盞燈確實很努力。"], replies: ["天才。最好是一頂非常有陰影的帽子。", "太努力了，亮到我開始考慮搬去樹後面。"] },
  { id: "zuzu", name: "祖祖", role: "夜班園丁", zone: "graveyard", x: 42, z: -51, model: "zombie", intro: "別擔心，我只是在幫南瓜翻面。它們想每一邊都曬到月光。", choices: ["這很周到。", "南瓜會說話嗎？"], replies: ["謝謝！它們很安靜，所以特別適合夜班。", "只有在我忘記帶水的時候。它們很會嘆氣。"] }
];

const ANIMALS = [
  { species: "cat", name: "貓", zone: "suburb", x: -52, z: -38, text: "牠躲在屋旁，表情像是已經付過租金。" },
  { species: "dog", name: "小狗", zone: "suburb", x: -27, z: -39, text: "牠正在等一位也許迷路了的小主人。" },
  { species: "bee", name: "蜜蜂", zone: "suburb", x: -43, z: -20, text: "忙碌得像一顆會飛的小太陽。" },
  { species: "parrot", name: "小鳥", zone: "suburb", x: -18, z: -45, text: "牠把消防車的聲音學得不太像。" },
  { species: "deer", name: "鹿", zone: "forest", x: 19, z: 28, text: "牠在林緣張望，耳朵比風更早轉彎。", shy: true },
  { species: "fox", name: "狐狸", zone: "forest", x: 35, z: 25, text: "牠踩著自己的影子，走得很有禮貌。", shy: true },
  { species: "bunny", name: "兔子", zone: "forest", x: 25, z: 48, text: "牠相信所有蘑菇旁邊都值得停一下。", shy: true },
  { species: "panda", name: "熊貓", zone: "forest", x: 35, z: 51, text: "今天的行程只有一項：慢慢吃。" },
  { species: "beaver", name: "河狸", zone: "forest", x: 48, z: 21, text: "牠正在研究水車，似乎想提出改良方案。" },
  { species: "penguin", name: "企鵝", zone: "forest", x: 53, z: 47, text: "牠站在一小片雪旁，堅稱這裡很涼。" },
  { species: "koala", name: "無尾熊", zone: "forest", x: 17, z: 38, text: "牠把樹當成一張垂直的床。" },
  { species: "polar", name: "小白熊", zone: "forest", x: 48, z: 45, text: "牠正和企鵝討論哪裡比較像冬天。" }
];

const LANDMARKS = [
  { id: "hidden-cat", name: "躲貓小屋", zone: "suburb", x: -52, z: -34, asset: "planter", height: 1.25, text: "這棟小屋旁總有一雙鬍鬚悄悄出現。" },
  { id: "red-check", name: "紅色大檢查", zone: "suburb", x: -14, z: -22, asset: "button", height: 1.25, text: "消防員確認：今天的消防設施依然非常紅。" },
  { id: "fountain", name: "故事噴泉", zone: "market", x: -39, z: 35, asset: "fountain", height: 4.2, text: "水聲把旅人的故事攪在一起。" },
  { id: "windmill-key", name: "風車的鑰匙", zone: "market", x: -24, z: 46, asset: "key", height: 1.2, text: "麵包師的安全藏法，成功防住了本人。" },
  { id: "waterwheel", name: "還在轉的水車", zone: "market", x: -8, z: 16, asset: "watermill", height: 6, text: "水輪慢悠悠地回答：還在工作。" },
  { id: "moss-gate", name: "苔痕小門", zone: "forest", x: 18, z: 33, asset: "gate", height: 3, text: "一扇不急著通往任何地方的小門。" },
  { id: "hill-gem", name: "風頂寶石", zone: "forest", x: 42, z: 46, asset: "jewel", height: 1.8, text: "一顆替高地收藏陽光的寶石。" },
  { id: "mushroom-ring", name: "蘑菇小會議", zone: "forest", x: 28, z: 51, asset: "mushrooms", height: 1.25, text: "蘑菇圍成一圈，會議內容嚴格保密。" },
  { id: "bridge-lever", name: "橋邊拉桿", zone: "forest", x: 42, z: 34, asset: "lever", height: 1.5, text: "拉桿沒有打開任務清單，只讓橋邊的小旗輕輕揮了一下。" },
  { id: "lost-shovel", name: "散步的鏟子", zone: "graveyard", x: 24, z: -35, asset: "shovel", height: 2.1, text: "它離長椅不遠，只是守墓人的記憶走得更遠。" },
  { id: "bright-lamp", name: "過亮墓園燈", zone: "graveyard", x: 47, z: -36, asset: "lightpost", height: 4.2, text: "亮得足以讓吸血鬼正式提出意見。" },
  { id: "moon-bench", name: "月影長椅", zone: "graveyard", x: 30, z: -24, asset: "bench", height: 2.2, text: "每張長椅都自稱是骨哥的老位置。" }
];

const catalog = {
  zones: Object.entries(ZONES).map(([id, zone]) => ({ id, name: zone.name, sub: "到訪區域" })),
  animals: ANIMALS.map((animal) => ({ id: animal.species, name: animal.name, sub: "動物觀察" })),
  npcs: NPCS.map((npc) => ({ id: npc.id, name: npc.name, sub: npc.role })),
  landmarks: LANDMARKS.map((landmark) => ({ id: landmark.id, name: landmark.name, sub: "地標與小事件" }))
};

const dom = {
  canvas: $("#world"), loading: $("#loading"), loadBar: $("#load-bar"), loadText: $("#load-text"),
  welcome: $("#welcome"), start: $("#start"), place: $("#place-card"), placeName: $("#place-name"),
  hint: $("#hint"), toast: $("#toast"), card: $("#card"), cardRole: $("#card-role"), cardName: $("#card-name"),
  cardText: $("#card-text"), choices: $("#choices"), journal: $("#journal"), journalSummary: $("#journal-summary"),
  journalTabs: $("#journal-tabs"), journalList: $("#journal-list"), journalButton: $("#journal-btn"),
  soundButton: $("#sound-btn"), resetButton: $("#reset-btn"), fatal: $("#webgl-error")
};

const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null") || { zones: [], animals: [], npcs: [], landmarks: [] };
for (const key of Object.keys(catalog)) if (!Array.isArray(saved[key])) saved[key] = [];

let scene;
let camera;
let renderer;
let player;
let playerVisual;
let destinationMarker;
let audioContext;
let toastTimer;
let completedLoads = 0;
const rawModels = new Map();
const groundMeshes = [];
const colliders = [];
const interactionRoots = [];
const entities = [];
const keyState = new Set();
const pointers = new Map();
const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
const tempA = new THREE.Vector3();
const tempB = new THREE.Vector3();
const tempC = new THREE.Vector3();
const tempCenter = new THREE.Vector3();
const tempSize = new THREE.Vector3();
const box3 = new THREE.Box3();

const state = {
  started: false,
  modal: false,
  sound: true,
  zone: "suburb",
  yaw: 0.68,
  distance: mobile ? 21 : 24,
  target: new THREE.Vector3(),
  hasTarget: false,
  pending: null,
  focus: null,
  markerTime: 0,
  blockedTime: 0,
  lastJournalTab: "zones",
  elapsed: 0,
  lastFrame: performance.now()
};

const manager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(manager);

function updateLoading(text) {
  const expected = Object.keys(FILES).length;
  const percentage = Math.min(94, 5 + Math.round((completedLoads / expected) * 89));
  dom.loadBar.style.width = `${percentage}%`;
  dom.loadText.textContent = `${text} ${percentage}%`;
}

function saveProgress() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
}

function notify(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("show"), 2800);
}

function discover(type, id, label) {
  if (saved[type].includes(id)) return;
  saved[type].push(id);
  saveProgress();
  const prefix = type === "zones" ? "新地點" : type === "animals" ? "新發現" : type === "npcs" ? "新朋友" : "手札新增";
  notify(`${prefix}：${label}`);
  playTone(type === "animals" ? 690 : 540);
}

function playTone(frequency = 440) {
  if (!state.sound) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    audioContext ||= new Audio();
    if (audioContext.state === "suspended") audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.14);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (_) { /* Audio is only an optional affordance. */ }
}

function material(color) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

function fallbackModel(name) {
  const palette = [0xf4c96b, 0x8cc9ad, 0xd9896b, 0xa699cc];
  let seed = 0;
  for (const char of name) seed += char.charCodeAt(0);
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.9, 4, 8), material(palette[seed % palette.length]));
  body.position.y = 0.7;
  group.add(body);
  return group;
}

function loadRaw(path) {
  if (rawModels.has(path)) return rawModels.get(path);
  const request = gltfLoader.loadAsync(`${MODEL_ROOT}${path}`)
    .then((gltf) => gltf.scene)
    .catch((error) => {
      console.warn(`無法載入模型：${path}`, error);
      return null;
    })
    .finally(() => {
      completedLoads += 1;
      updateLoading("正在安放沿途風景…");
    });
  rawModels.set(path, request);
  return request;
}

async function createModel(key, height) {
  const source = await loadRaw(FILES[key]);
  const object = source ? source.clone(true) : fallbackModel(key);
  box3.setFromObject(object);
  box3.getSize(tempSize);
  const scale = height / Math.max(tempSize.y, 0.01);
  object.scale.setScalar(scale);
  box3.setFromObject(object);
  box3.getCenter(tempCenter);
  object.position.x -= tempCenter.x;
  object.position.z -= tempCenter.z;
  object.position.y -= box3.min.y;
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = !mobile && !reducedMotion;
    child.receiveShadow = true;
  });
  return object;
}

function addCollider(x, z, width, depth) {
  colliders.push({ x, z, width, depth });
}

function isBlocked(x, z) {
  if (x < -61 || x > 61 || z < -61 || z > 61) return true;
  return colliders.some((collider) => Math.abs(x - collider.x) < collider.width / 2 + 0.62 && Math.abs(z - collider.z) < collider.depth / 2 + 0.62);
}

function addBlock(width, height, depth, color, x, z, y = height / 2) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color));
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = !mobile && !reducedMotion;
  scene.add(mesh);
  return mesh;
}

function addWater(x, z, width, depth) {
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(width, depth),
    new THREE.MeshLambertMaterial({ color: 0x55b6c1, transparent: true, opacity: 0.78 })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(x, 0.05, z);
  scene.add(water);
  addCollider(x, z, width, depth);
}

function addHalo(object, color) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.68, 0.84, 20),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.82, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.045;
  ring.userData.halo = true;
  object.add(ring);
}

function registerInteraction(object, data) {
  object.userData.interaction = data;
  object.traverse((child) => { child.userData.interaction = data; });
  addHalo(object, data.type === "animal" ? 0x9ce4a3 : 0xffd476);
  interactionRoots.push(object);
}

async function place(key, x, z, height, options = {}) {
  const object = await createModel(key, height);
  object.position.x += x;
  object.position.z += z;
  object.rotation.y = options.rotation || 0;
  if (options.y) object.position.y += options.y;
  scene.add(object);
  if (options.collider) addCollider(x, z, options.collider[0], options.collider[1]);
  if (options.interaction) registerInteraction(object, options.interaction);
  return object;
}

function createGround() {
  for (const zone of Object.values(ZONES)) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), material(zone.ground));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(zone.x, 0, zone.z);
    mesh.receiveShadow = true;
    scene.add(mesh);
    groundMeshes.push(mesh);
  }
  addBlock(7, 0.08, 128, 0xf0d7a2, 0, 0, 0.04);
  addBlock(128, 0.08, 7, 0xf0d7a2, 0, 0, 0.045);
  addBlock(9, 0.11, 9, 0xffdf91, 0, 0, 0.07);
}

function makeDestinationMarker() {
  destinationMarker = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.82, 28), new THREE.MeshBasicMaterial({ color: 0xfff1a7, side: THREE.DoubleSide, transparent: true }));
  ring.rotation.x = -Math.PI / 2;
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.12, 12), new THREE.MeshBasicMaterial({ color: 0x386f65, transparent: true }));
  dot.rotation.x = -Math.PI / 2;
  dot.position.y = 0.01;
  destinationMarker.add(ring, dot);
  destinationMarker.visible = false;
  scene.add(destinationMarker);
}

async function buildWorld() {
  createGround();
  makeDestinationMarker();
  const tasks = [];
  const put = (...args) => tasks.push(place(...args));

  // 晨光郊區：有明確住宅、車輛與可步行的院子。
  const homes = [["homeA", -50, -50, 7.2], ["homeE", -31, -49, 7.5], ["homeL", -51, -22, 7], ["homeR", -19, -48, 6.8]];
  for (const [key, x, z, height] of homes) put(key, x, z, height, { collider: [10, 9] });
  put("cityPath", -40, -39, 0.28, { rotation: Math.PI / 2 });
  put("cityPath", -22, -34, 0.28, { rotation: Math.PI / 2 });
  put("driveway", -49, -39, 0.28, { rotation: Math.PI / 2 });
  put("taxi", -48, -44, 2.3, { rotation: Math.PI / 2, collider: [3.6, 2.1] });
  put("firetruck", -14, -29, 2.9, { rotation: 0.18, collider: [4.5, 2.4] });
  put("delivery", -34, -21, 2.5, { rotation: Math.PI / 2, collider: [3.9, 2.2] });
  put("police", -20, -17, 2.2, { rotation: -0.2, collider: [3.4, 2] });
  for (const [x, z, height] of [[-56, -37, 5], [-40, -22, 5.5], [-26, -29, 4.8], [-13, -50, 5]]) put("cityTree", x, z, height);
  for (const [x, z] of [[-42, -46], [-25, -38], [-17, -20]]) put("planter", x, z, 1.25);

  // 奇幻市集：屋頂、攤檔、旗幟及三個可認出的核心地標。
  for (const [x, z, color] of [[-53, 15, 0xb86d51], [-27, 18, 0x9b5f4c], [-49, 50, 0xc47a53]]) {
    addBlock(9, 4.7, 8, color, x, z);
    addBlock(10, 0.8, 9, 0x69463b, x, z, 5.15);
    addCollider(x, z, 10, 9);
  }
  put("townWall", -53, 15, 4.2);
  put("roof", -53, 15, 3, { y: 4.6 });
  put("townWood", -27, 18, 4.3, { rotation: Math.PI / 2 });
  put("highRoof", -27, 18, 3.4, { y: 4.7 });
  put("townWall", -49, 50, 4.4, { rotation: Math.PI });
  put("stallRed", -34, 20, 3.9, { rotation: Math.PI / 2 });
  put("stallGreen", -20, 29, 3.9);
  put("cart", -47, 45, 2.5, { rotation: Math.PI / 2 });
  put("stallBench", -31, 31, 1.4);
  put("bannerRed", -36, 25, 3.2);
  put("bannerGreen", -18, 32, 3.2, { rotation: Math.PI / 2 });
  put("lantern", -27, 36, 2.8);
  put("windmill", -18, 48, 9.4, { collider: [7, 7] });
  for (const [x, z] of [[-10, 31], [-8, 47], [-56, 31]]) put("townTree", x, z, 5.8);
  for (const [x, z] of [[-16, 17], [-45, 29], [-29, 53]]) put("rock", x, z, 2.1);
  put("townRoad", -11, 11, 0.25, { rotation: Math.PI / 2 });

  // 林間高地：以不規則平台、河岸與小型棲息地營造步行節奏。
  put("grassBlock", 31, 48, 4.1, { collider: [10, 9] });
  put("lowGrassBlock", 49, 45, 2.4, { collider: [8, 7] });
  put("platform", 41, 34, 1.2, { rotation: Math.PI / 2 });
  put("ladder", 37, 42, 4.3, { rotation: Math.PI / 2 });
  addBlock(7.5, 0.5, 9, 0x9a6d4c, 42, 32, 0.28);
  addWater(55, 29, 8, 25);
  for (const [key, x, z, height] of [["forestTree", 16, 20, 6.5], ["forestTree", 19, 45, 6], ["forestTree", 32, 20, 5.8], ["forestPine", 38, 30, 6.4], ["forestPine", 44, 53, 6.2], ["forestTree", 56, 48, 6]]) put(key, x, z, height);
  for (const [x, z] of [[22, 42], [28, 46], [34, 38], [31, 54]]) put("flowers", x, z, 1.25);
  for (const [x, z] of [[27, 50], [25, 45], [36, 48]]) put("mushrooms", x, z, 1.2);
  for (const [x, z] of [[21, 31], [30, 28], [45, 22]]) put("grass", x, z, 1.2);
  put("coin", 31, 43, 1.1);
  put("star", 45, 50, 1.45);

  // 暮色墓園：柔和的紫藍天色、石造輪廓、溫暖燈火，而非驚嚇。
  put("crypt", 48, -48, 7.1, { collider: [10, 9] });
  for (const [x, z, rotation] of [[13, -51, 0], [17, -31, Math.PI / 2], [39, -15, Math.PI / 2], [55, -20, 0]]) put("graveWall", x, z, 2.4, { rotation });
  for (const [x, z, rotation] of [[27, -38, 0], [36, -42, 0.18], [43, -25, -0.12], [53, -39, 0]]) put("stone", x, z, 2.2, { rotation });
  for (const [x, z] of [[21, -20], [35, -53], [57, -45]]) put("crossStone", x, z, 2.45);
  for (const [key, x, z, height] of [["gravePine", 17, -47, 6], ["gravePine", 28, -19, 5.8], ["pine", 41, -20, 6.2], ["pine", 56, -30, 6]]) put(key, x, z, height);
  put("hay", 18, -35, 1.4);
  for (const [x, z] of [[35, -27], [43, -52], [54, -35]]) put("pumpkin", x, z, 1.25);
  put("candles", 39, -36, 1.35);
  put("graveRoad", 13, -14, 0.3, { rotation: Math.PI / 2 });

  // 可對話角色與可觀察動物。所有重複模型由同一個載入結果 clone。
  for (const npc of NPCS) {
    tasks.push((async () => {
      const object = await place(npc.model, npc.x, npc.z, npc.model === "ghost" ? 2.8 : 3.1);
      registerInteraction(object, { type: "npc", ...npc });
      entities.push({ kind: "npc", object, baseX: npc.x, baseZ: npc.z, phase: Math.random() * 8 });
    })());
  }
  for (const animal of ANIMALS) {
    tasks.push((async () => {
      const height = animal.species === "bee" ? 1.15 : 1.55;
      const object = await place(animal.species, animal.x, animal.z, height, { y: animal.species === "bee" ? 0.95 : 0 });
      registerInteraction(object, { type: "animal", ...animal });
      entities.push({ kind: "animal", object, baseX: animal.x, baseZ: animal.z, phase: Math.random() * 8, species: animal.species, shy: Boolean(animal.shy), baseY: object.position.y });
    })());
  }
  for (const landmark of LANDMARKS) {
    tasks.push((async () => {
      const object = await place(landmark.asset, landmark.x, landmark.z, landmark.height);
      registerInteraction(object, { type: "landmark", ...landmark });
      if (landmark.id === "fountain") addCollider(landmark.x, landmark.z, 5, 5);
      if (landmark.id === "waterwheel") addCollider(landmark.x, landmark.z, 5, 5);
      if (landmark.id === "moss-gate") addCollider(landmark.x, landmark.z, 1.5, 1.5);
    })());
  }

  player = new THREE.Group();
  player.position.set(-31, 0, -31);
  scene.add(player);
  const playerTask = createModel("player", 3.25).then((model) => { playerVisual = model; player.add(model); });
  await Promise.all([...tasks, playerTask]);
}

function zoneAt(x, z) {
  if (x < 0) return z < 0 ? "suburb" : "market";
  return z < 0 ? "graveyard" : "forest";
}

function updateZone() {
  const next = zoneAt(player.position.x, player.position.z);
  if (next === state.zone) return;
  state.zone = next;
  dom.placeName.textContent = ZONES[next].name;
  dom.place.className = `place-card ${next}`;
  scene.background.setHex(ZONES[next].sky);
  scene.fog.color.copy(scene.background);
  discover("zones", next, ZONES[next].name);
}

function setDestination(x, z, pending = null) {
  state.target.set(x, 0, z);
  state.hasTarget = true;
  state.pending = pending;
  state.blockedTime = 0;
}

function showMarker(position) {
  destinationMarker.position.set(position.x, 0.08, position.z);
  destinationMarker.scale.setScalar(1);
  destinationMarker.visible = true;
  state.markerTime = 0.82;
}

function chooseApproach(root) {
  const position = root.getWorldPosition(tempA);
  tempB.set(player.position.x - position.x, 0, player.position.z - position.z);
  if (tempB.lengthSq() < 0.01) tempB.set(0, 0, 1);
  tempB.normalize();
  const angles = [0, Math.PI / 4, -Math.PI / 4, Math.PI / 2, -Math.PI / 2, Math.PI];
  for (const angle of angles) {
    tempC.copy(tempB).applyAxisAngle(THREE.Object3D.DEFAULT_UP, angle).multiplyScalar(2.55).add(position);
    if (!isBlocked(tempC.x, tempC.z)) return tempC.clone();
  }
  return null;
}

function interactWith(root, data) {
  if (!state.started) return;
  if (player.position.distanceTo(root.position) < 3.1) {
    openCard(data);
    return;
  }
  const approach = chooseApproach(root);
  if (!approach) {
    notify("這裡有點擠，換個角度走近看看。");
    return;
  }
  setDestination(approach.x, approach.z, { root, data });
  showMarker(approach);
  notify("旅人正走過去…");
  playTone(330);
}

function createChoice(label, callback) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", callback);
  return button;
}

function openCard(data) {
  state.hasTarget = false;
  state.pending = null;
  state.modal = true;
  state.focus = data;
  dom.journal.classList.add("hidden");
  dom.card.classList.remove("hidden");
  dom.choices.replaceChildren();
  if (data.type === "npc") {
    discover("npcs", data.id, data.name);
    dom.cardRole.textContent = data.role;
    dom.cardName.textContent = data.name;
    dom.cardText.textContent = data.intro;
    data.choices.forEach((choice, index) => {
      dom.choices.append(createChoice(`「${choice}」`, () => showNpcReply(data, index)));
    });
  } else {
    const type = data.type === "animal" ? "animals" : "landmarks";
    const id = data.type === "animal" ? data.species : data.id;
    discover(type, id, data.name);
    dom.cardRole.textContent = data.type === "animal" ? `動物觀察 · ${ZONES[data.zone].name}` : "旅途小發現";
    dom.cardName.textContent = data.name;
    dom.cardText.textContent = data.text;
    dom.choices.append(createChoice("記進手札，繼續散步", closePanels));
  }
  playTone(520);
}

function showNpcReply(data, index) {
  dom.cardText.textContent = data.replies[index];
  dom.choices.replaceChildren(createChoice("繼續散步", closePanels));
  playTone(610);
}

function closePanels() {
  dom.card.classList.add("hidden");
  dom.journal.classList.add("hidden");
  state.modal = false;
  state.focus = null;
}

function openJournal(tab = state.lastJournalTab) {
  if (!state.started) return;
  state.hasTarget = false;
  state.pending = null;
  state.modal = true;
  state.focus = null;
  state.lastJournalTab = tab;
  dom.card.classList.add("hidden");
  dom.journal.classList.remove("hidden");
  const summaryNames = { zones: "地點", animals: "動物", npcs: "朋友", landmarks: "地標" };
  dom.journalSummary.replaceChildren(...Object.entries(summaryNames).map(([key, label]) => {
    const cell = document.createElement("span");
    cell.innerHTML = `<b>${saved[key].length}</b><small>${label}</small>`;
    return cell;
  }));
  dom.journalTabs.replaceChildren(...Object.entries(summaryNames).map(([key, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${label} ${saved[key].length}/${catalog[key].length}`;
    button.classList.toggle("active", key === tab);
    button.addEventListener("click", () => openJournal(key));
    return button;
  }));
  dom.journalList.replaceChildren(...catalog[tab].map((entry) => {
    const found = saved[tab].includes(entry.id);
    const row = document.createElement("article");
    row.className = found ? "" : "locked";
    row.innerHTML = `<i>${found ? "✦" : "?"}</i><div><b>${found ? entry.name : "尚未發現"}</b><small>${found ? entry.sub : "繼續沿小路探索"}</small></div>`;
    return row;
  }));
}

function movePlayer(delta) {
  if (!state.started || state.modal) return;
  tempA.set(0, 0, 0);
  if (keyState.has("w") || keyState.has("arrowup")) tempA.z -= 1;
  if (keyState.has("s") || keyState.has("arrowdown")) tempA.z += 1;
  if (keyState.has("a") || keyState.has("arrowleft")) tempA.x -= 1;
  if (keyState.has("d") || keyState.has("arrowright")) tempA.x += 1;
  let moving = false;
  if (tempA.lengthSq() > 0) {
    state.hasTarget = false;
    state.pending = null;
    tempA.normalize().applyAxisAngle(THREE.Object3D.DEFAULT_UP, state.yaw).multiplyScalar(7 * delta);
    moving = true;
  } else if (state.hasTarget) {
    tempA.copy(state.target).sub(player.position).setY(0);
    const distance = tempA.length();
    if (distance < 0.16) {
      state.hasTarget = false;
      if (state.pending) {
        const pending = state.pending;
        state.pending = null;
        openCard(pending.data);
      }
      return;
    }
    tempA.multiplyScalar(Math.min(7 * delta, distance) / distance);
    moving = true;
  }
  if (!moving) return;
  const nextX = player.position.x + tempA.x;
  const nextZ = player.position.z + tempA.z;
  let progressed = false;
  if (!isBlocked(nextX, player.position.z)) { player.position.x = nextX; progressed = true; }
  if (!isBlocked(player.position.x, nextZ)) { player.position.z = nextZ; progressed = true; }
  if (!progressed && state.hasTarget) {
    state.blockedTime += delta;
    if (state.blockedTime > 0.75) {
      state.hasTarget = false;
      state.pending = null;
      notify("小徑被擋住了，換個方向試試。");
    }
  } else {
    state.blockedTime = 0;
  }
  player.rotation.y = Math.atan2(tempA.x, tempA.z);
  if (!reducedMotion && playerVisual) {
    playerVisual.position.y = Math.abs(Math.sin(state.elapsed * 10)) * 0.095;
    playerVisual.rotation.z = -tempA.x * 0.035;
  }
  updateZone();
}

function updateCamera(delta) {
  const focus = state.focus && state.focus.x !== undefined ? state.focus : null;
  const focusX = focus ? player.position.x * 0.72 + focus.x * 0.28 : player.position.x;
  const focusZ = focus ? player.position.z * 0.72 + focus.z * 0.28 : player.position.z;
  tempA.set(Math.sin(state.yaw) * state.distance + focusX, state.distance * 0.67 + 1.5, Math.cos(state.yaw) * state.distance + focusZ);
  camera.position.lerp(tempA, 1 - Math.exp(-7 * delta));
  camera.lookAt(focusX, 1.55, focusZ);
}

function updateEntities() {
  if (!state.started) return;
  const time = state.elapsed;
  for (const entity of entities) {
    if (entity.object.position.distanceToSquared(player.position) > 38 * 38) continue;
    const t = time + entity.phase;
    if (entity.kind === "npc") {
      if (!reducedMotion && entity.object.userData.interaction.model === "ghost") entity.object.position.y = Math.sin(t * 1.3) * 0.22;
      entity.object.rotation.y = Math.sin(t * 0.28) * 0.22;
      continue;
    }
    let x = entity.baseX + Math.sin(t * 0.48) * 0.58;
    let z = entity.baseZ + Math.cos(t * 0.35) * 0.42;
    const distance = Math.hypot(x - player.position.x, z - player.position.z);
    if (entity.shy && distance < 4.2) {
      x += ((x - player.position.x) / Math.max(distance, 0.1)) * 1.15;
      z += ((z - player.position.z) / Math.max(distance, 0.1)) * 1.15;
    }
    entity.object.position.x = x;
    entity.object.position.z = z;
    if (entity.species === "bee") entity.object.position.y = entity.baseY + Math.sin(t * 2.3) * 0.24;
    if (distance < 5.5) entity.object.lookAt(player.position.x, entity.object.position.y, player.position.z);
    else entity.object.rotation.y = Math.atan2(Math.cos(t * 0.48), -Math.sin(t * 0.35));
  }
}

function updateMarker(delta) {
  if (!destinationMarker.visible) return;
  state.markerTime -= delta;
  if (state.markerTime <= 0) {
    destinationMarker.visible = false;
    return;
  }
  const scale = 1 + (0.82 - state.markerTime) * 1.1;
  destinationMarker.scale.setScalar(scale);
  destinationMarker.rotation.y += delta * 2;
}

function animate(now = performance.now()) {
  requestAnimationFrame(animate);
  const delta = Math.min((now - state.lastFrame) / 1000, 0.05);
  state.lastFrame = now;
  state.elapsed += delta;
  movePlayer(delta);
  updateEntities();
  updateMarker(delta);
  updateCamera(delta);
  renderer.render(scene, camera);
}

function getInteractionAt(clientX, clientY) {
  const rect = dom.canvas.getBoundingClientRect();
  pointerNdc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointerNdc, camera);
  const hits = raycaster.intersectObjects(interactionRoots, true);
  if (!hits.length) return null;
  let node = hits[0].object;
  while (node && !node.userData.interaction) node = node.parent;
  return node ? { root: interactionRoots.find((root) => root.userData.interaction === node.userData.interaction), data: node.userData.interaction } : null;
}

function moveToGround(clientX, clientY) {
  const rect = dom.canvas.getBoundingClientRect();
  pointerNdc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointerNdc, camera);
  const hits = raycaster.intersectObjects(groundMeshes, false);
  if (!hits.length) return;
  const point = hits[0].point;
  if (isBlocked(point.x, point.z)) {
    notify("那裡不太適合散步，沿著小路走吧。");
    return;
  }
  setDestination(point.x, point.z);
  showMarker(point);
  playTone(320);
}

function handleTap(clientX, clientY) {
  if (!state.started) return;
  if (state.modal) {
    closePanels();
    return;
  }
  const hit = getInteractionAt(clientX, clientY);
  if (hit && hit.root) interactWith(hit.root, hit.data);
  else moveToGround(clientX, clientY);
}

function setupInput() {
  let gesture = null;
  let pinchDistance = 0;
  dom.canvas.addEventListener("pointerdown", (event) => {
    if (!state.started) return;
    dom.canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gesture = { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, dragged: false };
  });
  dom.canvas.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointers.values()];
    if (points.length === 2) {
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      if (pinchDistance) state.distance = THREE.MathUtils.clamp(state.distance + (pinchDistance - distance) * 0.045, 12, 34);
      pinchDistance = distance;
      if (gesture) gesture.dragged = true;
      return;
    }
    if (!gesture) return;
    const dx = event.clientX - gesture.lastX;
    const travel = Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y);
    if (travel > 7) gesture.dragged = true;
    if (gesture.dragged) {
      state.yaw -= dx * 0.009;
      dom.canvas.classList.add("dragging");
    }
    gesture.lastX = event.clientX;
    gesture.lastY = event.clientY;
  });
  const endPointer = (event) => {
    const tap = gesture && !gesture.dragged && pointers.size === 1;
    pointers.delete(event.pointerId);
    if (tap) handleTap(event.clientX, event.clientY);
    if (pointers.size < 2) pinchDistance = 0;
    if (!pointers.size) {
      gesture = null;
      dom.canvas.classList.remove("dragging");
    }
  };
  dom.canvas.addEventListener("pointerup", endPointer);
  dom.canvas.addEventListener("pointercancel", endPointer);
  dom.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  dom.canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    state.distance = THREE.MathUtils.clamp(state.distance + event.deltaY * 0.018, 12, 34);
  }, { passive: false });
  addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    keyState.add(key);
    if (key === "escape") closePanels();
    if (key === "e" && state.started && !state.modal) {
      let nearest = null;
      let nearestDistance = 4;
      for (const root of interactionRoots) {
        const distance = root.position.distanceTo(player.position);
        if (distance < nearestDistance) { nearest = root; nearestDistance = distance; }
      }
      if (nearest) openCard(nearest.userData.interaction);
    }
  });
  addEventListener("keyup", (event) => keyState.delete(event.key.toLowerCase()));
  addEventListener("blur", () => keyState.clear());
  addEventListener("resize", resize);
  addEventListener("orientationchange", resize);
  dom.canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    dom.fatal.classList.remove("hidden");
  });
  dom.canvas.addEventListener("webglcontextrestored", () => location.reload());
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closePanels));
  dom.journalButton.addEventListener("click", () => openJournal());
  dom.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    dom.soundButton.textContent = state.sound ? "♬" : "♩";
    if (state.sound) playTone(500);
  });
  dom.resetButton.addEventListener("click", () => {
    if (confirm("清除手札並回到旅程起點？")) {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    }
  });
  dom.start.addEventListener("click", () => {
    dom.welcome.classList.add("hidden");
    state.started = true;
    discover("zones", "suburb", ZONES.suburb.name);
    playTone(580);
    setTimeout(() => dom.hint.classList.add("fade"), 5400);
  });
}

function resize() {
  if (!camera || !renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.35 : 1.8));
}

async function init() {
  try {
    updateLoading("整理旅人的背包…");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(ZONES.suburb.sky);
    scene.fog = new THREE.Fog(scene.background, 54, 122);
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 180);
    renderer = new THREE.WebGLRenderer({ canvas: dom.canvas, antialias: !mobile, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !mobile && !reducedMotion;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const ambient = new THREE.HemisphereLight(0xeaf8ff, 0x667241, 2.2);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffefc8, 2.35);
    sun.position.set(-34, 58, -25);
    sun.castShadow = !mobile && !reducedMotion;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -66;
    sun.shadow.camera.right = 66;
    sun.shadow.camera.top = 66;
    sun.shadow.camera.bottom = -66;
    scene.add(sun);
    resize();
    await buildWorld();
    dom.loadBar.style.width = "100%";
    dom.loadText.textContent = "地圖準備好了 · 100%";
    setupInput();
    animate();
    setTimeout(() => {
      dom.loading.classList.add("hidden");
      dom.welcome.classList.remove("hidden");
    }, 360);
  } catch (error) {
    console.error(error);
    dom.loading.classList.add("hidden");
    dom.fatal.classList.remove("hidden");
  }
}

init();
