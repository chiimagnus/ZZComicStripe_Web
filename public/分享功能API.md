### 分享功能 API 说明

本文档汇总后端已实现的“连环画分享”功能，包括接口列表、请求/响应示例、字段说明与数据模型来源代码位置，便于前后端联调与测试。

---

## 功能概览

- **已实现**：
  - 生成分享链接：`POST /api/v1/comics/{comic_id}/share`
  - 通过分享令牌访问分享内容：`GET /api/v1/comics/shared/{share_token}`

- **相关源码位置**：
  - 接口路由：`app/api/v1/comics.py`
  - 业务逻辑：`app/services/comic_service.py`
  - 数据模型：`app/models/comic.py`（字段 `share_token`）
  - Pydantic 模型：`app/schemas/comic.py`（`ShareComicResponse`/`ComicShareResponse` 等）
  - 测试参考：`tests/test_complete_flow.py`、`tests/test_api_complete.py`

---

## 1) 生成分享链接

- **Method**: POST  
- **Path**: `/api/v1/comics/{comic_id}/share`
- **Auth**: 需要登录态（依赖全局认证中间件）

### 请求参数

- **Path Params**:
  - `comic_id` (int): 连环画 ID。

- **Body**: 无需显式 body，当前服务端默认过期天数 `expires_days = 7`（代码中暂未开放自定义传入）。

### 成功响应示例

```json
{
  "success": true,
  "data": {
    "share_token": "3hH9F3...Xz", 
    "share_url": "/shared/3hH9F3...Xz",
    "expires_days": 7
  }
}
```

### 失败响应

- 404：连环画不存在
- 500：生成分享链接失败

### 主要字段说明

- **share_token**: 随机生成的分享令牌（长度 32），同时会写入 `comics.share_token` 字段。
- **share_url**: 相对路径形式的分享链接，形如：`/shared/{share_token}`。前端可在其前拼接服务基地址。
- **expires_days**: 过期天数（当前仅返回数值，未在数据库中持久化过期时间）。

### 关键实现位置

- 路由处理：`app/api/v1/comics.py` 中 `share_comic`
- 业务实现：`ComicService.create_share_link()` -> `ComicService.generate_share_token()`

---

## 2) 访问分享内容

- **Method**: GET  
- **Path**: `/api/v1/comics/shared/{share_token}`
- **Auth**: 不需要登录（公开读取）

### 请求参数

- **Path Params**:
  - `share_token` (string): 分享令牌。

### 成功响应示例

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "连环画_xxxx",
    "overall_theme": "xxx",
    "summary": "AI生成的连环画作品",
    "total_pages": 12,
    "created_at": "2025-08-06T17:20:12.927000"
  }
}
```

说明：该接口返回的是分享视图（非完整详情），不包含页面与问题等关联明细，便于公开访问与数据最小化暴露。

### 失败响应

- 404：分享链接不存在或已过期（当前仅表示未找到/无效，尚未实现到期失效逻辑）
- 500：访问分享内容失败

### 关键实现位置

- 路由处理：`app/api/v1/comics.py` 中 `get_shared_comic`
- 业务实现：`ComicService.get_shared_comic()` -> `ComicService.get_comic_by_share_token()`

---

## 数据模型与字段

### 数据表 `comics`

- 字段摘录（详见 `app/models/comic.py`）：
  - `id` (BigInteger): 主键
  - `user_id` (BigInteger): 创建用户ID
  - `task_id` (VARCHAR(36), unique): 关联任务ID
  - `title` (VARCHAR(255))
  - `overall_theme` (VARCHAR(100))
  - `summary` (TEXT)
  - `video_name` (VARCHAR(255))
  - `total_pages` (Integer)
  - `status` (Enum[processing|completed|failed])
  - `share_token` (VARCHAR(64), unique, nullable)

说明：当前仅存储 `share_token`，未持久化过期时间；过期控制尚待扩展。

### Pydantic 响应模型

- `ShareComicResponse`（`app/schemas/comic.py`）
  - `share_token: str`
  - `share_url: str`
  - `expires_at: Optional[datetime]`（当前接口未返回该字段，业务函数返回的是 `expires_days`）

- `ComicShareResponse`（包装通用响应）
  - `success: bool`
  - `data: ShareComicResponse`

注：路由 `POST /{comic_id}/share` 实际返回结构为：

```json
{
  "success": true,
  "data": { "share_token": "...", "share_url": "/shared/...", "expires_days": 7 }
}
```

与 `ShareComicResponse` 字段存在轻微偏差（`expires_at` vs `expires_days`）。如需严格对齐，可在后续迭代中统一模型与返回值。

---

## 请求/响应示例（端到端）

1) 生成分享链接

```bash
curl -X POST \
  "$BASE_URL/api/v1/comics/123/share" \
  -H "Authorization: Bearer <token>"
```

2) 通过分享令牌访问

```bash
curl -X GET "$BASE_URL/api/v1/comics/shared/<share_token>"
```

---

## 已知限制与后续建议

- **过期控制**：目前仅返回 `expires_days`，未持久化到期时间，未做自动失效检查。
- **权限控制**：分享读取接口为公开访问，若需受控分享，可增加一次性令牌/访问次数/密码保护等策略。
- **返回模型一致性**：建议统一 `ShareComicResponse` 与路由实际返回字段（`expires_days` 与 `expires_at` 的取舍）。
- **完整详情公开策略**：当前分享仅返回摘要信息，若需要完整页面数据，可新增带权限控制的分享详情接口。

---

## 关联测试

- `tests/test_complete_flow.py::test_comic_sharing`
- `tests/test_api_complete.py` 中的分享调用


