document.querySelectorAll('.copy-mint').forEach(function (button) {
  button.addEventListener('click', async function () {
    var address = button.querySelector('.mint-address').textContent.trim();
    var label = button.querySelector('.copy-label');
    try {
      await navigator.clipboard.writeText(address);
      label.textContent = 'COPIED ✓';
    } catch (error) {
      var input = document.createElement('textarea');
      input.value = address;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
      label.textContent = 'COPIED ✓';
    }
    window.setTimeout(function () { label.textContent = 'COPY'; }, 1800);
  });
});
