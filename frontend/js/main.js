
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

document.addEventListener("DOMContentLoaded", function(e) {
    InitEncrypt();
    InitDecrypt();
});

const InitEncrypt = () => {
    encryptContainer.addEventListener('click', () =>{
        encryptInputFile.click();
    });
    
    encryptContainer.addEventListener('dragover', (e) =>{
        encryptContainer.classList.add('border-red-500');
        e.preventDefault();
        e.stopPropagation();
    }, false);
    
    encryptContainer.addEventListener('dragleave', () =>{
        encryptContainer.classList.remove('border-red-500');
    });
    
    encryptContainer.addEventListener("drop", e =>{
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
    
        if(file){
            buildContainerFileView(file, encryptFileViewName ,encryptFileViewSize);
            toggleFileView(encryptContainerFileView, encryptFileBtn ,encryptContainer);
        }
    }, false);
    
    encryptInputFile.addEventListener('change', (e) =>{
        const file = e.target.files[0];
        if(file){
            buildContainerFileView(file, encryptFileViewName ,encryptFileViewSize);
            toggleFileView(encryptContainerFileView, encryptFileBtn ,encryptContainer);
        }
    });

    encryptRemoveFileBtn.addEventListener("click", () => {
        encryptInputFile.value = "";
        toggleFileView(encryptContainerFileView, encryptFileBtn ,encryptContainer);
    })
}

const InitDecrypt = () => {
    decryptContainer.addEventListener('click', () =>{
        decryptInputFile.click();
    });
    
    decryptContainer.addEventListener('dragover', (e) =>{
        decryptContainer.classList.add('border-red-500');
        e.preventDefault();
        e.stopPropagation();
    }, false);
    
    decryptContainer.addEventListener('dragleave', () =>{
        decryptContainer.classList.remove('border-red-500');
    });
    
    decryptContainer.addEventListener("drop", e =>{
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
    
        if(file && getFileType(file) === 'enc'){
            buildContainerFileView(file, decryptFileViewName ,decryptFileViewSize);
            toggleFileView(decryptContainerFileView, decryptFileBtn ,decryptContainer);
        }
    }, false);
    
    decryptInputFile.addEventListener('change', (e) =>{
        const file = e.target.files[0];
        if(file && getFileType(file) === 'enc'){
            buildContainerFileView(file, decryptFileViewName ,decryptFileViewSize);
            toggleFileView(decryptContainerFileView, decryptFileBtn ,decryptContainer);
        }else{
            alert("Tipo de arquivo no formato invalido")
        }
    });

    decryptRemoveFileBtn.addEventListener("click", () => {
        decryptInputFile.value = "";
        toggleFileView(decryptContainerFileView, decryptFileBtn ,decryptContainer);
    })
}

const getFileType = (file) => {
    const fileTypeArray = file.name.split('.');
    const fileType = fileTypeArray.pop();
    return fileType;
}

const toggleFileView = (containerFileView, actionBtn, actionBox) => {
    if(containerFileView.classList.contains("hidden")){
        actionBox.classList.add("blur-lg");
        containerFileView.classList.remove("hidden");
        actionBtn.classList.remove("bg-zinc-400");
    }else{
        actionBox.classList.remove("blur-lg");
        containerFileView.classList.add("hidden");
        actionBtn.classList.add("bg-zinc-400");
    }
}

const convertBytes = (bytes,  decimals = 2) =>{
    if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const buildContainerFileView = (file, fileViewName, fileViewSize) =>{
    fileViewName.textContent = file.name;
    fileViewSize.textContent = convertBytes(file.size);
}

