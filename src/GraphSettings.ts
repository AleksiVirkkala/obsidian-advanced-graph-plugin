import AdvancedGraphPlugin from "main";
import { PluginSettingTab, App, Setting } from "obsidian";

export interface GraphSettings {
	mySetting: string;
}
export const DEFAULT_SETTINGS: GraphSettings = {
	mySetting: "default",
};

export class GraphSettingTab extends PluginSettingTab {
	plugin: AdvancedGraphPlugin;

	constructor(app: App, plugin: AdvancedGraphPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
