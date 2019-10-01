const vscode = require('vscode');
const request = require('request');
let GuP;
let timer;

exports.activate = function activate(context) {
  init();
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(handleConfigChange));
};

exports.deactivate = function deactivate() {
  clearInterval(timer);
};

function init() {
  setView();
  const hour = (new Date).getHours();
  const interval = parseInt(vscode.workspace.getConfiguration().get('gup.interval'));
  if ([9, 10, 11, 13, 14].indexOf(hour) > -1) {
    timer = setInterval(setView, interval < 10000 ? 10000 : interval);
  }
}

function setView() {
  request.get("http://hq.sinajs.cn/list=" + vscode.workspace.getConfiguration().get('gup.code'), function (err, res, body) {
    const GuPList = body.split(';').slice(0, -1).map(item => item.split('"')[1].split(',')[3].slice(0, -1))
    const message = GuPList.join(' ') || 'Check Your Setting';
    if (GuP) {
      GuP.text = message;
    } else {
      const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 999999);
      barItem.text = message;
      barItem.show();
      GuP = barItem;
    }
  });
}

function handleConfigChange() {
  clearInterval(timer);
  if (GuP) {
    GuP.hide();
    GuP.dispose();
    GuP = null;
  }
  init();
}
