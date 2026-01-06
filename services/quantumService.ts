import { QuantumJob, JobStatus, QuantumResult, QuantumExperimentMetrics } from '../types';
import { generateId } from '../utils/helpers';

const AVAILABLE_BACKENDS = [
    "ibmq_qasm_simulator",
    "simulator_statevector",
    "ibm_brisbane",
    "ibm_kyoto",
    "ibm_osaka",
];

export const getBackends = async (): Promise<string[]> => {
    // Simulate a network call to a backend that would use QiskitRuntimeService
    await new Promise(resolve => setTimeout(resolve, 1200));
    return AVAILABLE_BACKENDS;
};

const calculateMetrics = (probabilities: Record<string, number>): QuantumExperimentMetrics => {
    const idealProbs = { '00': 0.5, '01': 0, '10': 0, '11': 0.5 };
    const p = (key: string) => probabilities[key] || 0;
    const p_ideal = (key: string) => idealProbs[key] || 0;

    // Shannon Entropy
    const entropy = -Object.keys(probabilities).reduce((sum, key) => {
        const prob = p(key);
        return sum + (prob > 0 ? prob * Math.log2(prob) : 0);
    }, 0);

    // Fidelity (Bhattacharyya coefficient)
    const fidelity = Math.pow(
        Object.keys(idealProbs).reduce((sum, key) => {
            return sum + Math.sqrt(p(key) * p_ideal(key));
        }, 0),
        2
    );

    // Mutual Information I(X;Y) = H(X) + H(Y) - H(X,Y)
    const p0 = p('00') + p('01');
    const p1 = p('10') + p('11');
    const q0 = p('00') + p('10');
    const q1 = p('01') + p('11');
    const hx = -(p0 > 0 ? p0 * Math.log2(p0) : 0) - (p1 > 0 ? p1 * Math.log2(p1) : 0);
    const hy = -(q0 > 0 ? q0 * Math.log2(q0) : 0) - (q1 > 0 ? q1 * Math.log2(q1) : 0);
    const mutualInfo = hx + hy - entropy;
    
    // L1 Distance (proxy for Wasserstein)
    const l1_distance = 0.5 * Object.keys(idealProbs).reduce((sum, key) => {
        return sum + Math.abs(p(key) - p_ideal(key));
    }, 0);

    return { entropy, fidelity, mutualInfo, l1_distance };
};


export const runQuantumExperiment = (
    backend: string,
    shots: number,
    onUpdate: (job: QuantumJob) => void
): Promise<QuantumResult> => {

    const job: QuantumJob = {
        id: `job_${generateId()}`,
        backend,
        status: JobStatus.QUEUED,
        createdAt: new Date().toLocaleTimeString(),
        log: [`Job ${generateId()} created and sent to ${backend}.`],
    };

    onUpdate({ ...job });

    return new Promise((resolve, reject) => {
        // 1. Queued phase
        const queueTime = backend.includes('simulator') ? 500 : 2000 + Math.random() * 3000;
        setTimeout(() => {
            job.status = JobStatus.QUEUED;
            job.queuedAt = new Date().toLocaleTimeString();
            job.log.push(`Job queued on ${backend}. Position: ${Math.floor(Math.random() * 5) + 1}.`);
            onUpdate({ ...job });

            // 2. Running phase
            const runTime = backend.includes('simulator') ? 1500 : 3000 + Math.random() * 5000;
            setTimeout(() => {
                job.status = JobStatus.RUNNING;
                job.startedAt = new Date().toLocaleTimeString();
                job.log.push('Executing quantum circuit...');
                onUpdate({ ...job });

                // 3. Completion phase
                setTimeout(() => {
                    job.status = JobStatus.COMPLETED;
                    job.completedAt = new Date().toLocaleTimeString();
                    job.log.push('Execution complete. Retrieving results.');
                    onUpdate({ ...job });
                    
                    const noise = 0.05; 
                    const idealCounts = { '00': shots / 2, '11': shots / 2 };
                    const noisyCounts: Record<string, number> = {
                        '00': Math.floor(idealCounts['00'] * (1 - noise)),
                        '11': Math.floor(idealCounts['11'] * (1 - noise)),
                        '01': Math.floor(shots * noise / 2),
                        '10': Math.floor(shots * noise / 2),
                    };
                    
                    let remainingShots = shots - Object.values(noisyCounts).reduce((a, b) => a + b, 0);
                    noisyCounts['00'] += Math.floor(remainingShots / 2);
                    noisyCounts['11'] += Math.ceil(remainingShots / 2);

                    const probabilities = {
                       '00': noisyCounts['00'] / shots,
                       '01': noisyCounts['01'] / shots,
                       '10': noisyCounts['10'] / shots,
                       '11': noisyCounts['11'] / shots,
                    };

                    const metrics = calculateMetrics(probabilities);

                    const result: QuantumResult = {
                        jobId: job.id,
                        backend: job.backend,
                        shots,
                        counts: noisyCounts,
                        probabilities,
                        completedAt: job.completedAt,
                        metrics,
                    };

                    resolve(result);

                }, runTime);
            }, queueTime);
        }, 500);
    });
};
