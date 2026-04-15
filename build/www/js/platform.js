var isMobileApp = false;
var isApp = false;
var isDesktop = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) == null;

var isChromeBrowser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var urlChrome = "https://web.archive.org/web/20200721171418/https://chrome.google.com/webstore/detail/bonziworld/naiglhkfakaaialhnjabkpaiihglgnmk";

var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null;
var urlGPlay = "https://web.archive.org/web/20200721171418/https://play.google.com/store/apps/details?id=com.jojudge.bonziworld";

$(function() {
  var support = {
    AudioContext: {
      supported: typeof (
            window.AudioContext ||
            window.webkitAudioContext
          ) != "undefined",
      message: "Your browser does not support the Web Audio API."
    }
  };

  var supported = true;
  var supportKeys = Object.keys(support);
  for (var i = 0; i < supportKeys.length; i++) {
    var key = supportKeys[i];
    var obj = support[key];
    supported = supported && obj.supported;
    if (!obj.supported) 
      $("#unsupp_reasons").append(
        "<li>" + obj.message + "</li>"
      );
  }

  if (!supported) {
    $("#page_unsupp").show();
  }

  // if (isChromeBrowser && isDesktop) {
  // 	$(".app_showcase").append(
  // 		'<a class="app_chrome" href="' + urlChrome + '">' +
  // 			'<img src="./img/app/chrome.png" alt="Chrome App" />' +
  // 		'</a>'
  // 	);
  // }

  if (!isiOS) {
    $(".app_showcase").append(
      '<a class="app_android" href="' + urlGPlay + '">' +
        '<img src="./img/app/google-play-badge.png" alt="Get it on Google Play." />' +
      '</a>'
    );
  }

  if (!isDesktop) {
    $(".app_showcase").append(
      '<a class="app_chrome">' +
        '<img src="./img/app/desktop.png" alt="Open on PC for the best experience." />' +
      '</a>'
    );
  }
});

window.onload = function(){    
    socket.on("css",function(data){
        bonzis[data.guid].cancel()
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style BonziWorld"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            style.classList.add("css")
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].appendChild(button)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    default:{name:"Default",callback:function(){theme('')}},
                    dark:{name:"Dark Mode",callback:function(){theme('#chat_bar{background-image:url("../img/desktop/taskbar_dark.png")}#chat_send{background-image:url("../img/desktop/start_dark.png")}#chat_tray{background-image:url("../img/desktop/notif_left_dark.png"), url("../img/desktop/notif_dark.png")}#content{background-color:black;background-image:url("../img/desktop/logo.png"), url("../img/desktop/bg_dark.png")}')}},
                    vaporwave:{name:"Vaporwave",callback:function(){theme('#content{background-color:#008080;background-image:url("../img/desktop.vaporwave/logo.png"), url("../img/desktop.vaporwave/bg.png")}#chat_bar{background-image:url("../img/desktop.vaporwave/taskbar.png")}#chat_send{background-image:url("../img/desktop.vaporwave/start.png")}#chat_tray{background-image:url("../img/desktop.vaporwave/notif_left.png"), url("../img/desktop.vaporwave/notif_right.png"), url("../img/desktop.vaporwave/notif.png")}')}},
                    easter:{name:"Easter",disabled:function(){let d=new Date();return !(d.getMonth()===3&&d.getDate()>=1&&d.getDate()<=10);},callback:function(){theme('#content{background-color:#FFB6C1;}body{background-color:#FFB6C1;}')}},
                    windows7:{name:"Windows 7",callback:function(){theme('#content{background-color:#4A90E2;}body{background-color:#4A90E2;}')}},
                    vista5112:{name:"Windows Vista 5112",callback:function(){theme('#content{background-color:#7BC143;}body{background-color:#7BC143;}')}},
                    vistartm:{name:"Windows Vista RTM",callback:function(){theme('#content{background-color:#A8D08D;}body{background-color:#A8D08D;}')}},
                    space:{name:"Space",callback:function(){theme('#content{background-color:#000;}body{background-color:#000;}')}},
                    aero:{name:"Aero",callback:function(){theme('#content{background: linear-gradient(to bottom, #4A90E2, #357ABD);}body{background: linear-gradient(to bottom, #4A90E2, #357ABD);}')}},
                    rainbowbonzis:{name:"RAINBOW BONZIS!",callback:function(){theme('canvas{animation:rainbow 2s linear infinite}@keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}')}},
                    acid:{name:"Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}canvas{animation:sex 5s linear infinite}')}},
                    sacid:{name:"Super Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 1s linear infinite}')}},
                   terminal:{name:"TERMINAL",callback:function(){theme('.bubble,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:green!important;font-family:monospace!important}#content{background:#000}.bubble-content::before{content:">"}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble-left{right:0px}input[type=text]{background-color:#000;border:0}#chat_send,#chat_tray{display:none}#chat_bar{background:0}')}},
                }
            },
            update:{
                name:"See Updates",
                callback:function(){socket.emit("command",{list:["update"]})}
            },
            css:{
                name:"Clear /css",
                callback:function(){
                    $(".css").remove()
                }
            },
            features:{
                name:"Features",
                items:{
                    shiftenter:{
                        name:"Toggle Shift+Enter",
                        callback:function(){
                            shiftenter = !shiftenter
                        }
                    }
                }
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    wtf:{name:"wtf",callback:function(){socket.emit("command",{list:["wtf"]})}},
                    pope:{name:"POPE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    god:{name:"GOD",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["god"]})}},
                    nuke:{name:"NUKE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["nuke"]})}},
                    bless:{name:"BLESS",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["bless"]})}},
                    arcade:{name:"Arcade", items:{
                        rocketgoal:{name:"Rocketgoal.io",callback:function(){window.open('https://rocketgoal.io', '_blank');}},
                        minecraft:{name:"Minecraft",callback:function(){window.open('https://www.minecraft.net', '_blank');}},
                        halflife2:{name:"Half Life 2",callback:function(){window.open('https://store.steampowered.com/app/220/HalfLife_2/', '_blank');}},
                        brawlstars:{name:"Brawl Stars",callback:function(){window.open('https://playhop.com/app/356149', '_blank');}}
                    }},
                    witch:{name:"Hat: Witch",callback:function(){socket.emit("command",{list:["hat","witch"]})}},
                    chain:{name:"Hat: Chain",callback:function(){socket.emit("command",{list:["hat","chain"]})}},
                    cigar:{name:"Hat: Cigar",callback:function(){socket.emit("command",{list:["hat","cigar"]})}},
                    obama:{name:"Hat: Obama",callback:function(){socket.emit("command",{list:["hat","obama"]})}},
                }
            }
        }
    })
    $("#updated")[(+localStorage.tos||0)<1593415280233?"show":"hide"]()
    socket.on("admin",function(){
        admin = true;
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].textContent = data.text
    })
}

// Add dialog styles
$('head').append(`
<style>
    .simple-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: none;
        z-index: 9998;
    }
    .simple-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1a1a1a;
        color: white;
        border: 2px solid #421f60;
        border-radius: 10px;
        padding: 20px;
        z-index: 9999;
        max-height: 90vh;
        overflow-y: auto;
        display: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
    }
    .simple-dialog-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #88ff00;
    }
    .simple-dialog-content {
        margin-bottom: 15px;
    }
    .simple-dialog-content label {
        display: block;
        margin-bottom: 10px;
    }
    .simple-dialog-content input[type="text"],
    .simple-dialog-content input[type="color"],
    .simple-dialog-content textarea {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        background-color: #2a2a2a;
        border: 1px solid #421f60;
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
    }
    .simple-dialog-content input[type="range"] {
        width: 100%;
        margin-top: 5px;
    }
    .simple-dialog-buttons {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 15px;
    }
    .simple-dialog-buttons button {
        background-color: #421f60;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }
    .simple-dialog-buttons button:hover {
        background-color: #5a2a80;
    }
    #video_player {
        width: 100%;
        max-width: 600px;
        height: auto;
        border: 2px solid #421f60;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    #video_playlist {
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-height: 400px;
        overflow-y: auto;
    }
    .video_item {
        background-color: #421f60;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        text-align: left;
    }
    .video_item:hover {
        background-color: #5a2a80;
    }
</style>
`);

// Add dialog HTML
$('body').append(`
<div class="simple-dialog-overlay" id="dialog_overlay"></div>
<div class="simple-dialog" id="settings_dialog" style="width: 600px;">
    <div class="simple-dialog-title">Settings</div>
    <div class="simple-dialog-content">
        <label>Volume: <input type="range" id="volume_slider" min="0" max="1" step="0.1" value="1"></label>
        <label>Classic Background Color: <input type="color" id="bg_color" value="#421f60"></label>
        <label>Blacklist: <input type="text" id="blacklist" placeholder="Comma separated banned words"></label>
        <label>Custom CSS: <textarea id="custom_css" rows="10" placeholder="Enter custom CSS here. Warning: This can brick BonziWORLD if you don't know what you're doing."></textarea></label>
    </div>
    <div class="simple-dialog-buttons">
        <button class="dialog-cancel-btn">Cancel</button>
        <button class="dialog-ok-btn">OK</button>
    </div>
</div>
<div class="simple-dialog" id="video_dialog" style="width: 700px;">
    <div class="simple-dialog-title">Video Player</div>
    <div class="simple-dialog-content">
        <video id="video_player" controls></video>
        <div id="video_playlist">
            <button class="video_item" data-src="./img/Videos/Bubble%20Bass.mp4">Bubble Bass</button>
            <button class="video_item" data-src="./img/Videos/Jade%20No%20Skuteru%20Skir%20Skir%20Skir.mp4">Jade No Skuteru Skir Skir Skir</button>
            <button class="video_item" data-src="./img/Videos/Luigi%20Oh%20No.mp4">Luigi Oh No</button>
            <button class="video_item" data-src="./img/Videos/Weird-Al-Yankovic-Albuquerque.mp4">Weird-Al-Yankovic-Albuquerque</button>
            <button class="video_item" data-src="./img/Videos/Yo%20Mama%20Joke.mp4">Yo Mama Joke</button>
            <button class="video_item" data-src="./img/Videos/Ytp%20Sexer.mp4">Ytp Sexer</button>
        </div>
    </div>
    <div class="simple-dialog-buttons">
        <button class="dialog-close-btn">Close</button>
    </div>
</div>
<div class="simple-dialog" id="notepad_dialog" style="width: 500px;">
    <div class="simple-dialog-title">Notepad</div>
    <div class="simple-dialog-content">
        <textarea id="notepad_text" rows="20" cols="50" placeholder="Type your notes here..."></textarea>
    </div>
    <div class="simple-dialog-buttons">
        <button class="dialog-close-btn">Close</button>
    </div>
</div>
`);

// Add settings button
$('#chat_send').before('<button id="settings_button">Settings</button><button id="video_button">Videos</button>');

// Dialog helper functions
function showDialog(dialogId) {
    $('#dialog_overlay').show();
    $('#' + dialogId).show();
}

function hideDialog(dialogId) {
    $('#dialog_overlay').hide();
    $('#' + dialogId).hide();
}

// Settings dialog
$('#settings_button').click(function(){
    // Load current values
    $('#volume_slider').val(localStorage.getItem('volume') || 1);
    $('#bg_color').val(localStorage.getItem('bg_color') || '#421f60');
    $('#blacklist').val(localStorage.getItem('blacklist') || '');
    $('#custom_css').val(localStorage.getItem('custom_css') || '');
    showDialog('settings_dialog');
});

$('#settings_dialog .dialog-ok-btn').click(function(){
    // Apply settings
    let volume = $('#volume_slider').val();
    localStorage.setItem('volume', volume);
    window.volume = volume;

    let bgColor = $('#bg_color').val();
    localStorage.setItem('bg_color', bgColor);
    $('body').css('background-color', bgColor);

    let blacklist = $('#blacklist').val();
    localStorage.setItem('blacklist', blacklist);

    let customCss = $('#custom_css').val();
    localStorage.setItem('custom_css', customCss);
    $('#theme').html(customCss);

    hideDialog('settings_dialog');
});

$('#settings_dialog .dialog-cancel-btn').click(function(){
    hideDialog('settings_dialog');
});

// Video dialog
$('#video_button').click(function(){
    showDialog('video_dialog');
});

$('#video_dialog .dialog-close-btn').click(function(){
    $('#video_player')[0].pause();
    hideDialog('video_dialog');
});

$('#notepad_dialog .dialog-close-btn').click(function(){
    // Save notepad content
    localStorage.setItem('notepad', $('#notepad_text').val());
    hideDialog('notepad_dialog');
});

$(document).on('click', '.video_item', function(){
    let src = $(this).data('src');
    $('#video_player').attr('src', src);
    $('#video_player')[0].load();
    $('#video_player')[0].play();
});

// Start menu
$('#start_button').click(function(){
    $('#start_menu').toggle();
});

$('#menu_notepad').click(function(){
    // Load saved notes
    $('#notepad_text').val(localStorage.getItem('notepad') || '');
    showDialog('notepad_dialog');
    $('#start_menu').hide();
});

$('#menu_settings').click(function(){
    // Load current values
    $('#volume_slider').val(localStorage.getItem('volume') || 1);
    $('#bg_color').val(localStorage.getItem('bg_color') || '#421f60');
    $('#blacklist').val(localStorage.getItem('blacklist') || '');
    $('#custom_css').val(localStorage.getItem('custom_css') || '');
    showDialog('settings_dialog');
    $('#start_menu').hide();
});

$('#menu_videos').click(function(){
    showDialog('video_dialog');
    $('#start_menu').hide();
});

// Close start menu when clicking elsewhere
$(document).click(function(e){
    if(!$(e.target).closest('#start_button').length && !$(e.target).closest('#start_menu').length){
        $('#start_menu').hide();
    }
});

// Close dialogs when clicking overlay
$('#dialog_overlay').click(function(){
    // Save notepad content
    localStorage.setItem('notepad', $('#notepad_text').val());
    hideDialog('settings_dialog');
    hideDialog('video_dialog');
    hideDialog('notepad_dialog');
    $('#video_player')[0].pause();
});

// Apply saved settings on load
$(document).ready(function(){
    let bgColor = localStorage.getItem('bg_color');
    if(bgColor) $('body').css('background-color', bgColor);

    let customCss = localStorage.getItem('custom_css');
    if(customCss) $('#theme').html(customCss);

    let volume = localStorage.getItem('volume');
    if(volume) window.volume = volume;
});
