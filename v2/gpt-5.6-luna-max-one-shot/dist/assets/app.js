import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MODEL_ROOT = "./assets/models/";
const STORAGE_KEY = "wanderworld-progress-v1";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const touchScreen = window.matchMedia("(pointer: coarse)").matches;

const modelPaths = {
  player: "characters/people/blocky-characters/character-a.glb",
  npcPost: "characters/people/blocky-characters/character-b.glb",
  npcChild: "characters/people/blocky-characters/character-c.glb",
  npcTaxi: "characters/people/blocky-characters/character-e.glb",
  npcFire: "characters/people/blocky-characters/character-f.glb",
  npcMerchant: "characters/people/blocky-characters/character-g.glb",
  npcBaker: "characters/people/blocky-characters/character-i.glb",
  npcWater: "characters/people/blocky-characters/character-j.glb",
  npcBotanist: "characters/people/blocky-characters/character-k.glb",
  npcFantasy: "characters/fantasy/platformer/character-ooli.glb",
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
  monkey: "characters/animals/cube-pets/animal-monkey.glb",
  cow: "characters/animals/cube-pets/animal-cow.glb",
  crab: "characters/animals/cube-pets/animal-crab.glb",

  suburbHouseA: "structures/suburban/city-suburban/building-type-a.glb",
  suburbHouseC: "structures/suburban/city-suburban/building-type-c.glb",
  suburbHouseF: "structures/suburban/city-suburban/building-type-f.glb",
  suburbFence: "environment/barriers/city-suburban/fence-1x4.glb",
  suburbPlanter: "environment/nature/city-suburban/planter.glb",
  suburbPath: "environment/paths/city-suburban/path-long.glb",
  suburbDriveway: "environment/paths/city-suburban/driveway-long.glb",
  sedan: "vehicles/road/car/sedan.glb",
  taxi: "vehicles/road/car/taxi.glb",
  delivery: "vehicles/road/car/delivery.glb",
  ambulance: "vehicles/road/car/ambulance.glb",
  firetruck: "vehicles/road/car/firetruck.glb",
  police: "vehicles/road/car/police.glb",

  fantasyWall: "structures/fantasy/fantasy-town/wall-wood.glb",
  fantasyWallDoor: "structures/fantasy/fantasy-town/wall-wood-door.glb",
  fantasyRoof: "structures/fantasy/fantasy-town/roof-gable.glb",
  fantasyRoofFlat: "structures/fantasy/fantasy-town/roof-flat.glb",
  fantasyPillar: "structures/fantasy/fantasy-town/pillar-stone.glb",
  fantasyStairs: "structures/fantasy/fantasy-town/stairs-stone.glb",
  marketRoad: "environment/paths/fantasy-town/road.glb",
  marketFence: "environment/barriers/fantasy-town/fence.glb",
  marketTree: "environment/nature/fantasy-town/tree.glb",
  stallRed: "props/market/fantasy-town/stall-red.glb",
  stallGreen: "props/market/fantasy-town/stall-green.glb",
  marketCart: "props/market/fantasy-town/cart-high.glb",
  bannerRed: "props/decorations/fantasy-town/banner-red.glb",
  bannerGreen: "props/decorations/fantasy-town/banner-green.glb",
  marketLantern: "props/lighting/fantasy-town/lantern.glb",
  fountain: "landmarks/fantasy-town/fountain-round.glb",
  windmill: "landmarks/fantasy-town/windmill.glb",
  watermill: "landmarks/fantasy-town/watermill.glb",

  grassBlock: "environment/terrain/platformer/block-grass-large.glb",
  grassLong: "environment/terrain/platformer/block-grass-long.glb",
  grassLow: "environment/terrain/platformer/block-grass-low.glb",
  forestTree: "environment/nature/platformer/tree.glb",
  pineSmall: "environment/nature/platformer/tree-pine-small.glb",
  forestFlowers: "environment/nature/platformer/flowers.glb",
  forestFlowersTall: "environment/nature/platformer/flowers-tall.glb",
  forestMushrooms: "environment/nature/platformer/mushrooms.glb",
  forestRocks: "environment/nature/platformer/rocks.glb",
  forestStones: "environment/nature/platformer/stones.glb",
  forestGrass: "environment/nature/platformer/grass.glb",
  ladder: "gameplay/interactables/platformer/ladder-long.glb",
  lever: "gameplay/interactables/platformer/lever.glb",
  openDoor: "gameplay/interactables/platformer/door-open.glb",
  key: "gameplay/interactables/platformer/key.glb",
  star: "gameplay/collectibles/platformer/star.glb",
  coin: "gameplay/collectibles/platformer/coin-gold.glb",
  jewel: "gameplay/collectibles/platformer/jewel.glb",
  waySign: "props/decorations/platformer/sign.glb",

  graveCrypt: "structures/graveyard/graveyard/crypt-small.glb",
  graveCryptA: "structures/graveyard/graveyard/crypt-a.glb",
  graveWall: "structures/graveyard/graveyard/stone-wall.glb",
  graveFence: "environment/barriers/graveyard/iron-fence.glb",
  gravePine: "environment/nature/graveyard/pine.glb",
  gravePineCrooked: "environment/nature/graveyard/pine-crooked.glb",
  graveRocks: "environment/nature/graveyard/rocks.glb",
  gravestone: "landmarks/graveyard/gravestone-bevel.glb",
  gravestoneCross: "landmarks/graveyard/gravestone-cross.glb",
  gravestoneRound: "landmarks/graveyard/gravestone-round.glb",
  graveRoad: "environment/paths/graveyard/road.glb",
  pumpkin: "props/decorations/graveyard/pumpkin-carved.glb",
  hay: "props/decorations/graveyard/hay-bale.glb",
  bench: "props/furniture/graveyard/bench.glb",
  candle: "props/lighting/graveyard/candle-multiple.glb",
  graveLantern: "props/lighting/graveyard/lantern-candle.glb",
  lightpost: "props/lighting/graveyard/lightpost-single.glb",
  fireBasket: "props/lighting/graveyard/fire-basket.glb",
  shovel: "props/tools/graveyard/shovel.glb"
};

const regions = [
  { id: "suburb", name: "晨光郊區", kicker: "MORNING SUBURB", className: "suburb", bounds: { minX: -38, maxX: -2, minZ: -28, maxZ: -2 }, icon: "☀", note: "住宅小徑、郵箱和一隻躲在花盆旁的貓。" },
  { id: "market", name: "奇幻市集", kicker: "FANTASY MARKET", className: "market", bounds: { minX: 2, maxX: 38, minZ: -28, maxZ: -2 }, icon: "✦", note: "風車轉得很慢，商人卻總有一個新故事。" },
  { id: "forest", name: "林間高地", kicker: "WOODLAND HEIGHTS", className: "forest", bounds: { minX: -38, maxX: -2, minZ: 2, maxZ: 28 }, icon: "❋", note: "動物最密集的地方，草叢裡常有亮晶晶的東西。" },
  { id: "graveyard", name: "暮色墓園", kicker: "MOONLIT GRAVEYARD", className: "graveyard", bounds: { minX: 2, maxX: 38, minZ: 2, maxZ: 28 }, icon: "☾", note: "燈火不暗，幽默感也不暗。" }
];

const npcDefs = [
  {
    id: "post-npc", name: "阿岑", role: "郵差 · 正在找地址", model: "npcPost", position: [-29, -10], region: "suburb", icon: "✉",
    dialogue: {
      start: { text: "早安！你有沒有見過一間門牌寫著「大概是這裡」的房子？我今天的路線圖很有詩意，但郵件不太欣賞詩。", choices: [{ label: "我替你看看門牌。", next: "map" }, { label: "先沿著小徑找找看。", next: "path" }] },
      map: { text: "太好了。請留意那盆歪掉的花，住戶說它是最可靠的地標。", choices: [{ label: "祝你順利送達。", next: "end" }] },
      path: { text: "那我跟著你走一小段。放心，我的郵袋比我更知道方向。", choices: [{ label: "一起出發。", next: "end" }] },
      end: { text: "如果你在市集收到一封寄給「下一個轉彎」的信，記得替我保管一下。", choices: [] }
    }
  },
  {
    id: "child-npc", name: "多多", role: "小孩 · 正在找小狗", model: "npcChild", position: [-13, -20], region: "suburb", icon: "◌",
    dialogue: {
      start: { text: "噓，你有看到一隻小狗嗎？牠叫豆餅，聽到「散步」就會自己走散。這算是一種天分。", choices: [{ label: "我會留意附近。", next: "look" }, { label: "牠可能在市集。", next: "market" }] },
      look: { text: "謝謝！如果牠叼著一片葉子，那不是線索，是牠的午餐。牠很有自己的調查方式。", choices: [{ label: "祝你找到豆餅。", next: "end" }] },
      market: { text: "市集？豆餅確實喜歡麵包師傅的攤子。希望牠沒有把自己登記成一種麵包。", choices: [{ label: "我替你問問看。", next: "end" }] },
      end: { text: "找到牠的話，請告訴牠我沒有生氣，只是想把牠帶回來吃點心。", choices: [] }
    }
  },
  {
    id: "taxi-npc", name: "阿順", role: "的士司機 · 等一位乘客", model: "npcTaxi", position: [-8, -9], region: "suburb", icon: "▰",
    dialogue: {
      start: { text: "我在等一位說要去風車的人。已經等了半天，車上的小黃鴨都快學會看地圖了。", choices: [{ label: "我可以替你看看市集。", next: "windmill" }, { label: "也許他正在慢慢走。", next: "slow" }] },
      windmill: { text: "如果看到他，請說車資可以用故事支付，但不能用太長的故事，後座會睡著。", choices: [{ label: "我記住了。", next: "end" }] },
      slow: { text: "你說得對。這個世界的人都在慢慢走，只是我剛好坐在一台很想出發的車裡。", choices: [{ label: "祝你等到他。", next: "end" }] },
      end: { text: "旅途愉快。若你需要搭車，我會把目的地寫在小黃鴨旁邊。", choices: [] }
    }
  },
  {
    id: "fire-npc", name: "晴晴", role: "消防員 · 檢查街邊設施", model: "npcFire", position: [-24, -5], region: "suburb", icon: "♢",
    dialogue: {
      start: { text: "我正在檢查消防栓。它看起來很健康，只是旁邊的花盆一直對它說悄悄話。", choices: [{ label: "需要我把花盆移開嗎？", next: "planter" }, { label: "我去提醒牠們小聲一點。", next: "quiet" }] },
      planter: { text: "不用啦，花盆沒有擋路。它們只是把每天的天氣預報講得很詳細。", choices: [{ label: "那我放心了。", next: "end" }] },
      quiet: { text: "謝謝。其實街區的安靜不是沒有聲音，是每種聲音都知道輪到自己時再說。", choices: [{ label: "這句很適合寫進手札。", next: "end" }] },
      end: { text: "慢慢走，旅人。看到亮橘色的車，就代表今天的街道有被好好照顧。", choices: [] }
    }
  },
  {
    id: "merchant-npc", name: "米拉", role: "市集商人 · 寶石展示員", model: "npcMerchant", position: [11, -11], region: "market", icon: "◇",
    dialogue: {
      start: { text: "來看看這顆奇怪寶石！它不會發光，但每次有人說「哇」，它就會換一個角度。很有禮貌。", choices: [{ label: "它像一小片天空。", next: "sky" }, { label: "它是不是在找誰？", next: "search" }] },
      sky: { text: "我也這樣覺得。也許它只是把天空帶在身上，這樣下雨時就不用抬頭。", choices: [{ label: "祝它找到喜歡的口袋。", next: "end" }] },
      search: { text: "它在找一位願意慢慢看的旅人。你已經通過第一關了：沒有急著問價錢。", choices: [{ label: "我再看一會兒。", next: "end" }] },
      end: { text: "下次來，我會教你分辨寶石和一顆很有自信的糖果。", choices: [] }
    }
  },
  {
    id: "baker-npc", name: "麥吉", role: "麵包師傅 · 風車鑰匙遺失者", model: "npcBaker", position: [27, -13], region: "market", icon: "♨",
    dialogue: {
      start: { text: "糟糕，我把風車的鑰匙放在一個很安全的地方。安全到連我也找不到。你在附近看到一把小鑰匙嗎？", choices: [{ label: "我去林間高地找找。", next: "key" }, { label: "先從你的攤子開始。", next: "stall" }] },
      key: { text: "那邊有座老梯子，或許昨天我爬上去看雲時順手放下了。看雲是很容易忘記事情的活動。", choices: [{ label: "我會留意。", next: "end" }] },
      stall: { text: "嗯⋯⋯麵粉袋、麵包籃、我的帽子。帽子沒有口袋，所以嫌疑很低。", choices: [{ label: "祝你早點找到。", next: "end" }] },
      end: { text: "若你找到鑰匙，我送你一個不會走失的麵包。它已經被切成兩半了。", choices: [] }
    }
  },
  {
    id: "water-npc", name: "波波", role: "水車觀察員 · 兼職數水滴", model: "npcWater", position: [31, -6], region: "market", icon: "≈",
    dialogue: {
      start: { text: "可以請你替我看一下水車嗎？它今天轉得很有哲學感：一下前進，一下思考。", choices: [{ label: "我去看看它有沒有運作。", next: "wheel" }, { label: "我覺得它只是在休息。", next: "rest" }] },
      wheel: { text: "只要還在轉，就是運作。這個標準也適用於我今天的工作。謝謝你。", choices: [{ label: "放心休息一下吧。", next: "end" }] },
      rest: { text: "有道理。水車也需要偶爾把水聲放在一邊，聽聽市集的吆喝。", choices: [{ label: "我去聽聽看。", next: "end" }] },
      end: { text: "如果你遇到幽靈，請告訴牠今天市集很熱鬧。牠上次特地問我了。", choices: [] }
    }
  },
  {
    id: "botanist-npc", name: "小葉", role: "林間研究員 · 觀察草叢", model: "npcBotanist", position: [-14, 8], region: "forest", icon: "❋",
    dialogue: {
      start: { text: "我在記錄花朵的脾氣。紅色的喜歡陽光，黃色的喜歡聊天，蘑菇則只想知道你有沒有帶點心。", choices: [{ label: "我替你看看那邊的花。", next: "flowers" }, { label: "我想先找動物。", next: "animals" }] },
      flowers: { text: "謝謝。記得不要催它們開花，植物很討厭被問「好了沒」。", choices: [{ label: "我會耐心等。", next: "end" }] },
      animals: { text: "那就沿著有星星的路走。鹿、狐狸和一隻很認真的熊貓都在那一帶。", choices: [{ label: "我去打個招呼。", next: "end" }] },
      end: { text: "森林的地圖不只畫在紙上，也畫在每一種腳印裡。祝你今天找到一個新的。", choices: [] }
    }
  },
  {
    id: "fantasy-npc", name: "奧里", role: "橋邊旅人 · 風向收集家", model: "npcFantasy", position: [-5, 8], region: "forest", icon: "↗",
    dialogue: {
      start: { text: "我在收集四個方向的風。東風帶來市集的麵包香，西風帶來一點松樹，南風正在找自己的帽子。", choices: [{ label: "北風呢？", next: "north" }, { label: "我可以幫你找帽子。", next: "hat" }] },
      north: { text: "北風很安靜，可能躲在墓園的石牆後面。安靜不是沒有故事，只是故事穿了軟底鞋。", choices: [{ label: "我會留意那道風。", next: "end" }] },
      hat: { text: "謝謝，但它大概已經在我頭上。風向收集家偶爾會忘記自己長什麼樣子。", choices: [{ label: "那就繼續散步吧。", next: "end" }] },
      end: { text: "從橋上往回看，四個地方其實只隔著一個轉彎。世界很大，也很會串門子。", choices: [] }
    }
  },
  {
    id: "keeper-npc", name: "阿柏", role: "守墓人 · 正在找鏟子", model: "keeper", position: [10, 10], region: "graveyard", icon: "⌁",
    dialogue: {
      start: { text: "你有看到一把鏟子嗎？它本來靠在長椅旁。至少我記得那是一把鏟子，不是一個非常安靜的骷髏。", choices: [{ label: "我替你留意一下。", next: "help" }, { label: "那邊的骷髏好像拿著甚麼。", next: "skeleton" }, { label: "我只是路過看風景。", next: "view" }] },
      help: { text: "謝謝。墓園的東西很會躲，連南瓜都曾經把自己藏在南瓜後面。", choices: [{ label: "我會小心找。", next: "end" }] },
      skeleton: { text: "他說那是自己的手臂。算了，我先去問問長椅。長椅通常比較記得事情。", choices: [{ label: "祝你找到鏟子。", next: "end" }] },
      view: { text: "這裡的風景很安靜，但不會介意你多看兩眼。小心別踩到正在午睡的貓。", choices: [{ label: "我會繞開牠。", next: "end" }] },
      end: { text: "如果你看到一把會自己走路的鏟子，先跟它打招呼，再叫我。", choices: [] }
    }
  },
  {
    id: "skeleton-npc", name: "阿骨", role: "骷髏 · 長椅座位研究員", model: "skeleton", position: [23, 11], region: "graveyard", icon: "◍",
    dialogue: {
      start: { text: "我忘記自己原本坐在哪張長椅。這張說它是我的，那張也說它是我的。長椅之間是不是有一個秘密組織？", choices: [{ label: "你可以坐最舒服的那張。", next: "comfort" }, { label: "我替你問問長椅。", next: "ask" }] },
      comfort: { text: "好主意。骷髏也應該享有舒適的背靠。只是我沒有背，這讓問題變得更複雜。", choices: [{ label: "祝你找到好座位。", next: "end" }] },
      ask: { text: "請問長椅們誰比較靠近月光？嗯，它們都不回答。可能正在裝睡。", choices: [{ label: "那就每張坐一下。", next: "end" }] },
      end: { text: "若你看見阿柏，請告訴他我沒有拿鏟子。我拿的是自己的手臂，差很多。", choices: [] }
    }
  },
  {
    id: "ghost-npc", name: "飄飄", role: "幽靈 · 市集消息採集員", model: "ghost", position: [32, 10], region: "graveyard", icon: "☁",
    dialogue: {
      start: { text: "你好呀。你知道市集今天熱不熱鬧嗎？我想去逛逛，但我的腳步聲總是比我先到。", choices: [{ label: "很熱鬧，風車也在轉。", next: "market" }, { label: "我可以替你帶一段故事回來。", next: "story" }] },
      market: { text: "太好了。請替我看看有沒有不會穿過我的點心。我上次買的布丁，最後只剩一個很有禮貌的洞。", choices: [{ label: "我會記得。", next: "end" }] },
      story: { text: "這個提議很好。故事不會掉在地上，也不會穿過我，正適合攜帶。", choices: [{ label: "成交。", next: "end" }] },
      end: { text: "墓園的燈今晚太亮了，我都快看得見自己的影子。這種事很失禮。", choices: [] }
    }
  },
  {
    id: "vampire-npc", name: "維克", role: "吸血鬼 · 燈光評論家", model: "vampire", position: [17, 24], region: "graveyard", icon: "◇",
    dialogue: {
      start: { text: "墓園的燈太亮了。我想要一點月光、一點霧，還有一個不會把我的斗篷照成粉紅色的角落。", choices: [{ label: "那盞燈可以調暗嗎？", next: "lantern" }, { label: "粉紅色其實很適合你。", next: "pink" }] },
      lantern: { text: "謝謝你理解我的夜間美學。那盞燈一亮，連我的影子都開始工作。", choices: [{ label: "我替你留意安靜的角落。", next: "end" }] },
      pink: { text: "⋯⋯我需要一點時間接受這個事實。你說得有理，但請不要告訴幽靈。", choices: [{ label: "保密。", next: "end" }] },
      end: { text: "如果你去市集，帶一杯不會反光的茶回來。或者帶一個好笑的故事，也可以。", choices: [] }
    }
  },
  {
    id: "zombie-npc", name: "慢慢", role: "殭屍 · 玫瑰花圃保全", model: "zombie", position: [7, 19], region: "graveyard", icon: "☼",
    dialogue: {
      start: { text: "我在保護這塊花圃不被兔子偷吃。可是兔子太可愛，我常常在牠們吃完後才想起要阻止。", choices: [{ label: "這是一種溫柔的保全。", next: "gentle" }, { label: "我去提醒牠們留一點。", next: "share" }] },
      gentle: { text: "謝謝。我的工作證上寫著「慢速警戒」，所以一切都很符合規定。", choices: [{ label: "祝你值班愉快。", next: "end" }] },
      share: { text: "不用啦，花圃已經習慣分享。墓園裡最難守住的東西，通常是點心。", choices: [{ label: "我會把點心藏好。", next: "end" }] },
      end: { text: "下次見。若我走得很慢，不是我迷路，是地面正在跟我聊天。", choices: [] }
    }
  }
];

const animalDefs = [
  { id: "cat", name: "貓咪", model: "cat", region: "suburb", position: [-31, -8], homeRadius: 2, timid: false, icon: "🐈", note: "牠躲在住宅旁的花盆後，陽光剛好落在鬍鬚上。" },
  { id: "dog", name: "小狗", model: "dog", region: "suburb", position: [-16, -5], homeRadius: 2.4, timid: false, icon: "🐕", note: "牠把每一個路過的人都當成可能一起散步的新朋友。" },
  { id: "bee", name: "蜜蜂", model: "bee", region: "suburb", position: [-25, -23], homeRadius: 3.2, timid: false, flying: true, icon: "✺", note: "一點黃色的忙碌在花盆之間來回，像有翅膀的太陽。" },
  { id: "cow", name: "奶牛", model: "cow", region: "suburb", position: [-6, -23], homeRadius: 2, timid: false, icon: "◌", note: "牠站在郊區邊緣，對每一台經過的車都給出深思熟慮的眼神。" },
  { id: "parrot", name: "鸚鵡", model: "parrot", region: "market", position: [7, -6], homeRadius: 2.5, timid: false, flying: true, icon: "✿", note: "牠把市集的吆喝學得很像，風車因此多了一段回音。" },
  { id: "deer", name: "鹿", model: "deer", region: "forest", position: [-30, 14], homeRadius: 3.3, timid: true, icon: "♧", note: "牠的耳朵總比腳步早發現風，靠近時會先望向你。" },
  { id: "fox", name: "狐狸", model: "fox", region: "forest", position: [-23, 21], homeRadius: 2.8, timid: true, icon: "✦", note: "牠熟悉每一個轉彎，卻仍然假裝自己是第一次來。" },
  { id: "bunny", name: "兔子", model: "bunny", region: "forest", position: [-10, 12], homeRadius: 2.5, timid: true, icon: "◡", note: "牠正在找最柔軟的草地，也順便檢查每顆星星有沒有掉下來。" },
  { id: "panda", name: "熊貓", model: "panda", region: "forest", position: [-18, 8], homeRadius: 2.1, timid: false, icon: "●", note: "今天只安排一件事：慢慢走。若有第二件事，會留到明天。" },
  { id: "beaver", name: "河狸", model: "beaver", region: "forest", position: [-5, 20], homeRadius: 2.5, timid: false, icon: "≈", note: "牠在溪邊整理一根小樹枝，水面也跟著輕輕晃。" },
  { id: "penguin", name: "企鵝", model: "penguin", region: "forest", position: [-7, 25], homeRadius: 2.1, timid: false, icon: "◒", note: "牠把高地的石頭排成一列，說這是很重要的冰山練習。" },
  { id: "koala", name: "無尾熊", model: "koala", region: "forest", position: [-33, 8], homeRadius: 1.5, timid: false, icon: "☁", note: "高高的樹影裡有一雙慢吞吞的眼睛，正看著你經過。" },
  { id: "monkey", name: "猴子", model: "monkey", region: "forest", position: [-13, 25], homeRadius: 2.7, timid: false, icon: "◒", note: "樹梢傳來一聲短短的笑，牠好像比你更熟悉這條路。" },
  { id: "crab", name: "小螃蟹", model: "crab", region: "graveyard", position: [34, 24], homeRadius: 1.7, timid: true, icon: "✣", note: "牠在墓園邊的水窪旁橫著散步，方向感很有個性。" }
];

const landmarkDefs = [
  { id: "suburb-post", name: "迷路郵箱", role: "晨光郊區 · 小事件", model: "waySign", position: [-8, -14], region: "suburb", icon: "✉", text: "木牌上沒有寫地址，只畫了一個往前走的箭頭。阿岑說，這是今天最有用的線索。", height: 1.45 },
  { id: "market-fountain", name: "會說話的噴泉", role: "奇幻市集 · 地標", model: "fountain", position: [19, -15], region: "market", icon: "≈", text: "水聲像一群正在交換故事的人。靠近一點，或許能聽到哪個故事最接近真的。", height: 2.5 },
  { id: "market-windmill", name: "慢風車", role: "奇幻市集 · 小事件", model: "windmill", position: [31, -23], region: "market", icon: "✦", text: "風車還在轉，只是每一片葉子都像在思考下一步。麥吉的鑰匙大概也在附近。", height: 5.5, action: "windmill" },
  { id: "market-watermill", name: "水車的哲學", role: "奇幻市集 · 小事件", model: "watermill", position: [32, -6], region: "market", icon: "≈", text: "水車一下前進、一下思考。波波說，只要還在轉，就算今天有工作。", height: 4.1, action: "watermill" },
  { id: "market-jewel", name: "奇怪寶石", role: "奇幻市集 · 發現物", model: "jewel", position: [13, -9], region: "market", icon: "◇", text: "它不會發光，但每次有人說「哇」，它就會換一個角度。很有禮貌。", height: .75 },
  { id: "forest-star", name: "落在草地的星星", role: "林間高地 · 發現物", model: "star", position: [-13, 18], region: "forest", icon: "★", text: "它不像天空裡的星星那麼遠，安靜地躺在草葉之間，等一位剛好經過的旅人。", height: .75, action: "star" },
  { id: "forest-coin", name: "金色腳印", role: "林間高地 · 發現物", model: "coin", position: [-22, 19], region: "forest", icon: "●", text: "一枚金幣立在草地上，像有人把一個小小的太陽留給下一位旅人。", height: .7, action: "coin" },
  { id: "forest-ladder", name: "老梯子", role: "林間高地 · 小事件", model: "ladder", position: [-5, 11], region: "forest", icon: "↟", text: "梯子通往一段不太高、但很值得抬頭看的坡地。奧里說，南風的帽子可能在上面。", height: 2.2 },
  { id: "forest-key", name: "風車鑰匙", role: "林間高地 · 小事件", model: "key", position: [-3, 15], region: "forest", icon: "⌕", text: "草叢裡有一把小鑰匙。它沒有地址，但看起來非常想回到市集。", height: .65, action: "key" },
  { id: "forest-lever", name: "橋邊拉桿", role: "林間高地 · 小事件", model: "lever", position: [-7, 5], region: "forest", icon: "↕", text: "拉桿旁的木橋沒有說明書，只有一張紙條：試試看，世界通常會回應。", height: 1.1, action: "lever" },
  { id: "grave-crypt", name: "月影地窖", role: "暮色墓園 · 地標", model: "graveCrypt", position: [25, 19], region: "graveyard", icon: "☾", text: "地窖門沒有鎖，裡面只有一張寫著「今天也辛苦了」的椅子。神秘，但很體貼。", height: 3.1 },
  { id: "grave-shovel", name: "遺失的鏟子", role: "暮色墓園 · 小事件", model: "shovel", position: [13, 13], region: "graveyard", icon: "⌁", text: "鏟子安靜地靠在石牆旁。阿柏找了很久，最後它其實一直在月光裡。", height: 1.4, action: "shovel" },
  { id: "grave-lantern", name: "太亮的燈籠", role: "暮色墓園 · 小事件", model: "graveLantern", position: [34, 18], region: "graveyard", icon: "☼", text: "燈籠亮得連影子都看清楚了。維克認為這是對斗篷很不友善的照明。", height: 1.8, action: "lantern" }
];

const staticSpecs = [
  { model: "suburbHouseA", pos: [-31, -18], height: 5.1, collider: { radius: 4.2 } },
  { model: "suburbHouseC", pos: [-17, -23], height: 4.6, collider: { radius: 3.8 } },
  { model: "suburbHouseF", pos: [-31, -5], height: 4.5, collider: { radius: 3.8 } },
  { model: "suburbPath", pos: [-26, -13], maxSize: 8, rotation: Math.PI / 2 },
  { model: "suburbDriveway", pos: [-31, -11], maxSize: 5, rotation: Math.PI / 2 },
  { model: "suburbFence", pos: [-25, -19], height: 1.05, rotation: Math.PI / 2 },
  { model: "suburbFence", pos: [-23, -24], height: 1.05 },
  { model: "suburbPlanter", pos: [-27, -7], height: .8 },
  { model: "suburbPlanter", pos: [-21, -8], height: .75 },
  { model: "sedan", pos: [-19, -7], maxSize: 3.8, rotation: Math.PI / 2, collider: { radius: 1.6 } },
  { model: "taxi", pos: [-9, -4], maxSize: 3.8, rotation: Math.PI / 2, collider: { radius: 1.6 } },
  { model: "delivery", pos: [-35, -10], maxSize: 3.9, rotation: Math.PI / 2, collider: { radius: 1.6 } },
  { model: "ambulance", pos: [-11, -25], maxSize: 4.1, rotation: Math.PI / 2, collider: { radius: 1.7 } },
  { model: "firetruck", pos: [-6, -19], maxSize: 4.3, rotation: Math.PI / 2, collider: { radius: 1.8 } },
  { model: "police", pos: [-35, -23], maxSize: 4, rotation: Math.PI / 2, collider: { radius: 1.7 } },

  { model: "fantasyWall", pos: [10, -24], height: 2.5, collider: { radius: 2.4 } },
  { model: "fantasyRoof", pos: [10, -24], height: 2.5, y: 2.35 },
  { model: "fantasyWallDoor", pos: [28, -23], height: 2.4, collider: { radius: 2.3 } },
  { model: "fantasyRoofFlat", pos: [28, -23], height: 1.4, y: 2.35 },
  { model: "fantasyPillar", pos: [35, -12], height: 2.3 },
  { model: "fantasyStairs", pos: [35, -13], height: 1.1 },
  { model: "marketRoad", pos: [20, -4], maxSize: 7, rotation: Math.PI / 2 },
  { model: "marketFence", pos: [7, -24], height: 1.1 },
  { model: "marketTree", pos: [5, -24], height: 3.4 },
  { model: "marketTree", pos: [35, -9], height: 3.8 },
  { model: "stallRed", pos: [10, -11], height: 2.1, collider: { radius: 1.5 } },
  { model: "stallGreen", pos: [26, -11], height: 2.1, collider: { radius: 1.5 } },
  { model: "marketCart", pos: [17, -23], height: 1.35, collider: { radius: 1.3 } },
  { model: "bannerRed", pos: [14, -7], height: 1.7 },
  { model: "bannerGreen", pos: [23, -7], height: 1.7 },
  { model: "marketLantern", pos: [16, -8], height: 1.5 },
  { model: "marketLantern", pos: [23, -8], height: 1.5 },

  { model: "grassBlock", pos: [-29, 8], maxSize: 6.5 },
  { model: "grassLong", pos: [-20, 6], maxSize: 7, rotation: Math.PI / 2 },
  { model: "grassLow", pos: [-8, 24], maxSize: 4.8 },
  { model: "forestTree", pos: [-35, 22], height: 5.1 },
  { model: "forestTree", pos: [-28, 25], height: 4.3 },
  { model: "forestTree", pos: [-20, 24], height: 4.9 },
  { model: "forestTree", pos: [-8, 23], height: 4.5 },
  { model: "pineSmall", pos: [-34, 13], height: 3.3 },
  { model: "pineSmall", pos: [-23, 13], height: 3.1 },
  { model: "forestFlowers", pos: [-27, 11], height: .8 },
  { model: "forestFlowersTall", pos: [-12, 21], height: 1.1 },
  { model: "forestMushrooms", pos: [-25, 8], height: .7 },
  { model: "forestMushrooms", pos: [-9, 18], height: .7 },
  { model: "forestRocks", pos: [-33, 17], height: 1.1 },
  { model: "forestRocks", pos: [-16, 16], height: .9 },
  { model: "forestStones", pos: [-4, 22], height: .7 },
  { model: "forestGrass", pos: [-30, 6], height: .65 },
  { model: "openDoor", pos: [-4, 9], height: 2.2, rotation: Math.PI / 2 },

  { model: "graveCryptA", pos: [13, 22], height: 3.8, collider: { radius: 3.1 } },
  { model: "graveWall", pos: [8, 6], height: 1.5 },
  { model: "graveWall", pos: [29, 6], height: 1.5 },
  { model: "graveFence", pos: [36, 13], height: 1.7, rotation: Math.PI / 2 },
  { model: "gravePine", pos: [5, 26], height: 5.3 },
  { model: "gravePine", pos: [28, 26], height: 5.8 },
  { model: "gravePineCrooked", pos: [35, 8], height: 4.4 },
  { model: "graveRocks", pos: [7, 25], height: 1 },
  { model: "gravestone", pos: [18, 10], height: 1.1 },
  { model: "gravestoneCross", pos: [27, 9], height: 1.3 },
  { model: "gravestoneRound", pos: [30, 23], height: 1.05 },
  { model: "gravestone", pos: [21, 26], height: 1.1 },
  { model: "graveRoad", pos: [20, 6], maxSize: 7, rotation: Math.PI / 2 },
  { model: "pumpkin", pos: [10, 18], height: .7 },
  { model: "pumpkin", pos: [29, 17], height: .7 },
  { model: "hay", pos: [34, 25], height: 1.1 },
  { model: "bench", pos: [23, 11], height: 1.05, rotation: Math.PI / 2 },
  { model: "candle", pos: [18, 14], height: .8 },
  { model: "graveLantern", pos: [8, 13], height: 1.7 },
  { model: "lightpost", pos: [34, 18], height: 2.8 },
  { model: "fireBasket", pos: [30, 7], height: 1.4 }
];

const requiredModelKeys = [...new Set([
  ...Object.values(npcDefs).map((item) => item.model),
  ...animalDefs.map((item) => item.model),
  ...landmarkDefs.map((item) => item.model),
  ...staticSpecs.map((item) => item.model),
  "player"
])];

const dom = {
  world: document.querySelector("#world"),
  loading: document.querySelector("#loading"),
  progressBar: document.querySelector("#progress-bar"),
  progressText: document.querySelector("#progress-text"),
  welcome: document.querySelector("#welcome"),
  start: document.querySelector("#start"),
  hud: document.querySelector("#hud"),
  placeCard: document.querySelector("#place-card"),
  placeName: document.querySelector("#place-name"),
  regionCaption: document.querySelector("#region-caption"),
  regionKicker: document.querySelector("#region-caption-kicker"),
  regionTitle: document.querySelector("#region-caption-title"),
  hint: document.querySelector("#hint"),
  toast: document.querySelector("#toast"),
  context: document.querySelector("#context"),
  contextName: document.querySelector("#context-name"),
  card: document.querySelector("#card"),
  cardVisual: document.querySelector("#card-visual"),
  cardRole: document.querySelector("#card-role"),
  cardName: document.querySelector("#card-name"),
  cardText: document.querySelector("#card-text"),
  choices: document.querySelector("#choices"),
  journal: document.querySelector("#journal"),
  journalBtn: document.querySelector("#journal-btn"),
  journalSummary: document.querySelector("#journal-summary"),
  journalTabs: document.querySelector("#journal-tabs"),
  journalList: document.querySelector("#journal-list"),
  soundBtn: document.querySelector("#sound-btn"),
  resetBtn: document.querySelector("#reset-btn"),
  error: document.querySelector("#error"),
  errorRetry: document.querySelector("#error-retry")
};

const state = {
  mode: "loading",
  progress: loadProgress(),
  journalTab: "all",
  currentRegion: null,
  dialogue: null,
  soundEnabled: false,
  hintShown: true,
  firstStart: true
};

let renderer;
let scene;
let camera;
let clock;
let loader;
let raycaster;
let worldReady = false;
let player;
let npcActors = [];
let animalActors = [];
let landmarkActors = [];
let interactiveRoots = [];
let obstacles = [];
let assetCache = new Map();
let moveTarget = null;
let pendingInteraction = null;
let destinationMarker;
let destinationTimer = 0;
let cameraYaw = Math.PI * 1.1;
let cameraPitch = .68;
let cameraDistance = touchScreen ? 10.5 : 10;
let focusActor = null;
let toastTimer;
let animationFrame;
let pointerMap = new Map();
let pointerStart = { x: 0, y: 0 };
let lastPointer = { x: 0, y: 0 };
let pointerMoved = false;
let gestureWasPinch = false;
let pinchStartDistance = 0;
let pinchStartCameraDistance = 10;
let audioContext;
const keys = new Set();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const tmpDestination = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const tmpOffset = new THREE.Vector3();
const tmpLookAt = new THREE.Vector3();
const tmpDirection = new THREE.Vector3();
const tmpInput = new THREE.Vector3();
const tmpNext = new THREE.Vector3();
const yAxis = new THREE.Vector3(0, 1, 0);
const tmpFocus = new THREE.Vector3();

function blankProgress() {
  return { regions: [], animals: [], npcs: [], landmarks: [] };
}

function loadProgress() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    const empty = blankProgress();
    return {
      regions: Array.isArray(stored?.regions) ? stored.regions : empty.regions,
      animals: Array.isArray(stored?.animals) ? stored.animals : empty.animals,
      npcs: Array.isArray(stored?.npcs) ? stored.npcs : empty.npcs,
      landmarks: Array.isArray(stored?.landmarks) ? stored.landmarks : empty.landmarks
    };
  } catch {
    return blankProgress();
  }
}

function saveProgress() {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch { /* localStorage can be unavailable in private contexts. */ }
}

function getRegion(id) { return regions.find((item) => item.id === id); }
function getNpc(id) { return npcDefs.find((item) => item.id === id); }
function getAnimal(id) { return animalDefs.find((item) => item.id === id); }
function getLandmark(id) { return landmarkDefs.find((item) => item.id === id); }

function setLoading(progress, message) {
  const value = Math.round(progress * 100);
  dom.progressBar.style.width = `${value}%`;
  dom.progressText.textContent = `${message} ${value}%`;
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => dom.toast.classList.remove("show"), 2800);
}

function setMode(mode) {
  state.mode = mode;
  const playing = ["explore", "dialogue", "card", "journal"].includes(mode);
  dom.hud.classList.toggle("hidden", !playing);
  dom.regionCaption.classList.toggle("hidden", !playing);
  dom.welcome.classList.toggle("hidden", mode !== "welcome");
  dom.card.classList.toggle("hidden", !["dialogue", "card"].includes(mode));
  dom.journal.classList.toggle("hidden", mode !== "journal");
  if (!playing) dom.context.classList.add("hidden");
}

function discover(collection, id, announce = true) {
  if (!state.progress[collection] || state.progress[collection].includes(id)) return false;
  state.progress[collection].push(id);
  saveProgress();
  updateJournal();
  if (announce) {
    const source = collection === "regions" ? getRegion(id) : collection === "animals" ? getAnimal(id) : collection === "npcs" ? getNpc(id) : getLandmark(id);
    const prefix = collection === "regions" ? "新地點" : collection === "animals" ? "新發現" : collection === "npcs" ? "新朋友" : "新地標";
    if (source) {
      showToast(`${prefix}：${source.name}`);
      playTone("discover");
    }
  }
  return true;
}

function updateRegionUI(region) {
  if (!region) return;
  dom.placeCard.className = `place-card ${region.className}`;
  dom.placeCard.querySelector(".place-card__mark").textContent = region.icon;
  dom.placeName.textContent = region.name;
  dom.regionKicker.textContent = region.kicker;
  dom.regionTitle.textContent = region.name;
}

function regionAt(x, z) {
  return regions.find((region) => x >= region.bounds.minX && x <= region.bounds.maxX && z >= region.bounds.minZ && z <= region.bounds.maxZ) || null;
}

function updateRegion() {
  if (!player) return;
  const region = regionAt(player.object.position.x, player.object.position.z);
  if (!region || region.id === state.currentRegion) return;
  state.currentRegion = region.id;
  updateRegionUI(region);
  discover("regions", region.id);
  if (!state.firstStart) showToast(`${region.name}：${region.note}`);
  state.firstStart = false;
}

function updateJournal() {
  const entries = [
    { key: "regions", label: "地點", count: state.progress.regions.length },
    { key: "animals", label: "動物", count: state.progress.animals.length },
    { key: "npcs", label: "人物", count: state.progress.npcs.length },
    { key: "landmarks", label: "地標", count: state.progress.landmarks.length }
  ];
  dom.journalSummary.innerHTML = entries.map((entry) => `<span><b>${entry.count}</b><small>${entry.label}</small></span>`).join("");

  const tabs = [{ id: "all", label: "總覽" }, ...entries.map((entry) => ({ id: entry.key, label: entry.label }))];
  dom.journalTabs.innerHTML = tabs.map((tab) => `<button type="button" role="tab" aria-selected="${state.journalTab === tab.id}" data-tab="${tab.id}">${tab.label}</button>`).join("");

  const toRecord = (item, collection) => ({
    id: item.id,
    name: item.name,
    note: item.note || item.role || item.kicker || "沿途的一段小故事。",
    icon: item.icon || "✦",
    unlocked: state.progress[collection].includes(item.id)
  });
  let records;
  if (state.journalTab === "all") {
    records = [
      ...regions.map((item) => toRecord(item, "regions")),
      ...animalDefs.map((item) => toRecord(item, "animals")),
      ...npcDefs.map((item) => toRecord(item, "npcs")),
      ...landmarkDefs.map((item) => toRecord(item, "landmarks"))
    ].filter((item) => item.unlocked).slice(-12).reverse();
  } else {
    const source = state.journalTab === "regions" ? regions : state.journalTab === "animals" ? animalDefs : state.journalTab === "npcs" ? npcDefs : landmarkDefs;
    records = source.map((item) => toRecord(item, state.journalTab));
  }
  if (!records.length) {
    dom.journalList.innerHTML = `<article><i>＋</i><div><strong>這一頁還留著空白</strong><small>點一下地面，去找下一個值得記下來的地方。</small></div></article>`;
  } else {
    dom.journalList.innerHTML = records.map((record) => `<article class="${record.unlocked ? "" : "is-locked"}"><i>${record.unlocked ? record.icon : "?"}</i><div><strong>${record.unlocked ? record.name : "尚未遇見"}</strong><small>${record.unlocked ? record.note : "沿著小路走，也許下一個轉彎就會遇到。"}</small></div></article>`).join("");
  }
}

function openJournal() {
  if (state.mode === "journal") return closeJournal();
  if (!["explore", "card", "dialogue"].includes(state.mode)) return;
  closeCard(false);
  state.journalTab = "all";
  updateJournal();
  setMode("journal");
  dom.journal.querySelector("[data-close]")?.focus();
}

function closeJournal() {
  if (state.mode !== "journal") return;
  setMode("explore");
  dom.world.focus();
}

function renderDialogue() {
  const npc = getNpc(state.dialogue?.npcId);
  const node = npc?.dialogue[state.dialogue?.nodeId];
  if (!npc || !node) return;
  dom.cardRole.textContent = npc.role;
  dom.cardName.textContent = npc.name;
  dom.cardText.textContent = node.text;
  dom.cardVisual.className = "interaction-card__visual";
  dom.cardVisual.textContent = npc.icon;
  dom.choices.innerHTML = node.choices.length
    ? node.choices.map((choice) => `<button type="button" data-next="${choice.next}">${choice.label}</button>`).join("")
    : `<button type="button" data-close-card="true">把這段話記進心裡</button>`;
}

function openDialogue(actor) {
  const npc = actor.definition;
  discover("npcs", npc.id);
  state.dialogue = { npcId: npc.id, nodeId: "start" };
  focusActor = actor;
  setMode("dialogue");
  renderDialogue();
  dom.card.querySelector("[data-next], [data-close-card]")?.focus();
  playTone("open");
}

function openAnimalCard(actor) {
  const animal = actor.definition;
  discover("animals", animal.id);
  focusActor = actor;
  dom.cardRole.textContent = "動物觀察 · 沿途遇見";
  dom.cardName.textContent = animal.name;
  dom.cardText.textContent = animal.note;
  dom.cardVisual.className = "interaction-card__visual interaction-card__visual--animal";
  dom.cardVisual.textContent = animal.icon;
  dom.choices.innerHTML = `<button type="button" data-close-card="true">把這次遇見記下來</button>`;
  setMode("card");
  dom.choices.querySelector("button")?.focus();
  playTone("open");
}

function openLandmarkCard(actor) {
  const landmark = actor.definition;
  discover("landmarks", landmark.id);
  focusActor = actor;
  dom.cardRole.textContent = landmark.role;
  dom.cardName.textContent = landmark.name;
  dom.cardText.textContent = landmark.text;
  dom.cardVisual.className = "interaction-card__visual interaction-card__visual--landmark";
  dom.cardVisual.textContent = landmark.icon;
  dom.choices.innerHTML = `<button type="button" data-close-card="true">收進旅人手札</button>`;
  setMode("card");
  dom.choices.querySelector("button")?.focus();
  playTone("open");
  if (landmark.action) triggerLandmarkAction(landmark, actor);
}

function closeCard(restoreFocus = true) {
  if (!["card", "dialogue"].includes(state.mode)) return;
  state.dialogue = null;
  focusActor = null;
  setMode("explore");
  if (restoreFocus) dom.world.focus();
}

function openInteraction(interaction) {
  if (interaction.type === "npc") openDialogue(interaction.actor);
  else if (interaction.type === "animal") openAnimalCard(interaction.actor);
  else openLandmarkCard(interaction.actor);
}

function triggerLandmarkAction(landmark, actor) {
  if (landmark.action === "windmill") actor.object.rotation.y += .12;
  if (landmark.action === "watermill") actor.object.rotation.z = actor.object.rotation.z === 0 ? .03 : 0;
  if (landmark.action === "star") actor.object.scale.multiplyScalar(1.08);
  if (landmark.action === "coin") actor.object.rotation.y += Math.PI / 2;
  if (landmark.action === "key") actor.object.rotation.y += Math.PI / 2;
  if (landmark.action === "lever") actor.object.rotation.z = actor.object.rotation.z === 0 ? -.35 : 0;
  if (landmark.action === "shovel") actor.object.rotation.z = actor.object.rotation.z === 0 ? .22 : 0;
  if (landmark.action === "lantern") actor.object.scale.y = actor.object.scale.y === 1 ? 1.08 : 1;
}

function assetUrl(key) { return `${MODEL_ROOT}${modelPaths[key]}`; }

async function loadAsset(key) {
  if (assetCache.has(key)) return assetCache.get(key);
  const result = { scene: null, failed: false, size: new THREE.Vector3(1, 1, 1), center: new THREE.Vector3(), min: new THREE.Vector3() };
  try {
    const gltf = await loader.loadAsync(assetUrl(key));
    result.scene = gltf.scene;
    result.scene.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });
    const box = new THREE.Box3().setFromObject(result.scene);
    result.size.copy(box.getSize(new THREE.Vector3()));
    result.center.copy(box.getCenter(new THREE.Vector3()));
    result.min.copy(box.min);
  } catch (error) {
    result.failed = true;
    console.warn(`Optional Wanderworld asset skipped: ${key}`, error?.message || error);
  }
  assetCache.set(key, result);
  return result;
}

function createFallback(key, options = {}) {
  const group = new THREE.Group();
  const color = key.includes("grave") || key.includes("ghost") ? 0x6d7194 : key.includes("animal") || ["cat", "dog", "bee", "deer", "fox", "bunny", "panda", "beaver", "penguin", "koala", "monkey", "cow", "crab", "parrot"].includes(key) ? 0x80aa72 : 0xd58b62;
  const body = new THREE.Mesh(new THREE.BoxGeometry(.8, 1.1, .65), new THREE.MeshStandardMaterial({ color, flatShading: true }));
  body.position.y = .55;
  body.castShadow = true;
  group.add(body);
  if (options.height && options.height > 1.5) {
    const top = new THREE.Mesh(new THREE.ConeGeometry(.65, .8, 6), new THREE.MeshStandardMaterial({ color: 0x4a7663, flatShading: true }));
    top.position.y = 1.5;
    top.castShadow = true;
    group.add(top);
  }
  return group;
}

function createAssetInstance(key, options = {}) {
  const wrapper = new THREE.Group();
  const cached = assetCache.get(key);
  if (cached?.scene) {
    const clone = cached.scene.clone(true);
    const dimensions = cached.size;
    let scale = options.scale || 1;
    if (options.height && dimensions.y > .0001) scale = options.height / dimensions.y;
    if (options.maxSize) scale = options.maxSize / Math.max(dimensions.x, dimensions.y, dimensions.z, .0001);
    clone.scale.setScalar(scale);
    clone.position.set(-cached.center.x * scale, -cached.min.y * scale, -cached.center.z * scale);
    wrapper.add(clone);
  } else {
    const fallback = createFallback(key, options);
    wrapper.add(fallback);
  }
  wrapper.userData.modelKey = key;
  if (options.rotation !== undefined) wrapper.rotation.y = options.rotation;
  return wrapper;
}

function addCollider(collider, position) {
  if (!collider) return;
  if (collider.radius) obstacles.push({ type: "circle", x: position[0], z: position[1], radius: collider.radius });
  else obstacles.push({ type: "rect", x: position[0], z: position[1], halfX: collider.halfX, halfZ: collider.halfZ });
}

function addAsset(key, position, options = {}) {
  const wrapper = createAssetInstance(key, options);
  wrapper.position.set(position[0], options.y || 0, position[1]);
  scene.add(wrapper);
  addCollider(options.collider, position);
  return wrapper;
}

function createMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: options.roughness ?? .92, metalness: options.metalness ?? 0, flatShading: true, transparent: options.transparent || false, opacity: options.opacity ?? 1 });
}

function addBox(position, size, color, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), createMaterial(color, options));
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = options.castShadow !== false;
  mesh.receiveShadow = true;
  scene.add(mesh);
  if (options.collider) addCollider(options.collider, [position[0], position[2]]);
  return mesh;
}

function addGroundPlate(center, size, color) {
  addBox([center[0], -.12, center[1]], [size[0], .24, size[1]], color, { castShadow: false });
}

function addFlatPath(center, size, color, rotation = 0, options = {}) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), createMaterial(color, { roughness: 1 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = rotation;
  mesh.position.set(center[0], options.y || .012, center[1]);
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function createEnvironment() {
  scene.background = new THREE.Color(0xa6d9d2);
  scene.fog = new THREE.Fog(0xa6d9d2, 68, 108);

  addGroundPlate([-20, -15], [36, 26], 0x9fcf88);
  addGroundPlate([20, -15], [36, 26], 0xd7ad79);
  addGroundPlate([-20, 15], [36, 26], 0x6f9d68);
  addGroundPlate([20, 15], [36, 26], 0x565a72);

  addFlatPath([0, 0], [76, 4.2], 0xe7c995);
  addFlatPath([0, 0], [4.2, 56], 0xe7c995);
  addFlatPath([-20, -13], [4.4, 22], 0xcaa66f, -.08);
  addFlatPath([20, -13], [4.2, 23], 0xb9785d, .06);
  addFlatPath([-20, 14], [3.6, 24], 0x9bbf7a, -.12);
  addFlatPath([20, 15], [3.7, 23], 0x696c87, .1);
  addFlatPath([0, 0], [8, 8], 0xe3bd83, Math.PI / 4);

  const plaza = new THREE.Mesh(new THREE.CircleGeometry(4.1, 8), createMaterial(0xf0d39a));
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = .018;
  scene.add(plaza);

  const stream = addBox([-5, .035, 18], [2.5, .06, 19], 0x76bec3, { castShadow: false, transparent: true, opacity: .86, roughness: .2 });
  stream.rotation.y = -.04;
  addBox([-5, .15, 17], [3.4, .16, 3.6], 0x8f673f, { castShadow: true });
  addBox([-5, .18, 19], [3.4, .16, 3.6], 0x8f673f, { castShadow: true });

  const boundaryColor = 0x45675d;
  addBox([0, .52, -28], [76, 1.05, .35], boundaryColor, { collider: { halfX: 38, halfZ: .5 } });
  addBox([0, .52, 28], [76, 1.05, .35], boundaryColor, { collider: { halfX: 38, halfZ: .5 } });
  addBox([-38, .52, 0], [.35, 1.05, 56], boundaryColor, { collider: { halfX: .5, halfZ: 28 } });
  addBox([38, .52, 0], [.35, 1.05, 56], boundaryColor, { collider: { halfX: .5, halfZ: 28 } });

  staticSpecs.forEach((spec) => addAsset(spec.model, spec.pos, spec));
  landmarkDefs.forEach((definition) => addLandmarkActor(definition));
}

function createLights() {
  scene.add(new THREE.HemisphereLight(0xf5f4cf, 0x405a58, 2.4));
  const sun = new THREE.DirectionalLight(0xffe4a8, 3.1);
  sun.position.set(-22, 32, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.set(touchScreen ? 768 : 1024, touchScreen ? 768 : 1024);
  sun.shadow.camera.left = -45;
  sun.shadow.camera.right = 45;
  sun.shadow.camera.top = 35;
  sun.shadow.camera.bottom = -35;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 90;
  scene.add(sun);

  [[8, 3, 13], [34, 3, 18], [30, 3, 7]].forEach(([x, y, z]) => {
    const light = new THREE.PointLight(0xffb86b, .75, 8, 2);
    light.position.set(x, y, z);
    scene.add(light);
  });
}

function createDestinationMarker() {
  destinationMarker = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.RingGeometry(.28, .38, 16), new THREE.MeshBasicMaterial({ color: 0xfff2a1, transparent: true, opacity: .95, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  const dot = new THREE.Mesh(new THREE.CircleGeometry(.11, 12), new THREE.MeshBasicMaterial({ color: 0xdf805f, transparent: true, opacity: .92, side: THREE.DoubleSide }));
  dot.rotation.x = -Math.PI / 2;
  dot.position.y = .005;
  destinationMarker.add(ring, dot);
  destinationMarker.visible = false;
  scene.add(destinationMarker);
}

function createActorMarker(actor, color = 0xf1c65d) {
  const marker = new THREE.Mesh(new THREE.RingGeometry(.18, .28, 10), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .76, side: THREE.DoubleSide }));
  marker.rotation.x = -Math.PI / 2;
  marker.position.y = .025;
  marker.visible = false;
  actor.object.add(marker);
  actor.marker = marker;
}

function createPlayer() {
  const object = createAssetInstance("player", { height: 2.15 });
  object.position.set(-28, 0, -13);
  scene.add(object);
  player = { object, moving: false, baseY: 0 };
}

function addNpcActor(definition) {
  const object = createAssetInstance(definition.model, { height: definition.model === "npcFantasy" ? 2.05 : 2.15 });
  object.position.set(definition.position[0], 0, definition.position[1]);
  object.userData.interaction = { type: "npc", actor: null };
  const actor = { object, definition, target: new THREE.Vector3(), home: new THREE.Vector3(definition.position[0], 0, definition.position[1]), wanderTimer: 1.3, marker: null, height: 2.15, baseY: 0 };
  object.userData.interaction.actor = actor;
  scene.add(object);
  createActorMarker(actor, 0xdf805f);
  npcActors.push(actor);
  interactiveRoots.push(object);
}

function addAnimalActor(definition, index) {
  const object = createAssetInstance(definition.model, { height: definition.flying ? .72 : 1.25 });
  const baseY = definition.flying ? 1.4 : 0;
  object.position.set(definition.position[0], baseY, definition.position[1]);
  object.userData.interaction = { type: "animal", actor: null };
  const actor = {
    object,
    definition,
    home: new THREE.Vector3(definition.position[0], baseY, definition.position[1]),
    target: new THREE.Vector3(definition.position[0], baseY, definition.position[1]),
    direction: new THREE.Vector3(),
    wanderTimer: 1 + index * .27,
    marker: null,
    baseY,
    height: definition.flying ? .72 : 1.25,
    index
  };
  object.userData.interaction.actor = actor;
  scene.add(object);
  createActorMarker(actor, 0xf1c65d);
  animalActors.push(actor);
  interactiveRoots.push(object);
}

function addLandmarkActor(definition) {
  const object = createAssetInstance(definition.model, { height: definition.height || 1.3 });
  object.position.set(definition.position[0], 0, definition.position[1]);
  object.userData.interaction = { type: "landmark", actor: null };
  const actor = { object, definition, marker: null, height: definition.height || 1.3 };
  object.userData.interaction.actor = actor;
  scene.add(object);
  createActorMarker(actor, 0xf1c65d);
  landmarkActors.push(actor);
  interactiveRoots.push(object);
  if (["grave-crypt", "market-fountain", "market-windmill", "market-watermill"].includes(definition.id)) {
    addCollider({ radius: definition.id === "market-fountain" ? 1.7 : 2 }, definition.position);
  }
}

function createActors() {
  createPlayer();
  npcDefs.forEach(addNpcActor);
  animalDefs.forEach(addAnimalActor);
}

function isBlocked(position) {
  if (position.x < -37.2 || position.x > 37.2 || position.z < -27.2 || position.z > 27.2) return true;
  return obstacles.some((obstacle) => {
    if (obstacle.type === "rect") return Math.abs(position.x - obstacle.x) < obstacle.halfX + .48 && Math.abs(position.z - obstacle.z) < obstacle.halfZ + .48;
    return Math.hypot(position.x - obstacle.x, position.z - obstacle.z) < obstacle.radius + .48;
  });
}

function queueMovement(destination, interaction = null) {
  moveTarget = destination.clone();
  moveTarget.y = 0;
  pendingInteraction = interaction;
  destinationMarker.position.set(moveTarget.x, .04, moveTarget.z);
  destinationMarker.visible = true;
  destinationTimer = 1.05;
  state.hintShown = false;
  dom.hint.classList.add("is-faded");
}

function queueInteraction(interaction) {
  const stopDistance = interaction.type === "npc" ? 2.55 : interaction.type === "animal" ? 2.2 : 2.35;
  queueMovement(interaction.actor.object.position, { ...interaction, stopDistance });
  showToast(`走近${interaction.actor.definition.name}看看。`);
  playTone("move");
}

function getMovementInput() {
  const horizontal = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  const vertical = (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) - (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0);
  if (!horizontal && !vertical) return null;
  tmpInput.set(horizontal, 0, vertical).normalize();
  tmpInput.applyAxisAngle(yAxis, cameraYaw);
  return tmpInput;
}

function updatePlayer(delta, elapsed) {
  if (!player || state.mode !== "explore") return;
  const keyboardInput = getMovementInput();
  if (keyboardInput) {
    moveTarget = null;
    pendingInteraction = null;
    tmpDirection.copy(keyboardInput);
  } else if (pendingInteraction) {
    tmpTarget.copy(pendingInteraction.actor.object.position);
    tmpTarget.y = 0;
    moveTarget = tmpTarget;
    tmpDirection.copy(moveTarget).sub(player.object.position);
    tmpDirection.y = 0;
    if (tmpDirection.length() <= pendingInteraction.stopDistance) {
      const interaction = pendingInteraction;
      pendingInteraction = null;
      moveTarget = null;
      openInteraction(interaction);
      return;
    }
    tmpDirection.normalize();
  } else if (moveTarget) {
    tmpDirection.copy(moveTarget).sub(player.object.position);
    tmpDirection.y = 0;
    if (tmpDirection.length() <= .16) {
      moveTarget = null;
      player.moving = false;
      return;
    }
    tmpDirection.normalize();
  } else {
    tmpDirection.set(0, 0, 0);
  }

  const moving = tmpDirection.lengthSq() > .001;
  if (moving) {
    tmpNext.copy(player.object.position).addScaledVector(tmpDirection, delta * 4.6);
    if (!isBlocked(tmpNext)) {
      player.object.position.copy(tmpNext);
    } else {
      tmpNext.copy(player.object.position);
      tmpNext.x += tmpDirection.x * delta * 4.6;
      if (!isBlocked(tmpNext)) player.object.position.x = tmpNext.x;
      tmpNext.copy(player.object.position);
      tmpNext.z += tmpDirection.z * delta * 4.6;
      if (!isBlocked(tmpNext)) player.object.position.z = tmpNext.z;
      if (pendingInteraction && isBlocked(tmpNext)) {
        pendingInteraction = null;
        moveTarget = null;
        showToast("前面有東西擋著，換一個落腳點吧。");
      }
    }
    player.object.rotation.y = Math.atan2(tmpDirection.x, tmpDirection.z);
    player.object.rotation.z = THREE.MathUtils.clamp(-tmpDirection.x * .08, -.08, .08);
    player.object.position.y = player.baseY + (reducedMotion ? 0 : Math.sin(elapsed * 9) * .025);
  } else {
    player.object.rotation.z = THREE.MathUtils.lerp(player.object.rotation.z, 0, Math.min(1, delta * 9));
    player.object.position.y = player.baseY;
  }
  player.moving = moving;
}

function updateAnimals(delta, elapsed) {
  if (!player) return;
  animalActors.forEach((actor) => {
    const definition = actor.definition;
    const distanceToPlayer = actor.object.position.distanceTo(player.object.position);
    if (distanceToPlayer > 30) {
      actor.marker.visible = false;
      return;
    }
    actor.marker.visible = distanceToPlayer < 7.5;
    actor.wanderTimer -= delta;

    if (definition.timid && distanceToPlayer < 4.5) {
      actor.direction.copy(actor.object.position).sub(player.object.position);
      actor.direction.y = 0;
      if (actor.direction.lengthSq() < .01) actor.direction.set(1, 0, 0);
      actor.direction.normalize();
      actor.target.copy(actor.object.position).addScaledVector(actor.direction, 2.6);
      actor.wanderTimer = Math.max(actor.wanderTimer, .7);
    } else if (actor.wanderTimer <= 0 || actor.object.position.distanceTo(actor.target) < .45) {
      const angle = elapsed * (.2 + actor.index * .013) + actor.index * 2.43;
      const radius = .7 + ((actor.index * 1.19) % Math.max(1.4, definition.homeRadius));
      actor.target.set(actor.home.x + Math.cos(angle) * radius, actor.baseY, actor.home.z + Math.sin(angle) * radius);
      actor.wanderTimer = 2.3 + (actor.index % 4) * .75;
    }

    actor.direction.copy(actor.target).sub(actor.object.position);
    actor.direction.y = 0;
    const walking = actor.direction.lengthSq() > .09;
    if (walking) {
      actor.direction.normalize();
      actor.object.position.addScaledVector(actor.direction, delta * (definition.flying ? .55 : .62));
      actor.object.rotation.y = Math.atan2(actor.direction.x, actor.direction.z);
      actor.object.rotation.z = THREE.MathUtils.clamp(-actor.direction.x * .08, -.1, .1);
    } else {
      actor.object.rotation.z = Math.sin(elapsed * .8 + actor.index) * .018;
    }
    if (distanceToPlayer < 5 && !definition.flying) {
      actor.object.rotation.y = Math.atan2(player.object.position.x - actor.object.position.x, player.object.position.z - actor.object.position.z);
    }
    actor.object.position.y = actor.baseY + (definition.flying ? Math.sin(elapsed * 2.7 + actor.index) * .2 : Math.sin(elapsed * 1.2 + actor.index) * .018);
    actor.marker.rotation.z += delta * .7;
  });

  npcActors.forEach((actor, index) => {
    const distanceToPlayer = actor.object.position.distanceTo(player.object.position);
    actor.marker.visible = distanceToPlayer < 7.5;
    actor.marker.rotation.z = Math.sin(elapsed * 1.2 + index) * .14;
    actor.object.position.y = actor.baseY + (reducedMotion ? 0 : Math.sin(elapsed * 1.1 + index) * .012);
  });

  landmarkActors.forEach((actor, index) => {
    const distanceToPlayer = actor.object.position.distanceTo(player.object.position);
    actor.marker.visible = distanceToPlayer < 8.5;
    actor.marker.rotation.z += delta * (.35 + index * .01);
  });
}

function updateCamera(delta, instant = false) {
  if (!player || !camera) return;
  tmpTarget.set(player.object.position.x, player.object.position.y + 1.15, player.object.position.z);
  tmpLookAt.copy(tmpTarget);
  if (focusActor && ["dialogue", "card"].includes(state.mode)) {
    tmpFocus.set(focusActor.object.position.x, focusActor.object.position.y + focusActor.height * .48, focusActor.object.position.z);
    tmpLookAt.lerp(tmpFocus, .25);
  }
  tmpOffset.set(0, Math.sin(cameraPitch) * cameraDistance, Math.cos(cameraPitch) * cameraDistance);
  tmpOffset.applyAxisAngle(yAxis, cameraYaw);
  const destination = tmpDestination.copy(tmpTarget).add(tmpOffset);
  if (instant || reducedMotion) camera.position.copy(destination);
  else camera.position.lerp(destination, Math.min(1, delta * 7));
  camera.lookAt(tmpLookAt);
}

function updateDestinationMarker(delta) {
  if (!destinationMarker || !destinationMarker.visible) return;
  destinationTimer -= delta;
  destinationMarker.scale.setScalar(1 + Math.max(0, .14 - destinationTimer) * 1.9);
  destinationMarker.children.forEach((child) => {
    if (child.material) child.material.opacity = Math.max(0, Math.min(1, destinationTimer * 1.8));
  });
  if (destinationTimer <= 0) destinationMarker.visible = false;
}

function interactionFromObject(object) {
  let current = object;
  while (current) {
    if (current.userData?.interaction) return current.userData.interaction;
    current = current.parent;
  }
  return null;
}

function closestInteraction() {
  if (!player) return null;
  let closest = null;
  const all = [...npcActors, ...animalActors, ...landmarkActors];
  all.forEach((actor) => {
    const distance = actor.object.position.distanceTo(player.object.position);
    const limit = actor.definition ? actor.definition.region === "graveyard" ? 3.8 : 4.2 : 4.2;
    if (distance < limit && (!closest || distance < closest.distance)) {
      const interaction = actor.object.userData.interaction;
      closest = { actor, distance, interaction };
    }
  });
  return closest;
}

function updateContext() {
  if (state.mode !== "explore" || !camera || !player) {
    dom.context.classList.add("hidden");
    return;
  }
  const nearby = closestInteraction();
  if (!nearby) {
    dom.context.classList.add("hidden");
    return;
  }
  const label = nearby.interaction.type === "npc" ? `和${nearby.actor.definition.name}聊聊` : nearby.interaction.type === "animal" ? `看看${nearby.actor.definition.name}` : nearby.actor.definition.name;
  dom.contextName.textContent = label;
  tmpTarget.set(nearby.actor.object.position.x, nearby.actor.object.position.y + nearby.actor.height + .15, nearby.actor.object.position.z).project(camera);
  const rect = dom.world.getBoundingClientRect();
  dom.context.style.left = `${rect.left + (tmpTarget.x * .5 + .5) * rect.width}px`;
  dom.context.style.top = `${rect.top + (-tmpTarget.y * .5 + .5) * rect.height}px`;
  dom.context.classList.remove("hidden");
}

function handleWorldClick(clientX, clientY) {
  if (!worldReady || state.mode !== "explore") return;
  const rect = dom.world.getBoundingClientRect();
  const pointer = new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1
  );
  raycaster.setFromCamera(pointer, camera);
  const interactionHit = raycaster.intersectObjects(interactiveRoots, true).map((hit) => interactionFromObject(hit.object)).find(Boolean);
  if (interactionHit) {
    queueInteraction(interactionHit);
    return;
  }
  if (!raycaster.ray.intersectPlane(groundPlane, tmpDestination)) return;
  tmpDestination.y = 0;
  if (isBlocked(tmpDestination)) {
    showToast("那裡有東西擋著，點旁邊的空地試試。");
    return;
  }
  queueMovement(tmpDestination);
  playTone("move");
}

function pointerDistance() {
  const points = [...pointerMap.values()];
  if (points.length < 2) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

function bindPointerEvents() {
  dom.world.addEventListener("pointerdown", (event) => {
    if (state.mode !== "explore") return;
    if (pointerMap.size === 0) {
      pointerStart = { x: event.clientX, y: event.clientY };
      lastPointer = { x: event.clientX, y: event.clientY };
      pointerMoved = false;
      gestureWasPinch = false;
      dom.world.classList.add("dragging");
    }
    pointerMap.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointerMap.size === 2) {
      gestureWasPinch = true;
      pointerMoved = true;
      pinchStartDistance = pointerDistance();
      pinchStartCameraDistance = cameraDistance;
    }
    dom.world.setPointerCapture?.(event.pointerId);
  });

  dom.world.addEventListener("pointermove", (event) => {
    if (state.mode !== "explore" || !pointerMap.has(event.pointerId)) return;
    pointerMap.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointerMap.size >= 2) {
      const distance = pointerDistance();
      if (pinchStartDistance > 0) cameraDistance = THREE.MathUtils.clamp(pinchStartCameraDistance - (distance - pinchStartDistance) * .014, 5.4, 15);
      return;
    }
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    if (Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 6) pointerMoved = true;
    lastPointer = { x: event.clientX, y: event.clientY };
    if (pointerMoved) {
      cameraYaw -= dx * .006;
      cameraPitch = THREE.MathUtils.clamp(cameraPitch + dy * .004, .28, 1.12);
    }
  });

  dom.world.addEventListener("pointerup", (event) => {
    const wasSingleTap = pointerMap.size === 1 && !pointerMoved && !gestureWasPinch;
    pointerMap.delete(event.pointerId);
    if (pointerMap.size === 0) {
      dom.world.classList.remove("dragging");
      if (wasSingleTap) {
        if (state.mode === "explore") handleWorldClick(event.clientX, event.clientY);
        else if (state.mode === "journal") closeJournal();
        else closeCard();
      }
      pointerMoved = false;
      gestureWasPinch = false;
      pinchStartDistance = 0;
    }
  });

  dom.world.addEventListener("pointercancel", (event) => {
    pointerMap.delete(event.pointerId);
    if (pointerMap.size === 0) {
      pointerMoved = false;
      gestureWasPinch = false;
      dom.world.classList.remove("dragging");
    }
  });

  dom.world.addEventListener("wheel", (event) => {
    if (state.mode !== "explore") return;
    event.preventDefault();
    cameraDistance = THREE.MathUtils.clamp(cameraDistance + event.deltaY * .008, 5.4, 15);
  }, { passive: false });

  dom.world.addEventListener("click", () => {
    if (state.mode === "journal") closeJournal();
    else if (["card", "dialogue"].includes(state.mode)) closeCard();
  });
}

function playTone(kind = "open") {
  if (!state.soundEnabled) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    const frequencies = { open: 392, move: 280, discover: 620, close: 220 };
    oscillator.frequency.value = frequencies[kind] || frequencies.open;
    oscillator.type = kind === "discover" ? "triangle" : "sine";
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "discover" ? .08 : .045, now + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .16);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + .17);
  } catch {
    // Sound is an optional enhancement; a blocked AudioContext must not affect play.
  }
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  dom.soundBtn.setAttribute("aria-pressed", String(state.soundEnabled));
  dom.soundBtn.setAttribute("aria-label", state.soundEnabled ? "關閉音效" : "開啟音效");
  if (state.soundEnabled) playTone("open");
}

function interactNearby() {
  if (state.mode !== "explore") return;
  const nearby = closestInteraction();
  if (nearby) openInteraction(nearby.interaction);
}

function resetJourney() {
  if (!window.confirm("要清空旅人手札，從晨光郊區重新開始嗎？")) return;
  state.progress = blankProgress();
  state.currentRegion = null;
  state.firstStart = true;
  saveProgress();
  updateJournal();
  closeCard(false);
  closeJournal();
  moveTarget = null;
  pendingInteraction = null;
  focusActor = null;
  if (player) player.object.position.set(-28, 0, -13);
  dom.hint.classList.remove("is-faded");
  setMode("explore");
  updateRegion();
  updateCamera(.016, true);
  showToast("旅程已重新整理，第一個轉彎正在等你。");
}

function showError(error) {
  if (error) console.warn("Wanderworld could not start", error);
  state.mode = "error";
  dom.loading.classList.add("hidden");
  dom.welcome.classList.add("hidden");
  dom.hud.classList.add("hidden");
  dom.regionCaption.classList.add("hidden");
  dom.error.classList.remove("hidden");
}

function initializeRenderer() {
  renderer = new THREE.WebGLRenderer({ canvas: dom.world, antialias: !touchScreen, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, touchScreen ? 1.35 : 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, .1, 140);
  camera.position.set(-25, 12, -5);
  clock = new THREE.Clock();
  loader = new GLTFLoader();
  raycaster = new THREE.Raycaster();
  worldReady = true;
  dom.world.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    showError(new Error("WebGL context lost"));
  });
  dom.world.addEventListener("webglcontextrestored", () => window.location.reload());
}

function resize() {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

function bindUI() {
  dom.start.addEventListener("click", () => {
    setMode("explore");
    dom.world.focus();
    dom.hint.classList.remove("is-faded");
    updateRegion();
    playTone("open");
  });
  dom.journalBtn.addEventListener("click", openJournal);
  dom.soundBtn.addEventListener("click", toggleSound);
  dom.resetBtn.addEventListener("click", resetJourney);
  dom.errorRetry.addEventListener("click", () => window.location.reload());

  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => {
    if (state.mode === "journal") closeJournal();
    else closeCard();
    playTone("close");
  }));

  dom.choices.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-card]");
    if (closeButton) {
      closeCard();
      playTone("close");
      return;
    }
    const choice = event.target.closest("[data-next]");
    if (!choice || !state.dialogue) return;
    state.dialogue.nodeId = choice.dataset.next;
    renderDialogue();
    dom.choices.querySelector("button")?.focus();
    playTone("open");
  });

  dom.journalTabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");
    if (!tab) return;
    state.journalTab = tab.dataset.tab;
    updateJournal();
    dom.journalTabs.querySelector(`[data-tab="${state.journalTab}"]`)?.focus();
  });

  window.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
    const movementKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (movementKeys.includes(event.code)) {
      event.preventDefault();
      keys.add(event.code);
    }
    if (event.code === "KeyE" && !event.repeat) interactNearby();
    if (event.code === "Escape") {
      if (state.mode === "journal") closeJournal();
      else if (["card", "dialogue"].includes(state.mode)) closeCard();
    }
  });
  window.addEventListener("keyup", (event) => keys.delete(event.code));
  window.addEventListener("resize", resize);
  bindPointerEvents();
}

function animate() {
  animationFrame = window.requestAnimationFrame(animate);
  const delta = Math.min(clock?.getDelta() || .016, .05);
  const elapsed = clock?.elapsedTime || 0;
  if (state.mode === "explore") {
    updatePlayer(delta, elapsed);
    updateRegion();
  }
  if (state.mode !== "loading" && state.mode !== "error") updateAnimals(delta, elapsed);
  updateDestinationMarker(delta);
  updateCamera(delta);
  updateContext();
  if (renderer && scene && camera) renderer.render(scene, camera);
}

async function boot() {
  try {
    initializeRenderer();
    setLoading(0, "準備晨光、風車和一點月色⋯");
    const total = requiredModelKeys.length;
    let completed = 0;
    for (let index = 0; index < requiredModelKeys.length; index += 5) {
      const batch = requiredModelKeys.slice(index, index + 5);
      await Promise.all(batch.map(async (key) => {
        await loadAsset(key);
        completed += 1;
        setLoading(completed / total, `整理第 ${completed} / ${total} 份旅途素材⋯`);
      }));
    }
    createEnvironment();
    createActors();
    createDestinationMarker();
    createLights();
    updateJournal();
    updateCamera(.016, true);
    dom.loading.classList.add("hidden");
    setMode("welcome");
    dom.start.focus();
    if (!animationFrame) animate();
  } catch (error) {
    showError(error);
  }
}

updateJournal();
bindUI();
boot();
