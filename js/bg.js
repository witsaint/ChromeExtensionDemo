chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  console.info('request', request);
  console.info('sender', sender);
  const { msgValue } = request;
  sendResponse(`我收到了你的消息！${msgValue}`);
});
