import { parse } from 'cookie';

export default (req, res) => {
  const storedToken = parse(req.headers.cookie || '').githubAccessToken;

  // Pass the cookie information as props to your React component
  res.json({ storedToken });
};
