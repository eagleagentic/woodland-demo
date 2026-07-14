# 漫遊異世界 Wanderworld

純靜態 Three.js 3D 散步遊戲。成品在 `dist/`，不需要 Node.js、npm、後端或 CDN；只要把 `dist/` 發布到任一靜態網站服務即可。

## 操作

- 點擊／輕觸地面：旅人自動走向目的地
- 點擊人物、動物或亮起的地標：走近後互動
- 按住拖曳／單指拖曳：旋轉第三人稱鏡頭
- 滾輪／雙指縮放：調整鏡頭距離
- `WASD`／方向鍵：輔助移動；`E`：與附近角色互動；`Esc`：關閉卡片
- 右上角可開啟旅人手札、切換提示音或清空旅程

手札會記錄到訪區域、看過的動物、聊過的人物與發現的地標，並寫入瀏覽器 `localStorage`。

## 本機預覽

GLB 必須經由 HTTP 載入，請不要直接用 `file://` 打開。於本目錄執行：

```bash
python3 -m http.server 8000 --directory dist
```

然後開啟 <http://localhost:8000>。

## 部署

- Cloudflare Pages：Build command 留空，Build output directory 填 `dist`
- GitHub Pages／Netlify：直接發布 `dist/`

所有 runtime dependency、模型、貼圖、授權與第三方程式碼均在 `dist/assets/` 內；網路離線時不會向 CDN、API 或遠端字體請求資源。

## 授權

3D 素材來自 Kenney 各素材包，依 `dist/assets/licenses/` 內各包的 CC0 1.0 條款使用。Three.js 依 MIT License 使用，完整文字保留於 `dist/assets/vendor/THREE-LICENSE.txt`。
