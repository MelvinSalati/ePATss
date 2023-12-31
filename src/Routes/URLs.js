const routes = {
  // auth
  auth: {
    login: 'api/v1/epats/login',
    register: 'api/v1/epats/register',
  },
  patient: {
    register: 'api/v1/epats/client',
    search: 'api/v1/epats/search',
    appointments: 'api/v2/epats/appointments',
    tracking: 'api/v1/epats/tracking',
    status: 'api/v1/epats/status',
    streams: 'api/v1/epats/streams',
    binding: 'api/v1/epats/binding',
  },
  streams: {
    create: 'api/v1/epats/create',
    list: 'api/v1/epats/streams',
    enroll: 'api/v1/epats/enroll',
  },
}

export default routes
