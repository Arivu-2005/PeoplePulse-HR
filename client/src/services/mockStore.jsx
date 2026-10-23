// Initial mock seed data for cloud / preview mode when live backend is offline
export const demoUsers = [
  {
    _id: "usr_admin",
    name: "Sarah Connor",
    email: "admin@peoplepulse.com",
    role: "Admin",
    isActive: true,
    token: "mock_jwt_token_admin_2026",
    employee: {
      employeeCode: "EMP-1001",
      firstName: "Sarah",
      lastName: "Connor",
      email: "admin@peoplepulse.com",
      designation: "VP of People & Culture",
      department: { name: "Human Resources", code: "HRD" },
      leaveBalances: { annual: 24, casual: 12, sick: 10 }
    }
  },
  {
    _id: "usr_hr",
    name: "Marcus Vance",
    email: "hr@peoplepulse.com",
    role: "HR",
    isActive: true,
    token: "mock_jwt_token_hr_2026",
    employee: {
      employeeCode: "EMP-1002",
      firstName: "Marcus",
      lastName: "Vance",
      email: "hr@peoplepulse.com",
      designation: "Senior HR Manager",
      department: { name: "Human Resources", code: "HRD" },
      leaveBalances: { annual: 20, casual: 10, sick: 8 }
    }
  },
  {
    _id: "usr_mgr",
    name: "Elena Rostova",
    email: "manager@peoplepulse.com",
    role: "Manager",
    isActive: true,
    token: "mock_jwt_token_mgr_2026",
    employee: {
      employeeCode: "EMP-1003",
      firstName: "Elena",
      lastName: "Rostova",
      email: "manager@peoplepulse.com",
      designation: "Engineering Director",
      department: { name: "Engineering", code: "ENG" },
      leaveBalances: { annual: 18, casual: 12, sick: 10 }
    }
  },
  {
    _id: "usr_emp",
    name: "David Kim",
    email: "employee@peoplepulse.com",
    role: "Employee",
    isActive: true,
    token: "mock_jwt_token_emp_2026",
    employee: {
      employeeCode: "EMP-1004",
      firstName: "David",
      lastName: "Kim",
      email: "employee@peoplepulse.com",
      designation: "Senior Full Stack Engineer",
      department: { name: "Engineering", code: "ENG" },
      leaveBalances: { annual: 16, casual: 10, sick: 9 }
    }
  }
];

export const demoEmployees = [
  {
    _id: "emp_1001",
    employeeCode: "EMP-1001",
    firstName: "Sarah",
    lastName: "Connor",
    email: "admin@peoplepulse.com",
    phone: "+1 (555) 234-5678",
    designation: "VP of People & Culture",
    department: { _id: "dept_hr", name: "Human Resources", code: "HRD" },
    employmentType: "Full-Time",
    status: "Active",
    salary: 135000,
    skills: ["Leadership", "Strategic Planning", "Compensation"],
    user: { role: "Admin", isActive: true }
  },
  {
    _id: "emp_1002",
    employeeCode: "EMP-1002",
    firstName: "Marcus",
    lastName: "Vance",
    email: "hr@peoplepulse.com",
    phone: "+1 (555) 345-6789",
    designation: "Senior HR Manager",
    department: { _id: "dept_hr", name: "Human Resources", code: "HRD" },
    employmentType: "Full-Time",
    status: "Active",
    salary: 92000,
    skills: ["Recruitment", "Conflict Resolution", "Employee Relations"],
    user: { role: "HR", isActive: true }
  },
  {
    _id: "emp_1003",
    employeeCode: "EMP-1003",
    firstName: "Elena",
    lastName: "Rostova",
    email: "manager@peoplepulse.com",
    phone: "+1 (555) 456-7890",
    designation: "Engineering Director",
    department: { _id: "dept_eng", name: "Engineering", code: "ENG" },
    employmentType: "Full-Time",
    status: "Active",
    salary: 145000,
    skills: ["Distributed Systems", "Go", "React", "Agile"],
    user: { role: "Manager", isActive: true }
  },
  {
    _id: "emp_1004",
    employeeCode: "EMP-1004",
    firstName: "David",
    lastName: "Kim",
    email: "employee@peoplepulse.com",
    phone: "+1 (555) 567-8901",
    designation: "Senior Full Stack Engineer",
    department: { _id: "dept_eng", name: "Engineering", code: "ENG" },
    employmentType: "Full-Time",
    status: "Active",
    salary: 115000,
    skills: ["Node.js", "React", "TypeScript", "Docker"],
    user: { role: "Employee", isActive: true }
  },
  {
    _id: "emp_1005",
    employeeCode: "EMP-1005",
    firstName: "Sophia",
    lastName: "Patel",
    email: "sophia@peoplepulse.com",
    phone: "+1 (555) 678-9012",
    designation: "Lead Product Designer",
    department: { _id: "dept_prd", name: "Product & Design", code: "PRD" },
    employmentType: "Full-Time",
    status: "Active",
    salary: 108000,
    skills: ["Figma", "Design Systems", "User Research"],
    user: { role: "Employee", isActive: true }
  }
];

export const demoDepartments = [
  {
    _id: "dept_eng",
    name: "Engineering",
    code: "ENG",
    description: "Product development, platform architecture, and cloud operations",
    budget: 1200000,
    location: "Building A, 4th Floor",
    employeeCount: 2
  },
  {
    _id: "dept_hr",
    name: "Human Resources",
    code: "HRD",
    description: "People operations, talent acquisition, culture, and employee welfare",
    budget: 450000,
    location: "Building B, 2nd Floor",
    employeeCount: 2
  },
  {
    _id: "dept_prd",
    name: "Product & Design",
    code: "PRD",
    description: "UI/UX design, user research, product strategy and roadmaps",
    budget: 600000,
    location: "Building C, 3rd Floor",
    employeeCount: 1
  },
  {
    _id: "dept_sal",
    name: "Sales & Growth",
    code: "SAL",
    description: "Global business development, enterprise partnerships, and client success",
    budget: 800000,
    location: "Building A, 2nd Floor",
    employeeCount: 0
  }
];
