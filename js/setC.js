// setcookie.htmlの挙動を補佐するJS

function start(){
  // Cookieを取得
  let userType = GetCookie("UTinAS");
  console.log("userType is " + userType);
  // Cookieに基づいてページ遷移
  if(userType == "3PAS"){
    window.location.href = "./thpas_index.html";
  }else if(userType == "P1"){
    window.location.href = "./index.html";
  }
}

// 3PASボタンの挙動
function set3PAS(){
  document.cookie = "UTinAS=3PAS; path=/AdShowcase/; max-age=2592000;";
  window.location.href = "./thpas_index.html";
}

// P1ボタンの挙動
function setP1(){
  document.cookie = "UTinAS=P1; path=/AdShowcase/; max-age=2592000;";
  window.location.href = "./index.html";
}


// 特定のクッキー取得関数
function GetCookie(name){
    let result = null;

    let cookieName = name + '=';
    let allcookies = document.cookie;

    let position = allcookies.indexOf( cookieName );
    if(position != -1){
        let startIndex = position + cookieName.length;
        let endIndex = allcookies.indexOf( ';', startIndex );
        if(endIndex == -1){
            endIndex = allcookies.length;
        }
        result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
    }
    return result;
}


start();
