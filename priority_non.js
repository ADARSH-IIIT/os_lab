class Process {
    constructor(id, arrivalTime, burstTime, priority) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
    }
}

function runPriorityScheduling(processes) {
    processes.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);

    let currentTime = 0;

    processes.forEach((process) => {
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }

        process.waitingTime = currentTime - process.arrivalTime;
        process.turnaroundTime = process.waitingTime + process.burstTime;

        currentTime += process.burstTime;
    });

    const averageWaitingTime = processes.reduce((sum, process) => sum + process.waitingTime, 0) / processes.length;
    const averageTurnaroundTime = processes.reduce((sum, process) => sum + process.turnaroundTime, 0) / processes.length;

    console.log("Process\tArrival Time\tBurst Time\tPriority\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.priority}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    console.log("\nAverage Waiting Time:", averageWaitingTime);
    console.log("Average Turnaround Time:", averageTurnaroundTime);
}

// Example usage
const processes = [
    new Process(1, 0, 5, 2),
    new Process(2, 2, 3, 1),
    new Process(3, 4, 1, 4),
    new Process(4, 5, 4, 3)
];

runPriorityScheduling(processes);



// Priority with non pre