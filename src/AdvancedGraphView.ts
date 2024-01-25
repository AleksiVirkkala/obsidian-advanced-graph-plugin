import { ItemView, WorkspaceLeaf } from 'obsidian';

import type AdvancedGraphPlugin from 'main';

import Component from './Component.svelte';
import { plugin } from './stores';

export const VIEW_TYPE_ADVANCED_GRAPH = 'advanced-graph-view';

export class AdvancedGraphView extends ItemView {
	component!: Component;

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

		this.component = new Component({
			target: this.contentEl,
			props: {
				variable: 234
			}
		});
	}

	async onClose() {
		console.log('Closing Advanced Graph View');
		this.component.$destroy();
	}
}
