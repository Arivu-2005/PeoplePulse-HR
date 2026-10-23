// Complete standalone client-side Database with LocalStorage persistence
import { demoUsers, demoEmployees, demoDepartments } from './mockStore';

const STORAGE_KEYS = {
  USERS: 'pp_users',
  EMPLOYEES: 'pp_employees',
  DEPARTMENTS: 'pp_departments',
  ATTENDANCE: 'pp_attendance',
  LEAVES: 'pp_leaves',
  GOALS: 'pp_goals',
  REVIEWS: 'pp_reviews',
  NOTIFICATIONS: 'pp_notifications',
  AUDIT: 'pp_audit',
};

const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(demoUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(demoEmployees));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DEPARTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(demoDepartments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(
      STORAGE_KEYS.ATTENDANCE,
      JSON.stringify([
        {
          _id: 'att_101',
          employee: demoEmployees[0],
          date: today,
          clockIn: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
          clockOut: null,
          workHours: 4.0,
          status: 'Present',
          notes: 'Daily operational shift',
        },
      ])
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.LEAVES)) {
    localStorage.setItem(
      STORAGE_KEYS.LEAVES,
      JSON.stringify([
        {
          _id: 'lv_101',
          employee: demoEmployees[3],
          leaveType: 'Annual',
          startDate: new Date(Date.now() + 2 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 4 * 86400000).toISOString(),
          totalDays: 2,
          reason: 'Family planned vacation trip',
          status: 'Pending',
        },
      ])
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
    localStorage.setItem(
      STORAGE_KEYS.GOALS,
      JSON.stringify([
        {
          _id: 'gl_101',
          employee: demoEmployees[3],
          title: 'Upgrade Enterprise Core to Microservices Architecture',
          description: 'Refactor monolith auth and workflows into scalable services.',
          category: 'Strategic Project',
          progress: 68,
          targetDate: '2026-11-20',
          metricsKPI: { metricName: 'API Latency', targetValue: '< 50ms', currentValue: '65ms' },
          status: 'In Progress',
        },
      ])
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(
      STORAGE_KEYS.REVIEWS,
      JSON.stringify([
        {
          _id: 'rv_101',
          employee: demoEmployees[3],
          reviewer: demoUsers[0],
          cycle: 'Q1 2026',
          ratings: { technicalSkills: 5, communication: 4, teamwork: 5, punctuality: 4.8, leadership: 4.5, overallRating: 4.7 },
          strengths: 'Outstanding problem solving and architecture craftsmanship.',
          feedback: 'David is a cornerstone of the platform team, consistently driving high quality standards.',
          createdAt: new Date().toISOString(),
        },
      ])
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify([
        {
          _id: 'notif_1',
          title: 'Welcome to PeoplePulse HR',
          message: 'System initialization complete. All operational features are active.',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ])
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT)) {
    localStorage.setItem(
      STORAGE_KEYS.AUDIT,
      JSON.stringify([
        {
          _id: 'aud_1',
          action: 'SYSTEM_INITIALIZED',
          entity: 'System',
          details: { status: 'Online' },
          createdAt: new Date().toISOString(),
        },
      ])
    );
  }
};

initStorage();

export const localDB = {
  get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  KEYS: STORAGE_KEYS,
};
