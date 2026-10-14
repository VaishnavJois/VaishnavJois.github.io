// Remove the previous build's hashed bundle so stale files never pile up in the repo.
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

rmSync(fileURLToPath(new URL('../assets/build', import.meta.url)), { recursive: true, force: true })
