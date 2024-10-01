
document.getElementById('toggle-info').addEventListener('click', () => {
    const moreInfo = document.getElementById('more-info');
    const button   = document.getElementById('toggle-info');
    
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        button.textContent = 'Mostrar Menos';
    } else {
        moreInfo.style.display = 'none';
        button.textContent = 'Mostrar Más';
    }
});




