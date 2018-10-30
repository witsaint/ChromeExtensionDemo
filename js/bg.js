chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  sendResponse('我收到了你的消息！');
});