'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.cycleAngularComponentFiles', () => {
        
        var currentFilename: string = vscode.window.activeTextEditor.document.fileName;
        var currentFileExtension: string = currentFilename.substr(currentFilename.lastIndexOf('.') + 1).toLowerCase();
        var currentFilenameWithoutExtension: string = currentFilename.substr(0, currentFilename.lastIndexOf('.') + 1);

        // if the current file doesn't appear to be an Angular component file, return
        if (currentFileExtension != "ts" && currentFileExtension != "html" && currentFileExtension != "scss" && currentFileExtension != "css" && currentFileExtension != "sass" && currentFileExtension != "less") {
            return;
        }

        // figure out what the next file to switch to should be
        var newFileExtension: string = "";
        if (currentFileExtension == "ts" && fileExists(currentFilenameWithoutExtension + "html")) {
            newFileExtension = "html";
        }
        else if (currentFileExtension == "html" && fileExists(currentFilenameWithoutExtension + "scss")) {
            newFileExtension = "scss";
        }
        else if (currentFileExtension == "html" && fileExists(currentFilenameWithoutExtension + "sass")) {
            newFileExtension = "sass";
        }
        else if (currentFileExtension == "html" && fileExists(currentFilenameWithoutExtension + "less")) {
            newFileExtension = "less";
        }
        else if (currentFileExtension == "html" && fileExists(currentFilenameWithoutExtension + "css")) {
            newFileExtension = "css";
        }
        else if (currentFileExtension == "scss" && fileExists(currentFilenameWithoutExtension + "ts")) {
            newFileExtension = "ts";
        }
        else if (currentFileExtension == "sass" && fileExists(currentFilenameWithoutExtension + "ts")) {
            newFileExtension = "ts";
        }
        else if (currentFileExtension == "less" && fileExists(currentFilenameWithoutExtension + "ts")) {
            newFileExtension = "ts";
        }
        else if (currentFileExtension == "css" && fileExists(currentFilenameWithoutExtension + "ts")) {
            newFileExtension = "ts";
        }

        // if an appropriate next file was found, switch to it
        if (newFileExtension.length > 0) {
            vscode.workspace.openTextDocument(currentFilenameWithoutExtension + newFileExtension)
            .then(doc => vscode.window.showTextDocument(doc));
        }
        
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}

function fileExists(filename: string): boolean {
    return fs.existsSync(filename);
}
