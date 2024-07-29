var data = {
    chatinit: {
        title: ["Merhaba <span class='emoji'> &#128075;</span>", "Ben SeyBot", "Merhaba, sohbete başlamadan önce <a href='https://aydinlatma.seyhan.bel.tr:444/ar/?aref=8F83630A-A983-4AE0-B375-B16DE7EE8373'>KVKK</a>  aydınlatma metnini okuyup anladığınıza dair sizden onay almam gerekiyor. Onay veriyor musunuz?."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    kabul: {
        title: ["Lütfen bir seçenek seçiniz:"],
        options: ["WiFi", "Eğitimler", "İletişim"],
    },
    kabulEtmiyorum: {
        title: ["KVKK metnini kabul etmeden size yardımcı olamam."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    wifi: {
        title: ["Wi-Fi'ye bağlanmak için:\n SEYHAN_BELEDİYESİ ağını seçin ve bağlanın.\n Açılan pencereden <a href='http://hs.seyhan.bel.tr/YeniKayit'>kayıt olun</a>.\n Giriş yaparak interneti kullanmaya başlayın. Sorun yaşarsanız teknik destek ekibimizle iletişime geçin."],
        options: []
    },
    eğitimler: {
        title: ["<a href='https://seytim.org/egitimler.php'>Eğitimler</a> hakkında bilgi almak için tıklayın."],
        options: []
    },
    iletişim: {
        title: ["<a href='https://seytim.org/iletisim.php'>İletişim</a> bilgilerine ulaşmak için tıklayın."],
        options: []
    }
};

document.getElementById("init").addEventListener("click", showChatBot);
document.getElementById("sendBtn").addEventListener("click", sendMessage);
var cbot = document.getElementById("chat-box");

var len1 = data.chatinit.title.length;

function showChatBot() {
    if (this.innerText == 'START CHAT') {
        document.getElementById('test').style.display = 'block';
        document.getElementById('init').innerText = 'CLOSE CHAT';
        initChat();
    } else {
        location.reload();
    }
}

function initChat() {
    j = 0;
    cbot.innerHTML = '';
    for (var i = 0; i < len1; i++) {
        setTimeout(handleChat, (i * 500));
    }
    setTimeout(function() {
        showOptions(data.chatinit.options)
    }, ((len1 + 1) * 500))
}

function refreshChat() {
    initChat();
}

var j = 0;
function handleChat() {
    var elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt() {
    var str = this.innerText;
    var tempObj;
    
    switch (str) {
        case "Kabul Ediyorum":
            tempObj = data.kabul;
            break;
        case "Kabul Etmiyorum":
            tempObj = data.kabulEtmiyorum;
            break;
        case "WiFi":
            tempObj = data.wifi;
            break;
        case "Eğitimler":
            tempObj = data.eğitimler;
            break;
        case "İletişim":
            tempObj = data.iletişim;
            break;
    }

    document.querySelectorAll(".opt").forEach(el => {
        el.remove();
    });

    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = '<span class="rep">' + this.innerText + '</span>';
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    handleResults(tempObj.title, tempObj.options);
}

function handleDelay(title) {
    var elm = document.createElement("p");
    elm.innerHTML = title;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
}

function handleResults(title, options) {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function() {
            handleDelay(title[i]);
        }, i * 500)
    }
    setTimeout(function() {
        showOptions(options);
    }, title.length * 500)
}

function handleScroll() {
    var elem = document.getElementById('chat-box');
    elem.scrollTop = elem.scrollHeight;
}

function sendMessage() {
    var userInput = document.getElementById('userInput').value.trim();
    if (userInput !== "") {
        var elm = document.createElement("p");
        elm.innerHTML = userInput;
        elm.setAttribute("class", "user-msg");
        cbot.appendChild(elm);
        handleScroll();
        document.getElementById('userInput').value = '';
    }
}
