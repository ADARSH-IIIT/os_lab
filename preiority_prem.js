class Process {
    constructor(id, arrivalTime, burstTime, priority) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingBurstTime = burstTime;
    }
}

function runPriorityScheduling(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        let highestPriority = Infinity;
        let selectedProcessIndex = -1;

        for (let i = 0; i < processes.length; i++) {
            if (processes[i].arrivalTime <= currentTime && processes[i].priority < highestPriority && processes[i].remainingBurstTime > 0) {
                highestPriority = processes[i].priority;
                selectedProcessIndex = i;
            }
        }

        if (selectedProcessIndex === -1) {
            currentTime++;
        } else {
            processes[selectedProcessIndex].remainingBurstTime--;

            if (processes[selectedProcessIndex].remainingBurstTime === 0) {
                completedProcesses++;
                processes[selectedProcessIndex].completionTime = currentTime + 1;
            }

            currentTime++;
        }
    }

    displayResults(processes);
}

function displayResults(processes) {
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    console.log("Process\tArrival Time\tBurst Time\tPriority\tCompletion Time\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        process.waitingTime = process.completionTime - process.arrivalTime - process.burstTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;

        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;

        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.priority}\t\t${process.completionTime}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    console.log("\nAverage Waiting Time:", totalWaitingTime / processes.length);
    console.log("Average Turnaround Time:", totalTurnaroundTime / processes.length);
}

// Example usage
const processes = [
    new Process(1, 0, 4, 2),
    new Process(2, 2, 6, 1),
    new Process(3, 3, 8, 3),
    new Process(4, 5, 5, 4)
];

runPriorityScheduling(processes);


// Priority with preemtive