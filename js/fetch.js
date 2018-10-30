// 简陋版请求方法
fetch = (url, success, failure) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      success && success(xhr.response)
    } else {
      failure && failure(xhr)
    }
  }
  xhr.send();
}
// dom
const $cityName = window.document.getElementById('city')
const $weather = window.document.getElementById('weather')
const $button = window.document.getElementById('button')
const $msg = window.document.getElementById('msg')
const $hiddenNav = window.document.getElementById('hiddenNav')
//actions
fetch("http://pv.sohu.com/cityjson?ie=utf-8", (data) => {
  const cityName = data.match(/cname":\s?"(.*?)"/)[1]
  console.info('cityName', cityName)
  $cityName.innerHTML = cityName
  // chrome.storage.sync.set({"cityName": cityName}, function(value) { // 存储
  //   console.log('Value is set to ' + value);
  // });
  fetch(`http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=23A7BmNdXBYtXGAnIcz9M3WaX74hQF4w`, (data) => {
    const dataObj = JSON.parse(data)
    const weatherData = dataObj.results[0].weather_data[0]
    const Weather = weatherData.date + ' ' + weatherData.weather
    $weather.innerHTML = Weather
  })
})
getResponse = (response) => {
  response && ($hiddenNav.innerHTML = response)
}
sendMsg = () => {
  const msgValue = $msg.value
  console.info('sendMsg')
  // chrome.runtime.sendMessage( null, {msgValue}, {includeTlsChannelId: true}, function (response) {
  //   getResponse(response);
  // });
  chrome.tabs.create({
    url: chrome.extensions.getUrl("popup.html")
  })
}
$button.onclick = sendMsg