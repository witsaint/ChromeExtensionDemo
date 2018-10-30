setUpContextMenus = () => {
  const nemu = chrome.contextMenus.create({
    id: "91",
    "type": 'normal',
    "title": '91',
    "contexts": ["page"], //( optional array of string ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"] )右键菜单项将会在这个列表指定的上下文类型中显示。默认为“page”。
  })
  const dsasa = chrome.contextMenus.create({
    id: "92",
    "type": 'normal',
    "title": '92',
    "contexts": ["page"], //( optional array of string ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"] )右键菜单项将会在这个列表指定的上下文类型中显示。默认为“page”。
  })
}

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus
  setUpContextMenus();
});
chrome.contextMenus.onClicked.addListener((itemData) => {
  if (itemData.menuItemId == "91") {
    // 需要重新创建新的window对象
    // chrome.windows.create({
    //   url: 'https://www.baidu.com' // 需要加http或者https 不加就鸟了
    // })
    // chrome.windows.onCreated.addListener(function (mql) {
    //   console.info(mql)
    // })
    chrome.tabs.create({
      url: 'https://www.baidu.com'
    })
  }
});
