const button = document.getElementById('button');
const text = document.getElementById('text');

button.addEventListener('click', () => {
  if (button != null && text != null) {
    text.innerHTML = 'hello world';
  }
});
