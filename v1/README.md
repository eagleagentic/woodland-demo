# 林間漫遊 Woodland Wander

一個以 [Kenney Cube Pets](https://kenney.nl/assets/cube-pets) 為視覺素材的桌面 3D 森林探索 demo。玩家可以選擇同伴、在森林中自由散步、發現六種小動物，並與途中遇到的路人對話。

## 線上 Demo

| 版本 | 線上體驗 | 操作特色 |
| --- | --- | --- |
| Luna | [demo-luna-woodland.pages.dev](https://demo-luna-woodland.pages.dev/) | WASD／方向鍵移動，拖曳轉動視角 |
| Sol | [demo-sol-woodland.pages.dev](https://demo-sol-woodland.pages.dev/) | 額外支援點擊地面移動及點擊角色互動 |

> 遊戲以桌面瀏覽器為主，建議使用鍵盤與滑鼠體驗。

## 生成用量比較

| 項目 | Luna | Sol |
| --- | ---: | ---: |
| 總成本 | US$1.41 | US$2.90 |
| Input tokens | 264.8K | 175.5K |
| Output tokens | 66.0K | 20.4K |
| 規劃 | 10m 17s · 5.6 Luna Max | 4m 05s · 5.6 Sol Medium |
| 實作 | 17m 14s · 5.6 Luna XHigh | 10m 52s · 5.6 Sol Low |

## One-shot Prompt

```text
reference to kenney_cube-pets_1.0
    我想在森林隨便走走，
    希望看看森林裡的小動物，
    然後跟一些路人對話。
    幫我整一個網頁可以這樣玩
```

## 操作方式

- `WASD` 或方向鍵：移動
- 拖曳滑鼠：轉動視角
- 滑鼠滾輪：調整鏡頭距離
- `E`：觀察靠近的動物或與路人對話
- `Esc`：關閉觀察手札或對話
- Sol 版本可點擊地面自動走近，也可直接點擊動物或路人互動

## 本機預覽

兩個版本都是可直接部署的靜態網站，無需安裝 dependencies。由於 3D 模型需要透過 HTTP 載入，請不要直接以 `file://` 開啟 `index.html`。

Luna：

```bash
python3 -m http.server 8000 --directory demo-5.6-luna/dist
```

Sol：

```bash
python3 -m http.server 8000 --directory demo-5.6-sol/dist
```

啟動後開啟 <http://localhost:8000>。

## 專案結構

```text
.
├── demo-5.6-luna/dist/    # Luna 靜態成品
├── demo-5.6-sol/dist/     # Sol 靜態成品
└── kenney_cube-pets_1.0/ # Cube Pets 原始素材
```

成品以 HTML、CSS、JavaScript 與 [Three.js](https://threejs.org/) 建構，並將執行所需的 GLB 模型及 vendor files 一併放在各自的 `dist` 目錄。Repo 目前保留的是可部署成品，不包含額外的 build pipeline。

## 素材與授權

- Cube Pets 由 [Kenney](https://kenney.nl/) 製作，以 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) 釋出。
- 網頁內含的 Three.js vendor files 保留其 MIT 授權說明。
