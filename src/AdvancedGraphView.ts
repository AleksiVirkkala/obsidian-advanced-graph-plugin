import { ItemView, WorkspaceLeaf } from 'obsidian';

import type AdvancedGraphPlugin from 'main';

import Root from './Root.svelte';
import { plugin } from './stores';

export const VIEW_TYPE_ADVANCED_GRAPH = 'advanced-graph-view';

export class AdvancedGraphView extends ItemView {
	component!: Root;

	constructor(leaf: WorkspaceLeaf, public plugin: AdvancedGraphPlugin) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_ADVANCED_GRAPH;
	}

	getDisplayText(): string {
		return 'Advanced Graph View';
	}

	async onOpen() {
		plugin.set(this.plugin);

		this.component = new Root({
			target: this.contentEl
		});
	}

	async onClose() {
		console.log('Closing Advanced Graph View');
		this.component.$destroy();
	}
}
