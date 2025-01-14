document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const picture = document.getElementById('picture').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const idCard = {
            name: name,
            email: email,
            picture: e.target.result
        };

        saveData(idCard);
        displayIDCard(idCard);
    };

    if (picture) {
        reader.readAsDataURL(picture);
    }
});

function saveData(data) {
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.push(data);
    localStorage.setItem('dataList', JSON.stringify(dataList));
}

function displayIDCard(data) {
    const container = document.getElementById('idCardContainer');
    container.innerHTML = `
        <div id="idCard">
            <img src="${data.picture}" alt="${data.name}">
            <div>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            </div>
        </div>
    `;
}

function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    dataList.forEach(data => {
        if (data.name.toLowerCase().includes(searchInput)) {
            const result = document.createElement('div');
            result.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <img src="${data.picture}" alt="${data.name}" style="height: 50px; border-radius: 4px;">
            `;
            resultsContainer.appendChild(result);
        }
    });
}
