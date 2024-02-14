
let addBtn = document.querySelector('.manuBar');
let cancelBtn = document.querySelector('.cross');

addBtn.addEventListener('click', ()=>{
    document.getElementById('addbar').style.left = '0%';
})
cancelBtn.addEventListener('click', ()=>{
    document.getElementById('addbar').style.left = '-50%';
})
