import axios from 'axios';
import { demoUsers, demoEmployees, demoDepartments } from './mockStore';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('peoplepulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback simulator for when backend is offline (e.g. static Vercel deployment)
const handleCloudMockFallback = (error) => {
  const config = error.config;
  if (!config) return Promise.reject(error);

  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  // 1. Auth login fallback
  if (url.includes('/auth/login') && method === 'post') {
    try {
      const { email, password } = JSON.parse(config.data || '{}');
      const normalizedEmail = (email || '').trim().toLowerCase();
      const validPass = (password || '').trim() === 'Password123!' || (password || '').trim().toUpperCase() === 'PASSWORD123!';

      const matchedUser = demoUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (matchedUser && validPass) {
        return Promise.resolve({
          status: 200,
          data: {
            success: true,
            token: matchedUser.token,
            user: matchedUser,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 2. Auth me fallback
  if (url.includes('/auth/me') && method === 'get') {
    const saved = localStorage.getItem('peoplepulse_user');
    if (saved) {
      return Promise.resolve({
        status: 200,
        data: {
          success: true,
          user: JSON.parse(saved),
        },
      });
    }
  }

  // 3. Analytics dashboard fallback
  if (url.includes('/analytics/dashboard') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        stats: {
          totalEmployees: 5,
          presentToday: 4,
          absentToday: 1,
          onLeaveEmployees: 1,
          pendingLeaves: 1,
          avgPerformanceScore: '4.7',
        },
        departmentStats: [
          { name: 'Engineering', count: 2 },
          { name: 'Human Resources', count: 2 },
          { name: 'Product & Design', count: 1 },
          { name: 'Sales & Growth', count: 0 },
        ],
        attendanceTrends: [
          { day: 'Mon', present: 5, late: 0 },
          { day: 'Tue', present: 4, late: 1 },
          { day: 'Wed', present: 5, late: 0 },
          { day: 'Thu', present: 4, late: 0 },
          { day: 'Fri', present: 5, late: 1 },
          { day: 'Sat', present: 2, late: 0 },
          { day: 'Today', present: 4, late: 0 },
        ],
        recentLeaves: [
          {
            _id: 'l_1',
            employee: { firstName: 'David', lastName: 'Kim', designation: 'Senior Full Stack Engineer' },
            leaveType: 'Annual',
            totalDays: 2,
            status: 'Pending',
          },
          {
            _id: 'l_2',
            employee: { firstName: 'Sophia', lastName: 'Patel', designation: 'Lead Product Designer' },
            leaveType: 'Casual',
            totalDays: 1,
            status: 'Approved',
          },
        ],
        recentGoals: [
          {
            _id: 'g_1',
            title: 'Upgrade Enterprise Core to Microservices Architecture',
            progress: 68,
            targetDate: '2026-11-20',
            employee: { firstName: 'David', lastName: 'Kim' },
          },
          {
            _id: 'g_2',
            title: 'Mentorship of Junior Apprentices',
            progress: 85,
            targetDate: '2026-12-15',
            employee: { firstName: 'David', lastName: 'Kim' },
          },
        ],
      },
    });
  }

  // 4. Employees fallback
  if (url.includes('/employees') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        count: demoEmployees.length,
        data: demoEmployees,
      },
    });
  }

  // 5. Departments fallback
  if (url.includes('/departments') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        count: demoDepartments.length,
        data: demoDepartments,
      },
    });
  }

  // 6. Notifications fallback
  if (url.includes('/reports/notifications') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        unreadCount: 1,
        data: [
          {
            _id: 'n_1',
            title: 'Pending Leave Request',
            message: 'David Kim applied for 2 days of Annual Leave.',
            isRead: false,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    });
  }

  // 7. Attendance today-status fallback
  if (url.includes('/attendance/today-status') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: {
          clockIn: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          clockOut: null,
          workHours: 3.0,
          status: 'Present',
        },
      },
    });
  }

  // 8. Attendance records fallback
  if (url.includes('/attendance') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: [
          {
            _id: 'att_1',
            employee: demoEmployees[3],
            date: new Date().toISOString().split('T')[0],
            clockIn: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
            clockOut: null,
            workHours: 4.0,
            status: 'Present',
            notes: 'On track with sprint deliveries',
          },
        ],
      },
    });
  }

  // 9. Leaves fallback
  if (url.includes('/leaves') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: [
          {
            _id: 'lv_1',
            employee: demoEmployees[3],
            leaveType: 'Annual',
            startDate: new Date(Date.now() + 5 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 7 * 86400000).toISOString(),
            totalDays: 2,
            reason: 'Family planned vacation trip',
            status: 'Pending',
          },
        ],
      },
    });
  }

  // 10. Performance goals fallback
  if (url.includes('/performance/goals') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: [
          {
            _id: 'gol_1',
            employee: demoEmployees[3],
            title: 'Upgrade Enterprise Core to Microservices Architecture',
            description: 'Refactor monolith authentication & reporting workflows into scalable docker services.',
            category: 'Strategic Project',
            progress: 68,
            targetDate: '2026-11-20',
            metricsKPI: { metricName: 'API Latency reduction', targetValue: '< 50ms', currentValue: '65ms' },
            status: 'In Progress',
          },
        ],
      },
    });
  }

  // 11. Performance reviews fallback
  if (url.includes('/performance/reviews') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: [
          {
            _id: 'rev_1',
            employee: demoEmployees[3],
            reviewer: demoUsers[2],
            cycle: 'Q1 2026',
            ratings: { technicalSkills: 5, communication: 4, teamwork: 5, punctuality: 4.8, leadership: 4.5, overallRating: 4.7 },
            feedback: 'David is a cornerstone of the platform team, consistently driving high quality standards.',
            strengths: 'Outstanding craftsmanship and architecture leadership.',
            createdAt: new Date().toISOString(),
          },
        ],
      },
    });
  }

  // 12. Audit logs fallback
  if (url.includes('/reports/audit-logs') && method === 'get') {
    return Promise.resolve({
      status: 200,
      data: {
        success: true,
        data: [
          {
            _id: 'aud_1',
            createdAt: new Date().toISOString(),
            action: 'USER_LOGIN',
            user: demoUsers[0],
            entity: 'User',
            details: { role: 'Admin', verified: true },
          },
        ],
      },
    });
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 404 (static hosting without Express) or network connection error
    if (!error.response || error.response.status === 404 || error.response.status >= 500) {
      return handleCloudMockFallback(error);
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('peoplepulse_token');
      localStorage.removeItem('peoplepulse_user');
      if (window.location.pathname !== '/login' && !window.location.pathname.endsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
