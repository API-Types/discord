# API Typings – [Discord API](https://discord.com/developers/docs/intro)

[![npm]](https://www.npmjs.com/package/@api-typings/discord)
[![license]](https://github.com/API-Typings/discord/blob/master/LICENSE)

API Typings for `v9` of [Discord's REST & Gateway API](https://discord.com/developers/docs/intro).

## Install

```sh
npm install -D @api-typings/discord
```

### Usage

#### JavaScript

```js
// Common JS
const { Guild, Snowflake } = require('@api-typings/discord');
// ES Module
import { Guild, Snowflake } from '@api-typings/discord';

/**
 * @param {Snowflake} id - The ID of the guild to get.
 * @returns {Promise<Guild>}
 */ 
async function getGuild(id) { ... }
```

#### TypeScript

```ts
import type { Guild, Snowflake } from '@api-typings/discord';

/**
 * @param id - The ID of the guild to get.
 */ 
async function getGuild(id: Snowflake): Promise<Guild> { ... }
```

### Structure

File structure is closely organized to Discord's documentation, with each resources' endpoints separated into an `endpoints/` folder, e.g.,

#### Documentation

```md
- Resources
	- Application
	- Audit Log
	- Channel
	- ...
```

#### Directory

```md
resources/
├── endpoints/
│   ├── Application.ts
│   ├── AuditLog.ts
│   └── Channel.ts
├── Application.ts
├── AuditLog.ts
├── Channel.ts
└── ...
```

[npm]: https://img.shields.io/npm/v/@api-typings/discord?color=CB3837&logo=npm&style=for-the-badge
[license]: https://img.shields.io/npm/l/@api-typings/discord?color=2FC9FF&style=for-the-badge
