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
    let queue = [];
    let completedProcesses = [];

    while (processes.length > 0 || queue.length > 0) {
        if (queue.length === 0 && processes.length > 0) {
            // Move processes to the queue when they arrive
            let arrivedProcesses = processes.filter((process) => process.arrivalTime <= currentTime);
            queue = queue.concat(arrivedProcesses);
            processes = processes.filter((process) => process.arrivalTime > currentTime);
        }

        if (queue.length > 0) {
            let currentProcess = queue.shift();

            if (currentProcess.remainingBurstTime <= timeQuantum) {
                currentTime += currentProcess.remainingBurstTime;
                currentProcess.remainingBurstTime = 0;
                currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
                currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;

                completedProcesses.push(currentProcess);
            } else {
                currentTime += timeQuantum;
                currentProcess.remainingBurstTime -= timeQuantum;
                queue.push(currentProcess);
            }
        } else {
            // If there are no processes in the queue, increment time
            currentTime++;
        }
    }

    displayResults(completedProcesses);
}

function displayResults(processes) {
    let waitingTime = 0;
    let turnaroundTime = 0;

    console.log("Process\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        console.log(`${process.id}\t\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
        waitingTime += process.waitingTime;
        turnaroundTime += process.turnaroundTime;
    });

    console.log("\nAverage Waiting Time:", waitingTime / processes.length);
    console.log("Average Turnaround Time:", turnaroundTime / processes.length);
}

// Example usage
const processes = [
    new Process(1, 0, 10),
    new Process(2, 2, 5),
    new Process(3, 5, 8),
    new Process(4, 7, 2)
];

const timeQuantum = 3;
runRoundRobin(processes, timeQuantum);


// Round robin non pre