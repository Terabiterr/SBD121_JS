function randRGB() {
    let r, g, b;
    r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    return `rgb(${r}, ${g}, ${b})`
}
function setBlocks() {
    //delete all the items childs
    var container = document.querySelector('.containerArticles');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Add new childs
    let userChoose = document.querySelector('.userSetBlocks').value;
    for(let i = 0; i < userChoose; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.margin = '10px';
        newDiv.style.width = '250px';
        newDiv.style.height = '250px';
        newDiv.style.background = randRGB();
        document.querySelector('.containerArticles')
        .appendChild(newDiv);
    }
}