const l = 15;
const n = 50;

const box = document.createElement('div');
box.style.height = `${l}px`;
box.style.width = `${l}px`;
box.style.backgroundColor = 'lightblue';
box.style.border = '1px solid black';
box.style.flexShrink = '0';

const row = document.createElement('div');
row.style.gap = '0';
row.style.padding = '0';
row.style.display = 'flex';
row.style.justifyContent = 'center';

const container = document.querySelector('.container');

for (let i = 0; i < n; ++i) {
    const rowCopy = row.cloneNode(true);
    for (let j = 0; j < n; ++j) {
        const boxCopy = box.cloneNode(true);
        boxCopy.addEventListener('mousemove', () => {
            console.log('hover');
            boxCopy.style.backgroundColor = 'blue';
        })
        rowCopy.appendChild(boxCopy);
    }
    container.appendChild(rowCopy);
}
