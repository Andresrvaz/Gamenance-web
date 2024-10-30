import express from 'express'
import { registerUser } from './userController'

export default function registerUserRoutes(app: express.Application) {
    app
        .route('/api/v1/users/register')
        .post(registerUser)
}