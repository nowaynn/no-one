function generateDataCard() {
    const municipality1 = document.getElementById('municipality1').value;
    const municipality2 = document.getElementById('municipality2').value;
    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const department = document.getElementById('department').value;
    const picture = document.getElementById('picture').files[0];

    const todayHijri = HijriDate.today().format('iYYYY-iMM-iDD');
    const todayGregorian = moment().format('YYYY-MM-DD');
    const expiryHijri = HijriDate.addYear(1).format('iYYYY-iMM-iDD');
    const expiryGregorian = moment().add(1, 'year').format('YYYY-MM-DD');

    if (picture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataCard = `
                <div class="dataCard">
                    <img src="${e.target.result}" alt="Picture">
                    <p>Municipality (الأمانة): ${municipality1}</p>
                    <p>Municipality (البلدية): ${municipality2}</p>
                    <p>Name (الاسم): ${name}</p>
                    <p>ID Number (رقم الهوية): ${idNumber}</p>
                    <p>Gender (الجنس): ${gender}</p>
                    <p>Nationality (الجنسية): ${nationality}</p>
                    <p>Card Number (رقم الشهادة الصحية): ${cardNumber}</p>
                    <p>Department (المهنة): ${department}</p>
                    <p>Issue Date (Hijri) (تاريخ إصدار الشهادة الصحية هجري): ${todayHijri}</p>
                    <p>Issue Date (Gregorian) (تاريخ إصدار الشهادة الصحية ميلادي): ${todayGregorian}</p>
                    <p>Expiry Date (Hijri) (تاريخ نهاية الشهادة الصحية هجري): ${expiryHijri}</p>
                    <p>Expiry Date (Gregorian) (تاريخ نهاية الشهادة الصحية ميلادي): ${expiryGregorian}</p>
                    <div class="btn-group">
                        <button class="btn export-btn" onclick="exportToPDF(this.parentElement)">Export to PDF</button>
                        <button class="btn download-btn" onclick="downloadPicture('${e.target.result}')">Download Picture</button>
                    </div>
                </div>
            `;

            const dataCards = document.getElementById('dataCards');
            dataCards.innerHTML += dataCard;

            saveDataToExcel({
                municipality1, municipality2, name, idNumber, gender, nationality,
                cardNumber, department, todayHijri, todayGregorian, expiryHijri, expiryGregorian, picture: e.target.result
            });
        };
        reader.readAsDataURL(picture);
    } else {
        alert('Please upload a picture.');
    }
}

document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const dataCards = document.getElementsByClassName('dataCard');
    Array.from(dataCards).forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

function exportToPDF(cardElement) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.text(cardElement.innerText, 10, 10);
    pdf.save('health_certificate.pdf');
}

function downloadPicture(dataURL) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'card_picture.png';
    link.click();
}

const excelData = [];
function saveDataToExcel(data) {
    excelData.push(data);
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Health Certificates');
    XLSX.writeFile(wb, 'health_certificates.xlsx');
}
