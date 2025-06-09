class Day {
  constructor() {
    this._date = new Date();
  }

  get year() {
    return this.leftFillZero(this._date.getFullYear());
  }

  get month() {
    return this.leftFillZero(this._date.getMonth() + 1);
  }

  get date() {
    return this.leftFillZero(this._date.getDate());
  }

  get nowTime() {
    const options = { hour12: true, hour: "2-digit", minute: "2-digit" };
    return this._date.toLocaleTimeString("ko-KR", options);
  }

  get fullDate() {
    return `${this.year}. ${this.month}. ${this.date}.`;
  }

  leftFillZero(number) {
    return String(number).padStart(2, "0");
  }
}
