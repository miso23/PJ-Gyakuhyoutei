function cardupdate() {
	"use strict";
	cardupdate();
}

// JSON取得
function getJSON() {
	"use strict";
    var req = new XMLHttpRequest(),
		json;
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            json = req.responseText;
        }
    };
    req.open("GET", "./json/testEcho.json", false);
		//req.open("GET", "./json/echo.json", false);
    req.send(null);
    return json;
}

//カード右上のアイコン部分を作成
function buildPanelButton(tech) {
	"use strict";
	var div_panel_button, div_panel_button_html, div_panel_button_icon_html;
  div_panel_button = document.createElement("div");
  div_panel_button.className = 'panelbutton';
	div_panel_button_icon_html = '';
	if(tech.pc === 1 && tech.sd === 1){
		div_panel_button_icon_html += '<img src="./demoimg/icon/sd.png" class="demo-icon"><img src="./demoimg/icon/pc.png" class="demo-icon">';
	}else if(tech.pc === 1){
		div_panel_button_icon_html += '<img src="./demoimg/icon/pc.png" class="demo-icon">';
	}else if(tech.sd === 1){
		div_panel_button_icon_html += '<img src="./demoimg/icon/sd.png" class="demo-icon">';
	}
  div_panel_button_html = div_panel_button_icon_html;
  div_panel_button.innerHTML = div_panel_button_html;
  return div_panel_button;
}

function buildPanelBody(tech) {
	"use strict";
	  var div_panel_body = document.createElement("div"),
		centerImg = "./demoimg/dac_logo_inv.png",
		div_panel_body_html;
	  div_panel_body.className = 'panel-body panelbody';
		// panelbody作成
		div_panel_body_html = '<center><div id="togif' +String(tech.id)+ '"  class="imgcontainer"><img class="img" src=' +centerImg+ ' width="100%"></div></center><dl class="dl-card"><dt></dt><dd>' + tech.about + '</dd></dl>';
    div_panel_body.innerHTML = div_panel_body_html;
    return div_panel_body;
}

function buildPanelHeading(tech) {
	"use strict";
    var div_panel_heading = document.createElement("div");
    div_panel_heading.className = 'panel-heading';
    div_panel_heading.innerHTML = tech.name;
		div_panel_heading.appendChild(buildPanelButton(tech));
    return div_panel_heading;
}

// カード作成(Modal表示の場合)
function buildCard_Modal(tech) {
	"use strict";
    var div_card = document.createElement("div"),
		img_large = document.createElement("img"),
		button_modal = document.createElement("button"),
		div_panel = document.createElement("div");
    div_card.className = 'card';
		img_large.setAttribute('src', './demoimg/large.png');
		img_large.setAttribute('id', 'fire'+tech.id);
		img_large.setAttribute('class', 'disappear');
		button_modal.setAttribute('type', 'button');
		button_modal.setAttribute('class', 'button');
		button_modal.setAttribute('data-toggle', 'modal');
		button_modal.setAttribute('data-target', '#' +tech.name.replace(/\s+/g, "").replace("(", "").replace(")", ""));
		div_panel.className = 'panel';
    div_panel.appendChild(buildPanelHeading(tech));
    div_panel.appendChild(buildPanelBody(tech));
		button_modal.appendChild(div_panel);
		button_modal.appendChild(img_large);
    div_card.appendChild(button_modal);

    return div_card;
}

// カード作成(別Tab表示の場合)
function buildCard_Tab(tech) {
	"use strict";
		if(tech.pc === 1 && tech.sd === 1){
			// 矢印の代わりにアイコンを表示
			let div_card = document.createElement("div"),
			img_PC = document.createElement("img"),
			img_SD = document.createElement("img"),
			img_difTab = document.createElement("img"),
			button_PC = document.createElement("button"),
			button_SD = document.createElement("button"),
			div_panel = document.createElement("div");
			div_card.className = 'card card_both';
			img_PC.setAttribute('src', './demoimg/icon/pcWhite.png');
			img_PC.setAttribute('class', 'changeImg');
			img_SD.setAttribute('src', './demoimg/icon/sdWhite.png');
			img_SD.setAttribute('class', 'changeImg');
			img_difTab.setAttribute('src', './demoimg/largeDifTab_alpha.png');
			img_difTab.setAttribute('id', 'fire'+tech.id);
			img_difTab.setAttribute('class', 'alpha');
			button_PC.setAttribute('onclick', 'window.open("' +tech.pcdemo+ '")');
			button_PC.setAttribute('class', 'changeIconPC');
			button_PC.setAttribute('type', 'button');
			button_SD.setAttribute('onclick', 'window.open("' +tech.sddemo+ '")');
			button_SD.setAttribute('class', 'changeIconSD');
			button_SD.setAttribute('type', 'button');
			div_panel.className = 'panel';
	    div_panel.appendChild(buildPanelHeading(tech));
	    div_panel.appendChild(buildPanelBody(tech));
			button_PC.appendChild(img_PC);
			button_SD.appendChild(img_SD);
			div_card.appendChild(div_panel);
			div_card.appendChild(img_difTab);
			div_card.appendChild(button_PC);
			div_card.appendChild(button_SD);
			return div_card;
		}else if(tech.frameFit === 0 || tech.frameFit === undefined){
			let div_card = document.createElement("div"),
			img_large = document.createElement("img"),
			button_tab = document.createElement("button"),
			div_panel = document.createElement("div");
	    div_card.className = 'card';
			img_large.setAttribute('src', './demoimg/largeDifTab.png');
			img_large.setAttribute('id', 'fire'+tech.id);
			img_large.setAttribute('class', 'disappear');
			button_tab.setAttribute('type', 'button');
			button_tab.setAttribute('class', 'button');
			if(tech.pc === 1){
				button_tab.setAttribute('onclick', 'window.open("' +tech.pcdemo+ '")');
			}else{
				button_tab.setAttribute('onclick', 'window.open("' +tech.sddemo+ '")');
			}
			div_panel.className = 'panel';
	    div_panel.appendChild(buildPanelHeading(tech));
	    div_panel.appendChild(buildPanelBody(tech));
			button_tab.appendChild(div_panel);
			button_tab.appendChild(img_large);
	    div_card.appendChild(button_tab);
			return div_card;
		}else{
			let div_card = document.createElement("div"),
			img_large = document.createElement("img"),
			button_tab = document.createElement("button"),
			div_panel = document.createElement("div");
	    div_card.className = 'card';
			img_large.setAttribute('src', './demoimg/large.png');
			img_large.setAttribute('id', 'fire'+tech.id);
			img_large.setAttribute('class', 'disappear');
			button_tab.setAttribute('type', 'button');
			button_tab.setAttribute('class', 'button');
			if(tech.pc === 1){
				button_tab.setAttribute('onclick', 'window.open("' +tech.pcdemo+ '")');
			}else{
				button_tab.setAttribute('onclick', 'window.open("' +tech.sddemo+ '")');
			}
			div_panel.className = 'panel';
	    div_panel.appendChild(buildPanelHeading(tech));
	    div_panel.appendChild(buildPanelBody(tech));
			button_tab.appendChild(div_panel);
			button_tab.appendChild(img_large);
	    div_card.appendChild(button_tab);
			return div_card;
		}
    return div_card;
}

// Modal表示の場合に、枠を作成(普段は隠してある)
function buildModal(tech){
	"use strict";
		let div_modal = document.createElement("div")
			, div_modal_html = ''
			, wholeWid = window.parent.screen.width
			, wholeHei = window.parent.screen.height
		 	, modWid = wholeWid * 0.95
			, modHei = wholeHei * 0.8;
		div_modal.setAttribute('style', 'padding-left: 100px;');
		div_modal.setAttribute('class', 'modal fade');
		div_modal.setAttribute('id', tech.name.replace(/\s+/g, "").replace("(", "").replace(")", ""));
		div_modal.setAttribute('tabindex', '-1');
		div_modal.setAttribute('role', 'dialog');
		div_modal.setAttribute('aria-labelledby', tech.name.replace(/\s+/g, "").replace("(", "").replace(")", "")+ 'Label');
		// FirstDisplayのHTML作り
		if(tech.pc === 1 && tech.sd === 1){
			div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>　<button type="button" class="changeIcon1" onclick="changetoPC('+tech.id+')"><img src="./demoimg/icon/pc.png" alt="toPC" class="changeIcon2" /></button>　<button type="button" class="changeIcon1" onclick="changetoSD('+tech.id+')"><img src="./demoimg/icon/sd.png" alt="toSD" class="changeIcon2" /></button></div><div class="modal-body"><iframe id="changeFrom" class="firstDisplay" style="width:' +modWid+ 'px; height:' +modHei+ 'px;"></iframe></div>';
		}else if(tech.pc === 1){
	    div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div><div class="modal-body"><iframe class="firstDisplay" srcdoc="' +autoHtml(tech.id,true)+ '" style="width:' +modWid+ 'px; height:' +modHei+ 'px;"></iframe></div>';
		}else{
			div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div><div class="modal-body"><iframe class="firstDisplay" srcdoc="' +autoHtml(tech.id,false)+ '" style="width:' +modWid+ 'px; height:' +modHei+ 'px;"></iframe></div>';
		}
		div_modal.innerHTML = div_modal_html;
    return div_modal;
}

// PC・SD切り替え
function changetoPC(id){
	"use strict";
		// autoHtmlから引っ張ってくる
		let html = autoHtml(id,true);
		// iframeを書き換え
		let iframe = document.getElementById("changeFrom");
		iframe.setAttribute('srcdoc', html);
}
function changetoSD(id){
	"use strict";
		// autoHtmlから引っ張ってくる
		let html = autoHtml(id,false);
		// iframeを書き換え
		let iframe = document.getElementById("changeFrom");
		iframe.setAttribute('srcdoc', html);
}

// Modal中身のベースHTML自動生成
function autoHtml(id,devicePC){
	"use strict"
		// SecondDisplayのHTML作り
		// idに対応する情報を取り出す
		var res;
		res = JSON.parse(getJSON());
		let agg = res.filter(function(item, index){
			if (item.id == Number(id)) return item;
		});
		// SecondDisplayの HTMLを自動生成、引数deviceはpcならtrue
		if(devicePC){
			let html = "<!DOCTYPE html><html lang='ja' class='modal hide fade'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1'><meta name='description' content='DAC AdShowcase Demo'><meta name='author' content='TechDev 3rd kusapan'><link rel='icon' href='../favicon.ico'><link rel='stylesheet' href='./css/format.css'><script src='js/adshowcase.js'></script><title>DAC AdShowcase Demo</title></head><body class='firDisBody'><div class='leftSpace'><div class='title'>" +agg[0].name+ "</div><div class='expla'>" +agg[0].about+ "</div></div><div class='rightSpace'><iframe class='secondDisplayPC' src='" +agg[0].pcdemo+ "'></iframe></div></body></html>";
			return html;
		}else{
			let html = "<!DOCTYPE html><html lang='ja' class='modal hide fade'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1'><meta name='description' content='DAC AdShowcase Demo'><meta name='author' content='TechDev 3rd kusapan'><link rel='icon' href='../favicon.ico'><link rel='stylesheet' href='./css/format.css'><script src='js/adshowcase.js'></script><title>DAC AdShowcase Demo</title></head><body class='firDisBody'><div class='leftSpace'><div class='title'>" +agg[0].name+ "</div><div class='expla'>" +agg[0].about+ "</div></div><div class='rightSpace'><div id='sdFrame'><div id='sdFramePart1'></div><iframe class='secondDisplaySD' src='" +agg[0].sddemo+ "' style='display:block;'></iframe><div id='sdFramePart2'></div></div></div></body></html>";
			return html;
		}
		return html;
}

// gif制御関数
function ciAll(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		if(tech[i].id !== undefined && tech[i].active === 1){
			ci(tech[i]);
		}
	}
	console.log("Loaded");
}
function ciAllPC(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		if(tech[i].id !== undefined && tech[i].active === 1 && tech[i].pc === 1){
			ci(tech[i]);
		}
	}
	console.log("Loaded");
}
function ciAllSD(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		if(tech[i].id !== undefined && tech[i].active === 1 && tech[i].sd === 1){
			ci(tech[i]);
		}
	}
	console.log("Loaded");
}
function ci(tech){
	let fire = document.getElementById("fire"+String(tech.id));
	fire.addEventListener("mouseover", function(){toGif(tech);}, false);
	fire.addEventListener("mouseout", function(){toPic(tech);}, false);
}
function toGif(tech){
	element = document.getElementById("togif"+String(tech.id));
	element.innerHTML = '<img id="togif' +String(tech.id)+ '" class="img" src=' +tech.image+ ' width="100%">';
}
function toPic(tech){
	element = document.getElementById("togif"+String(tech.id));
	element.innerHTML = '<img id="togif' +String(tech.id)+ '" class="img" src="./demoimg/dac_logo_inv.png" width="100%">';
}


// Cookieリセット関数
/*
function delC(){
	document.cookie = "UTinAS=; path=/AdShowcase/; max-age=2592000;";
	window.location.href = "./setcookie.html";
}
*/


// カード作成呼び出し関数
function initCards(tech_all) {
	"use strict";
    var i = 0,
		tech_size,
		cards_object = document.getElementById("cards"),
		body = document.body,
		href = window.location.href;
    tech_size = Object.keys(tech_all).length;
		// 仕分け
    for (i = 0; i < tech_size; i = i + 1) {
				// activeかどうか
        if(tech_all[i].active === 1){
					// Homeかpcかsdか
					if ((href.indexOf('pc.html') === -1 && href.indexOf('sd.html') === -1) || (href.indexOf('pc.html') !== -1 && tech_all[i].pc === 1) || (href.indexOf('sd.html') !== -1 && tech_all[i].sd === 1)) {
						// オーバーレイ表示できるかどうか
						if(tech_all[i].frameFit === 1){
							cards_object.appendChild(buildCard_Modal(tech_all[i]));
							body.appendChild(buildModal(tech_all[i]));
						}else{
							cards_object.appendChild(buildCard_Tab(tech_all[i]));
						}
					}
        }
    }
    cardupdate();
}

// カード作成呼び出し関数(cookie版)
/*
function initCards(tech_all) {
	"use strict";
    var i = 0,
		tech_size,
		cards_object = document.getElementById("cards"),
		body = document.body,
		href = window.location.href,
		userType = GetCookie("UTinAS");
    tech_size = Object.keys(tech_all).length;
		// 仕分け
    for (i = 0; i < tech_size; i = i + 1) {
				// activeかどうか
        if(tech_all[i].active === 1){
					// 3PASまたはP1で表示すべきか
					if ((userType == "3PAS" && tech_all[i].thPAS === 1) || (userType == "P1" && tech_all[i].Pone === 1)) {
						// Homeかpcかsdか
						if ((href.indexOf('pc.html') === -1 && href.indexOf('sd.html') === -1) || (href.indexOf('pc.html') !== -1 && tech_all[i].pc === 1) || (href.indexOf('sd.html') !== -1 && tech_all[i].sd === 1)) {
							// オーバーレイ表示できるかどうか
							if(tech_all[i].frameFit === 1){
								cards_object.appendChild(buildCard_Modal(tech_all[i]));
								body.appendChild(buildModal(tech_all[i]));
							}else{
								cards_object.appendChild(buildCard_Tab(tech_all[i]));
							}
						}
					}
        }
    }
    cardupdate();
}
*/


// 特定のクッキー取得関数
/*
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
*/

// 初期化
function adshowcase_init() {
	"use strict";
    var res;
    res = JSON.parse(getJSON());
    initCards(res);
}
