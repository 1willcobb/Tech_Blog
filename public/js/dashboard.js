const newPostDashboard = document.querySelector('#new_post_dashboard');

newPostDashboard.addEventListener('click', () => {
  console.log('new post clicked');
});

const handleNewBlogSubmit = async (e) => {
  e.preventDefault();
  console.log('blog submitted');

  const title = document.querySelector('#new_blog_title').value.trim();
  const text = document.querySelector('#new_blog_content').value.trim();
  const userDataElement = document.getElementById('user-data');
  var author_id = userDataElement.getAttribute('data-user-id');

  if (title && text) {
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, text, author_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      alert('Missing Fields');
    }
  }
};

const submitButton = document.querySelector('#submit_new_blog');

submitButton.addEventListener('click', handleNewBlogSubmit);
