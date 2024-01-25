import { Plugin } from 'obsidian';
import { AdvancedGraphView, VIEW_TYPE_ADVANCED_GRAPH } from 'src/AdvancedGraphView';
import { type GraphSettings, DEFAULT_SETTINGS, GraphSettingTab } from 'src/GraphSettings';

export default class AdvancedGraphPlugin extends Plugin {
	settings!: GraphSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(VIEW_TYPE_ADVANCED_GRAPH, leaf => new AdvancedGraphView(leaf, this));

		this.addRibbonIcon('dice', 'Open graph', () => {
			this.activateView();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new GraphSettingTab(this.app, this));
	}

	async activateView() {
		const { workspace } = this.app;
		const leaf = workspace.getLeaf(true);
		await leaf.setViewState({
			type: VIEW_TYPE_ADVANCED_GRAPH,
			active: true
		});
		workspace.revealLeaf(leaf); // Maybe unnecessary
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
