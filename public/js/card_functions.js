const new_blog_title = document.querySelector('#new_blog_title');
const new_blog_content = document.querySelector('#new_blog_content');

// Function to populate the form for editing a blog post
const editBlog = (id) => {
  editingBlogId = id;

  // Fetch the specific blog data using the ID
  fetch(`/api/blog/${id}`)
    .then((response) => response.json())
    .then((data) => {
      new_blog_title.value = data.title;
      new_blog_content.value = data.text;
      new_post_card.style.display = 'block';
    })
    .catch((error) => {
      console.error('Error fetching blog data:', error);
    });
};

const deleteBlog = (id) => {
    
}