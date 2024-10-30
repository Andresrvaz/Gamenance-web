import express from 'express';
import path from 'path';
import userRoutes from './features/users/userRoutes';

export default function routes(app: express.Application) {
    userRoutes(app)
}