let currentEditingId = null;

function addJob(){
    const company = document.getElementById('companyInput').value;
    const salary = document.getElementById('salaryInput').value;
    const location = document.getElementById('locationInput').value;
    const image = document.getElementById('imageInput').value;
    const job = {company, salary, location, image};
    
    
    if(company && salary && location && image){
        addJobToLocalStorage(job);
        clearForm();
    }
    else{
        alert("Please fill all the fields");
    }
}
function addJobToLocalStorage(job){
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    job.id = jobs.length + 1;
    console.log(job);
    jobs.push(job);
    localStorage.setItem('jobs',JSON.stringify(jobs));
    displayJobs();
}

function clearForm(){
    document.getElementById('companyInput').value = "";
    document.getElementById('salaryInput').value = "";
    document.getElementById('locationInput').value = "";
    document.getElementById('imageInput').value = "";
}
function displayJobs(){
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const jobContainer = document.getElementById("jobs-container");
    jobContainer.innerHTML = "";
    //console.log(jobContainer);
    jobs.map(function(job){
        const newEle = document.createElement('div');
        const name = document.createElement('div');
        const salary = document.createElement('div');
        const location = document.createElement('div');
        const id = document.createElement('div');
        const edit = document.createElement('button');
        const del = document.createElement('button');
        edit.addEventListener('click',function(){
            const companyInput = document.getElementById('companyInput');
            const salaryInput = document.getElementById('salaryInput');
            const locationInput = document.getElementById('locationInput');
            const imageInput = document.getElementById('imageInput');

            companyInput.value = job.company;
            salaryInput.value = job.salary;
            locationInput.value = job.location;
            imageInput.value = job.image || "";

            currentEditingId = job.id;

            document.getElementById('add-job-button').style.display = 'none';

            let update = document.getElementById('upd');
            if(update == null){
                update = document.createElement('button');
                update.textContent = "Update";
                update.id = "upd";
                imageInput.insertAdjacentElement('afterend',update);
            }

            update.onclick = function(){
                const companyVal = companyInput.value.trim();
                const salaryVal = salaryInput.value.trim();
                const locationVal = locationInput.value.trim();
                const imageVal = imageInput.value.trim();

                if(companyVal && salaryVal && locationVal && imageVal){
                    const jobsFromStorage = JSON.parse(localStorage.getItem('jobs')) || [];
                    const index = jobsFromStorage.findIndex(function(j){ return j.id === currentEditingId; });
                    if(index !== -1){
                        jobsFromStorage[index].company = companyVal;
                        jobsFromStorage[index].salary = salaryVal;
                        jobsFromStorage[index].location = locationVal;
                        jobsFromStorage[index].image = imageVal;
                        localStorage.setItem('jobs',JSON.stringify(jobsFromStorage));
                        displayJobs();
                        clearForm();
                        document.getElementById('add-job-button').style.display = 'inline-block';
                        currentEditingId = null;
                        update.remove();
                    }
                }else{
                    alert("Please fill all the fields");
                }
            };
        });
        edit.textContent = "Edit";
        del.textContent = "Delete";
        del.addEventListener('click',function(){
            const jobsFromStorage = JSON.parse(localStorage.getItem('jobs')) || [];
            const filteredJobs = jobsFromStorage.filter(function(j){
                return j.id !== job.id;
            });
            localStorage.setItem('jobs',JSON.stringify(filteredJobs));
            displayJobs();
        });


        name.innerText  = "company : " + job.company;
        salary.innerText  = "salary : " + job.salary;
        location.innerText = "location : " + job.location;
        id.innerHTML = "id : " + job.id;

        newEle.appendChild(name);
        newEle.appendChild(salary);
        newEle.appendChild(location);
        newEle.appendChild(id);
        newEle.appendChild(edit);
        newEle.appendChild(del);

        jobContainer.appendChild(newEle);

    })
}
window.addEventListener('load',function(){
    displayJobs();
});