document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const idCard = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        position: document.getElementById('position').value,
        department: document.getElementById('department').value,
        company: document.getElementById('company').value,
        employeeId: document.getElementById('employeeId').value,
        nationality: document.getElementById('nationality').value,
        gender: document.getElementById('gender').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        joiningDate: document.getElementById('joiningDate').value,
        designation: document.getElementById('designation').value,
        experience: document.getElementById('experience').value,
        qualification: document.getElementById('qualification').value,
        photo: '',
        signature: '',
        hobby: document.getElementById('hobby').value
        // Add more fields as needed
    };

    const photo = document.getElementById('photo').files[0];
    const signature = document.getElementById('signature').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        idCard.photo = e.target.result;
        const signatureReader = new FileReader();
        signatureReader.onload = function(e) {
            idCard.signature = e.target.result;
            saveData(idCard);
            displayIDCard(idCard);
        };
        if (signature) {
            signatureReader.readAsDataURL(signature);
        }
    };
    if (photo) {
        reader.readAsDataURL(photo);
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
            <img src="${data.photo}" alt="${data.name}">
            <div>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Date of Birth:</strong> ${data.dob}</p>
                <p><strong>Position:</strong> ${data.position}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>Company:</strong> ${data.company}</p>
                <p><strong>Employee ID:</strong> ${data.employeeId}</p>
                <p><strong>Nationality:</strong> ${data.nationality}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
                <p><strong>Blood Group:</strong> ${data.bloodGroup}</p>
                <p><strong>Emergency Contact:</strong> ${data.emergencyContact}</p>
                <p><strong>Joining Date:</strong> ${data.joiningDate}</p>
                <p><strong>Designation:</strong> ${data.designation}</p>
                <p><strong>Experience:</strong> ${data.experience}</p>
                <p><strong>Qualification:</strong> ${data.qualification}</
