import { rest } from 'msw';

export const handlers = [
  // GET Session
  rest.get('http://localhost:8080/session', (req, res, ctx) => {
    return res(
      ctx.json({ ok: true, session: { username: 'test' } })
    )
  })
];