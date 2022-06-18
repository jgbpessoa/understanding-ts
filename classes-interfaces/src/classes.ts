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

// Abstract Class
abstract class DepartmentShortHand {
  // Static property
  static fiscalYear = 2022;
  protected employees: string[] = [];

  constructor(protected readonly id: string, protected name: string) {
    // You can't access static properties with this keyword!
    // console.log(DepartmentShortHand.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name };
  }

  //
  abstract describe(this: DepartmentShortHand): void;

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

// const accounting2 = new DepartmentShortHand("d1", "Accounting");

// accounting2.describe();

// Inheritance

class ITDepartment extends DepartmentShortHand {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log(`${this.name} Department - ID: ${this.id}`);
  }
}

const employee1 = DepartmentShortHand.createEmployee("Max");
console.log(employee1);

const it = new ITDepartment("d1", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

it.describe();
it.printEmployeeInformation();

console.log(it);

class AccountingDepartment extends DepartmentShortHand {
  private lastReport: string;
  // We need to create a private static property for the instance
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  // It ensures we can't call new on this constructor
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // We can create a static method to create/check the only instance we want
  static getInstance() {
    if (AccountingDepartment.instance) {
      // this.instance works because this is a static method
      return this.instance;
    }
    // Here we can access the private constructor because we are inside the class
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  describe() {
    console.log(`${this.name} Department - ID: ${this.id}`);
  }
}

// const accountingInheritance = new AccountingDepartment("d2", []);
const accountingInheritance = AccountingDepartment.getInstance();
// Same as previous one
const accountingInheritance2 = AccountingDepartment.getInstance();

console.log(accountingInheritance, accountingInheritance2);

// console.log(accountingInheritance.mostRecentReport);

// Setter
accountingInheritance.mostRecentReport = "Year End Report";

accountingInheritance.addReport("Something went wrong...");
accountingInheritance.printReports();

//Getter
console.log(accountingInheritance.mostRecentReport);

accountingInheritance.addEmployee("Max");
accountingInheritance.addEmployee("Manu");
accountingInheritance.printEmployeeInformation();
accountingInheritance.describe();

console.log(accountingInheritance);
