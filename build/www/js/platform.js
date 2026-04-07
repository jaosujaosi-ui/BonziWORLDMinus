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

// Add settings button
$('#chat_send').before('<button id="settings_button">Settings</button>');
$('#content').append(`
<div id="settings_dialog" style="display:none;">
    <label>Volume: <input type="range" id="volume_slider" min="0" max="1" step="0.1" value="1"></label><br>
    <label>Classic Background Color: <input type="color" id="bg_color" value="#421f60"></label><br>
    <label>Blacklist: <input type="text" id="blacklist" placeholder="Comma separated banned words"></label><br>
    <label>Custom CSS: <textarea id="custom_css" rows="10" cols="50" placeholder="Enter custom CSS here. Warning: This can brick BonziWORLD if you don't know what you're doing."></textarea></label>
</div>
`);

$('#settings_button').click(function(){
    $('#settings_dialog').dialog({
        title: 'Settings',
        modal: true,
        width: 600,
        buttons: {
            OK: function(){
                // Apply settings
                let volume = $('#volume_slider').val();
                localStorage.setItem('volume', volume);
                // Assume volume is used somewhere, perhaps set a global
                window.volume = volume;

                let bgColor = $('#bg_color').val();
                localStorage.setItem('bg_color', bgColor);
                $('body').css('background-color', bgColor);

                let blacklist = $('#blacklist').val();
                localStorage.setItem('blacklist', blacklist);
                // Perhaps send to server or use locally

                let customCss = $('#custom_css').val();
                localStorage.setItem('custom_css', customCss);
                $('#theme').html(customCss);

                $(this).dialog('close');
            },
            Cancel: function(){
                $(this).dialog('close');
            }
        }
    });
    // Load current values
    $('#volume_slider').val(localStorage.getItem('volume') || 1);
    $('#bg_color').val(localStorage.getItem('bg_color') || '#421f60');
    $('#blacklist').val(localStorage.getItem('blacklist') || '');
    $('#custom_css').val(localStorage.getItem('custom_css') || '');
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
