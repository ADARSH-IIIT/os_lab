class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingBurstTime = burstTime;
    }
}

function runRoundRobin(processes, timeQuantum) {
    let currentTime = 0;
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        for (let i = 0; i < processes.length; i++) {
            const process = processes[i];

            if (process.remainingBurstTime > 0) {
                const executionTime = Math.min(process.remainingBurstTime, timeQuantum);
                
                currentTime += executionTime;
                process.remainingBurstTime -= executionTime;

                if (process.remainingBurstTime === 0) {
                    completedProcesses++;
                    process.turnaroundTime = currentTime - process.arrivalTime;
                    process.waitingTime = process.turnaroundTime - process.burstTime;

                    totalTurnaroundTime += process.turnaroundTime;
                    totalWaitingTime += process.waitingTime;
                }
            }
        }
    }

    const averageTurnaroundTime = totalTurnaroundTime / processes.length;
    const averageWaitingTime = totalWaitingTime / processes.length;

    console.log("Process\tArrival Time\tBurst Time\tTurnaround Time\tWaiting Time");
    processes.forEach((process) => {
        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.turnaroundTime}\t\t${process.waitingTime}`);
    });

    console.log("\nAverage Turnaround Time:", averageTurnaroundTime);
    console.log("Average Waiting Time:", averageWaitingTime);
}

// Example usage
const processes = [
    new Process(1, 0, 10),
    new Process(2, 2, 5),
    new Process(3, 4, 8),
    new Process(4, 6, 2)
];

const timeQuantum = 3;

runRoundRobin(processes, timeQuantum);


// Round robin preem