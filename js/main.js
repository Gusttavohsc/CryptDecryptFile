//Encrypt
const encryptInputFile = document.getElementById("encryptInputFile");
const encryptInputPassword = document.getElementById("encryptInputPassword");
const encryptContainer = document.getElementById("encryptContainer");
const encryptContainerFileView = document.getElementById("encryptContainerFileView");
const encryptFileBtn = document.getElementById("encryptFileBtn");
const encryptFileViewName = document.getElementById("encryptFileViewName");
const encryptFileViewSize = document.getElementById("encryptFileViewSize");
const encryptRemoveFileBtn = document.getElementById("encryptRemoveFileBtn");

//Decrypt
const decryptInputFile = document.getElementById("decryptInputFile");
const decryptInputPassword = document.getElementById("decryptInputPassword");
const decryptContainer = document.getElementById("decryptContainer");
const decryptContainerFileView = document.getElementById("decryptContainerFileView");
const decryptFileViewName = document.getElementById("decryptFileViewName");
const decryptFileViewSize = document.getElementById("decryptFileViewSize");
const decryptFileBtn = document.getElementById("decryptFileBtn");
const decryptRemoveFileBtn = document.getElementById("decryptRemoveFileBtn");

document.addEventListener("DOMContentLoaded", function (e) {
    InitEncrypt();
    InitDecrypt();
});

const InitEncrypt = () => {
    addEventListenerDragOverOnContainer(encryptContainer);
    addEventListenerDragLeaveOnContainer(encryptContainer);
    addEventListenerClickOnRemoveFileBtn(encryptFileBtn, encryptRemoveFileBtn, encryptInputFile, encryptContainer, encryptContainerFileView)
    encryptContainer.addEventListener('click', () =>{ encryptInputFile.click() }, false);

    encryptContainer.addEventListener("drop", e => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];

        if (file) {
            buildContainerFileView(file, encryptFileViewName, encryptFileViewSize);
            toggleFileView(encryptContainerFileView, encryptFileBtn, encryptContainer);
            addEventListenerClickOnActionSendFileBtn(encryptFileBtn, file);
        }
    }, false);

    encryptInputFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            buildContainerFileView(file, encryptFileViewName, encryptFileViewSize);
            toggleFileView(encryptContainerFileView, encryptFileBtn, encryptContainer);
            addEventListenerClickOnActionSendFileBtn(encryptFileBtn, file);
        }
    });
}

const InitDecrypt = () => {
    addEventListenerDragOverOnContainer(decryptContainer);
    addEventListenerDragLeaveOnContainer(decryptContainer);
    addEventListenerClickOnRemoveFileBtn(decryptFileBtn, decryptRemoveFileBtn, decryptInputFile, decryptContainer, decryptContainerFileView)
    decryptContainer.addEventListener('click', () => decryptInputFile.click(), false);
    
    decryptContainer.addEventListener("drop", event => {
        blockEvents(event);
        const file = event.dataTransfer.files[0];

        if (file && getFileType(file) === 'enc') {
            buildContainerFileView(file, decryptFileViewName, decryptFileViewSize);
            toggleFileView(decryptContainerFileView, decryptFileBtn, decryptContainer);
            addEventListenerClickOnActionSendFileBtn(decryptFileBtn, file);
        }else {
            alert("Tipo de arquivo no formato invalido");
        }
    }, false);

    decryptInputFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && getFileType(file) === 'enc') {
            buildContainerFileView(file, decryptFileViewName, decryptFileViewSize);
            toggleFileView(decryptContainerFileView, decryptFileBtn, decryptContainer);
            addEventListenerClickOnActionSendFileBtn(decryptFileBtn, file);
        } else {
            alert("Tipo de arquivo no formato invalido");
        }
    });
}

const addEventListenerDragOverOnContainer = (container) =>{
    container.addEventListener('dragover', (event) =>{ addDragoverStatus(container); blockEvents(event) }, false);
}

const addEventListenerDragLeaveOnContainer = (container) => {
    container.addEventListener('dragleave', () => { removeDragoverStatus(container) }, false);
}

const addEventListenerClickOnRemoveFileBtn = (fileBtn, removeFileBtn, inputFile, container, containerFileView) =>{
    removeFileBtn.addEventListener("click", () => { 
        clearInputFileValue(inputFile);
        toggleFileView(containerFileView, fileBtn, container);
    }, false );
}

const addEventListenerClickOnActionSendFileBtn = (fileBtn, file) =>{
    fileBtn.addEventListener("click", () => decryptBtn(file));
}

const sendFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload.php", {
        method: "POST",
        body: formData
    })
} 

const encryptBtn = (file) => {
    sendFile(file)
}

const decryptBtn = (file) => {
    sendFile(file)
}

const blockEvents = (event) => {
    event.preventDefault();
    event.stopPropagation();
}

const addDragoverStatus = (container) =>{
    container.classList.add('border-red-500');
}

const removeDragoverStatus = (container) => {
    container.classList.remove('border-red-500');
}

const clearInputFileValue = (inputFile) => {
    inputFile.value = "";
}

const getFileType = (file) => {
    const fileTypeArray = file.name.split('.');
    const fileType = fileTypeArray.pop();
    return fileType;
}

const toggleFileView = (containerFileView, actionBtn, actionBox) => {
    if (containerFileView.classList.contains("hidden")) {
        actionBox.classList.add("blur-lg");
        containerFileView.classList.remove("hidden");
        actionBtn.classList.remove("bg-zinc-400");
    } else {
        actionBox.classList.remove("blur-lg");
        containerFileView.classList.add("hidden");
        actionBtn.classList.add("bg-zinc-400");
    }
}

const convertBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const buildContainerFileView = (file, fileViewName, fileViewSize) => {
    fileViewName.textContent = file.name;
    fileViewSize.textContent = convertBytes(file.size);
}

