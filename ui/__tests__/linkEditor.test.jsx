import { render, screen, waitFor } from '@testing-library/react';
import LTC_LinkEditor from '../components/linkEditor';
import '@testing-library/jest-dom';

const testLink = {
  title: "Instagram",
  url: "https://instagram.com"
}

describe('Link Editor', () => {
  beforeEach(() => {
    render(<LTC_LinkEditor link={testLink} key={1} />);
  });

  it('renders a link editor', () => {
    const title_lbl = screen.getByLabelText('Title');
    expect(title_lbl).toBeInTheDocument();
    const url_lbl = screen.getByLabelText('URL');
    expect(url_lbl).toBeInTheDocument();
  });

  it('renders with the correct text', () => {
    const title = screen.getByLabelText('title-input');
    expect(title.value).toEqual(testLink.title);
    const url = screen.getByLabelText('url-input');
    expect(url.value).toEqual(testLink.url);
  })
});