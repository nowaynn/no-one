function generateDataCard() {
    const municipality1 = document.getElementById('municipality1').value;
    const municipality2 = document.getElementById('municipality2').value;
    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const department = document.getElementById('department').value;

    const todayHijri = HijriDate.today();
    const todayGregorian = moment().format('YYYY-MM-DD');
    const expiryHijri = HijriDate.addYear(1);
    const expiryGregorian = moment().add(1, 'year').format('YYYY-MM-DD');

    const dataCard = `
        <div class="dataCard">
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
        </div>
    `;

    const dataCards = document.getElementById('dataCards');
    dataCards.innerHTML += dataCard;
}

document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const dataCards = document.getElementsByClassName('dataCard');
    Array.from(dataCards).forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});
