// Core quantum computing simulator with VQE capabilities

export type Complex = {
  real: number
  imag: number
}

export type QuantumState = Complex[]

export class QuantumSimulator {
  private numQubits: number
  private state: QuantumState

  constructor(numQubits: number) {
    this.numQubits = numQubits
    this.state = this.initializeState()
  }

  private initializeState(): QuantumState {
    const size = Math.pow(2, this.numQubits)
    const state: QuantumState = new Array(size).fill(null).map(() => ({ real: 0, imag: 0 }))
    state[0] = { real: 1, imag: 0 } // |0...0⟩ state
    return state
  }

  // Complex number operations
  private complexMultiply(a: Complex, b: Complex): Complex {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real,
    }
  }

  private complexAdd(a: Complex, b: Complex): Complex {
    return {
      real: a.real + b.real,
      imag: a.imag + b.imag,
    }
  }

  private complexMagnitude(c: Complex): number {
    return Math.sqrt(c.real * c.real + c.imag * c.imag)
  }

  // Single-qubit gates
  applyHadamard(qubit: number): void {
    const size = Math.pow(2, this.numQubits)
    const newState: QuantumState = new Array(size).fill(null).map(() => ({ real: 0, imag: 0 }))

    const factor = 1 / Math.sqrt(2)

    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1
      const flipped = i ^ (1 << qubit)

      if (bit === 0) {
        newState[i] = this.complexAdd(newState[i], {
          real: this.state[i].real * factor,
          imag: this.state[i].imag * factor,
        })
        newState[flipped] = this.complexAdd(newState[flipped], {
          real: this.state[i].real * factor,
          imag: this.state[i].imag * factor,
        })
      } else {
        newState[flipped] = this.complexAdd(newState[flipped], {
          real: this.state[i].real * factor,
          imag: this.state[i].imag * factor,
        })
        newState[i] = this.complexAdd(newState[i], {
          real: -this.state[i].real * factor,
          imag: -this.state[i].imag * factor,
        })
      }
    }

    this.state = newState
  }

  // Parameterized rotation gates for VQE
  applyRY(qubit: number, theta: number): void {
    const size = Math.pow(2, this.numQubits)
    const newState: QuantumState = new Array(size).fill(null).map(() => ({ real: 0, imag: 0 }))

    const cos = Math.cos(theta / 2)
    const sin = Math.sin(theta / 2)

    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1
      const flipped = i ^ (1 << qubit)

      if (bit === 0) {
        newState[i] = this.complexAdd(newState[i], { real: this.state[i].real * cos, imag: this.state[i].imag * cos })
        newState[flipped] = this.complexAdd(newState[flipped], {
          real: this.state[i].real * sin,
          imag: this.state[i].imag * sin,
        })
      } else {
        newState[flipped] = this.complexAdd(newState[flipped], {
          real: this.state[i].real * cos,
          imag: this.state[i].imag * cos,
        })
        newState[i] = this.complexAdd(newState[i], { real: -this.state[i].real * sin, imag: -this.state[i].imag * sin })
      }
    }

    this.state = newState
  }

  applyRZ(qubit: number, theta: number): void {
    const size = Math.pow(2, this.numQubits)

    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1

      if (bit === 1) {
        const phase = { real: Math.cos(theta / 2), imag: Math.sin(theta / 2) }
        this.state[i] = this.complexMultiply(this.state[i], phase)
      } else {
        const phase = { real: Math.cos(-theta / 2), imag: Math.sin(-theta / 2) }
        this.state[i] = this.complexMultiply(this.state[i], phase)
      }
    }
  }

  // Two-qubit gates
  applyCNOT(control: number, target: number): void {
    const size = Math.pow(2, this.numQubits)
    const newState: QuantumState = [...this.state]

    for (let i = 0; i < size; i++) {
      const controlBit = (i >> control) & 1

      if (controlBit === 1) {
        const flipped = i ^ (1 << target)
        const temp = newState[i]
        newState[i] = newState[flipped]
        newState[flipped] = temp
      }
    }

    this.state = newState
  }

  // Measurement and expectation values
  measureProbabilities(): number[] {
    return this.state.map((c) => Math.pow(this.complexMagnitude(c), 2))
  }

  // Calculate expectation value for Hamiltonian (for VQE)
  expectationValue(hamiltonian: number[][]): number {
    let expectation = 0

    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state.length; j++) {
        const amplitude = this.complexMultiply({ real: this.state[i].real, imag: -this.state[i].imag }, this.state[j])
        expectation += amplitude.real * hamiltonian[i][j]
      }
    }

    return expectation
  }

  getState(): QuantumState {
    return [...this.state]
  }

  reset(): void {
    this.state = this.initializeState()
  }
}

// VQE-specific functions
export function createSimpleHamiltonian(numQubits: number): number[][] {
  const size = Math.pow(2, numQubits)
  const H: number[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0))

  // Simple Z_0 Z_1 Hamiltonian for demonstration
  for (let i = 0; i < size; i++) {
    const bit0 = (i >> 0) & 1
    const bit1 = (i >> 1) & 1
    const sign = bit0 === bit1 ? 1 : -1
    H[i][i] = sign
  }

  return H
}

export function vqeCircuit(simulator: QuantumSimulator, parameters: number[]): void {
  const numQubits = 4 // Fixed for this demo

  // Layer 1: Initial rotations
  for (let i = 0; i < numQubits; i++) {
    simulator.applyRY(i, parameters[i])
  }

  // Layer 2: Entangling layer
  for (let i = 0; i < numQubits - 1; i++) {
    simulator.applyCNOT(i, i + 1)
  }

  // Layer 3: Second rotation layer
  for (let i = 0; i < numQubits; i++) {
    simulator.applyRY(i, parameters[numQubits + i])
  }
}

// Calculate Wasserstein distance (simplified for demonstration)
export function wassersteinCost(state1: QuantumState, state2: QuantumState): number {
  let cost = 0
  for (let i = 0; i < state1.length; i++) {
    const diff_real = state1[i].real - state2[i].real
    const diff_imag = state1[i].imag - state2[i].imag
    cost += Math.sqrt(diff_real * diff_real + diff_imag * diff_imag)
  }
  return cost
}

// Calculate fidelity cost
export function fidelityCost(state1: QuantumState, state2: QuantumState): number {
  let fidelity = 0
  for (let i = 0; i < state1.length; i++) {
    fidelity += state1[i].real * state2[i].real + state1[i].imag * state2[i].imag
  }
  return 1 - Math.abs(fidelity)
}
