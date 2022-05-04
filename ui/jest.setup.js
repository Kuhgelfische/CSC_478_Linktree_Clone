// Polyfill fetch
import 'whatwg-fetch';

// Extra testing utilities
import '@testing-library/jest-dom/extend-expect';

// Mock API requests
import { server } from './mocks/server';
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())