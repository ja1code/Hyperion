const vscode = require("vscode");
const getNonce = require("../utils/getNonce");

module.exports = class SidebarProvider {
  constructor(context) {
    this.context = context
  }
  async resolveWebviewView(webviewView) {
    this._view = webviewView;
    
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      
      localResourceRoots: [this.context.extensionUri],
    };
    
    webviewView.webview.html = await this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
      }
    })
      
  }

  revive(panel) {
    this._view = panel;
  }

  _getHtmlForWebview(webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "src", "styles", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "src", "styles", "vscode.css")
    );

    const ComponentsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "out", "components.min.js")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();
      
      return `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="${styleResetUri}" rel="stylesheet">
	  			  <link href="${styleVSCodeUri}" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
            <script src="${ComponentsUri}"></script>
            <script nonce="${nonce}">
             const tsvscode = acquireVsCodeApi();
           </script>
          </head>
          <body>
            <h1>hellasidebar</h1>
         </body>
        </html>`
  } 
}