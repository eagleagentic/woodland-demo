# 漫遊異世界 Wanderworld

一個不需要後端或建置工具的低多邊形 3D 散步遊戲。成品位於 `dist/`，所有 Three.js dependency、模型、貼圖與授權均已收錄在內。

## 操作

- 點擊／輕觸地面：前往目的地
- 點擊人物、動物或發光地標：自動走近並互動
- 按住拖曳／單指拖曳空白處：旋轉鏡頭
- 滾輪／雙指縮放：拉近或拉遠
- `WASD`／方向鍵：輔助移動；`E`：與最近目標互動；`Esc`：關閉卡片
- 右上角可開啟旅人手札、切換提示音，或重新開始旅程

探索進度會保存在瀏覽器 `localStorage`。重新開始會清除這份進度。

## 本機預覽

不需要 `npm install`。在本目錄執行：

```bash
python3 -m http.server 8000 --directory dist
```

然後開啟 <http://localhost:8000>。GLB 需經 HTTP 載入，請勿直接以 `file://` 開啟。

## 部署

- Cloudflare Pages：Build command 留空，Output directory 填 `dist`
- GitHub Pages／Netlify：直接發布 `dist/`

網站不使用 CDN、API 或遠端字型，部署後可在網路離線時由瀏覽器快取或完整下載的網站目錄載入。

## 授權

素材來自 Kenney，依各素材包所附 CC0 1.0 條款使用；Three.js 依 MIT License 使用。完整授權文字保留於 `dist/assets/licenses/`。
