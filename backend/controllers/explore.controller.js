const explorePopularRepos = async (req, res) => {
  const { language } = req.params;
  console.log('Requested language:', language);

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${encodeURIComponent(language)}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    // console.log('API response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(`GitHub API error: ${data.message || response.statusText}`);
    }

    res.status(200).json({ repos: data.items });
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export default explorePopularRepos;
