import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders'

test('GET order with correct ID should return 200 OK', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`)
  console.log('GET /1 response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('GET order with non-existent ID should return 404 Not Found', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/999999`)
  expect(response.status()).toBe(StatusCodes.NOT_FOUND)
})

test('POST new order with correct data should return 200 OK', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Test User',
    customerPhone: '+3725555555',
    comment: 'Test comment',
    id: 0,
  }

  const response = await request.post(BASE_URL, {
    data: requestBody,
  })

  console.log('POST response:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK) // Or StatusCodes.CREATED if API returns 201
})

test('PUT update existing order should return 200 OK', async ({ request }) => {
  const requestBody = {
    status: 'CLOSED',
    courierId: 1,
    customerName: 'Updated Name',
    customerPhone: '+37212345678',
    comment: 'Updated comment',
    id: 1,
  }

  const response = await request.put(`${BASE_URL}/1`, {
    data: requestBody,
  })

  console.log('PUT /1 response:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT update non-existent order should return 404 Not Found', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/999999`, {
    data: {
      status: 'CLOSED',
      courierId: 1,
      customerName: 'Nobody',
      customerPhone: '+37200000000',
      comment: 'Should fail',
      id: 999999,
    },
  })

  expect(response.status()).toBe(StatusCodes.NOT_FOUND)
})

test('DELETE existing order should return 204 No Content', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/1`)
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('DELETE non-existent order should return 404 Not Found', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/999999`)
  expect(response.status()).toBe(StatusCodes.NOT_FOUND)
})
