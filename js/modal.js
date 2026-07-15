const modal = document.getElementById("consultModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

const form = document.getElementById("consultForm");
const success = document.getElementById("successMessage");

const submitBtn = form.querySelector("button[type='submit']");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

const WORKER_URL = "https://iotua-contact.d-krasnov.workers.dev";

// -----------------------------
// Маска телефону +380 XX XXX XX XX
// -----------------------------

phoneInput.addEventListener("focus", () => {

    if (phoneInput.value === "") {

        phoneInput.value = "+380 ";

    }

});

phoneInput.addEventListener("input", () => {

    let digits = phoneInput.value.replace(/\D/g, "");

    if (digits.startsWith("380")) {

        digits = digits.substring(3);

    }

    digits = digits.substring(0, 9);

    let formatted = "+380";

    if (digits.length > 0)
        formatted += " " + digits.substring(0, 2);

    if (digits.length >= 3)
        formatted += " " + digits.substring(2, 5);

    if (digits.length >= 6)
        formatted += " " + digits.substring(5, 7);

    if (digits.length >= 8)
        formatted += " " + digits.substring(7, 9);

    phoneInput.value = formatted;
	
	phoneError.style.display = "none";
phoneInput.classList.remove("input-error");

});

phoneInput.addEventListener("keydown", (e) => {

    if (
        phoneInput.selectionStart <= 5 &&
        (e.key === "Backspace" || e.key === "Delete")
    ) {

        e.preventDefault();

    }

});

// ---------- Відкрити ----------

openBtn.addEventListener("click", () => {

    // Загальна консультація
    const serviceText = document.getElementById("selectedServiceText");
    const serviceInput = document.getElementById("serviceInput");

    if (serviceText) {
        serviceText.textContent = "Загальна консультація";
    }

    if (serviceInput) {
        serviceInput.value = "";
    }

    // Очистити повідомлення
    const message = document.getElementById("message");

    if (message) {
        message.value = "";
    }

    modal.classList.add("active");

    setTimeout(() => {
        document.getElementById("name").focus();
    }, 250);

});

// ---------- Закрити ----------

function closeModal(){

    modal.classList.remove("active");

}

closeBtn.addEventListener("click", closeModal);

// Закриття по кліку на фон

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeModal();

    }

});

// Закриття ESC

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});

// ---------- Відправка ----------

form.addEventListener("submit", async function(e){

    e.preventDefault();
	
	phoneError.style.display = "none";
phoneInput.classList.remove("input-error");

const digits = phoneInput.value.replace(/\D/g, "");

if (digits.length !== 12 || !digits.startsWith("380")) {

    phoneError.style.display = "block";

    phoneInput.classList.add("input-error");

    phoneInput.focus();

    return;

}

    submitBtn.disabled = true;

    submitBtn.textContent = "Надсилання...";

const data = {

    name: document.getElementById("name").value.trim(),

    phone: document.getElementById("phone").value.trim(),

    email: "",

    service: "",

    message: document.getElementById("message").value.trim(),

    page: window.location.pathname

};

    try{

        const response = await fetch(WORKER_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        if(result.success){

form.reset();

    form.style.display = "none";

    success.style.display = "block";

    setTimeout(() => {

        success.style.display = "none";

        form.style.display = "block";

        closeModal();

    }, 2500);

        }else{

            alert("Помилка відправлення.");

        }

    }

    catch(err){

        alert("Не вдалося відправити заявку.");

        console.error(err);

    }

    submitBtn.disabled=false;

    submitBtn.textContent="Отримати консультацію";

});