export function loadSearchHistory() {
  return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

export function saveSearchHistory(history) {
  localStorage.setItem('searchHistory', JSON.stringify(history));
}
