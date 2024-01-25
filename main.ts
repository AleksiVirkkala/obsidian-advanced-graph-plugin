import { Plugin } from "obsidian";
import {
	GraphSettings,
	DEFAULT_SETTINGS,
	GraphSettingTab,
} from "src/GraphSettings";

export default class AdvancedGraphPlugin extends Plugin {
	settings: GraphSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new GraphSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
