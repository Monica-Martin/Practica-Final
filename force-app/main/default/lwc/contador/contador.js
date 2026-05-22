import { LightningElement } from 'lwc';

export default class Contador extends LightningElement {
    totalSeconds = 0;
    timerId = null;
    isTimerRunning = false;
    isTicking = false;

    get isTimerPaused() {
        return !this.isTimerRunning;
    }

    get timerClass() {
        return this.isTicking ? 'timer-display tick' : 'timer-display';
    }

    get formattedTime() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    startTimer() {
        if (!this.isTimerRunning) {
            this.isTimerRunning = true;
            
            this.timerId = setInterval(() => {
                this.totalSeconds++;
                
                this.isTicking = true;
                
                setTimeout(() => {
                    this.isTicking = false;
                }, 150);

            }, 1000);
        }
    }

    pauseTimer() {
        this.isTimerRunning = false;
        this.isTicking = false;
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.isTimerRunning = false;
        this.isTicking = false;
        clearInterval(this.timerId);
        this.totalSeconds = 0;
    }

    disconnectedCallback() {
        clearInterval(this.timerId);
    }
}