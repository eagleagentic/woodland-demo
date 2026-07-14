# 漫遊異世界 Wanderworld

`dist/` 是可直接部署的純靜態 Three.js 網頁遊戲；不需安裝 Node.js、套件或後端。所有執行期模型、貼圖、Three.js 檔案與原素材包的授權文字均已收錄在 `dist/assets/`。

## 操作

- 點擊／輕觸地面：走往目的地
- 點擊人物、動物或發光地標：旅人自動走近並互動
- 按住拖曳／單指拖曳空白處：旋轉鏡頭
- 滾輪／雙指縮放：調整鏡頭遠近
- `WASD`／方向鍵：輔助移動；`E`：互動最近目標；`Esc`：關閉卡片
- 右上角可開啟手札、切換提示音、或清除探索紀錄重新開始

探索紀錄保存在瀏覽器的 `localStorage`，重新整理後會保留。

## 本機預覽

GLB 必須透過 HTTP 載入，請不要直接以 `file://` 開啟。於本目錄執行：

```bash
python3 -m http.server 8000 --directory dist
```

然後開啟 <http://localhost:8000>。

## 部署

- Cloudflare Pages：Build command 留空；Build output directory 為 `dist`
- GitHub Pages／Netlify：直接發布 `dist/` 目錄

遊戲沒有 CDN、網路 API 或遠端字型；只要網站目錄已下載，離線網路環境仍可載入。

## 授權

模型素材來自 Kenney，使用對應素材包所附的 CC0 1.0 條款。Three.js 採 MIT License。完整文字保留於 `dist/assets/licenses/` 及 `dist/assets/vendor/THREE-LICENSE.txt`。
