# Resource Card Schema

Required fields:
- `id`
- `title`
- `category`
- `summary`
- `image_path`
- `status`
- `last_verified`

Optional fields:
- `sub_category`, `tags`, `cta_label`, `source_url`, `secondary_url`, `contact`, `owner`, `notes`

Status values:
- `Reuse` | `Update` | `Replace` | `Remove`

Notes:
- `id` must be stable for future embeddings.
- `image_path` should be relative to `site/`.
