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
		// 元のJSONファイルの場合は req.open("GET", "./json/echo.json", false);
    req.send(null);
    return json;
}

// カードの初期化。全てを呼び出します。
function adshowcase_init() {
	"use strict";
    var res;
    res = JSON.parse(getJSON());
    initCards(res);
}

// カード作成呼び出し関数
function initCards(json_all) {
	"use strict";
    var i = 0,
		tech_size,
		cards_object = document.getElementById("cards"),
		body = document.body,
		href = window.location.href;
    tech_size = Object.keys(json_all).length;
		// 仕分け
    for (i = 0; i < tech_size; i = i + 1) {
        if(json_all[i].active === 1 /*使用可(アクティブ)を確認*/){
					if ((href.indexOf('pc.html') === -1 && href.indexOf('sd.html') === -1) || (href.indexOf('pc.html') !== -1 && json_all[i].pc === 1) || (href.indexOf('sd.html') !== -1 && json_all[i].sd === 1) /*HOMEページかPCページかSDページかを判別*/) {
						if(json_all[i].frameFit === 1 /*オーバーレイ表示できるかどうか*/){
							cards_object.appendChild(buildCard_Modal(json_all[i]));
							body.appendChild(buildModal(json_all[i]));
						}else{
							cards_object.appendChild(buildCard_differentTab(json_all[i]));
						}
					}
        }
    }
    cardupdate();
}


/*
以下、Modal(オーバーレイ)表示の場合と別Tab表示の場合とでやることが大きく異なるため、HTMLごと、このJSファイル内で生成していく。
かなり冗長なので、今後良い方法あれば変えたいとは思ってます。
*/


// カード作成(Modal(オーバーレイ)表示の場合。
function buildCard_Modal(tech) {
	"use strict";
    var div_card = document.createElement("div"),
		img_enlarge = document.createElement("img"),
		button_modal = document.createElement("button"),
		div_panel = document.createElement("div");

    div_card.className = 'card';
		div_panel.className = 'panel';

		// それぞれの要素を作っていく。

		img_enlarge.setAttribute('src', './demoimg/large.png');
		img_enlarge.setAttribute('id', 'fire'+tech.id);
		img_enlarge.setAttribute('class', 'disappear');

		button_modal.setAttribute('type', 'button');
		button_modal.setAttribute('class', 'button');
		button_modal.setAttribute('data-toggle', 'modal');
		button_modal.setAttribute('data-target', '#' +tech.name.replace(/\s+/g, "").replace("(", "").replace(")", ""));

		// 作った要素を組み合わせてカードを生成する。

    div_panel.appendChild(buildPanel_Header(tech));
    div_panel.appendChild(buildPanel_Body(tech));
		button_modal.appendChild(div_panel);
		button_modal.appendChild(img_enlarge);
    div_card.appendChild(button_modal);

    return div_card;
}


// カード作成(別Tab表示の場合)
function buildCard_differentTab(tech) {
	"use strict";
		if(tech.pc === 1 && tech.sd === 1 /*PCとSD両方ある場合。拡大矢印ではなくアイコン表示。*/){
			let div_card = document.createElement("div"),
			img_pcIcon = document.createElement("img"),
			img_sdIcon = document.createElement("img"),
			img_enlarge = document.createElement("img"),
			button_PC = document.createElement("button"),
			button_SD = document.createElement("button"),
			div_panel = document.createElement("div");

			div_card.className = 'card card_both';
			div_panel.className = 'panel';

			// それぞれの要素を作っていく。

			img_pcIcon.setAttribute('src', './demoimg/icon/pcWhite.png');
			img_pcIcon.setAttribute('class', 'changeImg');

			img_sdIcon.setAttribute('src', './demoimg/icon/sdWhite.png');
			img_sdIcon.setAttribute('class', 'changeImg');

			img_enlarge.setAttribute('src', './demoimg/large.png');
			img_enlarge.setAttribute('id', 'fire'+tech.id);
			img_enlarge.setAttribute('class', 'alpha');

			button_PC.setAttribute('onclick', 'window.open("' +tech.pcdemo+ '")');
			button_PC.setAttribute('class', 'changeIconPC');
			button_PC.setAttribute('id', 'changeIconPC'+tech.id);
			button_PC.setAttribute('type', 'button');

			button_SD.setAttribute('onclick', 'window.open("' +tech.sddemo+ '")');
			button_SD.setAttribute('class', 'changeIconSD');
			button_SD.setAttribute('id', 'changeIconSD'+tech.id);
			button_SD.setAttribute('type', 'button');

			// 作った要素を組み合わせてカードを生成する。

	    div_panel.appendChild(buildPanel_Header(tech));
	    div_panel.appendChild(buildPanel_Body(tech));
			button_PC.appendChild(img_pcIcon);
			button_SD.appendChild(img_sdIcon);
			div_card.appendChild(div_panel);
			div_card.appendChild(img_enlarge);
			div_card.appendChild(button_PC);
			div_card.appendChild(button_SD);

			return div_card;

		}else /*PCかSDどちらかだけの場合*/{
			let div_card = document.createElement("div"),
			img_enlarge = document.createElement("img"),
			button_tab = document.createElement("button"),
			div_panel = document.createElement("div");

	    div_card.className = 'card';
			div_panel.className = 'panel';

			// それぞれの要素を作っていく。

			img_enlarge.setAttribute('src', './demoimg/large.png');
			img_enlarge.setAttribute('id', 'fire'+tech.id);
			img_enlarge.setAttribute('class', 'disappear');

			button_tab.setAttribute('type', 'button');
			button_tab.setAttribute('class', 'button');

			// 別Tabに移動するためのリンクを記述
			if(tech.pc === 1){
				button_tab.setAttribute('onclick', 'window.open("' +tech.pcdemo+ '")');
			}else{
				button_tab.setAttribute('onclick', 'window.open("' +tech.sddemo+ '")');
			}

			// 作った要素を組み合わせてカードを生成する。

	    div_panel.appendChild(buildPanel_Header(tech));
	    div_panel.appendChild(buildPanel_Body(tech));
			button_tab.appendChild(div_panel);
			button_tab.appendChild(img_enlarge);
	    div_card.appendChild(button_tab);

			return div_card;
		}
    return div_card;
}


// カードの上部(ヘッダー部分)を作成。
function buildPanel_Header(tech) {
	"use strict";
    var div_panel_heading = document.createElement("div");
    div_panel_heading.className = 'panel-heading';
    div_panel_heading.innerHTML = tech.name;
		div_panel_heading.appendChild(buildPanel_Button(tech));
    return div_panel_heading;
}

// カード中央部分を作成。GIFとか載せてるのはこの場所にあたります。
function buildPanel_Body(tech) {
	"use strict";
	  var div_panel_body = document.createElement("div"),
		div_panel_body_html;

	  div_panel_body.className = 'panel-body panelbody';

		// GIFは最初はimagesub(止め画)を表示
		div_panel_body_html = '<center><div id="togif' +String(tech.id)+ '"  class="imgcontainer"><img class="img" src=' +tech.imagesub+ ' width="100%"></div></center><dl class="dl-card"><dt></dt><dd>' + tech.about + '</dd></dl>';
    div_panel_body.innerHTML = div_panel_body_html;
    return div_panel_body;
}

// カード右上のアイコン部分を作成
function buildPanel_Button(tech) {
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

// Modal表示の場合に、Modal表示の中身(First iframeと呼ぶことにする)を作成(普段は隠してある)
// ちなみに、First iframeのさらに中にあるiframe(別Tabで表示する場合のサイトそのものと同じ)をSecond iframeと呼ぶことにする
function buildModal(tech){
	"use strict";
		let div_modal = document.createElement("div")
			, div_modal_html = ''
			, whole_width = window.parent.screen.width
			, whole_height = window.parent.screen.height
		 	, modal_width = whole_width * 0.95
			, modal_height = whole_height * 0.8;
		// Modal機能を司る部分の設定
		div_modal.setAttribute('style', 'padding-left: 100px;');
		div_modal.setAttribute('class', 'modal fade');
		div_modal.setAttribute('id', tech.name.replace(/\s+/g, "").replace("(", "").replace(")", ""));
		div_modal.setAttribute('tabindex', '-1');
		div_modal.setAttribute('role', 'dialog');
		div_modal.setAttribute('aria-labelledby', tech.name.replace(/\s+/g, "").replace("(", "").replace(")", "")+ 'Label');
		// First iframeのHTML作り
		if(tech.pc === 1 && tech.sd === 1){
			div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>　<button type="button" class="changeIcon1" onclick="changetoPC('+tech.id+')"><img src="./demoimg/icon/pc.png" alt="toPC" class="changeIcon2" /></button>　<button type="button" class="changeIcon1" onclick="changetoSD('+tech.id+')"><img src="./demoimg/icon/sd.png" alt="toSD" class="changeIcon2" /></button></div><div class="modal-body"><iframe id="changeFrom" class="firstDisplay" style="width:' +modal_width+ 'px; height:' +modal_height+ 'px;"></iframe></div>';
		}else if(tech.pc === 1){
	    div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div><div class="modal-body"><iframe class="firstDisplay" srcdoc="' +autoHtml(tech.id,true)+ '" style="width:' +modal_width+ 'px; height:' +modal_height+ 'px;"></iframe></div>';
		}else{
			div_modal_html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div><div class="modal-body"><iframe class="firstDisplay" srcdoc="' +autoHtml(tech.id,false)+ '" style="width:' +modal_width+ 'px; height:' +modal_height+ 'px;"></iframe></div>';
		}

		div_modal.innerHTML = div_modal_html;
    return div_modal;
}


// カードがModal表示かつPCとSD両方に対応している時、First iframeからSecond iframeを動的に切り替えるための関数
function changetoPC(id){
	"use strict";
		let html = autoHtml(id,true);
		// Second iframeを(動的に)書き換え
		let iframe = document.getElementById("changeFrom");
		iframe.setAttribute('srcdoc', html);
}
function changetoSD(id){
	"use strict";
		let html = autoHtml(id,false);
		// Second iframeを(動的に)書き換え
		let iframe = document.getElementById("changeFrom");
		iframe.setAttribute('srcdoc', html);
}

// Second iframeのHTML自動生成
function autoHtml(id,devicePC){
	"use strict"
		var res;
		res = JSON.parse(getJSON());
		let aggregation = res.filter(function(item, index){
			if (item.id == Number(id)) return item;
		});
		// Second iframeのHTML生成
		if(devicePC /*PC対応カードの場合*/){
			let html = "<!DOCTYPE html><html lang='ja' class='modal hide fade'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1'><meta name='description' content='DAC AdShowcase Demo'><meta name='author' content='TechDev 3rd kusapan'><link rel='icon' href='../favicon.ico'><link rel='stylesheet' href='./css/format.css'><script src='js/adshowcase.js'></script><title>DAC AdShowcase Demo</title></head><body class='firDisBody'><div class='leftSpace'><div class='title'>" +aggregation[0].name+ "</div><div class='expla'>" +aggregation[0].about+ "</div></div><div class='rightSpace'><iframe class='secondDisplayPC' src='" +aggregation[0].pcdemo+ "'></iframe></div></body></html>";
			return html;
		}else{
			let html = "<!DOCTYPE html><html lang='ja' class='modal hide fade'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1'><meta name='description' content='DAC AdShowcase Demo'><meta name='author' content='TechDev 3rd kusapan'><link rel='icon' href='../favicon.ico'><link rel='stylesheet' href='./css/format.css'><script src='js/adshowcase.js'></script><title>DAC AdShowcase Demo</title></head><body class='firDisBody'><div class='leftSpace'><div class='title'>" +aggregation[0].name+ "</div><div class='expla'>" +aggregation[0].about+ "</div></div><div class='rightSpace'><div id='sdFrame'><div id='sdFramePart1'></div><iframe class='secondDisplaySD' src='" +aggregation[0].sddemo+ "' style='display:block;'></iframe><div id='sdFramePart2'></div></div></div></body></html>";
			return html;
		}
		return html;
}


// ここから下は全てGIFの止めや動かしに関する関数

// HOMEページから呼ばれた時
function changeImage_All(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		if(tech[i].id !== undefined && tech[i].active === 1){
			changeImage(tech[i]);
		}
	}
	console.log("Loaded");
}
// PCページから呼ばれた時
function changeImage_All_PC(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		// PC対象のものだけ実行する
		if(tech[i].id !== undefined && tech[i].active === 1 && tech[i].pc === 1){
			changeImage(tech[i]);
		}
	}
	console.log("Loaded");
}
// SDページから呼ばれた時
function changeImage_All_SD(){
	let tech,
	tech_size;
	tech = JSON.parse(getJSON());
	tech_size = Object.keys(tech).length;
	for(i = 0; i < tech_size; i = i + 1){
		// SD対象のものだけ実行する
		if(tech[i].id !== undefined && tech[i].active === 1 && tech[i].sd === 1){
			changeImage(tech[i]);
		}
	}
	console.log("Loaded");
}

function changeImage(tech){
	let fire = document.getElementById("fire"+String(tech.id));
	// イベントリスナを設定
	fire.addEventListener("mouseover", function(){toMov(tech);}, false);
	fire.addEventListener("mouseout", function(){toPic(tech);}, false);
	// PCとSD両方あるカードのボタンにも対応
	if(tech.pc === 1 && tech.sd === 1){
		let bothPC = document.getElementById("changeIconPC"+String(tech.id));
		bothPC.addEventListener("mouseover", function(){toMov(tech);}, false);
		bothPC.addEventListener("mouseout", function(){toPic(tech);}, false);
		let bothSD = document.getElementById("changeIconSD"+String(tech.id));
		bothSD.addEventListener("mouseover", function(){toMov(tech);}, false);
		bothSD.addEventListener("mouseout", function(){toPic(tech);}, false);
	}
}

// イベントリスナに設定する関数
function toMov(tech){
	let element = document.getElementById("togif"+String(tech.id));
	element.innerHTML = '<img id="togif' +String(tech.id)+ '" class="img" src=' +tech.image+ ' width="100%">';
}
function toPic(tech){
	let element = document.getElementById("togif"+String(tech.id));
	element.innerHTML = '<img id="togif' +String(tech.id)+ '" class="img" src=' +tech.imagesub+ ' width="100%">';
}
