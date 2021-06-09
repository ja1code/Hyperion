const vscode = require('vscode');

// Views
const SidebarProvider = require('./views/sidebar')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const sidebarProvider = new SidebarProvider(context)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("hyperion-sidebar", sidebarProvider)
	)

	context.subscriptions.push(vscode.commands.registerCommand('hyperion.health-check', function () {

		vscode.window.showInformationMessage('Hyperion is healthy!');
	
	}));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
