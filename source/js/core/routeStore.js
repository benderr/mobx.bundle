class HistoryStore {
  history

  setHistory(history) {
    if (!history) { throw 'History must be set'; }
    this.history = history;
  }
}

export default new HistoryStore();
