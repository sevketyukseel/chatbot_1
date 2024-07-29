var data = {
    chatinit: {
        title: ["Merhaba <span class='emoji'> &#128075;</span>", "Ben SeyBot", "Merhaba, sohbete başlamadan önce <a href='https://aydinlatma.seyhan.bel.tr:444/ar/?aref=8F83630A-A983-4AE0-B375-B16DE7EE8373'>KVKK</a> aydınlatma metnini okuyup anladığınıza dair sizden onay almam gerekiyor. Onay veriyor musunuz?."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    kabul: {
        title: ["Size nasıl yardımcı olabilirim?"],
        options: ["WiFi", "Eğitimler", "İletişim", "Staj","Randevu Al", "Randevularımı Sorgula", "Randevu İptal"],
    },
    kabulEtmiyorum: {
        title: ["KVKK metnini kabul etmeden size yardımcı olamam."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    wifi: {
        title: ["Wi-Fi'ye bağlanmak için: SEYHAN_BELEDİYESİ ağını seçin ve bağlanın. Açılan pencereden <a href='http://hs.seyhan.bel.tr/YeniKayit'>kayıt olun</a>. Giriş yaparak interneti kullanmaya başlayın. Sorun yaşarsanız teknik destek ekibimizle iletişime geçin.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    eğitimler: {
        title: ["<a href='https://seytim.org/egitimler.php'>Eğitimler</a> hakkında bilgi almak için tıklayın.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    iletişim: {
        title: ["<a href='https://seytim.org/iletisim.php'>İletişim</a> bilgilerine ulaşmak için tıklayın.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    staj: {
        title: ["SEYTİM'de staj yapmak isteyen adaylar, Seyhan Belediyesi İnsan Kaynakları ve Eğitim Müdürlüğü ile iletişime geçmelidir. Detaylı bilgi ve başvuru süreçleri için lütfen İnsan Kaynakları ve Eğitim Müdürlüğü ile irtibata geçin.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    tekrar: {
        title: ["Size başka nasıl yardımcı olabilirim?"],
        options: ["WiFi", "Eğitimler", "İletişim", "Randevu Al", "Randevularımı Sorgula", "Randevu İptal"],
    },
    randevu: {
        title: ["Hangi atölye veya cihazı kullanmak istiyorsunuz?"],
        options: ["İmalat Atölyesi", "Elektrik Elektronik Atölyesi", "3D Yazıcı"],
    },
    tarih: {
        title: ["Hangi tarihte randevu almak istersiniz? (YYYY-MM-DD)"],
        options: [],
    },
    saat: {
        title: ["Hangi saatte randevu almak istersiniz? (HH:MM)"],
        options: [],
    },
    randevularimiSorgula: {
        title: ["Randevularınızı sorguluyorum..."],
        options: [],
    },
    randevuIptal: {
        title: ["İptal etmek istediğiniz randevunun ID'sini girin."],
        options: [],
    }
};

document.getElementById("chat-bubble").addEventListener("click", toggleChatBot);
document.getElementById("sendBtn").addEventListener("click", sendMessage);
var cbot = document.getElementById("chat-box");

var len1 = data.chatinit.title.length;

function toggleChatBot() {
    var chatWindow = document.getElementById('test');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block';
        initChat();
    } else {
        chatWindow.style.display = 'none';
    }
}

function initChat() {
    j = 0;
    cbot.innerHTML = '';
    for (var i = 0; i < len1; i++) {
        setTimeout(handleChat, (i * 500));
    }
    setTimeout(function() {
        showOptions(data.chatinit.options);
    }, ((len1 + 1) * 500));
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
        case "Staj":
            tempObj = data.staj;
            break;
        case "Evet":
            tempObj = data.tekrar;
            break;
        case "Hayır":
            tempObj = { title: ["Teşekkürler! Size yardımcı olabileceğim başka bir şey yoksa hoşçakalın!"], options: [] };
            break;
        case "Randevu Al":
            tempObj = data.randevu;
            break;
        case "Randevularımı Sorgula":
            tempObj = data.randevularimiSorgula;
            queryAppointments();
            return;
        case "Randevu İptal":
            tempObj = data.randevuIptal;
            break;
        default:
            return;
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
        }, i * 500);
    }
    setTimeout(function() {
        showOptions(options);
    }, title.length * 500);
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

// Firestore bağlantısı
const firestore = firebase.firestore();

function checkAvailabilityAndBook(appointmentData) {
    const { workshopOrEquipment, date, time } = appointmentData;

    // Aynı tarih ve saatte mevcut bir randevu var mı kontrol et
    firestore.collection('appointments')
        .where('workshopOrEquipment', '==', workshopOrEquipment)
        .where('date', '==', date)
        .where('time', '==', time)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                // Müsait, randevuyu kaydet
                firestore.collection('appointments').add(appointmentData)
                    .then(() => {
                        chatbot.sendMessage('Randevunuz başarıyla ayarlandı!');
                    })
                    .catch(error => {
                        chatbot.sendMessage('Randevu ayarlanırken bir hata oluştu: ' + error.message);
                    });
            } else {
                // Meşgul, alternatif zamanlar sun
                chatbot.sendMessage('Seçtiğiniz zaman dolu. Lütfen başka bir zaman seçin.');
            }
        })
        .catch(error => {
            chatbot.sendMessage('Müsaitlik kontrol edilirken bir hata oluştu: ' + error.message);
        });
}

function queryAppointments() {
    var userId = "user_id"; // Kullanıcının ID'sini alın
    firestore.collection('appointments')
        .where('user_id', '==', userId)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    let appointment = doc.data();
                    chatbot.sendMessage(`Randevunuz: ${appointment.workshopOrEquipment} - ${appointment.date} - ${appointment.time}`);
                });
            } else {
                chatbot.sendMessage('Hiç randevunuz yok.');
            }
        })
        .catch(error => {
            chatbot.sendMessage('Randevu sorgularken bir hata oluştu: ' + error.message);
        });
}

function cancelAppointment(appointmentId) {
    firestore.collection('appointments').doc(appointmentId).delete()
        .then(() => {
            chatbot.sendMessage('Randevunuz başarıyla iptal edildi.');
        })
        .catch(error => {
            chatbot.sendMessage('Randevu iptal edilirken bir hata oluştu: ' + error.message);
        });
}
