import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_ADVANCED_GRAPH = "advanced-graph-view";

export class AdvancedGraphView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_ADVANCED_GRAPH;
	}
	getDisplayText(): string {
		return "Advanced Graph View";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h2", { text: "Advanced Graph View" });
	}

	async onClose() {
		console.log("Closing Advanced Graph View");
	}
}
