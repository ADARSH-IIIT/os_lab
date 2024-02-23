////////////////   fcfs hamesha non preemtive hi hota h 





class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
    }
}

function calculateWaitingTime(processes) {
    let waitingTime = 0;
    let turnaroundTime = 0;

    processes[0].waitingTime = 0;
    processes[0].turnaroundTime = processes[0].burstTime;

    for (let i = 1; i < processes.length; i++) {
        processes[i].waitingTime = processes[i - 1].turnaroundTime;
        processes[i].turnaroundTime = processes[i].waitingTime + processes[i].burstTime;

        waitingTime += processes[i].waitingTime;
        turnaroundTime += processes[i].turnaroundTime;
    }

    return { averageWaitingTime: waitingTime / processes.length, averageTurnaroundTime: turnaroundTime / processes.length };
}

function runFCFS(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    const { averageWaitingTime, averageTurnaroundTime } = calculateWaitingTime(processes);

    console.log("Process\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    console.log("\nAverage Waiting Time:", averageWaitingTime);
    console.log("Average Turnaround Time:", averageTurnaroundTime);
}

// Example usage
const processes = [
    new Process(1, 0, 5),
    new Process(2, 2, 3),
    new Process(3, 4, 1),
    new Process(4, 5, 4)
];

runFCFS(processes);