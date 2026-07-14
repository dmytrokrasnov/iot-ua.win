const chatToggle=document.getElementById("chatToggle");

const chatWindow=document.getElementById("chatWindow");

const chatClose=document.getElementById("chatClose");

const chatMessages=document.getElementById("chatMessages");

const chatInput=document.getElementById("chatInput");

const chatSend=document.getElementById("chatSend");

chatToggle.onclick=()=>{

    chatWindow.classList.add("active");

    chatToggle.classList.add("hidden");

};

chatClose.onclick=()=>{

    chatWindow.classList.remove("active");

    chatToggle.classList.remove("hidden");

};

function addMessage(text,type){

    const div=document.createElement("div");

    div.className="message "+type;

    div.innerHTML=text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop=chatMessages.scrollHeight;

}

function assistantWelcome(){

    addMessage(`

<b>Вітаю 👋</b><br><br>

Я <b>IoT Assistant</b>.<br><br>

Допоможу:

<br><br>

📹 Відеоспостереження

<br>

🔐 Контроль доступу

<br>

🚨 Сигналізація

<br>

☀️ Сонячні електростанції

<br>

💻 IT-послуги

<br>

🌐 Комп'ютерні мережі

<br><br>

Напишіть своє питання 🙂

`,"assistant");

}

assistantWelcome();

chatSend.onclick=sendMessage;

chatInput.addEventListener("keypress",e=>{

    if(e.key==="Enter") sendMessage();

});

function sendMessage(){

    const text=chatInput.value.trim();

    if(text==="") return;

    addMessage(text,"user");

    chatInput.value="";

    setTimeout(()=>{

        addMessage("Дякую. Аналізую Ваш запит...","assistant");

    },600);

}