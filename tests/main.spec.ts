import { BoxRegionTests } from './box.spec.ts';
import { ValidationTests } from './validation.spec.ts';
import { SolverTests } from './solve.spec.ts';

const boxRegionTests = new BoxRegionTests();
const validationTests = new ValidationTests();
const solverTests = new SolverTests();
boxRegionTests.run();
validationTests.run();
solverTests.run();
