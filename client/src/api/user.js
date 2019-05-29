import request from '@/api/request';

export function createUser(data){
  return request({
    url: '/user',
    method: 'POST',
    data,
  });
}

export function getAllUsers() {
  return request({
    url: '/user',
    method: 'GET'
  });
}

export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  });
}

export function userLogout(data) {
  return request({
    url: '/user/logout',
    method: 'POST',
    data
  });
}

// export function deleteUser() {
//   return request({
//     url: '/user',
//     method: 'DELETE',
//   })
// }

export function deleteUser(userId) {
  return request({
    url: `/user/delete/${userId}`,
    method: 'POST',
  })
}