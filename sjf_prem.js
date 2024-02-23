class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
    }
}

function runSJF(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        let shortestJobIndex = -1;
        let shortestJobRemainingTime = Infinity;

        for (let i = 0; i < processes.length; i++) {
            if (processes[i].arrivalTime <= currentTime && processes[i].remainingTime < shortestJobRemainingTime && processes[i].remainingTime > 0) {
                shortestJobIndex = i;
                shortestJobRemainingTime = processes[i].remainingTime;
            }
        }

        if (shortestJobIndex === -1) {
            currentTime++;
        } else {
            processes[shortestJobIndex].remainingTime--;

            if (processes[shortestJobIndex].remainingTime === 0) {
                completedProcesses++;
                processes[shortestJobIndex].completionTime = currentTime + 1;
            }

            currentTime++;
        }
    }

    displayResults(processes);
}

function displayResults(processes) {
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    console.log("Process\tArrival Time\tBurst Time\tCompletion Time\tWaiting Time\tTurnaround Time");

    processes.forEach((process) => {
        const turnaroundTime = process.completionTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.burstTime;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.completionTime}\t\t${waitingTime}\t\t${turnaroundTime}`);
    });

    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;

    console.log("\nAverage Waiting Time:", averageWaitingTime);
    console.log("Average Turnaround Time:", averageTurnaroundTime);
}

// Example usage
const processes = [
    new Process(1, 0, 6),
    new Process(2, 2, 8),
    new Process(3, 4, 7),
    new Process(4, 6, 3)
];

runSJF(processes);


// Sjf with preemtive