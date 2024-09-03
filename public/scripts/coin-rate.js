document.querySelectorAll('.value').forEach(element => {
    const value = parseFloat(element.textContent); // Convert text content to a number
    if (value >= 0) {
        element.classList.add('has-text-success');
        element.textContent = `+${value}%`;
    } else if (value < 0) {
        element.classList.add('has-text-danger');
        element.textContent = `${value}%`;
    }
});