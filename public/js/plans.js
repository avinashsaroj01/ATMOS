let price='$0';

document.getElementById('plan1').onclick = function() {
    location.href = 'register';
}

document.getElementById('plan2').onclick = function() {
    price='$24';
    location.href = 'register';
}

document.getElementById('plan3').onclick = function() {
    price='$48';
    location.href = 'register';
}

module.exports = price;