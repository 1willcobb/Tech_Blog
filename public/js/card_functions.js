const container = document.querySelector('.blog_feed');

const deleteBlog = async (id, target) => {
  console.log('update Blog Function... ' + id);

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    target.closest('.card').remove();
  } else {
    return console.log('nothing to delete');
  }
};

const openEditor = async (id) => {
  console.log('editing...');

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

//TODO THIS ISNT WORKING YET. ALSO SAVE ONLY WORKS ON THE TOP ONE>
const handleUpdateSubmit = async (id, title, text) => {
  console.log('saving...');

  if (title && text) {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text, is_editing: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to update');
    }
  }
};

const handleCancel = async (id) => {
  console.log('editing...');

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

// Attach event listener for button clicks
container.addEventListener('click', async (event) => {
  const target = event.target;
  const action = target.getAttribute('data-action');
  const blogId = target.getAttribute('data-id');
  // Get the title and text from the clicked card

  if (action === 'delete') {
    deleteBlog(blogId, target);
  } else if (action === 'edit') {
    openEditor(blogId);
  } else if (action === 'save') {
    const card = target.closest('.card'); // Find the closest parent with the .card class
    const title = card.querySelector('#new_blog_title').value.trim();
    const text = card.querySelector('#new_blog_content').value.trim();
    handleUpdateSubmit(blogId, title, text);
  } else if (action === 'cancel') {
    handleCancel(blogId);
  }
});
