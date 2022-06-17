class Department {
  private name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("Accounting");

console.log(accounting);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// Private property avoid these cases -> Forces us to write cleaner code
// accounting.employees[2] = "Ana";

accounting.describe();
accounting.printEmployeeInformation();

// This would give an error if we tried to run the describe method since the copy is not an instance of Department
// const accountingCopy = { describe: accounting.describe };

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();

// Shorthand

class DepartmentShortHand {
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {}

  describe(this: DepartmentShortHand) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // TypeScript will warn that this is not possible because id is readonly
    // this.id = "d2";
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting2 = new DepartmentShortHand("d1", "Accounting");

accounting2.describe();
