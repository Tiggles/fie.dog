function hasExtension(name, extension) {
    return name.indexOf(extension, name.length - extension.length) !== -1;
}

const contentElement = document.querySelector(".content");
const nextButton = document.querySelector("#next-btn");
const randomButton = document.querySelector("#random-btn");

fetch("/media/rotation.json").then(it => it.json()).then(rotation => {
    let idx = 0;

    function goToNext() {
        idx = (idx + 1) % rotation.length;
        render();
    }

    function goToRandom() {
        idx = (Math.random() * rotation.length) | 0;
        render();
    }

    function render() {
        const nextElement = rotation[idx];

        let elementCreated;
        {
            if (hasExtension(nextElement, "mp4")) {
                elementCreated = document.createElement("video");
                elementCreated.src = nextElement;
                elementCreated.controls = true;
                elementCreated.controls = true;
            } else if (hasExtension(nextElement, "jpg")) {
                elementCreated = document.createElement("img");
                elementCreated.src = nextElement;
            }
        }

        contentElement.innerHTML = "";
        contentElement.appendChild(elementCreated);
    }

    nextButton.addEventListener("click", e => {
        goToNext();
    });

    randomButton.addEventListener("click", e => {
        goToRandom();
    });

    render();
});
