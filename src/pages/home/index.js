function renderJobs(){
    const jobsBoxContainer = document.querySelector(".jobOffers");
    jobsData.forEach(element => {
        const jobCard = document.createElement("div");
        const cardTitle = document.createElement("h2");
        const divLocalInfo = document.createElement("div");
        const academy = document.createElement("span");
        const city = document.createElement("span");
        const jobDescription = document.createElement("p");
        const divCardFooter = document.createElement("div");
        const tagInfo = document.createElement("span");
        const candidateBtn = document.createElement("button");

        jobCard.classList.add("jobCard");
        jobCard.id = `job${element.id}`;
        cardTitle.innerText = `${element.title}`;
        divLocalInfo.classList.add("localInfo");
        academy.innerText = `${element.enterprise}`;
        city.innerText = `${element.location}`;
        jobDescription.innerText = `${element.descrition}`;
        divCardFooter.classList.add("cardFooter");
        tagInfo.classList.add("tagInfo");
        tagInfo.innerText = `${element.modalities[0]}`;
        candidateBtn.classList.add("candidateBtn");
        candidateBtn.innerText = "Candidatar";
        candidateBtn.dataset.id = element.id;

        jobsBoxContainer.appendChild(jobCard);
        jobCard.appendChild(cardTitle);
        jobCard.appendChild(divLocalInfo);
        divLocalInfo.append(academy, city);
        jobCard.appendChild(jobDescription);
        jobCard.appendChild(divCardFooter);
        divCardFooter.append(tagInfo, candidateBtn);
    })
}


function createEmptyJobs() {

    const emptyContainer = document.createElement("div");
    const emptyDesc = document.createElement("p");
    const emptySockets = document.createElement("div");
    const socket1 = document.createElement("div");
    const socket2 = document.createElement("div");
    const socket3 = document.createElement("div");
    const socket4 = document.createElement("div");
    const socket5 = document.createElement("div");

    emptyContainer.classList.add("jobSelectedEmpty");
    emptyDesc.innerText = "Você ainda não aplicou para nenhuma vaga";
    emptySockets.classList.add("emptySockets");
    socket1.classList.add("socket1");
    socket2.classList.add("socket2");
    socket3.classList.add("socket3");
    socket4.classList.add("socket4");
    socket5.classList.add("socket5");

    emptyContainer.append(emptyDesc, emptySockets);
    emptySockets.append(socket1, socket2, socket3, socket4, socket5);
    
    return emptyContainer;
}

let selectedJobsArray = [];

function renderSelectedJobs(array){
    const jobContainer = document.querySelector(".selectedJobList");

    jobContainer.innerHTML = "";

    if(selectedJobs.length <= 0){
        const emptyJobs = createEmptyJobs();
        jobContainer.appendChild(emptyJobs);

    }else{
        array.forEach(element => {
            const newJob = createSelectedJob(element);

            jobContainer.appendChild(newJob);

        })

        removeJob(selectedJobs);
    }
}

function createSelectedJob(job){

    const divSelectedJobCard = document.createElement("div");
    const divTitle = document.createElement("h2");
    const removeJob = document.createElement("button");
    const removeJobImage = document.createElement("img");
    const divLocalInfo = document.createElement("div");
    const academy = document.createElement("span");
    const city = document.createElement("span");

    divSelectedJobCard.classList.add("selectedJobCard");
    divTitle.innerText = `${job.title}`;
    removeJob.dataset.jobId = job.jobId;
    removeJob.classList.add("removeJobBtn");
    removeJobImage.src = "/src/assets/img/trash.svg";
    divLocalInfo.classList.add("localInfo");
    academy.innerText = `${job.enterprise}`;
    city.innerText = `${job.location}`;


    divSelectedJobCard.append(divTitle, removeJob, divLocalInfo);
    removeJob.appendChild(removeJobImage);
    divLocalInfo.append(academy, city);

    return divSelectedJobCard;

}

function addJobTo(){
    const addButtons = document.querySelectorAll(".candidateBtn");

    addButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const jobFound = jobsData.find(job => {
                return job.id === Number(event.target.dataset.id);
            })

            const jobToCandidate = {
                ... jobFound,
                jobId: selectedJobs.length + 1
            }

            selectedJobs.push(jobToCandidate);

            renderSelectedJobs(selectedJobs);

            button.innerText = "Remover Candidatura"
        })
    })
}

function removeJob(array){
    const removeBtns = document.querySelectorAll(".removeJobBtn");

    removeBtns.forEach(button => {
        button.addEventListener("click", (ev) => {
            const jobSelected = array.find(job => {
                return job.jobId === Number(ev.target.dataset.jobId);
            })
            const jobIndex = array.indexOf(jobSelected);

            array.splice(jobIndex, 1)

            renderSelectedJobs(selectedJobs);

        })
    })
    
}

renderJobs();
renderSelectedJobs(selectedJobs);
addJobTo();