const $inputDom = document.querySelector('.search-input');
const $SuggestListDom = document.querySelector('.suggest-list');
const $baiduListDom = document.querySelector('.baidu-list');
const $bingListDom = document.querySelector('.bing-list');
const $SearchBtnDom = document.querySelector('.search-btn');
const $BackgroundDom = document.querySelector('.background');
let searchKeyword = '';
let composition = false;
let oldBaiduSuggestList = '';
$inputDom.addEventListener('compositionstart', () => {
  composition = true;
});
$inputDom.addEventListener('compositionend', () => {
  composition = false;
  search(searchKeyword);
});

$inputDom.onblur = () => {
  // changeDisplay.call($SuggestListDom, false);
};
$BackgroundDom.onclick = () => {
  changeDisplay.call($SuggestListDom, false);
};
$inputDom.onfocus = () => {
  if (searchKeyword) {
    changeDisplay.call($SuggestListDom, true);
  }
};
$inputDom.onkeydown = (e) => {
  if (e.keyCode==13 && searchKeyword) {
    goBaidu(searchKeyword);
  }
};

$inputDom.oninput = function (e) {
  const { value } = e.target;
  searchKeyword = value;
  if (!composition) {
    search(value);
  }
};
function changeDisplay(show) {
  this.style.display = show ? 'block' : 'none';
}

function pickItem(data, type) {
  const itemDom = document.createElement('p');
  itemDom.innerText = data;
  itemDom.classList.add('suggest-item');
  itemDom.addEventListener('click', () => {
    goBaidu(data);
  });
  return itemDom;
}
function goBingCH(query) {
  window.open(`https://cn.bing.com/search?q=${window.encodeURIComponent(query)}&qs=HS&pq=a&sk=HS1&sc=9-1&cvid=8C550A1E4DC84185A324103C0930CEAA&FORM=BESBTB`);
}
function goBingEn(query) {
  window.open(`https://cn.bing.com/search?q=${window.encodeURIComponent(query)}&cvid=F48EBF7C45F04732BE93D69C3ABF6043&FORM=BESBTB&ensearch=1`);
}
function goBaidu(query) {
  window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${window.encodeURIComponent(query)}`);
}

function search(keyword) {
  const searchContent = window.encodeURIComponent(keyword);
  fetch(`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${searchContent}`, (data) => {
    const { g, q, p, queryid, slid } = JSON.parse(data);
    if (g && g.length) {
      const searchListDom = document.createElement('div');
      const fragment = document.createDocumentFragment()
      $baiduListDom.innerHTML = '';
      g.forEach((item) => {
        const { q, sa, type } = item;
        fragment.appendChild(pickItem(q))
      });
      $baiduListDom.appendChild(fragment);
      changeDisplay.call($SuggestListDom, true);
    }
  });
  fetch(`https://cn.bing.com/AS/Suggestions?qry=${searchContent}&cp=1&cvid=5B46D4F1F6D0477999F9038E8777AFD4`,
    (data) => {
      $bingListDom.innerHTML = data;
      const bingSuggest = document.getElementsByClassName('sa_sg');
      for (let i = 0; i < bingSuggest.length; i++) {
        const item = bingSuggest[i];
        const query = item.getAttribute('query');
        item.addEventListener('click', () => {
          goBingCH(query);
        })
      }
      const bingOtherSuggest = document.querySelectorAll('.pp_tile');
      for (let i = 0; i < bingOtherSuggest.length; i++) {
        const item = bingOtherSuggest[i];
        const query = item.getAttribute('query');
        item.addEventListener('click', () => {
          goBingEn(query);
        })
      }
    })
}
