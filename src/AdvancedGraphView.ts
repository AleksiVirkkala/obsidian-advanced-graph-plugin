import { ItemView, WorkspaceLeaf } from 'obsidian';

import Component from './Component.svelte';

export const VIEW_TYPE_ADVANCED_GRAPH = 'advanced-graph-view';

export class AdvancedGraphView extends ItemView {
	component!: Component;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_ADVANCED_GRAPH;
	}

	getDisplayText(): string {
		return 'Advanced Graph View';
	}

	async onOpen() {
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
