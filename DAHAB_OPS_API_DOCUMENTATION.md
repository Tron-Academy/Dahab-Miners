# Dahab Ops API Documentation

This document describes the internal operations API exposed through the Dahab backend at the base path `/api/dahab-ops`.

## 1. Authentication

All routes in this router are protected by an API key middleware.

### Required header

- Header name: `ops-api-key`
- Example: `ops-api-key: YOUR_SECRET_KEY`

The backend compares this value against the server environment variable `OPS_DAHAB_API_KEY`.

### Expected behavior

- Missing or invalid key: `401` or `400` depending on the error path
- Valid key: request proceeds to the route handler

---

## 2. Base URL

Use one of the following depending on your environment:

- Local: `http://localhost:3000/api/dahab-ops`
- Staging: `https://your-staging-domain/api/dahab-ops`
- Production: `https://api.dahabminers.com/api/dahab-ops`

Example:

- `GET http://localhost:3000/api/dahab-ops/data/getData`

---

## 3. Common Response Conventions

### Success

Most successful requests return a JSON body with either:

- a direct payload, or
- a wrapped object such as `{ msg: "success", ... }`

### Errors

Error responses typically look like:

```json
{
  "error": "Some descriptive error"
}
```

or

```json
{
  "msg": "Some descriptive error"
}
```

---

## 4. Endpoint Reference

### A. Data APIs

#### 1) Get all miner data

- Method: `GET`
- Path: `/data/getData`
- Description: Returns paginated data records.

Query parameters:

- `search` (optional): free text search across fields like mac address, serial number, client name, temporary owner, worker ID, model name
- `farm` (optional): filter by farm name, or use `ALL`
- `currentPage` (optional): page number, default `1`
- `limit` (optional): number of items per page, default `20`
- `sortby` (optional): sorting option

Supported sort values:

- `new`
- `clientAZ`, `clientZA`
- `modelAZ`, `modelZA`
- `serialAZ`, `serialZA`
- `workerAZ`, `workerZA`
- `macAZ`, `macZA`
- `actLocAZ`, `actLocZA`
- `currLocAZ`, `currLocZA`
- `nowRunAZ`, `nowRunZA`

Example:

```http
GET /api/dahab-ops/data/getData?search=ABC123&farm=ALL&currentPage=1&limit=20&sortby=new
```

Response example:

```json
{
  "msg": "success",
  "datas": [],
  "totalDatas": 0,
  "page": 1,
  "numOfPages": 0
}
```

---

#### 2) Download data as CSV

- Method: `GET`
- Path: `/data/download-csv`
- Description: Exports all data records as a CSV file.

Query parameters:

- None

Response:

- `text/csv` file attachment named `inventory.csv`

---

#### 3) Get data dropdown list

- Method: `GET`
- Path: `/data/dropdown`
- Description: Returns lightweight data records for dropdown use.

Query parameters:

- `search` (optional): filter by client ID or related value

Example:

```http
GET /api/dahab-ops/data/dropdown?search=client123
```

---

#### 4) Get a single data record by ID

- Method: `GET`
- Path: `/data/getData/:id`
- Description: Returns one miner/data record by MongoDB ID.

Path parameters:

- `id` (required): MongoDB object ID

Example:

```http
GET /api/dahab-ops/data/getData/64f2d8d2c2b55d3ab5d1e123
```

---

### B. Warranty APIs

#### 5) Get all warranties

- Method: `GET`
- Path: `/warranty/`
- Description: Returns warranties with pagination and search support.

Query parameters:

- `currentPage` (optional): page number, default `1`
- `type` (optional): filter by warranty type; use `ALL` to bypass filtering
- `query` (optional): free text search across model, serial number, client name, client ID

Example:

```http
GET /api/dahab-ops/warranty/?currentPage=1&type=ALL&query=miner
```

Response example:

```json
{
  "warranties": [],
  "totalPages": 0
}
```

---

#### 6) Get miners without warranty

- Method: `GET`
- Path: `/warranty/no-warranty`
- Description: Returns miners that do not have an attached warranty.

Query parameters:

- None

---

#### 7) Get a single warranty by ID

- Method: `GET`
- Path: `/warranty/:id`
- Description: Returns one warranty record by ID.

Path parameters:

- `id` (required): MongoDB object ID

---

### C. Miner Model APIs

#### 8) Get all miner models

- Method: `GET`
- Path: `/miner-models/`
- Description: Returns paginated miner model listings.

Query parameters:

- `search` (optional): search by manufacturer or model name
- `currentPage` (optional): page number, default `1`

Example:

```http
GET /api/dahab-ops/miner-models/?search=Antminer&currentPage=1
```

Response example:

```json
{
  "miners": [],
  "totalMiners": 0,
  "totalPages": 0
}
```

---

#### 9) Get miner models for dropdown

- Method: `GET`
- Path: `/miner-models/dropdown`
- Description: Returns a lightweight list of miner models for UI dropdowns.

Query parameters:

- None

---

#### 10) Get a single miner model by ID

- Method: `GET`
- Path: `/miner-models/:id`
- Description: Returns one miner model by ID.

Path parameters:

- `id` (required): MongoDB object ID

---

### D. Mining Farm APIs

#### 11) Get all mining farms

- Method: `GET`
- Path: `/mining-farms/`
- Description: Returns all mining farms.

Query parameters:

- None

---

#### 12) Get mining farms dropdown

- Method: `GET`
- Path: `/mining-farms/dropdown`
- Description: Returns a minimal list of farm names for dropdowns.

Query parameters:

- None

---

#### 13) Get miners in a specific farm

- Method: `GET`
- Path: `/mining-farms/miners/:id`
- Description: Returns miners attached to a farm, including temporary miners.

Path parameters:

- `id` (required): Mining farm MongoDB ID

Example:

```http
GET /api/dahab-ops/mining-farms/miners/64f2d8d2c2b55d3ab5d1e456
```

---

### E. Issue APIs

#### 14) Create a new issue type

- Method: `POST`
- Path: `/issues/type`
- Description: Creates a new issue type.

Body:

```json
{
  "issueType": "Hardware Failure"
}
```

Required fields:

- `issueType` (string)

---

#### 15) Get all issue types

- Method: `GET`
- Path: `/issues/type`
- Description: Returns all available issue types.

Query parameters:

- None

---

#### 16) Edit an issue type

- Method: `PATCH`
- Path: `/issues/type`
- Description: Updates an existing issue type.

Body:

```json
{
  "id": "64f2d8d2c2b55d3ab5d1e789",
  "issueType": "Firmware Issue"
}
```

Required fields:

- `id` (string / MongoDB ID)
- `issueType` (string)

---

#### 17) Report a new issue

- Method: `POST`
- Path: `/issues/`
- Description: Reports a repair issue against a miner.

Body:

```json
{
  "issue": "64f2d8d2c2b55d3ab5d1e999",
  "workerId": "W-1001",
  "miner": "64f2d8d2c2b55d3ab5d1e111",
  "client": "64f2d8d2c2b55d3ab5d1e222",
  "status": "offline",
  "description": "Miner is not responding"
}
```

Required fields:

- `issue` (MongoDB ID of issue type)
- `workerId` (string)
- `miner` (MongoDB ID of miner)
- `client` (MongoDB ID of client)
- `status` (string)
- `description` (string)

Common status values:

- `offline`
- `online`

---

#### 18) Get all issues

- Method: `GET`
- Path: `/issues/`
- Description: Returns issue records with pagination.

Query parameters:

- `status` (optional): filter by issue status, e.g. `Pending`, `Resolved`
- `currentPage` (optional): page number
- `search` (optional): free text search by issue name, username, model, worker address

Example:

```http
GET /api/dahab-ops/issues/?status=Pending&currentPage=1&search=miner
```

---

#### 19) Get issue messages

- Method: `GET`
- Path: `/issues/messages/:id`
- Description: Returns all messages associated with a specific issue.

Path parameters:

- `id` (required): issue ID

Example:

```http
GET /api/dahab-ops/issues/messages/64f2d8d2c2b55d3ab5d1e333
```

---

#### 20) Send a response to an issue

- Method: `POST`
- Path: `/issues/send-response`
- Description: Sends a response message for an issue.

Body:

```json
{
  "message": "We are investigating this issue.",
  "issue": "64f2d8d2c2b55d3ab5d1e333"
}
```

Required fields:

- `message` (string)
- `issue` (MongoDB ID)

---

#### 21) Update issue status

- Method: `PATCH`
- Path: `/issues/update-status/:id`
- Description: Updates the status of an issue.

Path parameters:

- `id` (required): issue ID

Body:

```json
{
  "status": "Resolved"
}
```

Required fields:

- `status` (string)

Common values:

- `Resolved`
- `Pending`
- `Warranty`
- `Repair Center`

---

## 5. Example Postman Test Flow

### Step 1: Create a new collection

Name it something like:

- `Dahab Ops API`

### Step 2: Create a variable

In Postman, create a collection variable:

- Name: `base_url`
- Value: `http://localhost:3000/api/dahab-ops`

### Step 3: Add the API key header

For every request, add this header:

- Key: `ops-api-key`
- Value: `YOUR_SECRET_KEY`

### Step 4: Test a simple endpoint

Try the health-like list endpoint first:

- Method: `GET`
- URL: `{{base_url}}/data/getData`
- Headers: `ops-api-key: YOUR_SECRET_KEY`

Expected result:

- Status `200`
- JSON response containing `datas`

### Step 5: Try a POST request

Example for creating an issue type:

- Method: `POST`
- URL: `{{base_url}}/issues/type`
- Headers:
  - `Content-Type: application/json`
  - `ops-api-key: YOUR_SECRET_KEY`
- Body (raw JSON):

```json
{
  "issueType": "Hardware Failure"
}
```

Expected result:

- Status `201`
- JSON response with the created issue type

### Step 6: Test a PATCH request

Example:

- Method: `PATCH`
- URL: `{{base_url}}/issues/type`
- Headers:
  - `Content-Type: application/json`
  - `ops-api-key: YOUR_SECRET_KEY`
- Body:

```json
{
  "id": "64f2d8d2c2b55d3ab5d1e789",
  "issueType": "Firmware Issue"
}
```

### Step 7: Verify failures

Try the same request without the `ops-api-key` header.

Expected result:

- Status `401` or `400`
- Error message indicating an invalid or missing API key

---

## 6. Recommended Notes for the Partner Team

- Always send the `ops-api-key` header on every request.
- Use JSON for `POST` and `PATCH` requests.
- Replace example IDs with real MongoDB IDs from your environment.
- For list endpoints, use query parameters for filtering and pagination.
- If you expect CSV export, use the `GET /data/download-csv` route.

---

## 7. Quick Reference Summary

| Category             | Endpoint                    | Method |
| -------------------- | --------------------------- | ------ |
| Data list            | `/data/getData`             | GET    |
| Data CSV             | `/data/download-csv`        | GET    |
| Data dropdown        | `/data/dropdown`            | GET    |
| Single data          | `/data/getData/:id`         | GET    |
| Warranty list        | `/warranty/`                | GET    |
| Warranty no warranty | `/warranty/no-warranty`     | GET    |
| Single warranty      | `/warranty/:id`             | GET    |
| Miner models         | `/miner-models/`            | GET    |
| Miner model dropdown | `/miner-models/dropdown`    | GET    |
| Single miner model   | `/miner-models/:id`         | GET    |
| Mining farms         | `/mining-farms/`            | GET    |
| Farm dropdown        | `/mining-farms/dropdown`    | GET    |
| Farm miners          | `/mining-farms/miners/:id`  | GET    |
| Create issue type    | `/issues/type`              | POST   |
| Get issue types      | `/issues/type`              | GET    |
| Edit issue type      | `/issues/type`              | PATCH  |
| Report issue         | `/issues/`                  | POST   |
| Get issues           | `/issues/`                  | GET    |
| Issue messages       | `/issues/messages/:id`      | GET    |
| Send issue response  | `/issues/send-response`     | POST   |
| Update issue status  | `/issues/update-status/:id` | PATCH  |
