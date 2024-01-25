import { writable } from 'svelte/store';

import type AdvancedGraphPlugin from 'main';

export const plugin = writable<AdvancedGraphPlugin>();
