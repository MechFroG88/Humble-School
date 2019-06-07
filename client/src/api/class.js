import request from '@/api/request';

export function createClass(data){
  return request({
    url: '/class',
    method: 'POST',
    data,
  });
}

export function getAllClass() {
  return request({
    url: '/class',
    method: 'GET'
  });
}

export function getClass(classId) {
  return request({
    url: `/class${classId}`,
    method: 'GET'
  });
}

export function updateClass(classId) {
  return request({
    url: `/class${classId}`,
    method: 'POST'
  });
}

export function deleteClass(classId) {
  return request({
    url: `/user/delete/${classId}`,
    method: 'POST',
  })
}