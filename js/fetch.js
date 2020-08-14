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
  };
  xhr.send();
};

