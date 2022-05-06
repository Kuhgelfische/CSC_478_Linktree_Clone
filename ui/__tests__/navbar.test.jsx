import { render, screen, waitFor } from '@testing-library/react';
import LTC_Navbar from '../components/navbar';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { server } from '../mocks/server';

describe('Navbar', () => {
  beforeEach(() => {
    render(<LTC_Navbar />);
  });

  it('renders a navbar', () => {
    const title = screen.getByText('OneLink');
    expect(title).toBeInTheDocument();
  });

  it('shows logged in user', async () => {
    await waitFor(async () => {
      const username = await screen.findByText('Hi, test')
      expect(username).toBeInTheDocument();
      const login = screen.queryByText('Log in');
      expect(login).not.toBeInTheDocument();
    })
  })

  it('shows log in if nobody is logged in', async () => {
    // No login token
    server.use(
      rest.get('http://localhost:8080/session', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ ok: false, msg: "Bad token" }))
      })
    );

    await waitFor(async () => {
      const login = await screen.findByText('Log in');
      expect(login).toBeInTheDocument();
    });
  });
});