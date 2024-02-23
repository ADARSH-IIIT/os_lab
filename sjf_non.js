class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
    }
}

function runSJF(processes) {
    processes.sort((a, b) => a.burstTime - b.burstTime);

    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;

    for (let i = 0; i < processes.length; i++) {
        if (currentTime < processes[i].arrivalTime) {
            currentTime = processes[i].arrivalTime;
        }

        processes[i].waitingTime = currentTime - processes[i].arrivalTime;
        processes[i].turnaroundTime = processes[i].waitingTime + processes[i].burstTime;

        waitingTime += processes[i].waitingTime;
        turnaroundTime += processes[i].turnaroundTime;
        currentTime += processes[i].burstTime;
    }

    const averageWaitingTime = waitingTime / processes.length;
    const averageTurnaroundTime = turnaroundTime / processes.length;

    console.log("Process\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    console.log("\nAverage Waiting Time:", averageWaitingTime);
    console.log("Average Turnaround Time:", averageTurnaroundTime);
}

// Example usage
const processes = [
    new Process(1, 0, 6),
    new Process(2, 2, 8),
    new Process(3, 4, 7),
    new Process(4, 5, 3)
];

runSJF(processes);


// Sjf non pre